  import React, { useState } from 'react';
  import './ProfileDeatails.css'; 
  import { app } from "../../firebaseConfig.js";
  import { getDatabase, ref, push } from 'firebase/database';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { useNavigate } from "react-router-dom";

  const UserProfileForm = () => {
    const navigate = useNavigate();
    const initialFormData = {
      instituteName: '',
      instituteAddress: '',
      instituteType: '',
      weblink: '',
      ContactNum: '',
      instituteLogo: null,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
      if (e.target.type === 'file') {
        setFormData({
          ...formData,
          [e.target.id]: e.target.files[0],
        });
      } else if (e.target.id === 'ContactNum') {
        const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
        setFormData({
          ...formData,
          [e.target.id]: phoneNumber,
        });
      } else {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const database = getDatabase(app);
      const profilesRef = ref(database, 'userProfiles');

      if (formData.instituteLogo) {
        const storage = getStorage(app);
        const storageReference = storageRef(storage, 'instituteLogos/' + formData.instituteLogo.name);

        try {
          await uploadBytes(storageReference, formData.instituteLogo);
          const downloadURL = await getDownloadURL(storageReference);

          const updatedFormData = {
            ...formData,
            instituteLogo: downloadURL,
          };

          const newProfileRef = await push(profilesRef, updatedFormData);

          console.log('Form submitted:', updatedFormData);
          console.log('Data pushed to Firebase with key:', newProfileRef.key);
          navigate("/Dashboard");
          alert('Form submitted successfully!');
          setTimeout(() => {
            console.log('Resetting form...');
            setFormData(initialFormData);
          }, 1000);
        } catch (error) {
          console.error('Error submitting form to Firebase:', error);
          alert('Error submitting form. Please try again.');
        }
      } else {
        console.error('No file selected for upload.');
        alert('Please select a file for upload.');
      }
    };

    const handleFormReset = () => {
      console.log('Resetting form...');
      setFormData(initialFormData);
    };

    return (
      <>
        <div className='content1' href="/">
          <h4>School&nbsp;Assistant</h4>
          <h4>School&nbsp;Assistant</h4>
        </div>
        <div className='containerForm'>
          <form className="form" onSubmit={handleFormSubmit} onReset={handleFormReset} method='post'>
            <h2>User Profile</h2>

            <div className="form-group">
              <label htmlFor="instituteName">Name of the Institute:</label>
              <div className="relative">
                <input
                  className="form-control"
                  id="instituteName"
                  type="text"
                  // required
                  placeholder="Enter your institute name"
                  value={formData.instituteName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="instituteAddress">Address of the Institute:</label>
              <div className="relative">
                <input
                  className="form-control"
                  id="instituteAddress"
                  type="text"
                  // required
                  placeholder="like city name"
                  value={formData.instituteAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ContactNum">Institute Contact no.:</label>
              <div className="relative">
                <input
                  className="form-control"
                  id="ContactNum"
                  type="number"
                  // required
                  placeholder="Enter your institute Contact no."
                  value={formData.ContactNum}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="instituteType">Type of Institute:</label>
              <div className="relative">
                <select
                  className="form-control"
                  id="instituteType"
                  // required
                  value={formData.instituteType}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select the type of institute</option>
                  <option value="school">School</option>
                  <option value="college">College</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="instituteLogo">Your Institute Logo:</label>
              <div className="relative">
                <input
                  className="form-control"
                  id="instituteLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="weblink">Your institute Website Link:</label>
              <div className="relative">
                <input
                  className="form-control"
                  id="weblink"
                  type="url"
                  placeholder="Attachment..."
                  value={formData.weblink}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="tright">
              <button className="movebtn movebtnre" id='btnreset' type="reset">
                <i className="fa fa-fw fa-refresh"></i> Reset
              </button>
              <button className="movebtn movebtnsu" id='btnsub' type="submit">
                Submit <i className="fa fa-fw fa-paper-plane"></i>
              </button>
            </div>
          </form>

          <div className="thanks" style={{ display: 'none' }}>
            <h4>Thank you!</h4>
            <p>
              <small>Your message has been successfully sent.</small>
            </p>
          </div>
        </div>
      </>
    );
  };

  export default UserProfileForm;
