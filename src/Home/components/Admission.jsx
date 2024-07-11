import React, { useState } from "react";
import api from "../../api";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

const classOptions = [
  "10th Class",
  "9th Class",
  "8th Class",
  "7th Class",
  "6th Class",
  "5th Class",
  "4th Class",
  "3rd Class",
  "2nd Class",
  "1st Class",
  "UKG",
  "LKG",
  "Pre-K",
];
const internalStyles = `
@media (max-width: 576px) {
  .form-control-lg {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
}
       .formContainer{
          width:100%
       }
}
`;

function Admission() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    class: classOptions[0],
    gender: "",
    email: "",
    phoneNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `RegistrationAdmissions/${formData.firstName} ${formData.lastName}.json`;

    api
      .put(url, formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <>
          <style>{internalStyles}</style> 
      <MDBContainer fluid id="WebsiteAdmission">
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Registration Form
              </h3>
              {submitted ? (
                <div className="alert alert-success" role="alert">
                  Thank you for submitting your details!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="formContainer"> 
                  <MDBRow>
                    <MDBCol md="6" xs="12">
                      First Name
                      <MDBInput
                        wrapperClass="mb-4"
                        size="lg"
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </MDBCol>

                    <MDBCol md="6" xs="12">
                      Last Name
                      <MDBInput
                        wrapperClass="mb-4"
                        size="lg"
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6" xs="12">
                      Class
                      <div className="d-flex align-items-center">
                        <select
                          className="form-control form-control-lg mb-4"
                          id="class"
                          value={formData.class}
                          onChange={handleChange}
                        >
                          {classOptions.map((classOption, index) => (
                            <option key={index} value={classOption}>
                              {classOption}
                            </option>
                          ))}
                        </select>
                        <MDBIcon fas icon="caret-down" className="ms-2" />
                      </div>
                    </MDBCol>

                    <MDBCol md="6" xs="12" className="mb-4">
                      <h6 className="fw-bold">Gender: </h6>
                      <MDBRadio
                        name="gender"
                        id="female"
                        value="Female"
                        label="Female"
                        inline
                        onChange={handleRadioChange}
                      />
                      <MDBRadio
                        name="gender"
                        id="male"
                        value="Male"
                        label="Male"
                        inline
                        onChange={handleRadioChange}
                      />
                      <MDBRadio
                        name="gender"
                        id="other"
                        value="Other"
                        label="Other"
                        inline
                        onChange={handleRadioChange}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6" xs="12">
                      Email
                      <MDBInput
                        wrapperClass="mb-4"
                        size="lg"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </MDBCol>

                    <MDBCol md="6" xs="12">
                      Phone Number
                      <MDBInput
                      className="form-feild"
                        wrapperClass="mb-4"
                        size="lg"
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </MDBCol>
                  </MDBRow>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <Button
                      type="submit"
                      className="btn btn-primary custom-button"
                      style={{
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                        padding: "0px 20px",
                        width: "90px",
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Admission;
