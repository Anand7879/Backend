import React, { useState, useEffect } from 'react';
import { Lock, User, Mail, LogOut, Shield, Eye, EyeOff } from 'lucide-react';

const API_URL = 'http://localhost:3000';

export default function RBACApp() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', passWord: '' });
  const [registerData, setRegisterData] = useState({ 
    userName: '', 
    email: '', 
    passWord: '',
    role: 'user'
  });
  
  const [message, setMessage] = useState({ type: '', text: '' });
  const [publicContent, setPublicContent] = useState('');
  const [privateContent, setPrivateContent] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        const tokenResponse = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        });
        const tokenData = await tokenResponse.json();
        
        setUser(data.user);
        setToken(tokenData.token || 'dummy-token');
        localStorage.setItem('token', tokenData.token || 'dummy-token');
        localStorage.setItem('user', JSON.stringify(data.user));
        
        showMessage('success', 'Login successful!');
        setView('dashboard');
        setLoginData({ email: '', passWord: '' });
      } else {
        showMessage('error', data.message);
      }
    } catch (error) {
      showMessage('error', 'Unable to connect to server');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('success', 'Account created! Please login.');
        setView('login');
        setRegisterData({ userName: '', email: '', passWord: '', role: 'user' });
      } else {
        showMessage('error', data.message);
      }
    } catch (error) {
      showMessage('error', 'Unable to connect to server');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setPublicContent('');
    setPrivateContent('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setView('login');
    showMessage('success', 'Logged out successfully');
  };

  const fetchPublicContent = async () => {
    try {
      const response = await fetch(`${API_URL}/public`);
      const text = await response.text();
      setPublicContent(text);
      showMessage('success', 'Public content loaded');
    } catch (error) {
      showMessage('error', 'Failed to fetch public content');
    }
  };

  const fetchPrivateContent = async () => {
    try {
      const response = await fetch(`${API_URL}/private`, {
        headers: { 'Authorization': token }
      });
      const text = await response.text();
      setPrivateContent(text);
      
      if (text.includes('denied') || text.includes('Unauthorized')) {
        showMessage('error', 'Access denied - Admin only');
      } else {
        showMessage('success', 'Private content loaded');
      }
    } catch (error) {
      showMessage('error', 'Failed to fetch private content');
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">RBAC System</h1>
          </div>
          <p className="text-gray-600">Role-Based Access Control Demo</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Login View */}
        {view === 'login' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginData.passWord}
                    onChange={(e) => setLoginData({...loginData, passWord: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setView('register')}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Register View */}
        {view === 'register' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={registerData.userName}
                    onChange={(e) => setRegisterData({...registerData, userName: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Choose username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={registerData.passWord}
                    onChange={(e) => setRegisterData({...registerData, passWord: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={registerData.role}
                  onChange={(e) => setRegisterData({...registerData, role: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                onClick={handleRegister}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Create Account
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setView('login')}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Dashboard View */}
        {view === 'dashboard' && user && (
          <div className="space-y-6">
            {/* User Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user.userName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>

            {/* Access Control Demo */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Access Control Demo</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Public Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Public Content</h4>
                  <p className="text-sm text-gray-600 mb-3">Accessible to everyone</p>
                  <button
                    onClick={fetchPublicContent}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Load Public Content
                  </button>
                  {publicContent && (
                    <div className="mt-3 p-3 bg-green-50 rounded border border-green-200 text-green-800">
                      {publicContent}
                    </div>
                  )}
                </div>

                {/* Private Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Private Content</h4>
                  <p className="text-sm text-gray-600 mb-3">Admin only</p>
                  <button
                    onClick={fetchPrivateContent}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Load Private Content
                  </button>
                  {privateContent && (
                    <div className={`mt-3 p-3 rounded border ${
                      privateContent.includes('denied') || privateContent.includes('Unauthorized')
                        ? 'bg-red-50 border-red-200 text-red-800'
                        : 'bg-purple-50 border-purple-200 text-purple-800'
                    }`}>
                      {privateContent}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}