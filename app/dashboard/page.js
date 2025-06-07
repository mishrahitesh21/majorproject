// File: app/dashboard/page.js
"use client";

import { useState } from 'react';
import Link from 'next/link';
import CropRecommendation from '../../components/CropRecommendation';
import FishFarming from '../../components/FishFarming';
import InsectDetection from '../../components/InsectDetection';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('crop');
  const [fishModelVersion, setFishModelVersion] = useState('v1');

  // Define tabs configuration for easier maintenance
  const tabs = [
    { id: 'crop', label: 'Crop Recommendation', component: <CropRecommendation /> },
    { 
      id: 'fish', 
      label: 'Fish Farming', 
      component: <FishFarming modelVersion={fishModelVersion} /> 
    },
    { id: 'insect', label: 'Insect Detection', component: <InsectDetection /> }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-700 text-white p-6 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold">Agricultural Assistant</h1>
            <p className="mt-2">Crop, Fish, and Insect Management System</p>
          </div>
          <Link 
            href="/" 
            className="bg-green-600 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6 max-w-4xl">
        {/* Navigation Tabs */}
        <div className="flex border-b border-green-300 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 font-medium whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fish Model Version Selection - Show only when Fish tab is active */}
        {activeTab === 'fish'}

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 text-center mt-8">
        <p>Agricultural Assistant © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}