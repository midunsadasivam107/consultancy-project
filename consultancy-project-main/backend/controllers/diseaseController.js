const PLANT_DISEASE_MODEL_ID = String(
  process.env.PLANT_DISEASE_MODEL_ID || '',
).trim();
const configuredApiUrl = String(process.env.HUGGINGFACE_API_URL || '').trim();
const routerDefaultUrl = `https://router.huggingface.co/hf-inference/models/${PLANT_DISEASE_MODEL_ID}`;
const HUGGINGFACE_API_URL = configuredApiUrl.includes('api-inference.huggingface.co/models/')
  ? configuredApiUrl.replace('https://api-inference.huggingface.co/models/', 'https://router.huggingface.co/hf-inference/models/')
  : (configuredApiUrl || routerDefaultUrl);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeLabel(rawLabel) {
  return String(rawLabel || '')
    .replace(/___/g, ' - ')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferRecommendations(name) {
  const value = String(name || '').toLowerCase();
  const recommendations = new Set();

  if (/(rust|blight|mildew|mold|spot|rot|fungal|scab|leaf\s*curl)/.test(value)) {
    recommendations.add('Fungicide');
  }

  if (/(aphid|beetle|worm|weevil|insect|pest|borer|mite|hopper)/.test(value)) {
    recommendations.add('Pesticide');
  }

  if (/(weed)/.test(value)) {
    recommendations.add('Herbicide');
  }

  if (/(deficien|chlorosis|nutrient|yellow|stunted)/.test(value)) {
    recommendations.add('Fertilizer');
  }

  if (recommendations.size === 0) {
    recommendations.add('Fungicide');
  }

  return Array.from(recommendations);
}

function buildDescription(name) {
  return `Model-detected condition: ${name}. Please verify with a local agronomist before large-scale treatment.`;
}

async function callModelInference({ token, imageBuffer, mimeType }) {
  const headers = {
    'Content-Type': mimeType || 'application/octet-stream',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(HUGGINGFACE_API_URL, {
    method: 'POST',
    headers,
    body: imageBuffer,
  });

  const raw = await response.text();
  let parsed;
  try {
    parsed = raw ? JSON.parse(raw) : [];
  } catch {
    parsed = {
      error: response.ok
        ? 'Model provider returned an unexpected non-JSON response.'
        : `Model provider error (${response.status}) with non-JSON body.`,
      raw: String(raw || '').slice(0, 500),
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    data: parsed,
  };
}

async function predictDisease(req, res, next) {
  try {
    const token = String(process.env.HUGGINGFACE_API_TOKEN || '').trim();
    if (!token) {
      return res.status(503).json({
        message: 'Disease prediction service is not configured. Missing HUGGINGFACE_API_TOKEN.',
      });
    }

    const imageFile = req.file;
    if (!imageFile?.buffer) {
      return res.status(400).json({ message: 'Image file is required. Use form-data field name "image".' });
    }

    if (!String(imageFile.mimetype || '').startsWith('image/')) {
      return res.status(400).json({ message: 'Unsupported file type. Please upload a valid image.' });
    }

    let inference = await callModelInference({
      token,
      imageBuffer: imageFile.buffer,
      mimeType: imageFile.mimetype,
    });

    if (
      !inference.ok
      && inference.status === 503
      && inference.data
      && typeof inference.data === 'object'
      && Number.isFinite(inference.data.estimated_time)
    ) {
      const waitMs = Math.max(1500, Math.min(Number(inference.data.estimated_time) * 1000, 15000));
      await sleep(waitMs);
      inference = await callModelInference({
        token,
        imageBuffer: imageFile.buffer,
        mimeType: imageFile.mimetype,
      });
    }

    if (!inference.ok) {
      const providerMessage = inference.data?.error || 'Failed to run disease model inference.';
      return res.status(inference.status || 502).json({ message: providerMessage });
    }

    const predictions = Array.isArray(inference.data) ? inference.data : [];
    if (predictions.length === 0) {
      return res.status(502).json({ message: 'Disease model returned no predictions.' });
    }

    const sortedPredictions = [...predictions].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
    const topPrediction = sortedPredictions[0];
    const diseaseName = normalizeLabel(topPrediction.label);

    return res.json({
      disease: {
        name: diseaseName,
        description: buildDescription(diseaseName),
        recommendations: inferRecommendations(diseaseName),
        confidence: Number(topPrediction.score || 0),
      },
      predictions: sortedPredictions.slice(0, 5).map((item) => ({
        label: normalizeLabel(item.label),
        score: Number(item.score || 0),
      })),
      model: PLANT_DISEASE_MODEL_ID,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  predictDisease,
};