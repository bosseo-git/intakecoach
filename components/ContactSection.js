import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import styles from '../styles/ContactSection.module.css';

const ContactSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Office locations data
  const offices = [
    {
      city: "San Francisco",
      address: "525 Market St, Suite 1000",
      zipCode: "San Francisco, CA 94105",
      phone: "+1 (415) 555-1234"
    },
    {
      city: "New York",
      address: "Empire State Building, 350 5th Ave",
      zipCode: "New York, NY 10118",
      phone: "+1 (212) 555-5678"
    },
    {
      city: "Chicago",
      address: "233 S Wacker Dr",
      zipCode: "Chicago, IL 60606",
      phone: "+1 (312) 555-9012"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
  };

  return (
    <section className={styles.section} id="contact">
      <div className="container mx-auto px-4">
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Have questions about IntakeCoach? Our team is here to help.
          </p>
        </motion.div>

        <div className={styles.contactContainer}>
          <motion.div 
            className={styles.formContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.h3 variants={itemVariants}>Send Us a Message</motion.h3>
            <motion.form onSubmit={handleSubmit} variants={containerVariants}>
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your full name" 
                  required 
                />
              </motion.div>
              
              <motion.div className={styles.formRow} variants={itemVariants}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Your email address" 
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="Your phone number" 
                  />
                </div>
              </motion.div>
              
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  placeholder="Your company name" 
                />
              </motion.div>
              
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" required>
                  <option value="">Select a subject</option>
                  <option value="demo">Request a Demo</option>
                  <option value="pricing">Pricing Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
              
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  placeholder="Your message" 
                  required
                ></textarea>
              </motion.div>
              
              <motion.button 
                type="submit" 
                className={styles.submitButton}
                variants={itemVariants}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
          
          <motion.div 
            className={styles.infoContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.div className={styles.contactInfo} variants={itemVariants}>
              <h3>Contact Information</h3>
              <ul>
                <li>
                  <FaEnvelope />
                  <span>info@intakecoach.com</span>
                </li>
                <li>
                  <FaPhone />
                  <span>+1 (800) 555-COACH</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div className={styles.officesContainer} variants={itemVariants}>
              <h3>Our Offices</h3>
              <div className={styles.officesGrid}>
                {offices.map((office, index) => (
                  <motion.div 
                    key={index} 
                    className={styles.officeCard}
                    variants={itemVariants}
                    custom={index}
                  >
                    <h4>{office.city}</h4>
                    <address>
                      <FaMapMarkerAlt />
                      <div>
                        <p>{office.address}</p>
                        <p>{office.zipCode}</p>
                      </div>
                    </address>
                    <div className={styles.officePhone}>
                      <FaPhone />
                      <span>{office.phone}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div className={styles.socialLinks} variants={itemVariants}>
              <h3>Connect With Us</h3>
              <div className={styles.socialIcons}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 