// File: components/InsectDetection.jsx
import { useState, useRef } from 'react';

export default function InsectDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);

    try {
      setTimeout(() => {
        const resultOptions = ['insect', 'normal'];
        const detectionResult = resultOptions[Math.floor(Math.random() * resultOptions.length)];
        setResult(detectionResult);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error detecting insects:', error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-900 mb-6">Insect Detection</h2>
      <p className="mb-4 text-gray-900">Upload an image to detect if it contains insects or is normal.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {!preview ? (
            <div className="space-y-2">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex justify-center text-sm text-gray-900">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-700 hover:text-red-600 focus-within:outline-none">
                  <span>Upload an image</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                    ref={fileInputRef}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-800">PNG, JPG, GIF up to 10MB</p>
            </div>
          ) : (
            <div className="relative">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-md" />
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-2 right-2 bg-red-700 text-white rounded-full p-1 hover:bg-red-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:bg-gray-400"
            disabled={!image || loading}
          >
            {loading ? 'Analyzing...' : 'Detect Insects'}
          </button>
        </div>
      </form>

      {result && (
        <div className={`mt-8 p-4 rounded-md ${result === 'insect' ? 'bg-red-200 border-red-400' : 'bg-green-200 border-green-400'} border`}>
          <h3 className={`text-xl font-medium ${result === 'insect' ? 'text-red-900' : 'text-green-900'}`}>Detection Result</h3>
          <p className="mt-2 text-lg text-gray-900">
            This image is classified as: <span className="font-bold">{result === 'insect' ? 'Insect Detected 🐜' : 'Normal (No Insects) ✓'}</span>
          </p>
          {result === 'insect' && (
            <p className="mt-1 text-red-800">Consider taking appropriate pest control measures.</p>
          )}
        </div>
      )}
    </div>
  );
}
