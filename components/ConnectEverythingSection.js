import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCheck, FaLink, FaDatabase, FaSync } from 'react-icons/fa';
import styles from '../styles/ConnectEverythingSection.module.css';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ConnectEverythingSection = () => {
  const integrations = [
    { 
      name: "Clio", 
      description: "Seamlessly sync client information, appointments, and case details between Clio and IntakeCoach.",
      icon: <FaDatabase className={styles.integrationIcon} />
    },
    { 
      name: "Filevine", 
      description: "Automatically push intake data to Filevine projects and keep everything in sync in real-time.",
      icon: <FaSync className={styles.integrationIcon} />
    },
    { 
      name: "PracticePanther", 
      description: "Bidirectional sync ensures your intake process aligns perfectly with your case management.",
      icon: <FaLink className={styles.integrationIcon} />
    },
    { 
      name: "Salesforce", 
      description: "Enterprise-grade CRM integration for firms with complex sales and client relationship needs.",
      icon: <FaRocket className={styles.integrationIcon} />
    },
    { 
      name: "Custom CRMs", 
      description: "We can integrate with virtually any custom or proprietary CRM through our flexible API.",
      icon: <FaDatabase className={styles.integrationIcon} />
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className={styles.title}>Connect Everything</h2>
          <p className={styles.subtitle}>
            Integrate with your favorite CRMs, case management systems, and tools
          </p>
        </motion.div>

        <motion.p 
          className={styles.description}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          IntakeCoach connects seamlessly with the tools you already use, creating a unified workflow that eliminates data silos and duplicate entry. Our integration team sets up everything for you, ensuring a perfect fit with your existing systems.
        </motion.p>

        <motion.div 
          className={styles.integrationGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {integrations.map((integration, index) => (
            <motion.div 
              key={index} 
              className={styles.integrationCard}
              variants={fadeIn}
            >
              <div className={styles.iconContainer}>
                {integration.icon}
              </div>
              <h3 className={styles.integrationTitle}>{integration.name}</h3>
              <p className={styles.integrationDescription}>{integration.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.customIntegration}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h3>Don't see your tool listed?</h3>
          <p>We specialize in custom integrations for law firms of all sizes. Our development team can connect IntakeCoach with virtually any software you use in your practice.</p>
          <ul className={styles.benefitsList}>
            <li><FaCheck className={styles.checkIcon} /> RESTful API access</li>
            <li><FaCheck className={styles.checkIcon} /> Custom webhooks</li>
            <li><FaCheck className={styles.checkIcon} /> Third-party integration services</li>
            <li><FaCheck className={styles.checkIcon} /> Zapier connection</li>
            <li><FaCheck className={styles.checkIcon} /> Custom data mapping</li>
          </ul>
        </motion.div>

        <motion.div 
          className={styles.ctaContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <button className={styles.ctaButton}>
            Schedule Integration Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectEverythingSection; 