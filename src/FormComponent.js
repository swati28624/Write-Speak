import React, { useState } from 'react';
import './FormComponent.css'; // Import your CSS file

const SpeakScores = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const WriteScores = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const Campuses = ['Udaipur', 'Sarjapur', 'Bangalore', 'Pune', 'Raipur', 'Amravati', 'Dantewada', 'Kishanganj', 'Jashpur'];

const FormComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    date: '',
    campus: '',
    speakScore: '',
    writeScore: '',
    speakScreenshotUrl: '',
    writeScreenshotUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem('currentId');
    return savedId ? parseInt(savedId, 10) : 1;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dayId = String(id);
    const submissionData = {
      ...formData,
      dayId,
    };
    console.log("Form data:", submissionData);

    try {
      const url = "https://script.google.com/macros/s/AKfycbxqbo1KGmB8YFvbuPc615_1JKDPO0eZoB3cdQOOmyVUdlfO518BSHt-5fOH7hXCmHgZ/exec";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
        mode: "no-cors",
      });

      console.log("Response from Google Apps Script:", await response.text());
      setSuccessMessage("Thanks for sharing the update!");
      setFormData({
        email: '',
        name: '',
        date: '',
        campus: '',
        speakScore: '',
        writeScore: '',
        speakScreenshotUrl: '',
        writeScreenshotUrl: ''
      });

      setId((prevId) => {
        const newId = prevId + 1;
        localStorage.setItem('currentId', newId.toString());
        return newId;
      });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error sending data to Google Apps Script:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>ReadTheory Level Status</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Date (DD/MM/YYYY):</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          pattern="\d{2}/\d{2}/\d{4}"
          placeholder="DD/MM/YYYY"
          required
        />
      </div>
      <div className="form-group">
        <label>Campus:</label>
        <select name="campus" value={formData.campus} onChange={handleChange} required>
          <option value="">Select Campus</option>
          {Campuses.map((campus, index) => (
            <option key={index} value={campus}>{campus}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Speak Score:</label>
        <select name="speakScore" value={formData.speakScore} onChange={handleChange} required>
          <option value="">Select Speak Score</option>
          {SpeakScores.map((score, index) => (
            <option key={index} value={score}>{score}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Write Score:</label>
        <select name="writeScore" value={formData.writeScore} onChange={handleChange} required>
          <option value="">Select Write Score</option>
          {WriteScores.map((score, index) => (
            <option key={index} value={score}>{score}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Speak Screenshot URL: <span>Upload on Drive and submit link. Date, time and score should be visible</span></label>
        <input
          type="url"
          name="speakScreenshotUrl"
          value={formData.speakScreenshotUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Write Screenshot URL: <span>Upload on Drive and submit link. Date, time and score should be visible</span></label>
        <input
          type="url"
          name="writeScreenshotUrl"
          value={formData.writeScreenshotUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input type="submit" value="Submit" />
      </div>
      {loading && <p>Loading...</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default FormComponent;
