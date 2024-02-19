// src/components/routes/LandingPage/BodyPartForm/BodyPartForm.js


import React, { useState } from 'react';
import './BodyPartForm.css'; 

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
    gender: 'women',
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    // For checkboxes, handle selectedBodyParts separately
    if (type === 'checkbox' && name === 'selectedBodyParts') {
      // If checked, add the value to the selectedBodyParts array
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          selectedBodyParts: [...prevData.selectedBodyParts, value],
        }));
      } else {
        // If unchecked, remove the value from the selectedBodyParts array
        setFormData((prevData) => ({
          ...prevData,
          selectedBodyParts: prevData.selectedBodyParts.filter(part => part !== value),
        }));
      }
    } else {
      // For other input fields, update the form data normally
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  const calculateTotalPrice = () => {
    const selectedPriceMap = formData.purchaseType === 'trial' ? trialMap : permanentMap;
    return formData.selectedBodyParts.reduce((total, part) => total + selectedPriceMap[part], 0);
  };


  return (
    <div>
      <section className='above-form'>

        <img 
          src="/upload/yoyo.jpg"
          className='yoyo'
          alt="yoyo"
        />

        <div className='form-header'>
          <img 
          src="/upload/logo.png"
          className='logo'
          alt="logo"
          />
        </div>

      </section>
      <div className='container-payment'>
        
      <form 
      onSubmit={handleSubmit} 
      className='form-payment'
      >
        <div className='form-heading'>
          <div className='form-line1'>Book Your Appointment</div>
        </div>

        
          <div className='basic'>
            <label>
              Name
              <input 
              type="text" 
              placeholder="Your Name*"
              name="name"
              className="name"
              value={formData.name} 
              onChange={handleChange} 
              required  
              />

            </label>

            
            
            <label>
              Contact

              <input 
              type="text" 
              placeholder="Phone Number*"
              name="phoneNumber"
              className="phoneNumber"
              value={formData.phoneNumber} 
              onChange={handleChange} 
              pattern="[0-9]{10}"
              required
              />

            </label>

            
            
            <label>
              Email

              <input 
              type="email" 
              placeholder="Email Address*"
              name="email"
              className="email"
              value={formData.email}
              onChange={handleChange}
              required
              />

            </label>
          </div>
          
          
          

          <div className='based'>
              <label>
              Gender
              <select
                  type="text"
                  placeholder="Gender"
                  name="gender"
                  className="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
              >
                      
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="others">Others</option>

              </select>
            </label>

            <label>
              Select Package

            <select
                type="text"
                placeholder="Trial"
                name="purchaseType"
                className="purchase"
                value={formData.purchaseType}
                onChange={handleChange}
                required 
            >
              <option value="trial">Trial</option>
              <option value="permanent">Package</option>

            </select>

            </label>


            <label>
              Date
             <input 
              type="date" 
              value={formData.selectedDate} 
              onChange={handleChange} 
              name="selectedDate"
              className='tags'
              required
             />
            </label>
          </div>

          <h2 className='mid-heading'>Our Services</h2>

          {availableBodyParts[formData.gender][formData.purchaseType].map(part => (
            <label key={part}>
              <input 
                type="checkbox" 
                className='types'
                value={part} 
                checked={formData.selectedBodyParts.includes(part)} 
                onChange={handleChange} 
                name="selectedBodyParts" 
              /> {part.charAt(0).toUpperCase() + part.slice(1)} - ₹{formData.purchaseType === 'trial' ? trialMap[part] : permanentMap[part]}
            </label>
          ))}

          <br /><br />
          

          <label className='total'>
            Total Amount: ₹{calculateTotalPrice()}
          </label><br /><br />

          <button className='submit-button' type="submit" onClick={handleSubmit}>Proceed to Payment</button>
        </form>
        {submitStatus && (
          <p className={submitStatus === 'success' ? 'success-message' : 'error-message'}>
            {submitStatus === 'success' ? 'Thank you for contacting us, we will be in touch shortly!' : 'Error submitting form. Please try again.'}
          </p>
        )}
      </div>

      

      <button className='website'>
            <a 
            href="https://snylloestetica.com/"
            className='linkis'
            >SnylloEstetica.com
            </a>
      </button>
    </div>
  );
};

export default BodyPartForm;

