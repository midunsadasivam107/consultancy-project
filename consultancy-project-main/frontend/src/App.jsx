import { useEffect, useMemo, useRef, useState } from 'react';
import products from './data/products';

const testimonials = [
  { text: 'I used the recommended spray plan on my cotton field and saw healthier leaves within the first week. Clear instructions and no confusion.' },
  { text: 'Ordering from mobile was easy, and the advisor called me back the same evening. The support felt practical, not generic.' },
  { text: 'The fertilizer combo worked well for my tomato crop this season. Plants looked stronger and flowering improved noticeably.' },
  { text: 'Packaging was secure, delivery was on time, and product quality matched what was shown. I will reorder for the next cycle.' },
  { text: 'I was unsure about dosage at first, but the guidance was clear and simple. My chili plants recovered quickly after pest stress.' },
];

const whyChooseUs = [
  { title: 'Wide Product Range', desc: 'From pesticides to fertilizers, all agricultural needs in one place.' },
  { title: 'Expert Advice', desc: 'Professional guidance tailored to your farming needs.' },
  { title: 'Quality Assured', desc: 'Premium products sourced from trusted manufacturers.' },
  { title: 'Sustainable Practices', desc: 'Eco-friendly solutions to enhance productivity.' },
];

const galleryImages = [
  'https://media.istockphoto.com/id/543212762/photo/tractor-cultivating-field-at-spring.jpg?s=612x612&w=0&k=20&c=uJDy7MECNZeHDKfUrLNeQuT7A1IqQe89lmLREhjIJYU=',
  'https://media.istockphoto.com/id/644979810/photo/female-farmer-working-in-the-field.jpg?s=612x612&w=0&k=20&c=kDfkIQOwOZtwK9yfhk_6Z66H9nFIM-nve7G6lBe8aKg=',
  'https://media.istockphoto.com/id/1469639791/photo/farmer-using-digital-tablet-in-corn-crop-cultivated-field-with-smart-farming-interface-icons.jpg?s=612x612&w=0&k=20&c=CEnLHATfACNoH_N3Ru5KoTOmAc5SbufJozvV_kcuwc4=',
  'https://images.picxy.com/cache/2024/2/23/75ce95ae32d6b622f031da09a48638d1.jpg',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=60',
  'https://media.istockphoto.com/id/2148752264/photo/modern-indian-farmer-using-mobile-phone-technology-for-growth-and-development.jpg?s=612x612&w=0&k=20&c=74a8UOrwi6ywU1ZXehFt8HOiTQphNYG3m8rstV3_sCA=',
];

const heroImages = [
  'https://images.pexels.com/photos/26762735/pexels-photo-26762735.jpeg?cs=srgb&dl=pexels-amresh444-26762735.jpg&fm=jpg',
  'https://thumbs.dreamstime.com/b/subsistence-farmer-tamil-nadu-india-peasent-ploughing-paddy-field-chettinad-district-region-southern-32768881.jpg',
  'https://images.pexels.com/photos/18620460/pexels-photo-18620460.jpeg?cs=srgb&dl=pexels-gowtham-agm-609630353-18620460.jpg&fm=jpg',
  'https://img.freepik.com/premium-photo/village-old-farmer-is-working-green-planting-paddy-seeds-weed-out-grass_709167-309.jpg',
];

function SignInSection({ onSignIn, onForgotPassword, onCreateAccount, onReturnToSite, role = 'user', onRoleChange, onGoogleContinue, googleClientId }) {
  const [signInError, setSignInError] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (role === 'admin' || !googleClientId || !window.google?.accounts?.id || !googleButtonRef.current) {
      return;
    }

    googleButtonRef.current.innerHTML = '';
    window.google.accounts.id.renderButton(googleButtonRef.current, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
      width: 320,
    });
  }, [role, googleClientId]);

  return (
    <section
      id="signin"
      style={{
        padding: '4.5rem 2rem 3.5rem',
        background: 'linear-gradient(135deg, #fff7ed 0%, #ecfeff 50%, #f0fdf4 100%)',
      }}
    >
      <div
        className="signin-hero"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(160deg, #0f172a 0%, #14532d 55%, #064e3b 100%)',
            color: '#fff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(250,204,21,0.25), transparent 50%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbf7d0', marginBottom: '1rem' }}>
              Grow with confidence
            </div>
            <h2
              style={{
                fontSize: '2.4rem',
                lineHeight: 1.1,
                margin: '0 0 1rem 0',
                fontFamily: "'Playfair Display', 'Georgia', serif",
              }}
            >
              Sign in to your
              <br />
              Agri-Clinic account
            </h2>
            <p style={{ margin: 0, color: '#dcfce7', lineHeight: 1.7, maxWidth: '360px' }}>
              Track your orders, save your crop plans, and chat with advisors in one place.
            </p>
            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '2rem' }}>
              {[
                { label: 'Fast delivery updates', detail: 'Real-time order status and notifications.' },
                { label: 'Personalized crop tips', detail: 'Recommendations tuned to your farm.' },
                { label: 'Priority support', detail: 'Talk to experts with faster response.' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="floaty"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '0.9rem',
                    padding: '0.85rem 1rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', color: '#d1fae5' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="signin-card"
          style={{
            background: '#fff',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px rgba(15, 23, 42, 0.12)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#0f172a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>Welcome back</h3>
              <p style={{ margin: '0.4rem 0 0 0', color: '#64748b' }}>Sign in to continue your farm journey.</p>
            </div>
            <div style={{ display: 'grid', justifyItems: 'end', gap: '0.55rem' }}>
              <button
                type="button"
                onClick={onReturnToSite}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: '0.65rem',
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  color: '#334155',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Return to site
              </button>
              <div style={{ padding: '0.4rem 0.8rem', background: '#ecfeff', color: '#0f766e', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>
                {role === 'admin' ? 'Admin' : 'Member'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { key: 'user', label: 'User' },
              { key: 'admin', label: 'Admin' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onRoleChange?.(item.key)}
                aria-pressed={role === item.key}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.9rem',
                  borderRadius: '999px',
                  border: `1px solid ${role === item.key ? '#059669' : '#e2e8f0'}`,
                  background: role === item.key ? '#ecfdf5' : '#fff',
                  color: role === item.key ? '#047857' : '#475569',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {item.label} sign in
              </button>
            ))}
          </div>

          <>
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              
              <div
                ref={googleButtonRef}
                style={{ display: role === 'admin' ? 'none' : 'flex', justifyContent: 'center', minHeight: '44px' }}
                aria-label="Google sign in"
              />
              {role === 'admin' && (
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b', textAlign: 'center' }}>
                  Google sign-in is available for User role only.
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#94a3b8' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ fontSize: '0.85rem' }}>or use email</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>
          </>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = String(formData.get('email') || '').trim();
              const password = String(formData.get('password') || '');

              setSignInError('');
              setSignInLoading(true);
              try {
                await onSignIn?.({ role, email, password });
              } catch (err) {
                setSignInError(err.message || 'Sign in failed. Please try again.');
              } finally {
                setSignInLoading(false);
              }
            }}
            style={{ display: 'grid', gap: '1rem' }}
          >
            <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
              Email address
              <input
                type="email"
                name="email"
                placeholder="farmer@example.com"
                required
                style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
              Password
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type={showSignInPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  required
                  style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword((prev) => !prev)}
                  style={{ padding: '0.58rem 0.8rem', borderRadius: '0.65rem', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 700, minWidth: '62px' }}
                >
                  {showSignInPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPasswordForm((prev) => !prev);
                  setForgotPasswordError('');
                }}
                style={{ border: 'none', background: 'transparent', color: '#0f766e', cursor: 'pointer', fontWeight: 600 }}
              >
                Forgot password?
              </button>
            </div>

            {showForgotPasswordForm && (
              <div style={{ display: 'grid', gap: '0.65rem', padding: '0.9rem', borderRadius: '0.75rem', border: '1px solid #bae6fd', background: '#f0f9ff' }}>
                <div style={{ fontSize: '0.86rem', color: '#0f172a', fontWeight: 700 }}>Reset password</div>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(event) => setForgotEmail(event.target.value)}
                  placeholder="Enter your account email"
                  style={{ padding: '0.65rem 0.75rem', borderRadius: '0.65rem', border: '1px solid #cbd5e1', background: '#fff' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <input
                    type={showForgotNewPassword ? 'text' : 'password'}
                    value={forgotNewPassword}
                    onChange={(event) => setForgotNewPassword(event.target.value)}
                    placeholder="New password"
                    style={{ flex: 1, padding: '0.65rem 0.75rem', borderRadius: '0.65rem', border: '1px solid #cbd5e1', background: '#fff' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowForgotNewPassword((prev) => !prev)}
                    style={{ padding: '0.5rem 0.72rem', borderRadius: '0.6rem', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 700 }}
                  >
                    {showForgotNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <input
                    type={showForgotConfirmPassword ? 'text' : 'password'}
                    value={forgotConfirmPassword}
                    onChange={(event) => setForgotConfirmPassword(event.target.value)}
                    placeholder="Confirm new password"
                    style={{ flex: 1, padding: '0.65rem 0.75rem', borderRadius: '0.65rem', border: '1px solid #cbd5e1', background: '#fff' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowForgotConfirmPassword((prev) => !prev)}
                    style={{ padding: '0.5rem 0.72rem', borderRadius: '0.6rem', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 700 }}
                  >
                    {showForgotConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPasswordForm(false);
                      setForgotPasswordError('');
                    }}
                    style={{ padding: '0.55rem 0.8rem', borderRadius: '0.6rem', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={forgotPasswordLoading}
                    onClick={async () => {
                      setForgotPasswordError('');
                      setForgotPasswordLoading(true);
                      try {
                        await onForgotPassword?.({
                          email: forgotEmail,
                          newPassword: forgotNewPassword,
                          confirmPassword: forgotConfirmPassword,
                        });
                        setForgotEmail('');
                        setForgotNewPassword('');
                        setForgotConfirmPassword('');
                        setShowForgotPasswordForm(false);
                      } catch (err) {
                        setForgotPasswordError(err.message || 'Password reset failed. Please try again.');
                      } finally {
                        setForgotPasswordLoading(false);
                      }
                    }}
                    style={{ padding: '0.55rem 0.8rem', borderRadius: '0.6rem', border: 'none', background: '#0f766e', color: '#fff', cursor: forgotPasswordLoading ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: forgotPasswordLoading ? 0.8 : 1 }}
                  >
                    {forgotPasswordLoading ? 'Updating...' : 'Update password'}
                  </button>
                </div>
                {forgotPasswordError && <div style={{ color: '#dc2626', fontSize: '0.84rem', fontWeight: 600 }}>{forgotPasswordError}</div>}
              </div>
            )}

            <button
              type="submit"
              disabled={signInLoading}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '0.85rem',
                border: 'none',
                background: 'linear-gradient(120deg, #16a34a, #0f766e)',
                color: '#fff',
                fontWeight: 700,
                cursor: signInLoading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                opacity: signInLoading ? 0.8 : 1,
              }}
            >
              {signInLoading ? 'Signing in...' : `Sign in as ${role === 'admin' ? 'Admin' : 'User'}`}
            </button>

            {signInError && (
              <div style={{ color: '#dc2626', fontSize: '0.9rem', fontWeight: 600 }}>
                {signInError}
              </div>
            )}
          </form>

          <p style={{ marginTop: '1.5rem', color: '#64748b' }}>
            New to Agri-Clinic? <button type="button" onClick={onCreateAccount} style={{ border: 'none', background: 'transparent', color: '#0f766e', cursor: 'pointer', fontWeight: 700 }}>Create an account</button>
          </p>
        </div>
      </div>
    </section>
  );
}

function SignUpSection({ onSignUp, onSignInLink, role = 'user', onRoleChange }) {
  const [signUpError, setSignUpError] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
  const [showCreatorAdminPassword, setShowCreatorAdminPassword] = useState(false);

  return (
    <section
      id="signup"
      style={{
        padding: '4.5rem 2rem 3.5rem',
        background: 'linear-gradient(135deg, #fff7ed 0%, #ecfeff 50%, #f0fdf4 100%)',
      }}
    >
      <div
        className="signup-hero"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(160deg, #0f172a 0%, #14532d 55%, #064e3b 100%)',
            color: '#fff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(250,204,21,0.25), transparent 50%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbf7d0', marginBottom: '1rem' }}>
              Start growing today
            </div>
            <h2
              style={{
                fontSize: '2.4rem',
                lineHeight: 1.1,
                margin: '0 0 1rem 0',
                fontFamily: "'Playfair Display', 'Georgia', serif",
              }}
            >
              Create your
              <br />
              Agri-Clinic account
            </h2>
            <p style={{ margin: 0, color: '#dcfce7', lineHeight: 1.7, maxWidth: '360px' }}>
              Get tailored crop insights, quick ordering, and advisor support tailored to your farm.
            </p>
            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '2rem' }}>
              {[
                { label: 'Faster reorders', detail: 'Save your favorite products for quick checkout.' },
                { label: 'Advisor access', detail: 'Book consultations directly from your dashboard.' },
                { label: 'Smart reminders', detail: 'Never miss the right spray or fertilizer window.' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="floaty"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '0.9rem',
                    padding: '0.85rem 1rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', color: '#d1fae5' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="signup-card"
          style={{
            background: '#fff',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px rgba(15, 23, 42, 0.12)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#0f172a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>Create account</h3>
              <p style={{ margin: '0.4rem 0 0 0', color: '#64748b' }}>Join Agri-Clinic and grow with us.</p>
            </div>
            <div style={{ padding: '0.4rem 0.8rem', background: '#ecfeff', color: '#0f766e', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>
              {role === 'admin' ? 'Admin' : 'Member'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { key: 'user', label: 'User' },
              { key: 'admin', label: 'Admin' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onRoleChange?.(item.key)}
                aria-pressed={role === item.key}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.9rem',
                  borderRadius: '999px',
                  border: `1px solid ${role === item.key ? '#059669' : '#e2e8f0'}`,
                  background: role === item.key ? '#ecfdf5' : '#fff',
                  color: role === item.key ? '#047857' : '#475569',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {item.label} sign up
              </button>
            ))}
          </div>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const name = String(formData.get('name') || '').trim();
              const email = String(formData.get('email') || '').trim();
              const password = String(formData.get('password') || '');
              const confirmPassword = String(formData.get('confirmPassword') || '');
              const creatorAdminEmail = String(formData.get('creatorAdminEmail') || '').trim();
              const creatorAdminPassword = String(formData.get('creatorAdminPassword') || '');

              if (password !== confirmPassword) {
                setSignUpError('Passwords do not match.');
                return;
              }

              if (role === 'admin' && (!creatorAdminEmail || !creatorAdminPassword)) {
                setSignUpError('Existing admin email and password are required to create an admin account.');
                return;
              }

              setSignUpError('');
              setSignUpLoading(true);
              const phone = String(formData.get('phone') || '').trim();

              try {
                await onSignUp?.({ role, name, email, phone, password, creatorAdminEmail, creatorAdminPassword });
              } catch (err) {
                setSignUpError(err.message || 'Sign up failed. Please try again.');
              } finally {
                setSignUpLoading(false);
              }
            }}
            style={{ display: 'grid', gap: '1rem' }}
          >
            <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
              Full name
              <input
                type="text"
                name="name"
                placeholder="Farmer name"
                required
                style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
              Email address
              <input
                type="email"
                name="email"
                placeholder="farmer@example.com"
                required
                style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
              Phone
              <input
                type="tel"
                name="phone"
                placeholder="10-digit phone"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
              Password
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type={showSignUpPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  required
                  style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
                />
                <button
                  type="button"
                  onClick={() => setShowSignUpPassword((prev) => !prev)}
                  style={{ padding: '0.58rem 0.8rem', borderRadius: '0.65rem', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 700, minWidth: '62px' }}
                >
                  {showSignUpPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
              Confirm password
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type={showSignUpConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  required
                  style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
                />
                <button
                  type="button"
                  onClick={() => setShowSignUpConfirmPassword((prev) => !prev)}
                  style={{ padding: '0.58rem 0.8rem', borderRadius: '0.65rem', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 700, minWidth: '62px' }}
                >
                  {showSignUpConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            {role === 'admin' && (
              <>
                <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
                  Existing admin email
                  <input
                    type="email"
                    name="creatorAdminEmail"
                    placeholder="Current admin email"
                    required
                    style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
                  />
                </label>
                <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 600, color: '#0f172a' }}>
                  Existing admin password
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type={showCreatorAdminPassword ? 'text' : 'password'}
                      name="creatorAdminPassword"
                      placeholder="Current admin password"
                      required
                      style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', background: '#fff' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatorAdminPassword((prev) => !prev)}
                      style={{ padding: '0.58rem 0.8rem', borderRadius: '0.65rem', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 700, minWidth: '62px' }}
                    >
                      {showCreatorAdminPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>
              </>
            )}
            {signUpError && (
              <div style={{ color: '#dc2626', fontSize: '0.9rem', fontWeight: 600 }}>
                {signUpError}
              </div>
            )}

            <button
              type="submit"
              disabled={signUpLoading}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '0.85rem',
                border: 'none',
                background: 'linear-gradient(120deg, #16a34a, #0f766e)',
                color: '#fff',
                fontWeight: 700,
                cursor: signUpLoading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                opacity: signUpLoading ? 0.8 : 1,
              }}
            >
              {signUpLoading ? 'Creating account...' : `Create ${role === 'admin' ? 'Admin' : 'User'} account`}
            </button>
          </form>

          <p style={{ marginTop: '1.5rem', color: '#64748b' }}>
            Already have an account? <button type="button" onClick={onSignInLink} style={{ border: 'none', background: 'transparent', color: '#0f766e', cursor: 'pointer', fontWeight: 700 }}>Sign in</button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const CHATBOT_NAME = 'Agri Agent Assistant';
  const DEFAULT_CHAT_GREETING = 'Hi, I am Agri Agent Assistant. Ask me about crops, pests, soil, fertilizers, or irrigation.';
  const GUEST_SESSION_STORAGE_KEY = 'guestChatSessionId';

  const configuredApiOrigin = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim();
  const razorpayKeyId = (import.meta.env.VITE_RAZORPAY_KEY_ID || '').trim();
  const rawGoogleClientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();
  const googleClientId = rawGoogleClientId.includes('your-google-web-client-id.apps.googleusercontent.com') ? '' : rawGoogleClientId;
  const normalizedApiOrigin = configuredApiOrigin ? configuredApiOrigin.replace(/\/+$/, '') : '';
  const apiBaseUrl = normalizedApiOrigin ? `${normalizedApiOrigin}/api` : '/api';

  async function loadRazorpayScript() {
    if (window.Razorpay) {
      return true;
    }

    return new Promise((resolve) => {
      const existing = document.querySelector('script[data-razorpay="checkout"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true), { once: true });
        existing.addEventListener('error', () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.dataset.razorpay = 'checkout';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  function getGuestSessionId() {
    const existing = localStorage.getItem(GUEST_SESSION_STORAGE_KEY);
    if (existing) {
      return existing;
    }

    const generated = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(GUEST_SESSION_STORAGE_KEY, generated);
    return generated;
  }

  async function authRequest(path, payload) {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const body = isJson ? await response.json().catch(() => ({})) : {};

    if (!response.ok) {
      throw new Error(body.message || 'Authentication failed');
    }

    if (!body?.token || !body?.user?.id || !body?.user?.role) {
      throw new Error('Authentication service is not connected. Check backend API URL and redeploy frontend.');
    }

    return body;
  }

  const applyAuthSuccess = (data) => {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(data.user));
    setCurrentUser(data.user);
    setShowProfileMenu(false);
    setShowSignIn(false);
    setShowSignUp(false);
    setShowDiseaseDetection(false);
    setShowUserDashboard(false);

    if (data.user?.role === 'admin') {
      setShowAdminDashboard(true);
    } else {
      setShowAdminDashboard(false);
      setActiveSection('home');
    }
  };

  async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('authToken');
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const body = isJson ? await response.json().catch(() => ({})) : {};

    if (!response.ok) {
      const error = new Error(body.message || 'Request failed');
      error.code = body?.code;
      error.details = body;
      throw error;
    }

    return body;
  }

  const handleGoogleContinue = () => {
    if (!googleClientId) {
      showToast('Google sign-in is not configured. Set a real VITE_GOOGLE_CLIENT_ID in frontend/.env and restart Vite.', 'error');
      return;
    }

    if (!window.google?.accounts?.id) {
      showToast('Google sign-in is loading. Please try again in a moment.', 'error');
      return;
    }

    // Triggers Google account chooser popup when the user clicks the custom button.
    window.google.accounts.id.prompt();
  };

  const handleGoogleCredential = async (credential) => {
    if (!credential) {
      return;
    }

    try {
      const data = await authRequest('/auth/google', { credential });
      applyAuthSuccess(data);
      showToast('Signed in with Google successfully.');
    } catch (err) {
      showToast(err.message || 'Google sign-in failed.', 'error');
    }
  };

  function getStoredUser() {
    try {
      const raw = localStorage.getItem('authUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  const [productsData, setProductsData] = useState(products);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signInRole, setSignInRole] = useState('user');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminOrderStats, setAdminOrderStats] = useState({ totalOrders: 0, totalBuyers: 0 });
  const [adminOrdersLoading, setAdminOrdersLoading] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState('');
  const [confirmOrderDeleteId, setConfirmOrderDeleteId] = useState('');
  const [userOrders, setUserOrders] = useState([]);
  const [userOrdersLoading, setUserOrdersLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [heroIndex, setHeroIndex] = useState(0);
  const [nextHeroIndex, setNextHeroIndex] = useState(1);
  const [isHeroFading, setIsHeroFading] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adminProductForm, setAdminProductForm] = useState({
    name: '',
    category: 'Pesticide',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
    brand: '',
    type: '',
    ingredients: '',
    usageInstructions: '',
    precautions: '',
  });
  const [adminEditId, setAdminEditId] = useState(null);
  const [adminShowAllProducts, setAdminShowAllProducts] = useState(false);
  const [adminProductSearch, setAdminProductSearch] = useState('');
  const [adminProductCategory, setAdminProductCategory] = useState('all');
  const [appointmentForm, setAppointmentForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    date: '',
    time: '',
    service: 'Soil & Crop Advisory',
    contactMethod: 'Phone',
    farmSize: '1-5 acres',
    location: '',
    message: '',
  });
  const serviceOptions = ['Soil & Crop Advisory', 'Pest & Disease Support', 'Fertilizer Planning', 'General Consultation'];
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState('');
  const [confirmAppointmentDeleteId, setConfirmAppointmentDeleteId] = useState('');
  const [appointmentSubmitting, setAppointmentSubmitting] = useState(false);
  const [showDiseaseDetection, setShowDiseaseDetection] = useState(false);
  const [diseaseImage, setDiseaseImage] = useState(null);
  const [diseaseImageFile, setDiseaseImageFile] = useState(null);
  const [isDiseaseDropActive, setIsDiseaseDropActive] = useState(false);
  const [predictedDisease, setPredictedDisease] = useState(null);
  const [detectionLoading, setDetectionLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistoryClearing, setChatHistoryClearing] = useState(false);
  const [guestPromptsRemaining, setGuestPromptsRemaining] = useState(null);
  const [toast, setToast] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: DEFAULT_CHAT_GREETING,
    },
  ]);
  const heroCycleRef = useRef(null);
  const heroSwitchRef = useRef(null);
  const productGridRef = useRef(null);
  const recommendedRef = useRef(null);
  const diseaseFileInputRef = useRef(null);
  const profileMenuRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const guestSessionIdRef = useRef(getGuestSessionId());
  const toastTimeoutRef = useRef(null);

  const showToast = (message, type = 'success') => {
    if (!message) {
      return;
    }

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({
      id: Date.now(),
      message,
      type,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 3200);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!googleClientId) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    const init = () => {
      if (!window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response) => {
          handleGoogleCredential(response?.credential || '');
        },
        auto_select: false,
        cancel_on_tap_outside: false,
      });
    };

    script.onload = init;
    init();

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [googleClientId]);

  useEffect(() => {
    let loaded = 0;
    heroImages.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded += 1;
        if (loaded === heroImages.length) {
          setHeroReady(true);
        }
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!heroReady) {
      return undefined;
    }

    heroCycleRef.current = setTimeout(() => {
      const next = (heroIndex + 1) % heroImages.length;
      setNextHeroIndex(next);
      setIsHeroFading(true);

      heroSwitchRef.current = setTimeout(() => {
        setHeroIndex(next);
        setIsHeroFading(false);
      }, 800);
    }, 3500);

    return () => {
      clearTimeout(heroCycleRef.current);
      clearTimeout(heroSwitchRef.current);
    };
  }, [heroIndex, heroReady]);

  useEffect(() => {
    if (showSignIn) {
      requestAnimationFrame(() => scrollToSection('signin'));
    }
  }, [showSignIn]);

  useEffect(() => {
    if (showSignUp) {
      requestAnimationFrame(() => scrollToSection('signup'));
    }
  }, [showSignUp]);

  useEffect(() => {
    setAppointmentForm((prev) => ({
      ...prev,
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || prev.phone || '',
    }));
  }, [currentUser]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isChatOpen) {
      return;
    }

    const loadHistory = async () => {
      try {
        const data = await apiRequest('/chat/history', {
          method: 'GET',
          headers: currentUser ? undefined : { 'x-guest-session-id': guestSessionIdRef.current },
        });

        const mapped = (data.messages || []).flatMap((item) => [
          { role: 'user', text: item.question },
          { role: 'assistant', text: item.answer },
        ]);

        if (mapped.length > 0) {
          setChatMessages(mapped);
        } else {
          setChatMessages([{ role: 'assistant', text: DEFAULT_CHAT_GREETING }]);
        }

        if (!currentUser && typeof data.guestPromptsRemaining === 'number') {
          setGuestPromptsRemaining(data.guestPromptsRemaining);
        }

        if (currentUser) {
          setGuestPromptsRemaining(null);
        }
      } catch {
        setChatMessages([{ role: 'assistant', text: DEFAULT_CHAT_GREETING }]);
      }
    };

    loadHistory();
  }, [isChatOpen, currentUser, DEFAULT_CHAT_GREETING]);

  useEffect(() => {
    setChatMessages([{ role: 'assistant', text: DEFAULT_CHAT_GREETING }]);
    if (currentUser) {
      setGuestPromptsRemaining(null);
    }
  }, [currentUser, DEFAULT_CHAT_GREETING]);

  useEffect(() => {
    if (isChatOpen) {
      requestAnimationFrame(() => {
        chatMessagesRef.current?.scrollTo({ top: chatMessagesRef.current.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    const fetchAdminOrders = async () => {
      if (!showAdminDashboard || currentUser?.role !== 'admin') {
        return;
      }

      setAdminOrdersLoading(true);
      try {
        const data = await apiRequest('/orders/admin', { method: 'GET' });
        setAdminOrders(data.orders || []);
        setAdminOrderStats({
          totalOrders: data.totalOrders || 0,
          totalBuyers: data.totalBuyers || 0,
        });
      } catch (err) {
        showToast(err.message || 'Failed to load admin orders', 'error');
      } finally {
        setAdminOrdersLoading(false);
      }
    };

    fetchAdminOrders();
  }, [showAdminDashboard, currentUser?.role]);

  useEffect(() => {
    const fetchAdminAppointments = async () => {
      if (!showAdminDashboard || currentUser?.role !== 'admin') {
        return;
      }

      setAppointmentsLoading(true);
      try {
        const data = await apiRequest('/appointments/admin', { method: 'GET' });
        setAppointments(data.appointments || []);
      } catch (err) {
        showToast(err.message || 'Failed to load appointments', 'error');
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAdminAppointments();
  }, [showAdminDashboard, currentUser?.role]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!showUserDashboard || currentUser?.role !== 'user') {
        return;
      }

      setUserOrdersLoading(true);
      try {
        const data = await apiRequest('/orders/my', { method: 'GET' });
        setUserOrders(data.orders || []);
      } catch (err) {
        showToast(err.message || 'Failed to load your orders', 'error');
      } finally {
        setUserOrdersLoading(false);
      }
    };

    fetchUserOrders();
  }, [showUserDashboard, currentUser?.role]);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setShowCart(false);
      setCart({});
    }
  }, [currentUser?.role]);

  useEffect(() => {
    if (currentUser?.role === 'admin' && showDiseaseDetection) {
      setShowDiseaseDetection(false);
      setPredictedDisease(null);
      setDiseaseImage(null);
      setDiseaseImageFile(null);
    }
  }, [currentUser?.role, showDiseaseDetection]);

  const handleOpenDashboard = () => {
    setShowProfileMenu(false);
    setShowSignIn(false);
    setShowSignUp(false);
    setShowDiseaseDetection(false);

    if (currentUser?.role === 'admin') {
      setShowUserDashboard(false);
      setShowAdminDashboard(true);
      return;
    }

    setShowAdminDashboard(false);
    setShowUserDashboard(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setCurrentUser(null);
    setAdminOrders([]);
    setAdminOrderStats({ totalOrders: 0, totalBuyers: 0 });
    setUserOrders([]);
    setDeletingOrderId('');
    setDeletingAppointmentId('');
    setConfirmOrderDeleteId('');
    setConfirmAppointmentDeleteId('');
    setShowProfileMenu(false);
    setShowAdminDashboard(false);
    setShowUserDashboard(false);
    setShowDiseaseDetection(false);
    setShowSignIn(false);
    setShowSignUp(false);
    setActiveSection('home');
    setChatMessages([{ role: 'assistant', text: DEFAULT_CHAT_GREETING }]);
    setGuestPromptsRemaining(null);
    showToast('Logged out successfully.');
  };

  const categories = useMemo(() => ['all', ...Array.from(new Set(productsData.map((p) => p.category)))], [productsData]);
  const categoryStats = useMemo(() => {
    const counts = productsData.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'all', count: productsData.length },
      ...Array.from(new Set(productsData.map((p) => p.category))).map((name) => ({
        name,
        count: counts[name] || 0,
      })),
    ];
  }, [productsData]);

  const filtered = productsData.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const visibleProducts = useMemo(() => {
    if (sortBy === 'featured') {
      return filtered;
    }

    const sorted = [...filtered];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'stock-desc':
        sorted.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return sorted;
  }, [filtered, sortBy]);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = productsData.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const addToCart = (productId) => {
    if (currentUser?.role === 'admin') {
      handleOpenDashboard();
      return;
    }

    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleBuyNow = (productId) => {
    if (currentUser?.role === 'admin') {
      handleOpenDashboard();
      return;
    }

    addToCart(productId);
    setShowCart(true);
  };
  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      setCart((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    } else {
      setCart((prev) => ({
        ...prev,
        [productId]: qty,
      }));
    }
  };

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ ...productsData.find((p) => p.id === id), quantity: qty }))
    .filter(Boolean);

  const handleCheckout = async () => {
    if (currentUser?.role === 'admin') {
      showToast('Admin account cannot checkout. Switch to a user account to buy products.', 'error');
      return;
    }

    if (!currentUser) {
      showToast('Please sign in to place an order.', 'error');
      setShowSignIn(true);
      setShowSignUp(false);
      setShowDiseaseDetection(false);
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    if (!razorpayKeyId) {
      showToast('Razorpay is not configured. Missing VITE_RAZORPAY_KEY_ID.', 'error');
      return;
    }

    const payload = {
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price || 0),
      })),
    };

    setCheckoutLoading(true);
    try {
      const orderInit = await apiRequest('/orders/razorpay/order', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const scriptReady = await loadRazorpayScript();
      if (!scriptReady || !window.Razorpay) {
        throw new Error('Unable to load Razorpay checkout. Please try again.');
      }

      const razorpay = new window.Razorpay({
        key: orderInit.keyId || razorpayKeyId,
        amount: orderInit.amount,
        currency: orderInit.currency,
        name: 'Agri-Clinic',
        description: `Order payment (${cartItems.length} item${cartItems.length > 1 ? 's' : ''})`,
        order_id: orderInit.razorpayOrderId,
        prefill: {
          name: currentUser?.name || '',
          email: currentUser?.email || '',
          contact: currentUser?.phone || '',
        },
        theme: {
          color: '#0f766e',
        },
        modal: {
          ondismiss: () => {
            setCheckoutLoading(false);
            showToast('Payment cancelled.', 'error');
          },
        },
        handler: async (paymentResponse) => {
          try {
            await apiRequest('/orders/razorpay/verify', {
              method: 'POST',
              body: JSON.stringify({
                ...payload,
                ...paymentResponse,
              }),
            });

            showToast('Payment successful. Order placed successfully.');
            setCart({});
            setShowCart(false);
          } catch (err) {
            showToast(err.message || 'Payment verification failed. Please contact support.', 'error');
          } finally {
            setCheckoutLoading(false);
          }
        },
      });

      razorpay.on('payment.failed', (response) => {
        const reason = response?.error?.description || 'Payment failed. Please try again.';
        showToast(reason, 'error');
        setCheckoutLoading(false);
      });

      razorpay.open();
    } catch (err) {
      setCheckoutLoading(false);
      showToast(err.message || 'Failed to place order', 'error');
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const exploreCategories = [
    {
      key: 'Pesticide',
      title: 'Pesticides',
      description: 'Protect crops from insects and pests.',
      imageUrl: 'https://www.shutterstock.com/image-vector/green-pesticides-free-symbol-label-260nw-2259153615.jpg',
    },
    {
      key: 'Herbicide',
      title: 'Herbicides',
      description: 'Control weeds with targeted action.',
      imageUrl: 'https://cdn-icons-png.freepik.com/256/15256/15256329.png?semt=ais_white_label',
    },
    {
      key: 'Fungicide',
      title: 'Fungicides',
      description: 'Prevent and treat fungal diseases.',
      imageUrl: 'https://www.shutterstock.com/image-vector/icon-symbol-antifungal-agents-products-260nw-1954263949.jpg',
    },
    {
      key: 'Fertilizer',
      title: 'Fertilizers',
      description: 'Nourish crops with balanced nutrients.',
      imageUrl: 'https://img.icons8.com/external-filled-color-icons-papa-vector/1200/external-Organic-Fertilizer-fertilizers-filled-color-icons-papa-vector-2.jpg',
    },
  ];

  const handleExploreCategory = (nextCategory) => {
    setCategory(nextCategory);
    setSortBy('featured');
    setQuery('');
    requestAnimationFrame(() => {
      productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const getProblemLabel = (product) => {
    if (!product) {
      return '';
    }

    switch (product.category) {
      case 'Pesticide':
        return 'Pest and insect infestations in crops.';
      case 'Herbicide':
        return 'Unwanted weeds competing with crops.';
      case 'Fungicide':
        return 'Fungal diseases affecting leaves, stems, or soil.';
      case 'Fertilizer':
        return 'Nutrient deficiency and low crop vigor.';
      default:
        return 'General crop protection and productivity support.';
    }
  };

  const getUsageSteps = (product) => {
    if (!product) {
      return [];
    }

    return [
      {
        title: 'Prepare',
        detail: 'Read the label and measure the correct dose for your crop and area.',
      },
      {
        title: 'Apply',
        detail: product.usageInstructions,
      },
      {
        title: 'Monitor',
        detail: product.precautions,
      },
    ];
  };

  const handleAppointmentChange = (event) => {
    const { name, value } = event.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAppointmentSubmit = async (event) => {
    event.preventDefault();

    if (currentUser?.role === 'admin') {
      showToast('Appointment booking is available for users only.', 'error');
      return;
    }

    if (!currentUser) {
      showToast('Please sign in to book an appointment.', 'error');
      setShowSignIn(true);
      setShowSignUp(false);
      setShowDiseaseDetection(false);
      return;
    }

    setAppointmentSubmitting(true);
    try {
      const data = await apiRequest('/appointments', {
        method: 'POST',
        body: JSON.stringify(appointmentForm),
      });

      setAppointments((prev) => [data.appointment, ...prev]);
      setAppointmentSubmitted(true);
      setAppointmentForm({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        email: currentUser?.email || '',
        date: '',
        time: '',
        service: 'Soil & Crop Advisory',
        contactMethod: 'Phone',
        farmSize: '1-5 acres',
        location: '',
        message: '',
      });
    } catch (err) {
      showToast(err.message || 'Failed to submit appointment', 'error');
    } finally {
      setAppointmentSubmitting(false);
    }
  };

  const handleAdminDeleteOrder = async (orderId) => {
    if (!orderId) {
      return;
    }

    if (confirmOrderDeleteId !== orderId) {
      setConfirmOrderDeleteId(orderId);
      showToast('Tap delete again to confirm order removal.', 'error');
      return;
    }

    setConfirmOrderDeleteId('');
    setDeletingOrderId(orderId);
    try {
      await apiRequest(`/orders/admin/${orderId}`, { method: 'DELETE' });
      setAdminOrders((prev) => {
        const nextOrders = prev.filter((item) => item._id !== orderId);
        setAdminOrderStats({
          totalOrders: nextOrders.length,
          totalBuyers: new Set(nextOrders.map((item) => String(item.user))).size,
        });
        return nextOrders;
      });
      showToast('Order deleted successfully.');
    } catch (err) {
      showToast(err.message || 'Failed to delete order', 'error');
    } finally {
      setDeletingOrderId('');
    }
  };

  const handleAdminDeleteAppointment = async (appointmentId) => {
    if (!appointmentId) {
      return;
    }

    const appointmentKey = String(appointmentId);
    if (confirmAppointmentDeleteId !== appointmentKey) {
      setConfirmAppointmentDeleteId(appointmentKey);
      showToast('Tap delete again to confirm appointment removal.', 'error');
      return;
    }

    setConfirmAppointmentDeleteId('');
    setDeletingAppointmentId(appointmentKey);
    try {
      await apiRequest(`/appointments/admin/${appointmentId}`, { method: 'DELETE' });
      setAppointments((prev) => prev.filter((item) => String(item._id || item.id) !== appointmentKey));
      showToast('Appointment deleted successfully.');
    } catch (err) {
      showToast(err.message || 'Failed to delete appointment', 'error');
    } finally {
      setDeletingAppointmentId('');
    }
  };

  const pendingAppointments = useMemo(
    () => appointments.filter((item) => item.status === 'pending'),
    [appointments],
  );

  const handleAdminProductChange = (event) => {
    const { name, value } = event.target;
    setAdminProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminProductSubmit = (event) => {
    event.preventDefault();

    const nextId = adminEditId || `prod-${Date.now()}`;
    const priceValue = Number.parseFloat(adminProductForm.price || 0);
    const stockValue = Number.parseInt(adminProductForm.stock || 0, 10);

    const nextProduct = {
      id: nextId,
      name: adminProductForm.name.trim() || 'New product',
      category: adminProductForm.category,
      price: Number.isFinite(priceValue) ? priceValue : 0,
      stock: Number.isFinite(stockValue) ? stockValue : 0,
      imageUrl: adminProductForm.imageUrl.trim() || 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=60',
      description: adminProductForm.description.trim() || 'New product added by admin.',
      brand: adminProductForm.brand.trim() || 'Agri-Clinic',
      type: adminProductForm.type.trim() || 'General',
      ingredients: adminProductForm.ingredients.trim() || 'N/A',
      usageInstructions: adminProductForm.usageInstructions.trim() || 'Follow label instructions.',
      precautions: adminProductForm.precautions.trim() || 'Wear protective gear during application.',
    };

    setProductsData((prev) => {
      if (adminEditId) {
        return prev.map((item) => (item.id === adminEditId ? nextProduct : item));
      }
      return [nextProduct, ...prev];
    });
    setAdminProductForm({
      name: '',
      category: 'Pesticide',
      price: '',
      stock: '',
      imageUrl: '',
      description: '',
      brand: '',
      type: '',
      ingredients: '',
      usageInstructions: '',
      precautions: '',
    });
    setAdminEditId(null);
    setCategory('all');
    setQuery('');
    setSortBy('featured');
  };

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question || chatLoading) {
      return;
    }

    if (!currentUser && guestPromptsRemaining === 0) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'You reached the free guest chat limit. Please sign in to continue chatting.',
        },
      ]);
      return;
    }

    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: question }]);
    setChatLoading(true);

    try {
      const data = await apiRequest('/chat/ask', {
        method: 'POST',
        headers: currentUser ? undefined : { 'x-guest-session-id': guestSessionIdRef.current },
        body: JSON.stringify({ question }),
      });

      setChatMessages((prev) => [...prev, { role: 'assistant', text: data.answer || 'No response received.' }]);
      if (!currentUser && typeof data.guestPromptsRemaining === 'number') {
        setGuestPromptsRemaining(data.guestPromptsRemaining);
      }
    } catch (err) {
      if (!currentUser && err?.code === 'GUEST_PROMPT_LIMIT_EXCEEDED') {
        setGuestPromptsRemaining(0);
      }
      setChatMessages((prev) => [...prev, { role: 'assistant', text: err.message || 'Failed to get response.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleClearChatHistory = async () => {
    if (chatHistoryClearing || chatLoading) {
      return;
    }

    const hasHistory = chatMessages.some((message) => message.role === 'user');
    if (!hasHistory) {
      showToast('No chat history to delete.', 'error');
      return;
    }

    setChatHistoryClearing(true);
    try {
      const data = await apiRequest('/chat/history', {
        method: 'DELETE',
        headers: currentUser ? undefined : { 'x-guest-session-id': guestSessionIdRef.current },
      });

      setChatMessages([{ role: 'assistant', text: DEFAULT_CHAT_GREETING }]);
      setChatInput('');
      if (!currentUser && typeof data.guestPromptsRemaining === 'number') {
        setGuestPromptsRemaining(data.guestPromptsRemaining);
      }
      showToast('Chat history deleted.');
    } catch (err) {
      showToast(err.message || 'Failed to delete chat history.', 'error');
    } finally {
      setChatHistoryClearing(false);
    }
  };

  const handleAdminEditSelect = (product) => {
    setAdminEditId(product.id);
    setAdminShowAllProducts(true);
    setAdminProductForm({
      name: product.name || '',
      category: product.category || 'Pesticide',
      price: `${product.price ?? ''}`,
      stock: `${product.stock ?? ''}`,
      imageUrl: product.imageUrl || '',
      description: product.description || '',
      brand: product.brand || '',
      type: product.type || '',
      ingredients: product.ingredients || '',
      usageInstructions: product.usageInstructions || '',
      precautions: product.precautions || '',
    });
  };

  const handleAdminEditCancel = () => {
    setAdminEditId(null);
    setAdminShowAllProducts(false);
    setAdminProductSearch('');
    setAdminProductCategory('all');
    setAdminProductForm({
      name: '',
      category: 'Pesticide',
      price: '',
      stock: '',
      imageUrl: '',
      description: '',
      brand: '',
      type: '',
      ingredients: '',
      usageInstructions: '',
      precautions: '',
    });
  };

  const locationOptions = ['Pune', 'Nashik', 'Nagpur', 'Kolhapur', 'Sangli', 'Satara', 'Ahmednagar', 'Solapur', 'Amravati', 'Aurangabad'];
  const todayISO = new Date().toISOString().split('T')[0];
  const isAdminUser = currentUser?.role === 'admin';
  const isAuthPage = showSignIn || showSignUp;
  const canUseDiseaseDetection = currentUser?.role === 'user';
  const showDiseasePage = showDiseaseDetection && canUseDiseaseDetection;
  const showTopNavigation = !showAdminDashboard && !showUserDashboard;
  const showFullPage = !showSignIn && !showSignUp && !showAdminDashboard && !showUserDashboard && !showDiseasePage;

  const adminFilteredProducts = useMemo(() => {
    const needle = adminProductSearch.trim().toLowerCase();
    return productsData.filter((item) => {
      const matchesCategory = adminProductCategory === 'all' || item.category === adminProductCategory;
      const matchesText = !needle || item.name.toLowerCase().includes(needle);
      return matchesCategory && matchesText;
    });
  }, [adminProductSearch, adminProductCategory, productsData]);

  const processDiseaseFile = (file) => {
    if (!file) {
      return;
    }

    if (!String(file.type || '').startsWith('image/')) {
      showToast('Please upload an image file only (PNG, JPG, JPEG).', 'error');
      return;
    }

    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      showToast('Image is too large. Please choose a file up to 10MB.', 'error');
      return;
    }

    setDiseaseImageFile(file);
    setPredictedDisease(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setDiseaseImage(e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDiseaseImageUpload = (event) => {
    const file = event.target.files?.[0];
    processDiseaseFile(file);
  };

  const handleDiseaseDrop = (event) => {
    event.preventDefault();
    setIsDiseaseDropActive(false);
    const file = event.dataTransfer?.files?.[0];
    processDiseaseFile(file);
  };

  const handleDiseaseDragOver = (event) => {
    event.preventDefault();
    setIsDiseaseDropActive(true);
  };

  const handleDiseaseDragLeave = (event) => {
    event.preventDefault();
    setIsDiseaseDropActive(false);
  };

  const openDiseaseFilePicker = () => {
    diseaseFileInputRef.current?.click();
  };

  const predictPlantDisease = async () => {
    if (!diseaseImageFile) return;

    setDetectionLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', diseaseImageFile);

      const data = await apiRequest('/disease/predict', {
        method: 'POST',
        body: formData,
      });

      if (!data?.disease) {
        throw new Error('Prediction service returned an empty result.');
      }

      setPredictedDisease(data.disease);
    } catch (error) {
      console.error('Disease prediction error:', error);
      showToast(error.message || 'Failed to predict disease. Please try again.', 'error');
    } finally {
      setDetectionLoading(false);
    }
  };

  const recommendedProducts = useMemo(() => {
    if (!predictedDisease) return [];
    
    const categoryMap = {
      'Fungicide': 'Fungicide',
      'Pesticide': 'Pesticide',
    };

    const recommendedCategories = predictedDisease.recommendations.map((rec) => categoryMap[rec]).filter(Boolean);
    
    return productsData.filter((product) => recommendedCategories.includes(product.category)).slice(0, 4);
  }, [predictedDisease, productsData]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {toast && (
        <div key={toast.id} className={`app-toast app-toast--${toast.type}`} role="status" aria-live="polite">
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss notification"
            className="app-toast__close"
          >
            X
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      {showTopNavigation && (
        <nav style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#059669', fontWeight: 700, cursor: 'pointer' }} onClick={() => scrollToSection('home')}>
              🌾 Agri-Clinic
            </h1>

            {!isAuthPage && (
              <>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {!showDiseasePage && (
                    <>
                      <button onClick={() => scrollToSection('home')} style={{ background: 'none', border: 'none', color: activeSection === 'home' ? '#059669' : '#6b7280', fontWeight: activeSection === 'home' ? 700 : 500, cursor: 'pointer', fontSize: '1rem' }}>Home</button>
                      <button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', color: activeSection === 'about' ? '#059669' : '#6b7280', fontWeight: activeSection === 'about' ? 700 : 500, cursor: 'pointer', fontSize: '1rem' }}>About Us</button>
                      <button onClick={() => scrollToSection('explore')} style={{ background: 'none', border: 'none', color: activeSection === 'explore' ? '#059669' : '#6b7280', fontWeight: activeSection === 'explore' ? 700 : 500, cursor: 'pointer', fontSize: '1rem' }}>Explore</button>
                      <button onClick={() => scrollToSection('reviews')} style={{ background: 'none', border: 'none', color: activeSection === 'reviews' ? '#059669' : '#6b7280', fontWeight: activeSection === 'reviews' ? 700 : 500, cursor: 'pointer', fontSize: '1rem' }}>Reviews</button>
                      <button onClick={() => scrollToSection('gallery')} style={{ background: 'none', border: 'none', color: activeSection === 'gallery' ? '#059669' : '#6b7280', fontWeight: activeSection === 'gallery' ? 700 : 500, cursor: 'pointer', fontSize: '1rem' }}>Gallery</button>
                      <button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', color: activeSection === 'contact' ? '#059669' : '#6b7280', fontWeight: activeSection === 'contact' ? 700 : 500, cursor: 'pointer', fontSize: '1rem' }}>Contact</button>
                    </>
                  )}
                  {!isAdminUser && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentUser) {
                          showToast('Sign in to check disease.', 'error');
                          return;
                        }

                        setShowDiseaseDetection(true);
                        setShowSignIn(false);
                        setShowSignUp(false);
                        setShowAdminDashboard(false);
                        setActiveSection('disease');
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.9rem',
                        borderRadius: '999px',
                        border: activeSection === 'disease' ? '1px solid #0f766e' : '1px solid #99f6e4',
                        background: activeSection === 'disease' ? 'linear-gradient(120deg, #0f766e, #059669)' : 'linear-gradient(120deg, #ecfeff, #f0fdf4)',
                        color: activeSection === 'disease' ? '#fff' : '#0f766e',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.92rem',
                        boxShadow: activeSection === 'disease' ? '0 8px 18px rgba(15, 118, 110, 0.28)' : 'none',
                      }}
                    >
                      <span style={{ fontSize: '1rem', lineHeight: 1 }}>🔍</span>
                      Disease Check
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifySelf: 'end' }}>
                  {currentUser ? (
                    <div ref={profileMenuRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.35rem 0.7rem 0.35rem 0.35rem',
                    borderRadius: '999px',
                    border: '1px solid #059669',
                    background: '#ecfdf5',
                    color: '#047857',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {String(currentUser?.name || currentUser?.email || 'U').trim().charAt(0).toUpperCase()}
                  </span>
                  <span>{currentUser?.name || 'User'}</span>
                  <span style={{ fontSize: '0.75rem' }}>▾</span>
                </button>

                {showProfileMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 0.5rem)',
                      right: 0,
                      minWidth: '170px',
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
                      padding: '0.4rem',
                      zIndex: 120,
                    }}
                  >
                    <div style={{ padding: '0.45rem 0.6rem', color: '#64748b', fontSize: '0.83rem' }}>{currentUser?.email}</div>
                    <button
                      type="button"
                      onClick={handleOpenDashboard}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem 0.6rem',
                        border: 'none',
                        borderRadius: '0.55rem',
                        background: '#fff',
                        color: '#0f172a',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem 0.6rem',
                        border: 'none',
                        borderRadius: '0.55rem',
                        background: '#fff',
                        color: '#b91c1c',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowDiseaseDetection(false);
                        setShowAdminDashboard(false);
                        setShowSignUp(false);
                        setSignInRole('user');
                        setShowSignIn(true);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        border: '1px solid #059669',
                        background: '#ecfdf5',
                        color: '#047857',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                      }}
                    >
                      Account
                    </button>
                  )}
                  {!isAdminUser && (
                    <button
                      type="button"
                      onClick={() => setShowCart(!showCart)}
                      style={{
                        position: 'relative',
                        padding: '0.6rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#059669',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '1rem',
                      }}
                    >
                      🛒
                      {cartCount > 0 && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#dc2626',
                            color: '#fff',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                          }}
                        >
                          {cartCount}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      )}

      {showSignIn && (
        <SignInSection
          role={signInRole}
          onRoleChange={setSignInRole}
          onGoogleContinue={handleGoogleContinue}
          googleClientId={googleClientId}
          onReturnToSite={() => {
            setShowSignIn(false);
            setShowSignUp(false);
            setShowDiseaseDetection(false);
            setShowAdminDashboard(false);
            setShowUserDashboard(false);
            setActiveSection('home');
            requestAnimationFrame(() => scrollToSection('home'));
          }}
          onCreateAccount={() => {
            setShowSignIn(false);
            setShowDiseaseDetection(false);
            setShowSignUp(true);
          }}
          onSignIn={async ({ role, email, password }) => {
            const data = await authRequest('/auth/login', { email, password, role });
            applyAuthSuccess(data);
            showToast('You are signed in.');
          }}
          onForgotPassword={async ({ email, newPassword, confirmPassword }) => {
            await apiRequest('/auth/forgot-password', {
              method: 'POST',
              body: JSON.stringify({ email, newPassword, confirmPassword }),
            });
            showToast('Password reset successful. Please sign in with your new password.');
          }}
        />
      )}

      {showSignUp && (
        <SignUpSection
          role={signInRole}
          onRoleChange={setSignInRole}
          onSignInLink={() => {
            setShowSignUp(false);
            setShowDiseaseDetection(false);
            setShowSignIn(true);
          }}
          onSignUp={async ({ role, name, email, phone, password, creatorAdminEmail, creatorAdminPassword }) => {
            const data = await authRequest('/auth/signup', {
              name,
              email,
              phone,
              password,
              role,
              creatorAdminEmail,
              creatorAdminPassword,
            });
            if (!data?.user?.id) {
              throw new Error('Signup failed. Please try again.');
            }

            showToast('Account created successfully. Please sign in.');
            setShowSignUp(false);
            setShowSignIn(true);
            setShowDiseaseDetection(false);
            setShowAdminDashboard(false);
            setShowUserDashboard(false);
            setShowProfileMenu(false);
            setSignInRole(role || 'user');
          }}
        />
      )}

      {showAdminDashboard && (
        <section
          style={{
            padding: '4rem 2rem',
            background: 'linear-gradient(120deg, #0f172a, #134e4a)',
            color: '#fff',
            minHeight: '70vh',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5eead4', marginBottom: '0.6rem' }}>
                  Admin console
                </div>
                <h2 style={{ margin: 0, fontSize: '2.4rem', fontFamily: "'Playfair Display', 'Georgia', serif" }}>Agri-Clinic Dashboard</h2>
                <p style={{ margin: '0.6rem 0 0', color: '#cbd5f5' }}>Review orders, inventory, and advisor requests in one place.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAdminDashboard(false);
                  setActiveSection('home');
                }}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Return to site
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Total Orders', value: `${adminOrderStats.totalOrders}`, note: 'Orders from all users' },
                { title: 'Total Buyers', value: `${adminOrderStats.totalBuyers}`, note: 'Unique customers' },
                { title: 'Appointments Pending', value: `${pendingAppointments.length}`, note: 'New requests' },
              ].map((item) => (
                <div key={item.title} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div style={{ fontSize: '0.9rem', color: '#bbf7d0', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{item.title}</div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{item.value}</div>
                  <div style={{ color: '#e2e8f0' }}>{item.note}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', background: 'rgba(15,23,42,0.6)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Customer Orders</h3>
                <div style={{ color: '#cbd5f5', fontSize: '0.9rem' }}>Total: {adminOrderStats.totalOrders}</div>
              </div>

              {adminOrdersLoading ? (
                <div style={{ color: '#94a3b8' }}>Loading orders...</div>
              ) : adminOrders.length === 0 ? (
                <div style={{ color: '#94a3b8' }}>No customer orders yet.</div>
              ) : (
                <div style={{ display: 'grid', gap: '0.6rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.4rem' }}>
                  {adminOrders.map((order) => (
                    <div key={order._id} style={{ display: 'grid', gap: '0.35rem', background: 'rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>{order.userSnapshot?.name || 'Customer'}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <span style={{ padding: '0.2rem 0.7rem', borderRadius: '999px', background: 'rgba(16,185,129,0.2)', color: '#bbf7d0', fontWeight: 700, fontSize: '0.75rem' }}>{order.status || 'placed'}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmAppointmentDeleteId('');
                              handleAdminDeleteOrder(order._id);
                            }}
                            disabled={deletingOrderId === order._id}
                            style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: '999px',
                              border: '1px solid rgba(248,113,113,0.65)',
                              background: 'rgba(127,29,29,0.3)',
                              color: '#fecaca',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              cursor: deletingOrderId === order._id ? 'not-allowed' : 'pointer',
                              opacity: deletingOrderId === order._id ? 0.75 : 1,
                            }}
                          >
                            {deletingOrderId === order._id ? 'Deleting...' : confirmOrderDeleteId === order._id ? 'Confirm' : 'Delete'}
                          </button>
                        </div>
                      </div>
                      <div style={{ color: '#cbd5f5', fontSize: '0.9rem' }}>{order.userSnapshot?.email || 'No email'} · {order.userSnapshot?.phone || 'No phone'}</div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                        {order.items?.map((item) => `${item.name} x${item.quantity}`).join(', ')}
                      </div>
                      <div style={{ color: '#fde68a', fontSize: '0.9rem', fontWeight: 700 }}>
                        INR {Number(order.totalAmount || 0).toFixed(2)} · {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '2rem', background: 'rgba(15,23,42,0.6)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Appointments Received</h3>
                <div style={{ color: '#cbd5f5', fontSize: '0.9rem' }}>Pending: {pendingAppointments.length}</div>
              </div>
              {appointmentsLoading ? (
                <div style={{ color: '#94a3b8' }}>Loading appointments...</div>
              ) : appointments.length === 0 ? (
                <div style={{ color: '#94a3b8' }}>No appointment requests yet.</div>
              ) : (
                <div style={{ display: 'grid', gap: '0.6rem', maxHeight: '220px', overflowY: 'auto', paddingRight: '0.4rem' }}>
                  {appointments.map((item) => (
                    <div key={item._id || item.id} style={{ display: 'grid', gap: '0.35rem', background: 'rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>{item.name || 'Farmer'}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <span style={{ padding: '0.2rem 0.7rem', borderRadius: '999px', background: 'rgba(250,204,21,0.2)', color: '#fde68a', fontWeight: 700, fontSize: '0.75rem' }}>{item.status}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmOrderDeleteId('');
                              handleAdminDeleteAppointment(item._id || item.id);
                            }}
                            disabled={deletingAppointmentId === String(item._id || item.id)}
                            style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: '999px',
                              border: '1px solid rgba(248,113,113,0.65)',
                              background: 'rgba(127,29,29,0.3)',
                              color: '#fecaca',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              cursor: deletingAppointmentId === String(item._id || item.id) ? 'not-allowed' : 'pointer',
                              opacity: deletingAppointmentId === String(item._id || item.id) ? 0.75 : 1,
                            }}
                          >
                            {deletingAppointmentId === String(item._id || item.id)
                              ? 'Deleting...'
                              : confirmAppointmentDeleteId === String(item._id || item.id)
                                ? 'Confirm'
                                : 'Delete'}
                          </button>
                        </div>
                      </div>
                      <div style={{ color: '#cbd5f5', fontSize: '0.9rem' }}>{item.service} · {item.date || 'No date'} {item.time || ''}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.phone || 'No phone'} · {item.contactMethod}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.location || 'Location not set'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '2rem', background: '#0f172a', borderRadius: '1rem', padding: '1.75rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{adminEditId ? 'Edit Product' : 'Add Product'}</h3>
                {adminEditId && (
                  <button
                    type="button"
                    onClick={handleAdminEditCancel}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(255,255,255,0.4)',
                      background: 'transparent',
                      color: '#fff',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel edit
                  </button>
                )}
              </div>
              <div
                style={{
                  display: 'grid',
                  gap: '0.6rem',
                  marginBottom: '1rem',
                  color: '#cbd5f5',
                  maxHeight: adminShowAllProducts ? '280px' : 'none',
                  overflowY: adminShowAllProducts ? 'auto' : 'visible',
                  paddingRight: adminShowAllProducts ? '0.4rem' : 0,
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <input
                    type="text"
                    value={adminProductSearch}
                    onChange={(event) => setAdminProductSearch(event.target.value)}
                    placeholder="Search products"
                    style={{
                      flex: 1,
                      minWidth: '180px',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.6rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.06)',
                      color: '#fff',
                    }}
                  />
                  <select
                    value={adminProductCategory}
                    onChange={(event) => setAdminProductCategory(event.target.value)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.6rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: '#0f172a',
                      color: '#fff',
                      minWidth: '160px',
                    }}
                  >
                    <option value="all">All categories</option>
                    {categories.filter((item) => item !== 'all').map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                {(adminShowAllProducts ? adminFilteredProducts : adminFilteredProducts.slice(0, 6)).map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.06)', padding: '0.6rem 0.9rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <div style={{ display: 'grid' }}>
                      <span style={{ fontWeight: 700 }}>{item.name}</span>
                      <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{item.category} · INR {item.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdminEditSelect(item)}
                      style={{
                        padding: '0.35rem 0.9rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(94,234,212,0.6)',
                        background: 'rgba(15,118,110,0.35)',
                        color: '#a7f3d0',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
                {!adminShowAllProducts && adminFilteredProducts.length > 6 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Showing 6 of {adminFilteredProducts.length} products.</span>
                    <button
                      type="button"
                      onClick={() => setAdminShowAllProducts(true)}
                      style={{
                        padding: '0.35rem 0.9rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.4)',
                        background: 'transparent',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Show all
                    </button>
                  </div>
                )}
              </div>
              <form onSubmit={handleAdminProductSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem' }}>
                  <input
                    name="name"
                    value={adminProductForm.name}
                    onChange={handleAdminProductChange}
                    placeholder="Product name"
                    required
                    style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                  />
                  <select
                    name="category"
                    value={adminProductForm.category}
                    onChange={handleAdminProductChange}
                    required
                    style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: '#0f172a', color: '#fff' }}
                  >
                    {['Pesticide', 'Herbicide', 'Fungicide', 'Fertilizer'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={adminProductForm.price}
                    onChange={handleAdminProductChange}
                    placeholder="Price"
                    required
                    style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                  />
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={adminProductForm.stock}
                    onChange={handleAdminProductChange}
                    placeholder="Stock"
                    required
                    style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                  />
                </div>
                <input
                  name="imageUrl"
                  value={adminProductForm.imageUrl}
                  onChange={handleAdminProductChange}
                  placeholder="Image URL"
                  required
                  style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
                <textarea
                  name="description"
                  value={adminProductForm.description}
                  onChange={handleAdminProductChange}
                  placeholder="Short description"
                  rows={3}
                  style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem' }}>
                  <input
                    name="brand"
                    value={adminProductForm.brand}
                    onChange={handleAdminProductChange}
                    placeholder="Brand"
                    required
                    style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                  />
                  <input
                    name="type"
                    value={adminProductForm.type}
                    onChange={handleAdminProductChange}
                    placeholder="Type"
                    required
                    style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                  />
                </div>
                <textarea
                  name="ingredients"
                  value={adminProductForm.ingredients}
                  onChange={handleAdminProductChange}
                  placeholder="Key ingredients"
                  rows={2}
                  required
                  style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
                <textarea
                  name="usageInstructions"
                  value={adminProductForm.usageInstructions}
                  onChange={handleAdminProductChange}
                  placeholder="Usage instructions"
                  rows={2}
                  required
                  style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
                <textarea
                  name="precautions"
                  value={adminProductForm.precautions}
                  onChange={handleAdminProductChange}
                  placeholder="Precautions"
                  rows={2}
                  required
                  style={{ padding: '0.65rem 0.8rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '0.7rem 1.6rem',
                      borderRadius: '999px',
                      border: 'none',
                      background: 'linear-gradient(120deg, #22c55e, #0ea5a4)',
                      color: '#fff',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {adminEditId ? 'Update product' : 'Add product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {showUserDashboard && (
        <section
          style={{
            padding: '4rem 2rem',
            background: 'linear-gradient(120deg, #0f172a, #14532d)',
            color: '#fff',
            minHeight: '70vh',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#86efac', marginBottom: '0.6rem' }}>
                  My account
                </div>
                <h2 style={{ margin: 0, fontSize: '2.2rem', fontFamily: "'Playfair Display', 'Georgia', serif" }}>User Dashboard</h2>
                <p style={{ margin: '0.6rem 0 0', color: '#cbd5f5' }}>View your profile and all your product purchases.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowUserDashboard(false);
                  setActiveSection('home');
                }}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Return to site
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontSize: '0.9rem', color: '#bbf7d0', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Name</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{currentUser?.name || 'User'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontSize: '0.9rem', color: '#bbf7d0', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Email</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{currentUser?.email || 'Not available'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontSize: '0.9rem', color: '#bbf7d0', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>My Orders</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{userOrders.length}</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', background: 'rgba(15,23,42,0.6)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Purchase History</h3>
              </div>

              {userOrdersLoading ? (
                <div style={{ color: '#94a3b8' }}>Loading your orders...</div>
              ) : userOrders.length === 0 ? (
                <div style={{ color: '#94a3b8' }}>No purchases yet. Buy products to see order history.</div>
              ) : (
                <div style={{ display: 'grid', gap: '0.6rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.4rem' }}>
                  {userOrders.map((order) => (
                    <div key={order._id} style={{ display: 'grid', gap: '0.35rem', background: 'rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>Order #{String(order._id).slice(-6)}</div>
                        <span style={{ padding: '0.2rem 0.7rem', borderRadius: '999px', background: 'rgba(16,185,129,0.2)', color: '#bbf7d0', fontWeight: 700, fontSize: '0.75rem' }}>{order.status || 'placed'}</span>
                      </div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                        {order.items?.map((item) => `${item.name} x${item.quantity}`).join(', ')}
                      </div>
                      <div style={{ color: '#fde68a', fontSize: '0.9rem', fontWeight: 700 }}>
                        INR {Number(order.totalAmount || 0).toFixed(2)} · {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {showDiseasePage && (
        <section
          style={{
            padding: '4rem 2rem',
            background: 'linear-gradient(120deg, #0f172a, #134e4a)',
            color: '#fff',
            minHeight: '90vh',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5eead4', marginBottom: '0.6rem' }}>
                  AI Powered
                </div>
                <h2 style={{ margin: 0, fontSize: '2.4rem', fontFamily: "'Playfair Display', 'Georgia', serif" }}>Plant Disease Identifier</h2>
                <p style={{ margin: '0.6rem 0 0', color: '#cbd5f5' }}>Upload a photo of your plant and get instant disease diagnosis with product recommendations.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDiseaseDetection(false);
                  setPredictedDisease(null);
                  setDiseaseImage(null);
                  setDiseaseImageFile(null);
                  setActiveSection('home');
                }}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Return to site
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ background: '#0f172a', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.2rem' }}>Upload Plant Image</div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={openDiseaseFilePicker}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openDiseaseFilePicker();
                    }
                  }}
                  onDragOver={handleDiseaseDragOver}
                  onDrop={handleDiseaseDrop}
                  onDragLeave={handleDiseaseDragLeave}
                  style={{
                    border: isDiseaseDropActive ? '2px dashed rgba(94,234,212,0.95)' : '2px dashed rgba(255,255,255,0.3)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    cursor: 'pointer',
                    background: isDiseaseDropActive ? 'rgba(20,184,166,0.2)' : diseaseImage ? 'rgba(16,185,129,0.1)' : 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {diseaseImage ? (
                    <div>
                      <img src={diseaseImage} alt="Uploaded plant" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '0.5rem' }} />
                      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#a7f3d0' }}>Image selected</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📸</div>
                      <div style={{ color: '#cbd5f5', marginBottom: '0.5rem' }}>
                        {isDiseaseDropActive ? 'Drop image here' : 'Click to upload or drag & drop'}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>PNG, JPG up to 10MB</div>
                    </div>
                  )}
                  <input
                    ref={diseaseFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleDiseaseImageUpload}
                    style={{
                      display: 'none',
                    }}
                    id="disease-image-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={openDiseaseFilePicker}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.6rem',
                    border: '1px solid rgba(94,234,212,0.6)',
                    background: 'rgba(15,118,110,0.35)',
                    color: '#a7f3d0',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginBottom: '0.75rem',
                  }}
                >
                  Choose Image
                </button>
                {diseaseImage && (
                  <button
                    type="button"
                    onClick={predictPlantDisease}
                    disabled={detectionLoading}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.6rem',
                      border: 'none',
                      background: 'linear-gradient(120deg, #22c55e, #0ea5a4)',
                      color: '#fff',
                      fontWeight: 700,
                      cursor: detectionLoading ? 'not-allowed' : 'pointer',
                      opacity: detectionLoading ? 0.6 : 1,
                    }}
                  >
                    {detectionLoading ? 'Analyzing...' : 'Identify Disease'}
                  </button>
                )}
              </div>

              {predictedDisease && (
                <div style={{ background: '#0f172a', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.2rem', color: '#fbbf24' }}>
                    Diagnosis Results
                  </div>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#cbd5f5', marginBottom: '0.3rem' }}>Disease Detected:</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a7f3d0' }}>{predictedDisease.name}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#cbd5f5', marginBottom: '0.3rem' }}>Description:</div>
                      <div style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{predictedDisease.description}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#cbd5f5', marginBottom: '0.5rem' }}>Recommended Product Types:</div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {predictedDisease.recommendations.map((rec) => (
                          <span
                            key={rec}
                            style={{
                              background: 'rgba(94,234,212,0.2)',
                              color: '#a7f3d0',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '999px',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                            }}
                          >
                            {rec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        requestAnimationFrame(() => {
                          recommendedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        });
                      }}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '0.6rem',
                        border: '1px solid rgba(255,255,255,0.4)',
                        background: 'transparent',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: '1rem',
                      }}
                    >
                      View Recommended Products
                    </button>
                    {typeof predictedDisease.confidence === 'number' && (
                      <div style={{ fontSize: '0.9rem', color: '#fef08a', marginTop: '0.2rem' }}>
                        {/* Model confidence: {(predictedDisease.confidence * 100).toFixed(1)}% */}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {recommendedProducts.length > 0 && predictedDisease && (
              <div ref={recommendedRef} style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Recommended Products for {predictedDisease.name}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  {recommendedProducts.map((product) => (
                    <div key={product.id} style={{ background: '#0f172a', borderRadius: '1rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                      <div style={{ height: 150, background: 'rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.5rem', marginBottom: '1rem', overflow: 'hidden' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: 600, marginBottom: '0.4rem' }}>{product.category}</div>
                      <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>{product.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#cbd5f5', marginBottom: '0.8rem' }}>INR {product.price}</div>
                      <button
                        type="button"
                        onClick={() => (isAdminUser ? handleOpenDashboard() : handleBuyNow(product.id))}
                        style={{
                          width: '100%',
                          padding: '0.6rem',
                          borderRadius: '0.5rem',
                          background: isAdminUser ? '#0f766e' : '#059669',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        {isAdminUser ? 'Edit' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {showFullPage && (
        <>
          {/* Cart Drawer */}
          {showCart && !isAdminUser && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.45)',
                zIndex: 130,
              }}
            >
              <button
                type="button"
                aria-label="Close cart overlay"
                onClick={() => setShowCart(false)}
                style={{ position: 'absolute', inset: 0, border: 'none', background: 'transparent', cursor: 'default' }}
              />
              <aside
                role="dialog"
                aria-modal="true"
                aria-label="Shopping Cart"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  height: 'clamp(340px, 52vh, 560px)',
                  width: 'min(420px, 92vw)',
                  background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
                  border: '1px solid rgba(134, 239, 172, 0.85)',
                  borderRight: 'none',
                  borderRadius: '1.1rem 0 0 1.1rem',
                  boxShadow: '-18px 14px 38px rgba(15, 23, 42, 0.22)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ padding: '1rem 1rem 0.75rem', borderBottom: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ margin: 0, color: '#047857', fontSize: '1.2rem' }}>Shopping Cart ({cartCount})</h2>
                  <button
                    type="button"
                    onClick={() => setShowCart(false)}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '999px',
                      border: '1px solid #86efac',
                      background: '#fff',
                      color: '#047857',
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}
                  >
                    X
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                  {cartItems.length === 0 ? (
                    <p style={{ color: '#059669', margin: 0 }}>Your cart is empty. Start shopping!</p>
                  ) : (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {cartItems.map((item) => (
                        <div key={item.id} style={{ padding: '0.75rem', background: '#fff', borderRadius: '0.6rem', border: '1px solid #d1fae5' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <div style={{ fontWeight: 600, color: '#1f2937', lineHeight: 1.3 }}>{item.name}</div>
                            <div style={{ fontWeight: 700, color: '#059669', whiteSpace: 'nowrap' }}>INR {(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ fontSize: '0.88rem', color: '#6b7280' }}>INR {item.price} each</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <button type="button" onClick={() => updateCartQty(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', borderRadius: '0.35rem', border: '1px solid #059669', background: '#fff', color: '#059669', cursor: 'pointer', fontWeight: 700 }}>
                                -
                              </button>
                              <span style={{ width: '24px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                              <button type="button" onClick={() => updateCartQty(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: '0.35rem', border: '1px solid #059669', background: '#fff', color: '#059669', cursor: 'pointer', fontWeight: 700 }}>
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div style={{ padding: '0.95rem 1rem 1.1rem', borderTop: '1px solid #bbf7d0', background: '#ecfdf5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#047857' }}>Total</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#047857' }}>INR {cartTotal.toFixed(2)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      style={{
                        width: '100%',
                        padding: '0.7rem 1rem',
                        borderRadius: '0.55rem',
                        background: '#059669',
                        color: '#fff',
                        border: 'none',
                        cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                        fontWeight: 700,
                        opacity: checkoutLoading ? 0.8 : 1,
                      }}
                    >
                      {checkoutLoading ? 'Placing Order...' : 'Proceed to Checkout'}
                    </button>
                  </div>
                )}
              </aside>
            </div>
          )}

          {/* Product Details Modal */}
          {selectedProduct && (
            <div
              role="dialog"
              aria-modal="true"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                zIndex: 120,
              }}
            >
              <div style={{ background: '#fff', maxWidth: '720px', width: '100%', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', background: '#fff', position: 'sticky', top: 0, zIndex: 2 }}>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    style={{
                      padding: '0.45rem 0.9rem',
                      borderRadius: '999px',
                      border: '1px solid #059669',
                      background: '#fff',
                      color: '#059669',
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}
                    aria-label="Go back"
                  >
                    Go back
                  </button>
                </div>
                <div style={{ padding: '1.25rem 2rem 2rem', overflowY: 'auto' }}>
                  <div style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 700, marginBottom: '0.4rem' }}>{selectedProduct.category}</div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.6rem', color: '#111827' }}>{selectedProduct.name}</h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#4b5563', lineHeight: 1.6 }}>{selectedProduct.description}</p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>How to Use</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                      {getUsageSteps(selectedProduct).map((step, index) => (
                        <div key={step.title} style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #e5e7eb' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '28px', height: '28px', borderRadius: '999px', background: '#059669', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                              {index + 1}
                            </span>
                            <span style={{ fontWeight: 700, color: '#111827' }}>{step.title}</span>
                          </div>
                          <div style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.5 }}>{step.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
                    <div><strong>Problem it solves:</strong> {getProblemLabel(selectedProduct)}</div>
                    <div><strong>Type:</strong> {selectedProduct.type}</div>
                    <div><strong>Brand:</strong> {selectedProduct.brand}</div>
                    <div><strong>Ingredients:</strong> {selectedProduct.ingredients}</div>
                    <div><strong>Usage:</strong> {selectedProduct.usageInstructions}</div>
                    <div><strong>Precautions:</strong> {selectedProduct.precautions}</div>
                    <div><strong>Stock:</strong> {selectedProduct.stock > 0 ? `${selectedProduct.stock} available` : 'Out of stock'}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#059669' }}>INR {selectedProduct.price}</div>
                    <button
                      type="button"
                      onClick={() => (isAdminUser ? handleOpenDashboard() : addToCart(selectedProduct.id))}
                      disabled={selectedProduct.stock === 0}
                      style={{
                        padding: '0.7rem 1.6rem',
                        borderRadius: '0.6rem',
                        background: isAdminUser ? '#0f766e' : selectedProduct.stock > 0 ? '#059669' : '#d1d5db',
                        color: '#fff',
                        border: 'none',
                        cursor: isAdminUser ? 'pointer' : selectedProduct.stock > 0 ? 'pointer' : 'not-allowed',
                        fontWeight: 700,
                      }}
                    >
                      {isAdminUser ? 'Edit' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HOME SECTION */}
          <section
            id="home"
            style={{
              position: 'relative',
              backgroundColor: '#0b0f1a',
              color: '#fff',
              padding: '6rem 2rem',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${heroImages[heroIndex]})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'opacity 0.8s ease-in-out',
                opacity: isHeroFading ? 0 : 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${heroImages[nextHeroIndex]})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'opacity 0.8s ease-in-out',
                opacity: isHeroFading ? 1 : 0,
              }}
            />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Welcome to Agri-Clinic</h2>
              <p style={{ fontSize: '1.1rem', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                Your one-stop solution for premium pesticides, herbicides, and fertilizers. Empower your farm with quality products and expert guidance.
              </p>
              <button onClick={() => scrollToSection('explore')} style={{ padding: '0.8rem 2rem', background: '#fff', color: '#059669', border: 'none', borderRadius: '0.5rem', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>
                {isAdminUser ? 'View Catalog' : 'Shop Now'}
              </button>
            </div>
          </section>

          {/* ABOUT US SECTION */}
          <section id="about" style={{ padding: '4rem 2rem', background: '#fff', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937', textAlign: 'center' }}>About Agri-Clinic</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.75rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>🎯 Our Mission</h3>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>To empower farmers with the best agricultural products and expert advice for sustainable farming.</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.75rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>👁️ Our Vision</h3>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>To be India's leading agricultural e-commerce platform, transforming farming practices.</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.75rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>💚 Our Values</h3>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>Integrity, Sustainability, Community, Innovation — every product and service reflects these values.</p>
                </div>
              </div>
            </div>
          </section>

          {/* EXPLORE / PRODUCTS SECTION */}
          <section id="explore" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1f2937' }}>Explore Our Products</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {exploreCategories.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleExploreCategory(item.key)}
                  style={{
                    textAlign: 'left',
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <div style={{ height: 160, background: '#f9fafb', padding: '0.5rem' }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</div>
                    <div style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.description}</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', borderRadius: '0.75rem', border: '1px solid #d1d5db', background: '#fff' }}>
                <span style={{ fontSize: '1.2rem' }}>🌱</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search seeds, sprays, soil... 🌿🌾"
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem' }}
                />
                <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>🪴</span>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: '1rem', minWidth: '150px' }}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All Categories' : c}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: '1rem', minWidth: '170px' }}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="stock-desc">Stock: High to Low</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {categoryStats.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setCategory(item.name)}
                  style={{
                    border: `1px solid ${category === item.name ? '#059669' : '#d1d5db'}`,
                    background: category === item.name ? '#ecfdf5' : '#fff',
                    color: category === item.name ? '#047857' : '#4b5563',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>{item.name === 'all' ? 'All' : item.name}</span>
                  <span style={{ background: '#e5e7eb', color: '#374151', borderRadius: '999px', padding: '0.1rem 0.45rem', fontSize: '0.8rem', fontWeight: 700 }}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            <div ref={productGridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              {visibleProducts.map((p) => (
                <div key={p.id} style={{ background: '#fff', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}>
                  <div style={{ height: 200, background: '#f9fafb', overflow: 'hidden', padding: '0.5rem' }}>
                    <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600, marginBottom: '0.5rem' }}>{p.category}</div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#1f2937' }}>{p.name}</h3>
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.5 }}>{p.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669' }}>INR {p.price}</div>
                        <div style={{ fontSize: '0.85rem', color: p.stock > 0 ? '#059669' : '#dc2626', fontWeight: 500 }}>
                          {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(p)}
                        style={{ padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #059669', background: '#fff', color: '#059669', cursor: 'pointer', fontWeight: 600 }}
                      >
                        View more
                      </button>
                      <button
                        type="button"
                        onClick={() => (isAdminUser ? handleOpenDashboard() : handleBuyNow(p.id))}
                        disabled={p.stock === 0}
                        style={{
                          padding: '0.6rem',
                          borderRadius: '0.5rem',
                          background: isAdminUser ? '#0f766e' : p.stock > 0 ? '#059669' : '#d1d5db',
                          color: '#fff',
                          border: 'none',
                          cursor: isAdminUser ? 'pointer' : p.stock > 0 ? 'pointer' : 'not-allowed',
                          fontWeight: 600,
                        }}
                      >
                        {isAdminUser ? 'Edit' : 'Buy now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section style={{ background: '#f3f4f6', padding: '3rem 2rem', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1f2937', textAlign: 'center' }}>Why Choose Agri-Clinic?</h2>
              <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>We are committed to providing quality products and expert services to farmers.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {whyChooseUs.map((item, i) => (
                  <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669', fontSize: '1.1rem' }}>{item.title}</h3>
                    <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS SECTION */}
          <section id="reviews" style={{ padding: '3rem 2rem', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1f2937', textAlign: 'center' }}>What Our Customers Say</h2>
              <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>Real stories from farmer feedback.</p>
              <div className="reviews-grid">
                {testimonials.map((t, i) => (
                  <div key={i} className="review-card" style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #059669', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <p style={{ margin: '0 0 1rem 0', color: '#4b5563', lineHeight: 1.6, fontStyle: 'italic', flexGrow: 1 }}>"{t.text}"</p>
                    <p style={{ margin: 0, fontWeight: 700, color: '#059669', fontSize: '0.9rem' }}>Farmer review</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONSULTATION SECTION */}
          <section style={{ padding: '3rem 2rem', background: '#fff', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1f2937', textAlign: 'center' }}>Agriculture Consultation</h2>
              <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>
                Talk to our agronomy experts for crop planning, pest control, and nutrient management.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
                <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Soil & Crop Advisory</h3>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
                    Personalized crop plans, soil testing insights, and seasonal guidance for better yield.
                  </p>
                </div>
                <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Pest & Disease Support</h3>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
                    Early diagnosis and treatment plans to protect crops from pests and infections.
                  </p>
                </div>
                <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Fertilizer Planning</h3>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
                    Balanced nutrition schedules to improve yield and reduce input costs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* APPOINTMENT SECTION */}
          {!isAdminUser && (
          <section style={{ padding: '3rem 2rem', background: '#f3f4f6', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', gap: '0.5rem', padding: '0.35rem 0.75rem', borderRadius: '999px', background: '#e5e7eb', color: '#374151', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  <span style={{ background: '#059669', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>1</span>
                  Details
                  <span style={{ background: '#059669', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>2</span>
                  Schedule
                  <span style={{ background: '#059669', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>3</span>
                  Confirm
                </div>
                <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#1f2937' }}>Book an Appointment</h2>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  Schedule a one-on-one consultation with our agriculture experts.
                </p>
              </div>
              {appointmentSubmitted && (
                <div style={{ background: '#ecfdf5', border: '1px solid #059669', color: '#047857', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
                  Thanks! Your appointment request has been sent.
                </div>
              )}
              {!currentUser && (
                <div style={{ background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
                  Please sign in before booking an appointment.
                </div>
              )}
              <form onSubmit={handleAppointmentSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Your Details</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        name="name"
                        value={appointmentForm.name}
                        onChange={handleAppointmentChange}
                        required
                        placeholder="Full name"
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                      />
                      <input
                        name="phone"
                        value={appointmentForm.phone}
                        onChange={handleAppointmentChange}
                        required
                        placeholder="Phone number"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        title="Enter a 10-digit phone number"
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                      />
                      <input
                        type="email"
                        name="email"
                        value={appointmentForm.email}
                        onChange={handleAppointmentChange}
                        required
                        placeholder="Email address"
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                      />
                      <select
                        name="location"
                        value={appointmentForm.location}
                        onChange={handleAppointmentChange}
                        required
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', background: '#fff' }}
                      >
                        <option value="" disabled>Select village / city</option>
                        {locationOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Schedule</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        type="date"
                        name="date"
                        value={appointmentForm.date}
                        onChange={handleAppointmentChange}
                        required
                        min={todayISO}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                      />
                      <input
                        type="time"
                        name="time"
                        value={appointmentForm.time}
                        onChange={handleAppointmentChange}
                        required
                        min="09:00"
                        max="17:00"
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                      />
                      <select
                        name="farmSize"
                        value={appointmentForm.farmSize}
                        onChange={handleAppointmentChange}
                        required
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', background: '#fff' }}
                      >
                        <option>1-5 acres</option>
                        <option>6-10 acres</option>
                        <option>11-20 acres</option>
                        <option>20+ acres</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1f2937' }}>Select a service</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {serviceOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setAppointmentForm((prev) => ({ ...prev, service: option }))}
                            aria-pressed={appointmentForm.service === option}
                            style={{
                              padding: '0.5rem 0.9rem',
                              borderRadius: '999px',
                              border: `1px solid ${appointmentForm.service === option ? '#059669' : '#d1d5db'}`,
                              background: appointmentForm.service === option ? '#ecfdf5' : '#fff',
                              color: appointmentForm.service === option ? '#047857' : '#4b5563',
                              cursor: 'pointer',
                              fontWeight: 600,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="service" value={appointmentForm.service} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {['Phone', 'Email', 'WhatsApp'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setAppointmentForm((prev) => ({ ...prev, contactMethod: option }))}
                            style={{
                              padding: '0.4rem 0.85rem',
                              borderRadius: '999px',
                              border: `1px solid ${appointmentForm.contactMethod === option ? '#059669' : '#d1d5db'}`,
                              background: appointmentForm.contactMethod === option ? '#ecfdf5' : '#fff',
                              color: appointmentForm.contactMethod === option ? '#047857' : '#4b5563',
                              cursor: 'pointer',
                              fontWeight: 600,
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="contactMethod" value={appointmentForm.contactMethod} />
                    </div>
                    <textarea
                      name="message"
                      value={appointmentForm.message}
                      onChange={handleAppointmentChange}
                      placeholder="Describe your issue or goals"
                      rows={4}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', marginBottom: '1.5rem' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <button type="submit" disabled={appointmentSubmitting || !currentUser} style={{ padding: '0.8rem 2rem', background: '#059669', color: '#fff', border: 'none', borderRadius: '0.6rem', fontWeight: 700, cursor: appointmentSubmitting || !currentUser ? 'not-allowed' : 'pointer', opacity: appointmentSubmitting || !currentUser ? 0.85 : 1 }}>
                        {appointmentSubmitting ? 'Submitting...' : 'Book Appointment'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1.25rem', position: 'sticky', top: '90px' }}>
                      <div style={{ fontWeight: 700, marginBottom: '0.6rem', color: '#111827' }}>Appointment Summary</div>
                      <div style={{ color: '#4b5563', marginBottom: '0.4rem' }}>
                        <strong>Service:</strong> {appointmentForm.service}
                      </div>
                      <div style={{ color: '#4b5563', marginBottom: '0.4rem' }}>
                        <strong>Date:</strong> {appointmentForm.date || 'Select a date'}
                      </div>
                      <div style={{ color: '#4b5563', marginBottom: '0.4rem' }}>
                        <strong>Time:</strong> {appointmentForm.time || 'Select a time'}
                      </div>
                      <div style={{ color: '#4b5563', marginBottom: '0.4rem' }}>
                        <strong>Farm size:</strong> {appointmentForm.farmSize}
                      </div>
                      <div style={{ color: '#4b5563', marginBottom: '0.4rem' }}>
                        <strong>Contact:</strong> {appointmentForm.contactMethod}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                        We will confirm your slot by phone or email within 24 hours.
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
          )}

          {/* GALLERY SECTION */}
          <section id="gallery" style={{ padding: '3rem 2rem', background: '#f3f4f6', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1f2937', textAlign: 'center' }}>Gallery</h2>
              <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>A glimpse of our farming solutions in action.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
                {galleryImages.map((img, i) => (
                  <div key={i} style={{ width: 250, height: 250, borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <img src={img} alt={`gallery-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STATISTICS */}
          <section style={{ background: '#059669', color: '#fff', padding: '3rem 2rem', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>25000+</div>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>Happy Farmers</p>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>30+</div>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>Expert Advisors</p>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>12</div>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>Quality Products</p>
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" style={{ padding: '3rem 2rem', background: '#fff', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1f2937', textAlign: 'center' }}>Contact Us</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.75rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>📱</p>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Phone</h3>
                  <p style={{ margin: 0, color: '#6b7280' }}>9843699932</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.75rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>📧</p>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Email</h3>
                  <p style={{ margin: 0, color: '#6b7280' }}>agri.babu21@gmail.com</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.75rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>📍</p>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Location</h3>
                  <p style={{ margin: 0, color: '#6b7280' }}>P.velur<br></br>Namakkal</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: '#1f2937', color: '#9ca3af', padding: '3rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '2.25rem',
                  alignItems: 'start',
                  justifyItems: 'center',
                  textAlign: 'center',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'grid', alignContent: 'start', gap: '0.85rem' }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>🌾 Agri-Clinic</h3>
                  <p style={{ margin: 0, lineHeight: 1.45, maxWidth: '340px' }}>Empowering farmers with quality products and expert advice.</p>
                </div>
                <div style={{ display: 'grid', alignContent: 'start', gap: '0.85rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: '#fff' }}>Quick Links</h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
                    <a href="#home" style={{ color: '#9ca3af', textDecoration: 'none', lineHeight: 1.4 }}>Home</a>
                    <span style={{ color: '#6b7280' }}>|</span>
                    <a href="#about" style={{ color: '#9ca3af', textDecoration: 'none', lineHeight: 1.4 }}>About</a>
                    <span style={{ color: '#6b7280' }}>|</span>
                    <a href="#explore" style={{ color: '#9ca3af', textDecoration: 'none', lineHeight: 1.4 }}>Products</a>
                    <span style={{ color: '#6b7280' }}>|</span>
                    <a href="#contact" style={{ color: '#9ca3af', textDecoration: 'none', lineHeight: 1.4 }}>Contact</a>
                  </div>
                </div>
                <div style={{ display: 'grid', alignContent: 'start', gap: '0.5rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: '#fff' }}>Address</h4>
                  <p style={{ margin: 0, lineHeight: 1.5, maxWidth: '360px' }}>
                    Rasi Agri Clinic<br></br>
                    116/1, Panchamuga Vinayagar Kovil Opp, P. Velur, Namakkal Dt, Tamil Nadu
                  </p>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #374151', paddingTop: '1.5rem', textAlign: 'center' }}>
                <p style={{ margin: 0 }}>© 2026 Agri-Clinic. All rights reserved.</p>
              </div>
            </div>
          </footer>

          <button
            type="button"
            onClick={() => setIsChatOpen((prev) => !prev)}
            aria-label="Toggle chatbot"
            style={{
              position: 'fixed',
              right: '1.2rem',
              bottom: '1.2rem',
              zIndex: 150,
              width: '58px',
              height: '58px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'linear-gradient(120deg, #0f766e, #059669)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1.3rem',
              boxShadow: '0 14px 28px rgba(15, 118, 110, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isChatOpen ? 'X' : '✦'}
          </button>

          {isChatOpen && (
            <section
              style={{
                position: 'fixed',
                right: '1.2rem',
                bottom: '5.5rem',
                width: 'min(380px, 92vw)',
                height: 'min(520px, 72vh)',
                background: '#fff',
                borderRadius: '1rem',
                border: '1px solid #cbd5e1',
                boxShadow: '0 18px 40px rgba(15, 23, 42, 0.26)',
                zIndex: 150,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '0.85rem 1rem', background: 'linear-gradient(120deg, #0f766e, #059669)', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.05rem' }}>🌱</span>
                    <div style={{ fontWeight: 700 }}>{CHATBOT_NAME}</div>
                  </div>
                  {!currentUser && (
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.45rem', borderRadius: '999px' }}>Guest mode</span>
                  )}
                </div>
                <div style={{ fontSize: '0.82rem', opacity: 0.95 }}>Ask about crop care, pests, soil, or fertilizers</div>
                {!currentUser && (
                  <div style={{ marginTop: '0.45rem', fontSize: '0.78rem', opacity: 0.98 }}>
                    {typeof guestPromptsRemaining === 'number'
                      ? `${guestPromptsRemaining} free prompts left. Sign in for unlimited chat and saved history.`
                      : 'Sign in for unlimited chat and saved history.'}
                  </div>
                )}
              </div>

              <div ref={chatMessagesRef} style={{ flex: 1, overflowY: 'auto', padding: '0.9rem', background: '#f8fafc', display: 'grid', gap: '0.7rem' }}>
                {chatMessages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    style={{
                      justifySelf: message.role === 'user' ? 'end' : 'start',
                      maxWidth: '88%',
                      background: message.role === 'user' ? '#dcfce7' : '#fff',
                      color: '#0f172a',
                      border: `1px solid ${message.role === 'user' ? '#86efac' : '#e2e8f0'}`,
                      borderRadius: '0.75rem',
                      padding: '0.62rem 0.72rem',
                      fontSize: '0.92rem',
                      lineHeight: 1.45,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {message.text}
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ justifySelf: 'start', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.62rem 0.72rem', fontSize: '0.9rem', color: '#475569' }}>
                    Thinking...
                  </div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} style={{ borderTop: '1px solid #e2e8f0', padding: '0.7rem', display: 'flex', gap: '0.5rem', background: '#fff' }}>
                <button
                  type="button"
                  onClick={handleClearChatHistory}
                  disabled={chatHistoryClearing || chatLoading || !chatMessages.some((message) => message.role === 'user')}
                  style={{
                    padding: '0.62rem 0.72rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #d1d5db',
                    background: '#f8fafc',
                    color: '#374151',
                    fontWeight: 700,
                    cursor: chatHistoryClearing || chatLoading || !chatMessages.some((message) => message.role === 'user') ? 'not-allowed' : 'pointer',
                    opacity: chatHistoryClearing || chatLoading || !chatMessages.some((message) => message.role === 'user') ? 0.7 : 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chatHistoryClearing ? 'Deleting...' : 'Clear'}
                </button>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Type your farming question..."
                  style={{
                    flex: 1,
                    padding: '0.62rem 0.7rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    fontSize: '0.92rem',
                  }}
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim() || (!currentUser && guestPromptsRemaining === 0)}
                  style={{
                    padding: '0.62rem 0.88rem',
                    borderRadius: '0.6rem',
                    border: 'none',
                    background: '#059669',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: chatLoading || !chatInput.trim() || (!currentUser && guestPromptsRemaining === 0) ? 'not-allowed' : 'pointer',
                    opacity: chatLoading || !chatInput.trim() || (!currentUser && guestPromptsRemaining === 0) ? 0.8 : 1,
                  }}
                >
                  Send
                </button>
              </form>

              {!currentUser && guestPromptsRemaining === 0 && (
                <div style={{ borderTop: '1px solid #e2e8f0', padding: '0.65rem 0.7rem', background: '#f0fdf4', color: '#166534', fontSize: '0.83rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
                  <span>Free guest prompts are over. Sign in to continue.</span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignUp(false);
                      setSignInRole('user');
                      setShowSignIn(true);
                    }}
                    style={{
                      border: '1px solid #16a34a',
                      borderRadius: '999px',
                      background: '#dcfce7',
                      color: '#166534',
                      fontWeight: 700,
                      fontSize: '0.76rem',
                      padding: '0.3rem 0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    Sign in
                  </button>
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
