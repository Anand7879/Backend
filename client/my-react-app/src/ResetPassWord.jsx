import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Mail, Lock, User, ArrowLeft } from 'lucide-react';

const API_URL = 'http://localhost:3000';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '448px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '32px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    backgroundColor: '#4F46E5',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '14px'
  },
  alert: {
    marginBottom: '24px',
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '14px'
  },
  alertSuccess: {
    backgroundColor: '#F0FDF4',
    color: '#166534'
  },
  alertError: {
    backgroundColor: '#FEF2F2',
    color: '#991B1B'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  inputWrapper: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF'
  },
  input: {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '14px',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  inputFocus: {
    borderColor: '#4F46E5',
    boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '14px',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonHover: {
    backgroundColor: '#4338CA'
  },
  buttonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#4F46E5',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    padding: '0'
  },
  textCenter: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6B7280'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '16px',
    padding: '0'
  },
  divider: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #E5E7EB'
  },
  helperText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9CA3AF',
    marginTop: '16px'
  }
};

function App() {
  const [page, setPage] = useState('login');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    passWord: '',
    role: 'user'
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [focusedInput, setFocusedInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          passWord: formData.passWord
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Welcome back, ${data.user.userName}!` });
        setFormData({ userName: '', email: '', passWord: '', role: 'user' });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Account created! You can now login.' });
        setFormData({ userName: '', email: '', passWord: '', role: 'user' });
        setTimeout(() => setPage('login'), 2000);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password reset email sent! Check your inbox.' });
        setFormData({ ...formData, email: '' });
      } else {
        const text = await response.text();
        setMessage({ type: 'error', text: text || 'Error sending reset email' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/reset-password/${resetToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: formData.passWord })
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password reset successful! You can now login.' });
        setFormData({ userName: '', email: '', passWord: '', role: 'user' });
        setResetToken('');
        setTimeout(() => setPage('login'), 2000);
      } else {
        const text = await response.text();
        setMessage({ type: 'error', text: text || 'Error resetting password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const getInputStyle = (name) => ({
    ...styles.input,
    ...(focusedInput === name ? styles.inputFocus : {})
  });

  return (
    <div style={styles.container}>
      <div style={{ width: '100%', maxWidth: '448px' }}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.iconContainer}>
              <Lock size={32} color="white" />
            </div>
            <h1 style={styles.title}>
              {page === 'login' && 'Welcome Back'}
              {page === 'signup' && 'Create Account'}
              {page === 'forgot' && 'Forgot Password'}
              {page === 'reset' && 'Reset Password'}
            </h1>
            <p style={styles.subtitle}>
              {page === 'login' && 'Sign in to your account'}
              {page === 'signup' && 'Sign up to get started'}
              {page === 'forgot' && 'Enter your email to reset password'}
              {page === 'reset' && 'Enter your new password'}
            </p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div style={{
              ...styles.alert,
              ...(message.type === 'success' ? styles.alertSuccess : styles.alertError)
            }}>
              {message.type === 'success' ? (
                <CheckCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Login Form */}
          {page === 'login' && (
            <div style={styles.formContainer}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <div style={styles.inputWrapper}>
                  <Mail size={20} style={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput('')}
                    required
                    style={getInputStyle('email')}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrapper}>
                  <Lock size={20} style={styles.icon} />
                  <input
                    type="password"
                    name="passWord"
                    value={formData.passWord}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                    onFocus={() => setFocusedInput('passWord')}
                    onBlur={() => setFocusedInput('')}
                    required
                    style={getInputStyle('passWord')}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPage('forgot')}
                style={styles.linkButton}
              >
                Forgot password?
              </button>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#4338CA')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4F46E5')}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p style={styles.textCenter}>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setPage('signup');
                    setMessage({ type: '', text: '' });
                  }}
                  style={styles.linkButton}
                >
                  Sign up
                </button>
              </p>
            </div>
          )}

          {/* Signup Form */}
          {page === 'signup' && (
            <div style={styles.formContainer}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <div style={styles.inputWrapper}>
                  <User size={20} style={styles.icon} />
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                    onFocus={() => setFocusedInput('userName')}
                    onBlur={() => setFocusedInput('')}
                    required
                    style={getInputStyle('userName')}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <div style={styles.inputWrapper}>
                  <Mail size={20} style={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput('')}
                    required
                    style={getInputStyle('email')}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrapper}>
                  <Lock size={20} style={styles.icon} />
                  <input
                    type="password"
                    name="passWord"
                    value={formData.passWord}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                    onFocus={() => setFocusedInput('passWord')}
                    onBlur={() => setFocusedInput('')}
                    required
                    style={getInputStyle('passWord')}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleSignup}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#4338CA')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4F46E5')}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <p style={styles.textCenter}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setPage('login');
                    setMessage({ type: '', text: '' });
                  }}
                  style={styles.linkButton}
                >
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* Forgot Password Form */}
          {page === 'forgot' && (
            <div style={styles.formContainer}>
              <button
                type="button"
                onClick={() => setPage('login')}
                style={styles.backButton}
              >
                <ArrowLeft size={16} />
                Back to login
              </button>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <div style={styles.inputWrapper}>
                  <Mail size={20} style={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleForgotPassword)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput('')}
                    required
                    style={getInputStyle('email')}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#4338CA')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4F46E5')}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <p style={styles.helperText}>
                You'll receive an email with a reset link if an account exists with this email.
              </p>
            </div>
          )}

          {/* Reset Password Form */}
          {page === 'reset' && (
            <div style={styles.formContainer}>
              <button
                type="button"
                onClick={() => setPage('login')}
                style={styles.backButton}
              >
                <ArrowLeft size={16} />
                Back to login
              </button>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Reset Token</label>
                <input
                  type="text"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleResetPassword)}
                  onFocus={() => setFocusedInput('token')}
                  onBlur={() => setFocusedInput('')}
                  required
                  style={getInputStyle('token')}
                  placeholder="Enter token from email"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>New Password</label>
                <div style={styles.inputWrapper}>
                  <Lock size={20} style={styles.icon} />
                  <input
                    type="password"
                    name="passWord"
                    value={formData.passWord}
                    onChange={handleChange}
                    onKeyPress={(e) => handleKeyPress(e, handleResetPassword)}
                    onFocus={() => setFocusedInput('passWord')}
                    onBlur={() => setFocusedInput('')}
                    required
                    style={getInputStyle('passWord')}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {})
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#4338CA')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4F46E5')}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}

          {/* Quick Navigation to Reset Page */}
          {page === 'login' && (
            <div style={styles.divider}>
              <p style={styles.helperText}>
                Have a reset token?{' '}
                <button
                  type="button"
                  onClick={() => setPage('reset')}
                  style={{ ...styles.linkButton, fontSize: '12px' }}
                >
                  Reset password
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;