import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";

function App() {
  return (
    <>
      <MDBContainer fluid  id='WebsiteAdmission'>
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Registration Form
              </h3>

              <MDBRow>
                <MDBCol md="6">
                First Name
                  <MDBInput
                    wrapperClass="mb-4"
                    size="lg"
                    id="form1"
                    type="text"
                  />
                </MDBCol>

                <MDBCol md="6">
                Last Name
                  <MDBInput
                    wrapperClass="mb-4"
                    size="lg"
                    id="form2"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                Birthday
                  <MDBInput
                    wrapperClass="mb-4"
                    size="lg"
                    id="form3"
                    type="text"
                  />
                </MDBCol>

                <MDBCol md="6" className="mb-4">
                  <h6 className="fw-bold">Gender: </h6>
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio1"
                    value="option1"
                    label="Female"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio2"
                    value="option2"
                    label="Male"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio3"
                    value="option3"
                    label="Other"
                    inline
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                Email
                  <MDBInput
                    wrapperClass="mb-4"
                
                    size="lg"
                    id="form4"
                    type="email"
                  />
                </MDBCol>

                <MDBCol md="6">
                Phone Number
                  <MDBInput
                    wrapperClass="mb-4"
                    size="lg"
                    id="form5"
                    type="rel"
                  />
                </MDBCol>
              </MDBRow>

              <div className="d-flex justify-content-end pt-3" >
                    <MDBBtn className='md-4 align-items-center' color='warning' size='lg'>Submit form</MDBBtn>
                  </div>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default App;
