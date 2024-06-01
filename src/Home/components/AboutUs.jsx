import React from 'react';
import img1 from '../blog/b1.webp';
import img2 from '../blog/b2.webp';
import img3 from '../blog/b3.webp';
import img4 from '../blog/b4.webp';


const AboutUs = () => {
  return (
    <>
      <div style={styles.container} id='AboutUs'>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.paragraph}>
          Welcome to our school! We are dedicated to providing a high-quality education to our students, fostering a love for learning, and nurturing the development of every child's unique talents and abilities.
        </p>

        <div style={styles.section}>
          <h2 style={styles.subHeading}>Our Mission</h2>
          <div style={styles.sectionContent}>
            <img src={img1} alt="Mission" style={styles.image} />
            <p style={styles.paragraph}>
              Our mission is to create a safe, inclusive, and stimulating environment where students can achieve their full potential.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeading}>Our History</h2>
          <div style={styles.sectionContent}>
            <p style={styles.paragraph}>
              Established in 1990, our school has been a pillar of academic excellence for over 30 years. We have grown from a small institution to a vibrant community of learners.
            </p>
            <img src={img2} alt="History" style={styles.image} />
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeading}>Our Values</h2>
          <div style={styles.sectionContent}>
            <img src={img3} alt="Values" style={styles.image} />
            <p style={styles.paragraph}>
              We believe in integrity, respect, and commitment to excellence. Our values guide our actions and shape the educational experience we provide to our students.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subHeading}>Our Faculty</h2>
          <div style={styles.sectionContent}>
            <p style={styles.paragraph}>
              Our dedicated faculty members are passionate about teaching and committed to the success of each student. They bring a wealth of experience and knowledge to our classrooms.
            </p>
            <img src={img4} alt="Faculty" style={styles.image} />
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    color: '#333',
    animation: 'fadeIn 2s ease-in-out',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  paragraph: {
    fontSize: '1.2em',
    lineHeight: '1.6em',
    marginBottom: '20px',
    color: '#555',
  },
  section: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '20px',
    animation: 'slideIn 1.5s ease-out',
  },
  sectionContent: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
  subHeading: {
    fontSize: '2em',
    marginBottom: '10px',
    color: '#FF5722',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '10px',
    marginRight: '20px',
  },
  animationContainer: {
    marginTop: '40px',
  },
  animatedBox: {
    width: '100px',
    height: '100px',
    backgroundColor: '#FF5722',
    margin: '0 auto',
    animation: 'bounce 2s infinite',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes slideIn': {
    '0%': { transform: 'translateY(-100px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
    '40%': { transform: 'translateY(-30px)' },
    '60%': { transform: 'translateY(-15px)' },
  },
};

export default AboutUs;