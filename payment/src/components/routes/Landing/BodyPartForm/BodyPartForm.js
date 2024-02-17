// src/components/routes/LandingPage/BodyPartForm/BodyPartForm.js

import React, { useState } from 'react';

const availableBodyParts = {
  men: {
    trial: ['face', 'body', 'legs'],
    permanent: ['face', 'body', 'legs', 'arms', 'back'],
  },
  women: {
    trial: ['face', 'body', 'legs'],
    permanent: ['face', 'body', 'legs', 'arms', 'back'],
  },
  others: {
    trial: ['face', 'body', 'legs'],
    permanent: ['face', 'body', 'legs', 'arms', 'back'],
  },
};

const trialMap = {
  face: 1000,
  body: 2000,
  legs: 1500,
  arms: 2500,
  back: 3000,
};

const permanentMap = {
  face: 5000,
  body: 10000,
  legs: 5000,
  arms: 7500,
  back: 10000,
};

const BodyPartForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    gender: 'men',
    purchaseType: 'trial',
    selectedBodyParts: [],
    selectedDate: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phoneNumber || !formData.email || !formData.selectedDate) {
      alert('Please fill in all the required fields');
      return;
    }

    const apiUrl = 'https://snyllo-payment.onrender.com/user-details-bookform';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error submitting form');
      }

      console.log('Submission successful');
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting the form. Please try again.');
      setSubmitStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBodyPartChange = (e) => {
    const bodyPart = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedBodyParts: prevData.selectedBodyParts.includes(bodyPart)
        ? prevData.selectedBodyParts.filter((part) => part !== bodyPart)
        : [...prevData.selectedBodyParts, bodyPart],
    }));
  };

  const calculateTotalPrice = () => {
    const selectedPriceMap = formData.purchaseType === 'trial' ? trialMap : permanentMap;
    return [formData.selectedBodyParts].reduce((total, part) => total + selectedPriceMap[part], 0);
  };
  return (
    <div>
    <h1>Snyllo Estetica</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
          type="text" 
          value={formData.name} 
          onChange={handleChange} 
          name="name"
          required  
          />
        </label><br /><br />

        <label>
          Phone Number:
          <input 
          type="number" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
          name="phoneNumber"
          required
          />
        </label><br /><br />

        <label>
          Email:
          <input 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          name="email"
          required
          />
        </label><br /><br />

          <label>
            Choose Gender:
            <select 
            value={formData.gender} 
            onChange={handleChange}
            name="gender"
            required
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="others">Others</option>
            </select>
          </label><br /><br />

          <label>
            Choose Purchase Type:
            <select 
            value={formData.purchaseType} 
            onChange={handleChange}
            name="purchaseType"
            required
            >
              <option value="trial">Trial</option>
              <option value="permanent">Package</option>
            </select>
          </label><br /><br />

          <h2>Our Services</h2>
          {availableBodyParts[formData.gender][formData.purchaseType].map(part => (
            <label key={part}>
              <input 
              type="checkbox" 
              value={part} 
              checked={[formData.selectedBodyParts].includes(part)} 
              onChange={handleChange} 
              name="selectedBodyParts" 
              /> {part.charAt(0).toUpperCase() + part.slice(1)} - ₹{formData.purchaseType === 'trial' ? trialMap[part] : permanentMap[part]}
            </label>
          ))}
          <br /><br />

          <label>
            Select Date:
            <input 
            type="date" 
            value={formData.selectedDate} 
            onChange={handleChange} 
            name="selectedDate"
            required
            />
          </label><br /><br />

          <label>
            Total Amount: ₹{calculateTotalPrice()}
          </label><br /><br />

          <button onClick={handleSubmit}>Proceed to Payment</button>
        </form>
        {submitStatus && (
          <p className={submitStatus === 'success' ? 'success-message' : 'error-message'}>
            {submitStatus === 'success' ? 'Thank you for contacting us, we will be in touch shortly!' : 'Error submitting form. Please try again.'}
          </p>
        )}
    </div>
  );
};

export default BodyPartForm;
