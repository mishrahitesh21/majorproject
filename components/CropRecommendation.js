// File: components/CropRecommendation.jsx
import { useState } from 'react';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
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
      setTimeout(() => {
        const crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'];
        const recommendedCrop = crops[Math.floor(Math.random() * crops.length)];
        setResult(recommendedCrop);
        setLoading(false);
      }, 1500);
      
      // Actual API call would look something like:
      // const response = await fetch('/api/crop-recommendation', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      // setResult(data.crop);
    } catch (error) {
      console.error('Error submitting data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-6">Crop Recommendation</h2>
      <p className="mb-4 text-gray-800">Enter soil properties and environmental conditions to get a crop recommendation.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Nitrogen (N)</label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Phosphorus (P)</label>
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Potassium (K)</label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
              required
              min="-20"
              max="60"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Humidity (%)</label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
              required
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">pH</label>
            <input
              type="number"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
              required
              min="0"
              max="14"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Rainfall (mm)</label>
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
              required
              min="0"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Get Recommendation'}
          </button>
        </div>
      </form>
      
      {result && (
        <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md">
          <h3 className="text-xl font-medium text-green-800">Recommendation Result</h3>
          <p className="mt-2 text-lg text-gray-800">Based on your inputs, we recommend growing: <span className="font-bold text-green-700">{result}</span></p>
        </div>
      )}
    </div>
  );
}