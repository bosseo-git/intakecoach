import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaBrain, FaClipboardCheck, FaChartLine, FaLightbulb } from 'react-icons/fa';
import styles from '../styles/HowItWorksSection.module.css';

const HowItWorksSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Steps data
  const steps = [
    {
      icon: <FaHeadset />,
      title: "Record Your Calls",
      description: "IntakeCoach securely captures your intake calls with client permission. No hardware needed - works with your existing phone system or VOIP solution.",
      color: "#3B82F6"
    },
    {
      icon: <FaBrain />,
      title: "AI Analysis",
      description: "Our advanced AI engine processes each call, analyzing tone, keywords, questions asked, and overall conversation flow.",
      color: "#8B5CF6"
    },
    {
      icon: <FaClipboardCheck />,
      title: "Generate Insights",
      description: "Within minutes, receive a detailed breakdown of each call with actionable insights, missed opportunities, and conversion probability.",
      color: "#EC4899"
    },
    {
      icon: <FaChartLine />,
      title: "Performance Tracking",
      description: "Track performance metrics over time, identify trends, and measure improvement in your team's intake effectiveness.",
      color: "#10B981"
    },
    {
      icon: <FaLightbulb />,
      title: "Continuous Improvement",
      description: "Use AI-powered suggestions to refine your intake process, train staff, and increase conversion rates month after month.",
      color: "#F59E0B"
    }
  ];

  return (
    <section className={styles.section} id="how-it-works">
      <div className="container mx-auto px-4">
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className={styles.title}>How IntakeCoach Works</h2>
          <p className={styles.subtitle}>From call to insights in minutes - no complex setup required</p>
        </motion.div>

        <motion.div 
          className={styles.stepsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className={styles.step}
              variants={itemVariants}
            >
              <div className={styles.stepNumber}>{index + 1}</div>
              <div 
                className={styles.iconContainer} 
                style={{ backgroundColor: `${step.color}20`, color: step.color }}
              >
                {step.icon}
              </div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
                    <polygon points="95,45 100,50 95,55" fill="#CBD5E1" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.demoContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <div className={styles.demoContent}>
            <h3>See IntakeCoach in Action</h3>
            <p>Watch how our platform transforms your intake calls into actionable insights and business opportunities.</p>
            <button className={styles.demoButton}>
              Schedule a Live Demo
            </button>
          </div>
          <div className={styles.demoImageContainer}>
            <div className={styles.demoImagePlaceholder}>
              {/* This will be replaced with an actual image or video thumbnail */}
              <div className={styles.playButton}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 