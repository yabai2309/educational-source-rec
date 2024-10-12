import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedLearningStyle, setselectedLearningStyle] = useState('');
  const popularSuggestions = ['Data Science', 'AI/ML', 'Web Development', 'Mathematics'];
  const sectionRefs = useRef([]); 

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
  const handleLearningStyleOption = async(option) => {
    setselectedLearningStyle(option);
    try{
      //Send the selected option to  Flask API
      const response = await axios.post("http://127.0.0.1:5000/api/submit",{
        input: option,
        learningStyle: true,
      });
    } catch(error) {
      console.error("Error submitting option:", error);
    }
  };
  //Scrolling to the top of the next page (but this one havent work yet)
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      },
      { threshold: 0.1 } // Adjust this threshold based on when you want the section to scroll
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-snap-y-mandatory h-screen overflow-y-scroll">
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
        <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full h-9/10 shadow-lg px-30 pb-20 pt-20 m-20 rounded-2xl border border-transparent flex flex-col items-center animate-fadeIn">
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
        <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full h-9/10 shadow-lg px-30 pb-20 pt-20 m-20 rounded-2xl border border-transparent flex flex-col items-center">
          <h2 className="text-2xl m-20 mt-10 mb-2 text-justify text-gray-300 font-sans text-center">Before we proceed, let's personalize your learning experience... </h2>
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
    </div>
    );
};

export default LandingPage;
