import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();  // Get the location object
  const resultData = location.state?.result;  // Extract result data from state

  // Debugging: Log the result data to verify it's available
  console.log('Result Data:', resultData);

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
      <div className="bg-gray-200 bg-opacity-10 backdrop-blur-lg rounded-2xl border shadow-lg w-4/5 max-w-4xl p-10">
        <h1 className="text-4xl font-bold mb-6">Course Details</h1>
        
        {/* Display course details if result is available */}
        {resultData ? (
          <div>
            <h2 className="text-3xl mb-4">{resultData.title}</h2>
            <p className="text-2xl mb-2">Platform: {resultData.platform}</p>
            <p className="text-xl mb-2">Categories: {resultData.categories.join(', ')}</p>
            <p className="text-xl mb-2">Rating: {resultData.rating}</p>
            <p className="text-xl mb-2">Price: {resultData.price}</p>
            <p className="text-xl mb-2">Level: {resultData.level}</p>
            <p className="text-xl">Collaborator: {resultData.collaborator}</p>
            <a className="text-xl text-blue-500 underline" href={resultData.url} target="_blank" rel="noopener noreferrer">Go to Course</a>
          </div>
        ) : (
          <p className="text-2xl text-red-600">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
