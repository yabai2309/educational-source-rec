import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then(response => response.text())
      .then(data => setData(data));
  }, []);

  return (
    <div className="App">
      <h1>Flask says:</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;