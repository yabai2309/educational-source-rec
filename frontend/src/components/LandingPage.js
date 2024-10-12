import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const popularSuggestions = ['Data Science', 'AI/ML', 'Web Development', 'History', 'Mathematics'];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleSubmit = async () => {
    try {
      // Send the user input to the Flask API
      const response = await axios.post('http://127.0.0.1:5000/api/submit', {
        input: inputValue,
      });

      // Handle the response from the Flask API
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting input:', error);
    }
  };

  return (
    //Background div
    <div className="min-h-screen bg-cover flex flex-row items-center justify-center" 
      style={{ backgroundImage: "url(/webbg.jpg)"}}>
      {/*Glass card div*/}
       <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-transparent shadow-lg w-4/5 max-w-4xl h-4/5 max-h-2xl transform scale-105 transition-all duration-500 overflow-auto flex flex-col items-center justify-center p-16 animate-fadeIn">

        <h1 className="text-6xl font-mono mb-6 text-rose-50 pb-8 text-justify">What do you want to learn today?</h1>
        <div className="flex w-full space-x-4">
        {/* Input box */}
        <input
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring focus:border-gray-200"
          type="text"
          placeholder="Type a topic..."
          value={inputValue}
          onChange={handleInputChange}
        />

        {/* Submit button */}
        <button
        className=" p-3 bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
        </div>
        {/* Popular Suggestions */}
        <div className="flex flex-wrap justify-center mt-6  animate-slideIn">
          {popularSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="m-2 p-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:from-teal-400 hover:to-blue-400 transition-all duration-500"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Display response */}
        {responseMessage && (
          <div className="mt-4 p-3 bg-green-500 text-white rounded-lg">
            {responseMessage}
          </div>)}
      </div>
    </div>
  );
};

export default LandingPage;
