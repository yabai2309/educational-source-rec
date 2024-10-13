import React from 'react';
import { useLocation } from 'react-router-dom'; // To get passed state

const ResultsPage = () => {
  const location = useLocation(); // Get the state from the previous page
  const resultData = location.state?.result; // Access the result data

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border shadow-lg w-4/5 max-w-4xl p-10">
        <h1 className="text-4xl font-bold mb-6">Your Personalized Learning Plan</h1>
        <p className="text-2xl mb-4">Here are your recommended results:</p>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
          {JSON.stringify(resultData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ResultsPage;
