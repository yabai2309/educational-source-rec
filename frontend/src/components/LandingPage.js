import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedLearningStyle, setSelectedLearningStyle] = useState('');
  const [loading, setLoading] = useState(false);

  const popularSuggestions = ['Data Science', 'AI/ML', 'Web Development', 'Mathematics'];

  const sectionRefs = useRef([]); 
  const glassDivRef1 = useRef(null);
  const glassDivRef2 = useRef(null);
  const navigate = useNavigate();

  //Track the changes in the input box
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //When user click the suggest buttons, it should be type to the input box
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  //When user hit submit, send data to back end to confirm back end has received the data, then move on to the next question
  const handleSubmit = async () => {
    try {
      // Send the user input to the Flask API
      const response = await axios.post('http://127.0.0.1:5000/api/submit', {
        input: inputValue,
        topic: true,
      });

      // Handle the response from the Flask API
      //setResponseMessage(response.data.message);
      if (sectionRefs.current[1]) {
        sectionRefs.current[1].scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error submitting input:', error);
    }
    if (sectionRefs.current[1]) {
      sectionRefs.current[1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  //Handle the response for the second question: How confident are you with this topic?, then move user to the next question
  const handleComplexityOption = async(option) => {
    setSelectedOption(option);
    
    try{
      //Send the selected option to  Flask API
      const response = await axios.post("http://127.0.0.1:5000/api/submit",{
        input: option,
        complexity:true,
      });
      
      if(sectionRefs.current[2]){
        sectionRefs.current[2].scrollIntoView({behavior:'smooth'});
      }
    } catch(error){
      console.error("Error submitting option:", error);
    }
    if (sectionRefs.current[2]) {
      sectionRefs.current[2].scrollIntoView({ behavior: 'smooth' });
    }
  };

  //Handle the response for the last question: What type of learner are you? 
  const handleLearningStyleOption = async (option) => {
    setSelectedLearningStyle(option);  // Save learning style

    // Ensure all inputs are collected
    if (inputValue && selectedOption && option) {
      setLoading(true);  // Show loading indicator

      // Prepare all the data in one object
      const allData = {
        topic: inputValue,         // Topic entered by user
        complexity: selectedOption,  // Complexity selected by user
        learningStyle: option,       // Learning style selected by user
      };

      try {
        // Send all data in a single request to the back-end
        const response = await axios.post('http://127.0.0.1:5000/api/submit', allData);
        const resultData = response.data;  // Get result from back-end
        setLoading(false);  // Stop loading indicator

        // Navigate to the results page with the response data
        navigate('/results', { state: { result: resultData } });
      } catch (error) {
        console.error('Error submitting data:', error);
        setLoading(false);
      }
    }
  };
  //Scrolling to the top of the next page (but this one havent work yet)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a class to trigger the slide-in effect
            entry.target.classList.add('animate-slideIn');
          } else {
            // Optionally: Remove the class when out of view
            entry.target.classList.remove('animate-slideIn');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is in view
    );
  
    // Observe Section 2
    if (glassDivRef1.current) {
      observer.observe(glassDivRef1.current);
    }
    if (glassDivRef2.current) {
      observer.observe(glassDivRef2.current);
    }
  
    // Clean up observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-snap-y-mandatory h-screen overflow-y-scroll">
    {/* Show a loading indicator when loading is true */}
    {loading ? (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-fuchsia-900 to-blue-900">
        <svg
          className="animate-spin h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <div className="text-white text-4xl mt-4 text-bold">Loading...</div>
      </div>
    ) : (
      <>
      {/* Section 1 */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)} // Store section reference
        className="min-h-screen bg-cover flex flex-row items-center justify-center snap-start"
        style={{ backgroundImage: 'url(/webbg.jpg)' }}
      >
        {/*Glass card div*/}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-transparent shadow-lg w-4/5 max-w-4xl h-4/5 max-h-2xl transform scale-105 transition-all duration-500 overflow-auto flex flex-col items-center justify-center p-16 animate-fadeIn">

          <h1 className="text-5xl text-white font-system-ui font-bold mb-6 pb-10 pt-8 text-center">What do you want to learn today?</h1>
          <div className="flex w-full space-x-4">
          {/* Input box */}
          <input
            className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring focus:border-gray-200 "
            type="text"
            placeholder="Type a topic..."
            value={inputValue}
            onChange={handleInputChange}
          />

          {/* Submit button */}
          <button
          className=" mr-5 bg-gradient-to-r from-fuchsia-600 to-rose-600  
                      hover:from-purple-500 hover:to-pink-500 transition-all duration-500
                      rounded-lg p-3 text-white"
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

        </div>
      </section>
      {/* Section 2 */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)} // Store section reference for auto-scroll
        className="min-h-screen bg-cover flex items-center justify-center  text-white snap-start"
        style={{ backgroundImage: 'url(/webbg2.jpg)'}}
      >
        {/*Glass div*/}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full h-9/10 shadow-lg px-30 pb-20 pt-20 m-20 rounded-2xl border border-transparent flex flex-col items-center animate-fadeIn"
        ref={glassDivRef1}>
          <h2 className="text-2xl m-20 mt-10 mb-2 text-justify text-gray-300 font-sans text-center">Before we proceed, let's personalize your learning experience... </h2>
          <h1 className="text-6xl mx-20 mb-5 mt-10 text-justify font-bold font-sans"> How confident are you with this topic?</h1>
        
          <div className="flex flex-wrap justify-center mt-7 mb-10 animate-slideIn">
              <button
                className="m-2 p-2 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-500 py-3 px-5"
                onClick={()=> handleComplexityOption('Advance')}>
                Advanced
              </button>
              <button
                className="m-2 p-2 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-500 py-3 px-5"
                onClick={() => handleComplexityOption('Intermediate')}>
                Intermediate
              </button>
              <button
                className="m-2 p-2 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-500 py-3 px-5"
                onClick={() => handleComplexityOption('Beginner')}>
                Beginner
              </button>
      
          </div>
        </div>
        
      </section>

      {/* Section 3 */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)} // Store section reference for auto-scroll
        className="min-h-screen bg-cover flex items-center justify-center  text-white snap-start"
        style={{ backgroundImage: 'url(/web3.jpg)'}}
      >
        {/*Glass div*/}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full h-9/10 shadow-lg px-30 pb-20 pt-20 m-20 rounded-2xl border border-transparent flex flex-col items-center"
        ref={glassDivRef2}>
          <h2 className="text-2xl m-20 mt-10 mb-2 text-justify text-gray-300 font-sans text-center">Just one more question... </h2>
          <h1 className="text-6xl mx-20 mb-5 mt-10 text-justify font-bold font-sans"> What type of learner are you?</h1>
        
          <div className="flex flex-wrap justify-center mt-7 mb-10 animate-slideIn">
              <button
                className="m-2 p-2 bg-gradient-to-r font-bold from-sky-500 to-indigo-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-500 py-3 px-5"
                onClick={ ()=> handleLearningStyleOption('Visual')}
                >
                Visual
              </button>
              <button
                className="m-2 p-2 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-500 py-3 px-5"
                onClick={ () => handleLearningStyleOption('Read')}
                >
                Read
              </button>
              <button
                className="m-2 p-2 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-500 py-3 px-5"
                onClick={ () => handleLearningStyleOption('Kinaesthetic')}>
                Kinaesthetic
              </button>
      
          </div>
        </div>
      </section>
      </>
    )}
    </div> 
    );
};

export default LandingPage;
