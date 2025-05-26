"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Simple admin credentials (in production, use proper authentication)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (credentials.username === ADMIN_CREDENTIALS.username && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: '', password: '' });
    setError('');
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // Mock data for admin dashboard
  const systemStats = {
    totalUsers: 1245,
    activeRecommendations: 89,
    detectedInsects: 156,
    fishFarms: 34
  };

  const recentActivity = [
    { id: 1, action: 'New crop recommendation generated', user: 'farmer@example.com', time: '2 mins ago' },
    { id: 2, action: 'Insect detection alert sent', user: 'john@farm.com', time: '15 mins ago' },
    { id: 3, action: 'Fish farming data updated', user: 'aqua@fish.com', time: '1 hour ago' },
    { id: 4, action: 'New user registered', user: 'newuser@email.com', time: '2 hours ago' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🔐</div>
              <h1 className="text-2xl font-bold text-black">Admin Login</h1>
              <p className="text-gray-700 mt-2">Access the administrative dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-green-600 hover:text-green-800 transition-colors font-medium">
                ← Back to Home
              </Link>
            </div>

            {/* Demo credentials info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-900 font-medium mb-2">Demo Credentials:</p>
              <p className="text-sm text-blue-800">Username: <code className="bg-blue-100 px-1 py-0.5 rounded">admin</code></p>
              <p className="text-sm text-blue-800">Password: <code className="bg-blue-100 px-1 py-0.5 rounded">admin123</code></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">⚙️</div>
              <div>
                <h1 className="text-xl font-bold text-black">Admin Dashboard</h1>
                <p className="text-sm text-gray-700">Agricultural Assistant Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👥</div>
              <div>
                <p className="text-sm font-medium text-gray-700">Total Users</p>
                <p className="text-2xl font-bold text-black">{systemStats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🌾</div>
              <div>
                <p className="text-sm font-medium text-gray-700">Active Recommendations</p>
                <p className="text-2xl font-bold text-black">{systemStats.activeRecommendations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🐛</div>
              <div>
                <p className="text-sm font-medium text-gray-700">Detected Insects</p>
                <p className="text-2xl font-bold text-black">{systemStats.detectedInsects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🐟</div>
              <div>
                <p className="text-sm font-medium text-gray-700">Fish Farms</p>
                <p className="text-2xl font-bold text-black">{systemStats.fishFarms}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-black">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">{activity.action}</p>
                    <p className="text-sm text-gray-700">{activity.user}</p>
                  </div>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-black mb-4">System Management</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                Manage Users
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                System Settings
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                View Logs
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-black mb-4">Data Management</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                Export Data
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                Backup System
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                Analytics
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-black mb-4">Quick Access</h3>
            <div className="space-y-3">
              <Link 
                href="/dashboard"
                className="block w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 text-green-800 rounded-md transition-colors font-medium cursor-pointer"
              >
                View Dashboard
              </Link>
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                Generate Reports
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-gray-800 font-medium cursor-pointer">
                Support Center
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}