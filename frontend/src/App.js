import React, { useState } from "react";

function App() {

 const [features, setFeatures] = useState({
  age: "",
  bmi: "",
  weightgain: "",
  irregularperiods: "",
  hairgrowth: "",
  pimples: "",
  skindarkening: ""
});

const [result, setResult] = useState("");
const [confidence, setConfidence] = useState("");

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
  Number(features.bmi),
  Number(features.weightgain),
  Number(features.irregularperiods),
  Number(features.hairgrowth),
  Number(features.pimples),
  Number(features.skindarkening)
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
  setResult("⚠ PCOS Risk Detected");
} else {
  setResult("✅ No PCOS Risk");
}

setConfidence(resultData.confidence + "%");

    } catch (error) {
      console.error(error);
      setResult("❌ Error connecting to backend");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>HerHealth AI</h1>

        <p style={styles.subtitle}>
          AI-Powered PCOS Prediction System
        </p>

        <form onSubmit={handleSubmit}>

          <input
  type="number"
  name="age"
  placeholder="Age"
  style={styles.input}
  onChange={handleChange}
/>

<input
 type="number"
step="0.1"
  name="bmi"
  placeholder="BMI"
  style={styles.input}
  onChange={handleChange}
/>

<input
  type="number"
  name="weightgain"
  placeholder="Weight Gain (0 or 1)"
  style={styles.input}
  onChange={handleChange}
/>

<input
  type="number"
  name="irregularperiods"
  placeholder="Irregular Periods (0 or 1)"
  style={styles.input}
  onChange={handleChange}
/>

<input
  type="number"
  name="hairgrowth"
  placeholder="Hair Growth (0 or 1)"
  style={styles.input}
  onChange={handleChange}
/>

<input
  type="number"
  name="pimples"
  placeholder="Pimples (0 or 1)"
  style={styles.input}
  onChange={handleChange}
/>

<input
  type="number"
  name="skindarkening"
  placeholder="Skin Darkening (0 or 1)"
  style={styles.input}
  onChange={handleChange}
/>

          <button type="submit" style={styles.button}>
            Predict
          </button>

        </form>

        {confidence && (
  <h3 style={{ color: "#555" }}>
    Confidence: {confidence}
  </h3>
)}

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffe6f0",
    fontFamily: "Arial"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "350px",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  title: {
    color: "#ff4d88",
    marginBottom: "10px"
  },

  subtitle: {
    color: "gray",
    marginBottom: "30px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#ff4d88",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer"
  },

  result: {
    marginTop: "20px",
    color: "#333"
  }

};

export default App;