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
    { name: 'Michael Brown', grade: 'B', hallTicket: 'HT12349' },
    { name: 'Sarah Wilson', grade: 'A', hallTicket: 'HT12350' },
    { name: 'David Jones', grade: 'C', hallTicket: 'HT12351' },
    { name: 'Laura White', grade: 'B', hallTicket: 'HT12352' },
    { name: 'John Doe', grade: 'A', hallTicket: 'HT12345' },
    { name: 'Jane Smith', grade: 'B', hallTicket: 'HT12346' },
    { name: 'Alex Johnson', grade: 'C', hallTicket: 'HT12347' },
    { name: 'Emily Davis', grade: 'A', hallTicket: 'HT12348' },
    { name: 'Michael Brown', grade: 'B', hallTicket: 'HT12349' },
    { name: 'Sarah Wilson', grade: 'A', hallTicket: 'HT12350' },
  ];

  return (
    <>
      <div className="container mt-5" id='Results'>
        <h3 className="text-center resultsHeader">Student Results</h3>
        <div className="row">
          {students.map((student, index) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2 p-3" key={index}>
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
            padding: 10px;
            transition-duration: 500ms;
            z-index: 1;
            border-radius: 10px;
            box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
            text-align: center;
            background-color: #fff;
            overflow: hidden;
            width: 100%;
            max-width: 150px;
            margin: auto;
          }
          .single_advisor_profile .advisor_thumb {
            position: relative;
            z-index: 1;
            border-radius: 10px 10px 0 0;
            padding: 5px;
            background-color: #3f43fd;
            overflow: hidden;
          }
          .single_advisor_profile .advisor_thumb img {
            width: 100%;
            height: auto;
            border-radius: 50%;
          }
          .single_advisor_profile .single_advisor_details_info {
            position: relative;
            z-index: 1;
            padding: 10px;
            transition-duration: 500ms;
            border-radius: 0 0 10px 10px;
            background-color: #ffffff;
          }
          .single_advisor_profile .single_advisor_details_info h6 {
            margin-bottom: 0.25rem;
            transition-duration: 500ms;
            color: #333;
            font-size: 14px;
          }
          .single_advisor_profile .single_advisor_details_info p {
            transition-duration: 500ms;
            margin-bottom: 0;
            font-size: 12px;
            color: #777;
          }
          .single_advisor_profile:hover .advisor_thumb {
            background-color: #070a57;
          }
          .single_advisor_profile:hover .single_advisor_details_info {
            background-color: #070a57;
            color: #ffffff;
          }
          .single_advisor_profile:hover .single_advisor_details_info h6,
          .single_advisor_profile:hover .single_advisor_details_info p {
            color: #ffffff;
          }
          .resultsHeader {
            padding: 15px;
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #333;
            position: relative;
            padding-bottom: 10px;
          }
  
          .resultsHeader::after {
            content: '';
            position: absolute;
            width: 60px;
            height: 4px;
            background-color: #333;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            border-radius: 2px;
          }
  
          .resultsHeader::before {
            content: '';
            position: absolute;
            width: 40px;
            height: 4px;
            background-color: #555;
            left: 50%;
            transform: translateX(-50%);
            bottom: -10px;
            border-radius: 2px;
          }
        `}
      </style>

      <StudentResults />
    </>
  );
}

export default Results;