import React from 'react';

function StudentResults() {
  const students = [
    { name: 'John Doe', grade: 'A', hallTicket: 'HT12345' },
    { name: 'Jane Smith', grade: 'B', hallTicket: 'HT12346' },
    { name: 'Alex Johnson', grade: 'C', hallTicket: 'HT12347' },
    { name: 'Emily Davis', grade: 'A', hallTicket: 'HT12348' },
    { name: 'Michael Brown', grade: 'B', hallTicket: 'HT12349' },
    { name: 'Sarah Wilson', grade: 'A', hallTicket: 'HT12350' },
    { name: 'David Jones', grade: 'C', hallTicket: 'HT12351' },
    { name: 'Laura White', grade: 'B', hallTicket: 'HT12352' },
  ];

  return (
    <>
      <div className="container mt-5" id='Results'>
        <h3 className="text-center">Student Results</h3>
        <div className="row">
          {students.map((student, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div className="single_advisor_profile">
                <div className="advisor_thumb">
                  <img src={`https://bootdey.com/img/Content/avatar/avatar${index % 4 + 1}.png`} alt="" />
                </div>
                <div className="single_advisor_details_info">
                  <h6>{student.name}</h6>
                  <p className="designation">Grade: {student.grade}</p>
                  <p>Hall Ticket: {student.hallTicket}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Results() {
  return (
    <>
      <style>
        {`
          body {
            background: #eee;
          }
          .container {
            margin: 20px auto;
          }
          .single_advisor_profile {
            position: relative;
            margin-bottom: 20px;
            transition-duration: 500ms;
            z-index: 1;
            border-radius: 10px;
            box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
            max-width: 250px;
            margin: auto;
          }
          .single_advisor_profile .advisor_thumb {
            position: relative;
            z-index: 1;
            border-radius: 10px 10px 0 0;
            padding: 10px 10px 0 10px;
            background-color: #3f43fd;
            overflow: hidden;
          }
          .single_advisor_profile .advisor_thumb::after {
            transition-duration: 500ms;
            position: absolute;
            width: 150%;
            height: 60px;
            bottom: -35px;
            left: -25%;
            content: "";
            background-color: #ffffff;
            transform: rotate(-15deg);
          }
          .single_advisor_profile .single_advisor_details_info {
            position: relative;
            z-index: 1;
            padding: 15px;
            text-align: center;
            transition-duration: 500ms;
            border-radius: 0 0 10px 10px;
            background-color: #ffffff;
          }
          .single_advisor_profile .single_advisor_details_info::after {
            transition-duration: 500ms;
            position: absolute;
            z-index: 1;
            width: 50px;
            height: 3px;
            background-color: #3f43fd;
            content: "";
            top: 12px;
            right: 50%;
            transform: translateX(50%);
          }
          .single_advisor_profile .single_advisor_details_info h6 {
            margin-bottom: 0.25rem;
            transition-duration: 500ms;
          }
          .single_advisor_profile .single_advisor_details_info p {
            transition-duration: 500ms;
            margin-bottom: 0;
            font-size: 14px;
          }
          .single_advisor_profile:hover .advisor_thumb::after,
          .single_advisor_profile:focus .advisor_thumb::after {
            background-color: #070a57;
          }
          .single_advisor_profile:hover .single_advisor_details_info,
          .single_advisor_profile:focus .single_advisor_details_info {
            background-color: #070a57;
          }
          .single_advisor_profile:hover .single_advisor_details_info::after,
          .single_advisor_profile:focus .single_advisor_details_info::after {
            background-color: #ffffff;
          }
          .single_advisor_profile:hover .single_advisor_details_info h6,
          .single_advisor_profile:focus .single_advisor_details_info h6 {
            color: #ffffff;
          }
          .single_advisor_profile:hover .single_advisor_details_info p,
          .single_advisor_profile:focus .single_advisor_details_info p {
            color: #ffffff;
          }
        `}
      </style>

      <StudentResults />
    </>
  );
}

export default Results;