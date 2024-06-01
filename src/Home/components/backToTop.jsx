import React, { useEffect } from 'react';
import { FaArrowAltCircleUp } from "react-icons/fa";
const BackToTopButton = () => {
  useEffect(() => {
    const mybutton = document.getElementById('btn-back-to-top');

    const scrollFunction = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = 'block';
      } else {
        mybutton.style.display = 'none';
      }
    };

    window.onscroll = () => scrollFunction();

    const backToTop = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    mybutton.addEventListener('click', backToTop);

    return () => {
      window.onscroll = null;
      mybutton.removeEventListener('click', backToTop);
    };
  }, []);

  return (
    <button
      type="button"
      id="btn-back-to-top"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'none',
        borderRadius: '50%',
        padding: '10px',
        transition: 'all 0.3s ease',
        fontSize: '1.5rem',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000
      }}
    > 
      <FaArrowAltCircleUp style={{height:'50px',width:'50px'}}/>
    </button>
  );
};

export default BackToTopButton;