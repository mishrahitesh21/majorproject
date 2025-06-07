import { useState, useRef } from 'react';

export default function InsectDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null); // 'normal', 'insect', or 'error'
  const [insectName, setInsectName] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Pest control measures for each insect
  const pestControlMeasures = {
    'Africanized Honey Bees (Killer Bees)': 'Contact professional pest control or beekeepers for safe hive removal; avoid self-removal due to aggression.',
    'Aphids': 'Spray insecticidal soap or neem oil; introduce natural predators like ladybugs or lacewings.',
    'Armyworms': 'Apply biological insecticides such as Bacillus thuringiensis (Bt); use parasitic wasps; apply insecticides if infestation is severe.',
    'Brown Marmorated Stink Bugs': 'Handpick and destroy bugs; use insecticides labeled for stink bugs; deploy trap crops and pheromone traps.',
    'Cabbage Loopers': 'Use Bt-based bioinsecticides; apply neem oil or insecticidal soaps; encourage beneficial insects such as parasitic wasps.',
    'Citrus Canker': 'Remove and destroy infected plant parts; apply copper-based bactericides; follow quarantine protocols.',
    'Colorado Potato Beetles': 'Handpick beetles and larvae; use neem oil or spinosad insecticides; encourage natural predators like ladybugs.',
    'Corn Borers': 'Apply insecticides timed to larval stages; introduce natural enemies like Trichogramma wasps; maintain field sanitation.',
    'Corn Earworms': 'Use Bt sprays or targeted insecticides; hand-remove egg masses; promote predators such as lacewings and birds.',
    'Fall Armyworms': 'Use Bt bioinsecticides; apply recommended chemical insecticides on young larvae; encourage parasitic wasps.',
    'Fruit Flies': 'Use bait traps with attractants; apply approved insecticides if heavy infestation; remove and destroy infested fruit.',
    'Spider Mites': 'Spray with miticides or insecticidal soap; use horticultural oils; release predatory mites like Phytoseiulus persimilis.',
    'Thrips': 'Apply insecticidal soaps or neem oil; use systemic insecticides if needed; introduce natural predators like minute pirate bugs.',
    'Tomato Hornworms': 'Handpick caterpillars; use Bt sprays; encourage parasitic wasps and lacewings.',
    'Western Corn Rootworms': 'Apply soil insecticides at planting; use crop rotation; promote natural predators and biological control agents.'
  };

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
    setInsectName(null);
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);
    setInsectName(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:8083/predict/insect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      const prediction = data.prediction;

      // Check if it's a known insect from backend
      const knownInsects = [
        'Africanized Honey Bees (Killer Bees)', 'Aphids', 'Armyworms', 'Brown Marmorated Stink Bugs',
        'Cabbage Loopers', 'Citrus Canker', 'Colorado Potato Beetles', 'Corn Borers',
        'Corn Earworms', 'Fall Armyworms', 'Fruit Flies', 'Spider Mites',
        'Thrips', 'Tomato Hornworms', 'Western Corn Rootworms'
      ];

      const isInsect = knownInsects.includes(prediction);

      setResult(isInsect ? 'insect' : 'normal');
      setInsectName(isInsect ? prediction : null);
    } catch (error) {
      console.error('Error detecting insects:', error);
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setInsectName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-900 mb-6">Insect Detection</h2>
      <p className="mb-4 text-gray-900">Upload an image to detect if it contains insects or is normal.</p>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {!preview ? (
            <div className="space-y-2">
              {/* Upload Icon */}
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
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:bg-gray-400"
            disabled={!image || loading}
          >
            {loading ? 'Analyzing...' : 'Detect Insects'}
          </button>
        </div>
      </div>

      {result && result !== 'error' && (
        <div className={`mt-8 p-4 rounded-md ${result === 'insect' ? 'bg-red-200 border-red-400' : 'bg-green-200 border-green-400'} border`}>
          <h3 className={`text-xl font-medium ${result === 'insect' ? 'text-red-900' : 'text-green-900'} mb-3`}>Detection Result</h3>
          <p className="text-lg text-gray-900 mb-3">
            {result === 'insect' ? (
              <>
                This image contains: <span className="font-bold">{insectName}</span> 🐜
              </>
            ) : (
              <>
                This image is classified as: <span className="font-bold">Normal (No Insects) ✓</span>
              </>
            )}
          </p>
          {result === 'insect' && insectName && pestControlMeasures[insectName] && (
            <div className="bg-red-100 border border-red-300 rounded-md p-3 mt-3">
              <h4 className="font-semibold text-red-900 mb-2">Recommended Pest Control Measures:</h4>
              <p className="text-red-800 text-sm leading-relaxed">{pestControlMeasures[insectName]}</p>
            </div>
          )}
        </div>
      )}

      {result === 'error' && (
        <div className="mt-8 p-4 rounded-md bg-yellow-100 border border-yellow-400">
          <h3 className="text-xl font-medium text-yellow-900">Error</h3>
          <p className="mt-2 text-gray-800">There was an issue analyzing the image. Please try again later.</p>
        </div>
      )}
    </div>
  );
}