import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaCogs, FaUserGraduate, FaRocket, FaChartLine } from 'react-icons/fa';
import styles from '../styles/EffortlessIntegrationSection.module.css';

const EffortlessIntegrationSection = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Integration steps data
  const steps = [
    {
      icon: <FaCalendarCheck />,
      title: "Setup Meeting",
      description: "We'll schedule a consultation to understand your specific needs and workflow requirements."
    },
    {
      icon: <FaCogs />,
      title: "Seamless Configuration",
      description: "Our team handles all the technical setup, integrating IntakeCoach with your existing systems."
    },
    {
      icon: <FaUserGraduate />,
      title: "Personalized Training",
      description: "We train your team on how to maximize the platform's benefits for your specific practice."
    },
    {
      icon: <FaRocket />,
      title: "Go Live",
      description: "Launch your fully configured system with our team providing real-time support."
    },
    {
      icon: <FaChartLine />,
      title: "Continuous Optimization",
      description: "We regularly optimize your setup to ensure you're getting the most value from IntakeCoach."
    }
  ];

  return (
    <motion.section 
      className={styles.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <motion.header className={styles.header} variants={itemVariants}>
          <h2 className={styles.title}>Effortless Integration – No Code, We Do It For You</h2>
          <p className={styles.subtitle}>Get up and running with zero technical effort on your part</p>
        </motion.header>

        <motion.p className={styles.introduction} variants={itemVariants}>
          Our expert team handles everything from setup to integration with your existing systems. We'll customize IntakeCoach to your specific workflow, train your team, and provide ongoing support to ensure you get maximum value from day one.
        </motion.p>

        <motion.div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.step}
              variants={itemVariants}
            >
              <div className={styles.stepIconContainer}>
                {step.icon}
              </div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className={styles.testimonial} variants={itemVariants}>
          <blockquote>
            "The IntakeCoach team set everything up for us in less than a week. We were amazed at how smooth the transition was and how quickly our staff adapted to the new system."
          </blockquote>
          <cite>- Sarah Johnson, Office Manager at Johnson & Associates</cite>
        </motion.div>

        <motion.div className={styles.ctaContainer} variants={itemVariants}>
          <button className={styles.ctaButton}>
            Schedule Your Integration Call
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EffortlessIntegrationSection; 