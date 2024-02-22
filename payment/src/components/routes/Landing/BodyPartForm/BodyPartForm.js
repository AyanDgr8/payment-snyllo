// src/components/routes/LandingPage/BodyPartForm/BodyPartForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BodyPartForm.css'; 

const availableBodyParts = {
  men: {
    trial: ['chin', 'upperlip', 'underarms'],
    permanent: ['full', 'face', 'legs', 'arms', 'chest', 'back'],
  },
  women: {
    trial: ['chin', 'upperlip', 'underarms'],
    permanent: ['full', 'face', 'legs', 'arms', 'chest', 'back'],
  },
  others: {
    trial: ['chin', 'upperlip', 'underarms'],
    permanent: ['full', 'face', 'legs', 'arms', 'chest', 'back'],
  },
};

const trialMap = {
  chin: 2000,
  upperlip: 2000,
  underarms: 2000,
};

const permanentMap = {
  full: 11000,
  face: 3000,
  legs: 5000,
  arms: 6000,
  chest: 4000,
  back: 3500,
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
    coupon: '',
  });
  
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phoneNumber || !formData.email || !formData.selectedDate || formData.selectedBodyParts.length === 0) {
      alert('Please fill in all the required fields');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!phoneRegex.test(formData.phoneNumber)) {
      alert('Please enter a valid phone number');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const apiUrl = "https://snyllo-payment.onrender.com/user-details-bookform";

    try {
      // Stringify the selectedBodyParts array before sending it in the request
      const requestData = {
        ...formData,
        selectedBodyParts: JSON.stringify(formData.selectedBodyParts),
      };
  
      await axios.post(apiUrl, requestData);
      console.log('Submission successful');
      setSubmitStatus('success');
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting the form. Please try again.');
      setSubmitStatus('error');
    }
  };
  
  const resetForm = () => {
    setFormData({
      name:'',
      phoneNumber:'',
      email:'',
      gender:'',
      purchaseType:'',
      selectedBodyParts:[],
      selectedDate:'',
      coupon:'',
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === 'checkbox' && name === 'selectedBodyParts') {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          selectedBodyParts: [...prevData.selectedBodyParts, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          selectedBodyParts: prevData.selectedBodyParts.filter(part => part !== value),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  const calculateTotalPrice = () => {
    const selectedPriceMap = formData.purchaseType === 'trial' ? trialMap : permanentMap;
    let totalPrice = formData.selectedBodyParts.reduce((total, part) => total + selectedPriceMap[part], 0);
  
    if (formData.coupon === 'SNYLLO25') {
      totalPrice *= 0.75; 
    } else if (formData.coupon === 'SNYLLO40'){
      totalPrice *= 0.6;
    }

    return totalPrice;
  };

  useEffect(() => {
    if (submitStatus === 'success') {
      const resetFormTimeout = setTimeout(() => {
        setSubmitStatus(null);
        resetForm();
      }, 3000);
      return () => clearTimeout(resetFormTimeout);
    }
  }, [submitStatus]);

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
        <form onSubmit={handleSubmit} className='form-payment'>
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
              Choose One
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
            <label className='datee'>
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
          <label className='couponn'>
            Coupon
              <input 
              type="text" 
              placeholder="Enter Your Coupon"
              name="coupon"
              className="coupon"
              value={formData.coupon} 
              onChange={handleChange} 
              />
          </label>
          <label className='total'>
            Total Amount: ₹{calculateTotalPrice()}
          </label><br /><br />
          <button className='submit-button' type="submit">Proceed to Payment</button>
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
