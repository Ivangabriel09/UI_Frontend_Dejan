import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    gender: "Male",
    age: "",
    grade_level: "",
    reading_score: "",
    writing_score: "",
    attendance_rate: "",
    parent_education: "",
    study_hours: "",
    internet_access: "Yes",
    lunch_type: "Standard",
    extra_activities: "None",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Student Result Predictor</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>{key.replace(/_/g, " ")}:</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Get Prediction</button>
      </form>
      {result !== null && (
        <div className="result">
          Prediction: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
