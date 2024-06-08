import React, { useState } from "react";
import "./style.css";
import img from "./images/img.jpg"; // Ensure the correct path to the image file
import { Button } from "react-bootstrap";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    warning: "",
    success: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For now, we'll just log the form data and show a success message
    console.log(formData);
    setFormStatus({
      warning: "",
      success: "Your message was sent, thank you!",
    });
  };

  return (
    <section className="ftco-section" id="ContactUs">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="wrapper img"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="row">
                <div className="col-md-9 col-lg-7">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                    <h3 className="mb-4">Get in touch with us</h3>
                    {formStatus.warning && (
                      <div id="form-message-warning" className="mb-4">
                        {formStatus.warning}
                      </div>
                    )}
                    {formStatus.success && (
                      <div id="form-message-success" className="mb-4">
                        {formStatus.success}
                      </div>
                    )}
                    <form
                      id="contactForm"
                      name="contactForm"
                      className="contactForm"
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="name">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="label" htmlFor="email">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="label" htmlFor="subject">
                              Subject
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="subject"
                              id="subject"
                              placeholder="Subject"
                              value={formData.subject}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="label" htmlFor="message">
                              Message
                            </label>
                            <textarea
                              name="message"
                              className="form-control"
                              id="message"
                              cols="30"
                              rows="4"
                              placeholder="Message"
                              value={formData.message}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                          >
                            <Button
                              type="submit"
                              value="Send Message"
                              className="btn btn-primary"
                              style={{
                                backgroundColor: "#007bff",
                                borderColor: "#007bff",
                                padding: "0px 60px",
                              }}
                            >
                              Send Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
