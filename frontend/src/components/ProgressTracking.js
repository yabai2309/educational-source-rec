import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Timer function
const Timer = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState(''); // To allow user to modify timer

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    const parsedTime = parseInt(inputTime);
    if (!isNaN(parsedTime)) {
      setTime(parsedTime * 60); // convert minutes to seconds
    }
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(initialTime);
  }; 

  return (//Style the timer here
    <div className="timer">
    <div className='flex flex-col justify-item items-center'>
      <h2 className='text-center text-2xl font-bold text-white '>Study Timer</h2>
      <div className="time-display font-bold text-6xl m-7 text-white">
        {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
      </div>
      <div className="controls flex flex-col">
        <input
          type="text"
          placeholder="Set time (minutes)"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          className="form-control  mb-3 rounded-full p-2"
        />
        <div className='flex flex-row items-center justify-item space-x-4'>
        <button onClick={startTimer} className="grow btn btn-primary bg-gradient-to-r from-fuchsia-600 to-rose-600  
                      hover:from-purple-500 hover:to-pink-500 transition-all duration-500 rounded-full font-bold text-white py-2">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="grow btn btn-primary bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-500 font-bold text-white py-2 ">
          Reset
        </button>
        </div>
      </div>
      </div>
    </div>
  );
};

const ProgressTracking = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [progress, setProgress] = useState(0); // Percentage of progress
  const [showModuleInput, setShowModuleInput] = useState(false);
  const [moduleCount, setModuleCount] = useState('');

  useEffect(() => {
    // Load saved tasks from localStorage if available
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
      updateProgress(savedTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateProgress(tasks);
  }, [tasks]);

  // Add a new task manually
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]); // Clear all tasks
    setProgress(0); // Reset progress bar
  };

  // Update progress based on completed tasks
  const updateProgress = (tasks) => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    setProgress(totalTasks === 0 ? 0 : Math.floor((completedTasks / totalTasks) * 100));
  };

  // Generate tasks based on the number of modules
  const generateCourseTasks = () => {
    const numModules = parseInt(moduleCount);
    if (!isNaN(numModules) && numModules > 0) {
      const generatedTasks = [];
      for (let i = 1; i <= numModules; i++) {
        generatedTasks.push({ text: `Complete Module ${i} of Course A`, completed: false });
      }
      setTasks([...tasks, ...generatedTasks]);
      setShowModuleInput(false); // Hide the module input field after generating tasks
      setModuleCount(''); // Clear the input field
    }
  };

  return (
    <div className="flex flex-row w-full h-screen bg-cover"
    style={{ backgroundImage: 'url(/web3.jpg)' }}>
      <nav className="fixed top-0 w-full z-50 text-white bg-white bg-opacity-10 backdrop-blur-lg ">
        <div className="container mx-auto flex justify-between items-center py-6 px-6">
          <Link to="/" className="text-xl font-bold">ECR</Link> {/* Use Link for routing */}
          <div className="space-x-6">
            <Link to="/" className="hover:underline">Home</Link> {/* Reference to the HomePage component */}
            <Link to="/results" className="hover:underline hover:bold ">Result</Link> {/* Reference to FeaturesPage component */}
            <Link to="/tracking" className="hover:underline">Progress</Link> {/* Reference to PricingPage component */}
          </div>
        </div>
      </nav>
      {/* Left Box: Progress Bar and Course Button */}
      <div className="grow py-20 px-8  bg-white bg-opacity-35 backdrop-blur-lg flex flex-col items-center m-10 mt-20 rounded-3xl items-center">
        <h2 className="p-20 pb-10 m-10 mt-20 mb-0 text-3xl font-bold text-white">Course Progress</h2>
        {/* Progress Bar div */}
        <div className="progress-bar w-4/5 bg-gray-300 rounded-full h-6 my-4 mx-10">
          <div
            className="bg-blue-600 h-full rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className=' flex justify-between space-x-10 '>
        <p className='mt-7 font-bold text-white'>{progress}% of the course completed</p>
        <Link to="/course-page" className="btn btn-primary mt-5 bg-gradient-to-r from-fuchsia-600 to-rose-600  
                      hover:from-purple-500 hover:to-pink-500 transition-all duration-500 rounded-full p-3 text-white font-bold">
          Go to Course
        </Link></div>
      </div>

      {/* Right Box: Timer and To-Do List */}
      <div className=" grow p-8 pt-20 m-10 mt-20 bg-white bg-opacity-35 backdrop-blur-lg basis-3/10 flex flex-col items-center rounded-3xl">
          <Timer initialTime={60 * 60} /> {/* 1 hour default */}
       
        <div className="todo-list mt-8 flex flex-col items-center">
          <h2 className='text-center text-3xl text-white font-bold my-5 '>To-Do List</h2>

          {/* "Generate Course" Button */}
          {!showModuleInput ? (
            <button
              className="btn btn-info mb-4 p-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-teal-400 hover:to-blue-400 transition-all duration-500 rounded-full font-bold text-white "
              onClick={() => setShowModuleInput(true)}
            >
              Generate Course
            </button>
          ) : (
            <div className="mb-4 space-x-6">
              <p className=' text-center text-lg text-white mb-1'>How many module does this course have?</p>
              <input
                type="number"
                className="form-control rounded-full p-2"
                placeholder="Enter number of modules"
                value={moduleCount}
                onChange={(e) => setModuleCount(e.target.value)}
              />
              <button className="btn btn-success mt-2 bg-gradient-to-r from-fuchsia-600 to-rose-600  
                      hover:from-purple-500 hover:to-pink-500 transition-all duration-500 rounded-full font-bold text-white p-2" onClick={generateCourseTasks}>
                Generate
              </button>
            </div>
          )}
          <p className=' text-center text-lg text-white mb-3'>or add your task manually</p>
          <div className="input-group mb-4 space-x-6">
            <input
              type="text"
              className="form-control rounded-full p-2"
              placeholder="Enter a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="btn btn-success bg-gradient-to-r from-fuchsia-600 to-rose-600  
                      hover:from-purple-500 hover:to-pink-500 transition-all duration-500 rounded-full font-bold text-white p-2 px-5" onClick={addTask}>
              Add
            </button>
            {tasks.length > 0 && (
            <button className="btn btn-danger mb-4 bg-gray-700 rounded-full text-sm text-white p-2" onClick={deleteAllTasks}>
              Delete All
            </button>
          )}
          </div>
          
          <ul className="list-group space-y-2 ">
            {tasks.map((task, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center space-x-5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span
                  className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-'}`}
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {task.text}
                </span>
                <button className="btn btn-danger btn-sm bg-gradient-to-r from-fuchsia-600 to-rose-600  
                      hover:from-purple-500 hover:to-pink-500 transition-all duration-500 rounded-full font-bold text-white px-2 " onClick={() => deleteTask(index)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
