import React, { useState } from 'react';
import './SinglePage.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faChartLine, faCogs, faHandshake, faUserShield, faRocket } from '@fortawesome/free-solid-svg-icons';

const SinglePage = () => {
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    // Front-end email validation
    if (!email || !email.includes('@')) {
      setErrorMessage('Invalid email address');
      return;
    }

    try {
      if (email.endsWith('abc.com')) {
        // Simulating success for emails ending with "abc.com"
        setFormSubmitted(true);
      } else if (email.endsWith('@ez.works')) {
        // Simulating 404 error for emails ending with "@ez.work"
        setErrorMessage('404 Error: Not Found');
      } else {
        // Simulating form submission with actual API call for other emails
        const response = await fetch('http://3.228.97.110:9000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (response.status === 200) {
          setFormSubmitted(true);
        } else {
          const responseData = await response.json();
          setErrorMessage(responseData.message || 'Error submitting form');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form');
    }
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <div className="brand-container">
          <img src="https://dxw9jueyijhmn.cloudfront.net/ez_website/frontend_img/CommonImages/logo.webp" alt="EZ Works Logo" className="brand-logo" />
          <span className="brand-text">Works</span>
        </div>
      </header>
      <main>
      <h1 style={{ textAlign: 'center' }}>Suit of Business Support Service</h1>
      <p style={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies magna a libero cursus, non commodo sem porta. Cras vehicula posuere turpis, id laoreet lectus consectetur vel.</p>
        <div className="services-container">
          {[
            { icon: faBriefcase, text: 'Professional Services', paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
            { icon: faChartLine, text: 'Market Analysis' ,paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
            { icon: faCogs, text: 'Operational Efficiency' ,paragraph:'Vestibulum tempus vehicula ante, nec hendrerit nisi laoreet et. Integer sit amet sodales dui.'},
            { icon: faHandshake, text: 'Client Relations',paragraph:'Vestibulum tempus vehicula ante, nec hendrerit nisi laoreet et. Integer sit amet sodales dui.' },
            { icon: faUserShield, text: 'Security Solutions',paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
            { icon: faRocket, text: 'Innovative Strategies',paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
          ].map((service, index) => (
            <div key={index} className="service-box">
              <FontAwesomeIcon icon={service.icon} size="2x" />
              <p className="service-text">{service.text}</p>
              {service.paragraph && <p style={{ color: 'white' }}>{service.paragraph}</p>}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <div className="subscription-container">
          <input type="email" placeholder="Your Email Address" className="email-field" value={email} onChange={handleEmailChange} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        <div style={{ textAlign: 'center' }}>
          {formSubmitted ? (
            <p>Form Submitted</p>
          ) : (
            <button className="subscribe-button" onClick={handleSubmit}>Contact Me</button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default SinglePage;
