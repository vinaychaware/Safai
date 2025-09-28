import React from 'react';
import { Leaf } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
            Smart Waste Management
          </h1>
          <p className="text-gray-600 font-medium">
            Efficient • Transparent • Sustainable
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="text-left">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Role
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200">
              <option value="">Select Your Role</option>
              <option value="superadmin">Superadmin</option>
              <option value="admin">Admin</option>
              <option value="green-champion">Green Champion</option>
              <option value="worker">Worker</option>
              <option value="citizen">Citizen</option>
            </select>
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
              placeholder="Enter your email"
              defaultValue="demo@example.com"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
              placeholder="Enter your password"
              defaultValue="password"
            />
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl">
          <span className="flex items-center justify-center gap-2">
            <Leaf className="w-5 h-5" />
            Sign In
          </span>
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Demo Accounts Available</p>
          <p className="text-xs text-gray-500">Select any role above and use the pre-filled credentials</p>
        </div>
      </div>
    </div>
  );
}

export default App;