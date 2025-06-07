// File: components/FishFarming.js
"use client";

import { useState } from 'react';

export default function FishFarming() {
  const [formData, setFormData] = useState({
    ph: '',
    temperature: '',
    turbidity: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateInputs = () => {
    const { ph, temperature, turbidity } = formData;
    
    if (!ph || !temperature || !turbidity) {
      return 'All fields are required';
    }
    
    const phNum = parseFloat(ph);
    const tempNum = parseFloat(temperature);
    const turbidityNum = parseFloat(turbidity);
    
    if (isNaN(phNum) || isNaN(tempNum) || isNaN(turbidityNum)) {
      return 'All inputs must be valid numbers';
    }
    
    if (phNum < 0 || phNum > 14) {
      return 'pH must be between 0 and 14';
    }
    
    if (turbidityNum < 0) {
      return 'Turbidity cannot be negative';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const requestData = {
        ph: parseFloat(formData.ph),
        temperature: parseFloat(formData.temperature),
        turbidity: parseFloat(formData.turbidity)
      };

      const response = await fetch('http://localhost:8083/predict/fish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (err) {
      setError(err.message || 'Failed to get fish recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ph: '',
      temperature: '',
      turbidity: ''
    });
    setPrediction(null);
    setError('');
  };

  const fishInfo = {
    rohu: "Rohu - A popular freshwater fish, ideal for polyculture systems",
    tilapia: "Tilapia - Hardy fish that grows quickly in warm water",
    catfish: "Catfish - Bottom-dwelling fish that tolerates various water conditions",
    trout: "Trout - Cold water fish requiring high oxygen levels",
    pangasius: "Pangasius - Fast-growing catfish suitable for intensive farming"
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Fish Farming Recommendation</h2>
        <p className="text-gray-800 text-lg">
          Get fish species recommendations based on water conditions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              pH Level
            </label>
            <input
              type="number"
              name="ph"
              value={formData.ph}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              max="14"
              placeholder="6.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
            />
            <p className="text-sm text-gray-700 mt-1 font-medium">Range: 0-14</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Temperature (°C)
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              step="0.1"
              placeholder="25.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
            />
            <p className="text-sm text-gray-700 mt-1 font-medium">Water temperature</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Turbidity (NTU)
            </label>
            <input
              type="number"
              name="turbidity"
              value={formData.turbidity}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              placeholder="5.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
            />
            <p className="text-sm text-gray-700 mt-1 font-medium">Water clarity (≥0)</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Getting Recommendation...
              </>
            ) : (
              'Get Fish Recommendation'
            )}
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {prediction && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-green-800">Recommended Fish Species</h3>
          </div>
          
          <div className="bg-white rounded-md p-4 border border-green-200">
            <span className="text-2xl font-bold text-green-700 capitalize block mb-2">{prediction}</span>
            <p className="text-gray-800 font-medium">
              {fishInfo[prediction.toLowerCase()] || "Suitable fish species for your water conditions"}
            </p>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded p-3 border border-gray-300">
              <span className="font-bold text-gray-900">pH Level:</span>
              <span className="ml-2 text-blue-700 font-semibold">{formData.ph}</span>
            </div>
            <div className="bg-white rounded p-3 border border-gray-300">
              <span className="font-bold text-gray-900">Temperature:</span>
              <span className="ml-2 text-blue-700 font-semibold">{formData.temperature}°C</span>
            </div>
            <div className="bg-white rounded p-3 border border-gray-300">
              <span className="font-bold text-gray-900">Turbidity:</span>
              <span className="ml-2 text-blue-700 font-semibold">{formData.turbidity} NTU</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}