// import React, { useState } from 'react';
// import "./App.css";

// const SpeakingAndWritingForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     date: '',
//     campus: '',
//     speakScore: '',
//     writeScore: '',
//     speakScreenshot: '',
//     writeScreenshot: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [id, setId] = useState(() => {
//     const savedId = localStorage.getItem('currentId');
//     return savedId ? parseInt(savedId, 10) : 1;
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const dayId = String(id);
//     const submissionData = {
//       ...formData,
//       dayId,
//     };
//     console.log("Form data:", submissionData);

//     try {
//       const url = "https://script.google.com/a/macros/navgurukul.org/s/AKfycbzpkkKZ-poEaaAIg5aIhub_hcetehbuEWGruQ7ktlh_T7SGqrJpi-eW5_NSeJsJja665Q/exec";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submissionData),
//         mode: "no-cors",
//       });

//       console.log("Response from Google Apps Script:", await response.text());
//       setSuccessMessage("Thanks for sharing the update!");
//       setFormData({
//         email: '',
//         name: '',
//         date: '',
//         campus: '',
//         speakScore: '',
//         writeScore: '',
//         speakScreenshot: '',
//         writeScreenshot: '',
//       });

//       setId((prevId) => {
//         const newId = prevId + 1;
//         localStorage.setItem('currentId', newId.toString());
//         return newId;
//       });

//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Error sending data to Google Apps Script:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <fieldset>
//         <legend>Speaking and Writing Form</legend>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         {/* Other form inputs */}
//       </fieldset>
//       <input type="submit" value="Submit" />
//       {loading && <p>Loading...</p>}
//       {successMessage && <p>{successMessage}</p>}
//     </form>
//   );
// };

// export default SpeakingAndWritingForm;
