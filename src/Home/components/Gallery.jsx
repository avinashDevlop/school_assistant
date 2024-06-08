import React from 'react';

function Gallery() {
  return (
    <>  
      <style>{`
        .Gallery {
          padding: 15px;
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 20px;
          color: #333;
          position: relative;
          padding-bottom: 10px;
        }

        .Gallery::after {
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

        .Gallery::before {
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

        .marquee {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .marquee div {
          display: flex;
        }

        .column {
          display: flex;
          flex-direction: column;
          margin-right: 15px;
        }

        .circle {
          width: 100%;
          height: auto;
          object-fit: cover;
          margin-bottom: 15px;
          border-radius: 30px;
        }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      <h2 className='Gallery' id='Gallery'>Gallery</h2>
      <div className="marquee">
        <div>
          <div className="column">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="circle"
              alt="Boat on Calm Water"
            />
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
              className="circle"
              alt="Wintry Mountain Landscape"
            />
          </div>
          <div className="column">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
              className="circle"
              alt="Mountains in the Clouds"
            />
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="circle"
              alt="Boat on Calm Water"
            />
          </div>
          <div className="column">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
              className="circle"
              alt="Waves at Sea"
            />
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
              className="circle"
              alt="Yosemite National Park"
            />
          </div>
          <div className="column">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="circle"
              alt="Boat on Calm Water"
            />
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
              className="circle"
              alt="Wintry Mountain Landscape"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;