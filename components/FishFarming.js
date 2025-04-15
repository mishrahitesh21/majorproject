// File: components/FishFarming.jsx
import { useState } from 'react';

export default function FishFarming() {
  const [formData, setFormData] = useState({
    ph: '',
    temperature: '',
    turbidity: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/predict/fish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ph: parseFloat(formData.ph),
          temperature: parseFloat(formData.temperature),
          turbidity: parseFloat(formData.turbidity)
        })
      });

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error('Error submitting data:', error);
      setResult('Error fetching recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Fish Farming Recommendation</h2>
      <p className="mb-4 text-gray-900">Enter water parameters to get fish type recommendations for optimal farming.</p>
      

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">pH Level</label>
            <input
              type="number"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              className="w-full text-gray-900 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
              min="0"
              max="14"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Water Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="w-full text-gray-900 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
              min="0"
              max="40"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Turbidity (NTU)</label>
            <input
              type="number"
              name="turbidity"
              value={formData.turbidity}
              onChange={handleChange}
              className="w-full text-gray-900 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
              min="0"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Get Fish Recommendation'}
          </button>
        </div>
      </form>
      
      {result && (
        <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-md">
          <h3 className="text-xl font-medium text-blue-800">Recommendation Result</h3>
          <p className="mt-2 text-lg text-gray-800">Based on your water parameters, we recommend raising: <span className="font-bold text-blue-700">{result}</span></p>
        </div>
      )}
    </div>
  );
}
