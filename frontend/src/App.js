import React, { useState } from "react";

function App() {

  const [features, setFeatures] = useState({
    age: "",
    weight: "",
    height: "",
    bmi: "",
    weightgain: "",
    irregularperiods: "",
    hairgrowth: "",
    pimples: "",
    skindarkening: ""
  });

  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

  const handleChange = (e) => {

    const updatedFeatures = {
      ...features,
      [e.target.name]: e.target.value
    };

    // Auto BMI Calculation
    const weight = parseFloat(updatedFeatures.weight);
    const heightCm = parseFloat(updatedFeatures.height);

    if (weight && heightCm) {

      const heightM = heightCm / 100;

      const bmi = (
        weight / (heightM * heightM)
      ).toFixed(1);

      updatedFeatures.bmi = bmi;
    }

    setFeatures(updatedFeatures);
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

      // Prediction Result
      if (resultData.prediction === 1) {

        setResult("⚠ PCOS Risk Detected");

        setRecommendation(
          "Maintain a healthy diet, exercise regularly, manage stress, and consult a gynecologist for proper medical guidance."
        );

      } else {

        setResult("✅ No PCOS Risk");

        setRecommendation(
          "Continue maintaining a healthy lifestyle with balanced nutrition and regular physical activity."
        );
      }

      // Confidence Score
      setConfidence(resultData.confidence + "%");

      // Risk Level Logic
      if (resultData.prediction === 1) {

        if (resultData.confidence < 60) {
          setRiskLevel("🟢 Low Risk");
        }
        else if (resultData.confidence < 80) {
          setRiskLevel("🟠 Moderate Risk");
        }
        else {
          setRiskLevel("🔴 High Risk");
        }

      } else {

        setRiskLevel("🟢 No Significant Risk");
      }

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
            name="weight"
            placeholder="Weight (kg)"
            style={styles.input}
            onChange={handleChange}
          />

          <input
            type="number"
            step="0.1"
            name="height"
            placeholder="Height (cm)"
            style={styles.input}
            onChange={handleChange}
          />

          <input
            type="number"
            value={features.bmi}
            placeholder="Calculated BMI"
            style={styles.input}
            readOnly
          />

          <select
            name="weightgain"
            style={styles.input}
            onChange={handleChange}
          >
            <option value="">Weight Gain</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select
            name="irregularperiods"
            style={styles.input}
            onChange={handleChange}
          >
            <option value="">Irregular Periods</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select
            name="hairgrowth"
            style={styles.input}
            onChange={handleChange}
          >
            <option value="">Hair Growth</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select
            name="pimples"
            style={styles.input}
            onChange={handleChange}
          >
            <option value="">Pimples</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select
            name="skindarkening"
            style={styles.input}
            onChange={handleChange}
          >
            <option value="">Skin Darkening</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <button type="submit" style={styles.button}>
            Predict
          </button>

        </form>

        {result && (
          <h2 style={styles.result}>
            {result}
          </h2>
        )}

        {confidence && (
          <h3 style={{ color: "#555" }}>
            Confidence: {confidence}
          </h3>
        )}

        {riskLevel && (
          <h3 style={{ color: "#444" }}>
            Risk Level: {riskLevel}
          </h3>
        )}

        {recommendation && (
          <p style={styles.recommendation}>
            {recommendation}
          </p>
        )}

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffe6f0",
    fontFamily: "Arial",
    padding: "20px"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "380px",
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
    fontSize: "16px",
    outline: "none"
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
  },

  recommendation: {
    marginTop: "15px",
    color: "#555",
    fontSize: "15px",
    lineHeight: "1.5"
  }

};

export default App;