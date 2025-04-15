import { useState } from 'react';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    n: '',
    p: '',
    k: '',
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
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/predict/crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          n: parseFloat(formData.n),
          p: parseFloat(formData.p),
          k: parseFloat(formData.k),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          ph: parseFloat(formData.ph),
          rainfall: parseFloat(formData.rainfall)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error getting recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-6">Crop Recommendation</h2>
      <p className="mb-4 text-gray-800">Enter soil properties and environmental conditions to get a crop recommendation.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['n', 'Nitrogen (N)'],
            ['p', 'Phosphorus (P)'],
            ['k', 'Potassium (K)'],
            ['temperature', 'Temperature (°C)'],
            ['humidity', 'Humidity (%)'],
            ['ph', 'pH'],
            ['rainfall', 'Rainfall (mm)']
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-800 focus:ring-green-500 focus:border-green-500"
                required
                step="0.01"
              />
            </div>
          ))}
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
          <p className="mt-2 text-lg text-gray-800">
            Based on your inputs, we recommend growing: <span className="font-bold text-green-700">{result}</span>
          </p>
        </div>
      )}
    </div>
  );
}
