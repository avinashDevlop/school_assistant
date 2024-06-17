import React from 'react';
import img1 from '../blog/1000100104.jpg';
import img2 from '../blog/1000100105.jpg';
import img3 from '../blog/1000100107.jpg';
import img4 from '../blog/1000100108.jpg';
import img5 from '../blog/1000100109.jpg';
import img6 from '../blog/1000100110.jpg';
import img7 from '../blog/1000100111.jpg';
import img8 from '../blog/1000100112.jpg';
import img9 from '../blog/1000100113.jpg';
import img10 from '../blog/1000100114.jpg';
import img11 from '../blog/1000100115.jpg';
import img12 from '../blog/1000100117.jpg';

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
          width: 100%;
        }

        .marquee-content {
          display: flex;
          animation: marquee 30s linear alternate infinite;
        }

        .marquee-content::after {
          content: '';
          display: inline-block;
          width: 0;
          height: 100%;
        }

        .column {
          display: flex;
          flex-direction: column;
          margin-right: 15px;
        }

        .circle {
          width: 200px; /* Adjusted size for consistency */
          height: 270px; /* Adjusted size for consistency */
          object-fit: cover;
          margin-bottom: 15px;
          border-radius: 15px;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-30%); }
        }
      `}</style>
      <h2 className='Gallery' id='Gallery'>Gallery</h2>
      <div className="marquee">
        <div className="marquee-content">
          <div className="column">
            <img src={img1} className="circle" alt="Boat on Calm Water" />
            <img src={img2} className="circle" alt="Wintry Mountain Landscape" />
          </div>
          <div className="column">
            <img src={img3} className="circle" alt="Mountains in the Clouds" />
            <img src={img4} className="circle" alt="Boat on Calm Water" />
          </div>
          <div className="column">
            <img src={img5} className="circle" alt="Waves at Sea" />
            <img src={img6} className="circle" alt="Yosemite National Park" />
          </div>
          <div className="column">
            <img src={img7} className="circle" alt="Boat on Calm Water" />
            <img src={img8} className="circle" alt="Wintry Mountain Landscape" />
          </div>
          <div className="column">
            <img src={img9} className="circle" alt="Forest" />
            <img src={img10} className="circle" alt="Desert" />
          </div>
          <div className="column">
            <img src={img11} className="circle" alt="Cityscape" />
            <img src={img12} className="circle" alt="Beach" />
          </div>
          <div className="column">
            <img src={img1} className="circle" alt="Boat on Calm Water" />
            <img src={img2} className="circle" alt="Wintry Mountain Landscape" />
          </div>
          <div className="column">
            <img src={img3} className="circle" alt="Mountains in the Clouds" />
            <img src={img4} className="circle" alt="Boat on Calm Water" />
          </div>
          <div className="column">
            <img src={img5} className="circle" alt="Waves at Sea" />
            <img src={img6} className="circle" alt="Yosemite National Park" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;