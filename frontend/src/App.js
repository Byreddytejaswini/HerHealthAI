import React, { useState } from "react";

function App() {

  const [features, setFeatures] = useState({
    age: "",
    weight: "",
    height: "",
    bmi: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      features: [
        Number(features.age),
        Number(features.weight),
        Number(features.height),
        Number(features.bmi)
      ]
    };

    try {

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const resultData = await response.json();

      if (resultData.prediction === 1) {
        setResult("PCOS Risk Detected");
      } else {
        setResult("No PCOS Risk");
      }

    } catch (error) {
      console.error(error);
      setResult("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>HerHealth AI</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="weight"
          placeholder="Weight"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="height"
          placeholder="Height"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="bmi"
          placeholder="BMI"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Predict</button>

      </form>

      <h2>{result}</h2>

    </div>
  );
}

export default App;