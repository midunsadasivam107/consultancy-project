const express = require('express');
const multer = require('multer');
const { predictDisease } = require('../controllers/diseaseController');

const router = express.Router();
const maxUploadSize = Number(process.env.DISEASE_IMAGE_MAX_BYTES || 10 * 1024 * 1024);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number.isFinite(maxUploadSize) ? maxUploadSize : 10 * 1024 * 1024,
  },
});

router.post('/predict', upload.single('image'), predictDisease);

module.exports = router;