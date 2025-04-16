import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaHospital, FaUniversity, FaHome, FaCarAlt } from 'react-icons/fa';
import styles from '../styles/IndustryUseCasesSection.module.css';

const IndustryUseCasesSection = () => {
  const [activeTab, setActiveTab] = useState('legal');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  // Industry data
  const industries = [
    {
      id: 'legal',
      name: 'Legal Firms',
      icon: <FaGavel />,
      title: 'Transform Legal Client Intake',
      description: 'IntakeCoach helps legal firms convert more potential clients into retained cases by improving initial consultation calls.',
      benefits: [
        'Identify case value and urgency automatically',
        'Track case type conversion rates by attorney',
        'Improve client experience from first point of contact',
        'Increase retention rates for high-value cases'
      ],
      testimonial: {
        quote: "IntakeCoach has become an indispensable part of our intake process. We've seen a 34% increase in client retention since implementing the platform.",
        author: 'Jennifer Thompson',
        position: 'Managing Partner, Thompson Law Group'
      }
    },
    {
      id: 'medical',
      name: 'Healthcare',
      icon: <FaHospital />,
      title: 'Optimize Patient Acquisition',
      description: 'Improve patient scheduling and retention by analyzing phone interactions and identifying areas for improvement in your intake process.',
      benefits: [
        'Reduce appointment no-shows with better call handling',
        'Capture complete patient information during initial calls',
        'Track performance of different patient coordinators',
        'Improve overall patient experience from first contact'
      ],
      testimonial: {
        quote: "Our patient conversion rate has increased dramatically since using IntakeCoach. We're seeing fewer missed appointments and better prepared patients.",
        author: 'Dr. Michael Chen',
        position: 'Director, Premier Medical Group'
      }
    },
    {
      id: 'education',
      name: 'Education',
      icon: <FaUniversity />,
      title: 'Enhance Student Enrollment',
      description: 'Turn more prospective student inquiries into enrollments by optimizing your admissions call process with data-driven insights.',
      benefits: [
        'Track and improve counselor performance',
        'Identify key factors influencing enrollment decisions',
        'Better address prospective student concerns',
        'Create consistent enrollment experiences across teams'
      ],
      testimonial: {
        quote: "IntakeCoach has revolutionized our admissions process. We can now identify which counselors need additional training and what messaging resonates with students.",
        author: 'Dr. Sarah Johnson',
        position: 'Director of Admissions, Westfield University'
      }
    },
    {
      id: 'realestate',
      name: 'Real Estate',
      icon: <FaHome />,
      title: 'Close More Property Deals',
      description: 'Improve how your agents handle initial property inquiries and convert more callers into qualified buyers and sellers.',
      benefits: [
        'Identify serious buyers vs casual inquiries',
        'Track agent performance with lead conversion metrics',
        'Improve follow-up processes for potential clients',
        'Ensure consistent messaging across all agents'
      ],
      testimonial: {
        quote: "The insights from IntakeCoach have helped us refine our initial client conversations. Our agents now convert 40% more calls into showings.",
        author: 'Robert Williams',
        position: 'Broker, Williams Realty Partners'
      }
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: <FaCarAlt />,
      title: 'Drive More Showroom Visits',
      description: "Convert more phone inquiries into test drives and purchases by optimizing your dealership's call handling process.",
      benefits: [
        'Track sales representative performance on calls',
        'Identify missed opportunities in pricing discussions',
        'Improve follow-up processes for potential buyers',
        'Better handle initial objections and questions'
      ],
      testimonial: {
        quote: "Since implementing IntakeCoach, we've seen a 28% increase in phone-to-showroom conversion rates. The call insights have been invaluable for our sales training.",
        author: 'James Peterson',
        position: 'Sales Director, Premium Auto Group'
      }
    }
  ];

  // Get current active industry
  const activeIndustry = industries.find(industry => industry.id === activeTab);

  return (
    <section className={styles.section} id="industry-use-cases">
      <div className="container mx-auto px-4">
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className={styles.title}>Industry Solutions</h2>
          <p className={styles.subtitle}>
            IntakeCoach delivers results across multiple industries where phone interactions are critical
          </p>
        </motion.div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {industries.map((industry) => (
              <button
                key={industry.id}
                className={`${styles.tabButton} ${activeTab === industry.id ? styles.active : ''}`}
                onClick={() => setActiveTab(industry.id)}
              >
                <span className={styles.tabIcon}>{industry.icon}</span>
                <span className={styles.tabLabel}>{industry.name}</span>
              </button>
            ))}
          </div>

          <motion.div 
            className={styles.contentContainer}
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className={styles.industryIcon} variants={itemVariants}>
              {activeIndustry.icon}
            </motion.div>
            <motion.h3 className={styles.industryTitle} variants={itemVariants}>
              {activeIndustry.title}
            </motion.h3>
            <motion.p className={styles.industryDescription} variants={itemVariants}>
              {activeIndustry.description}
            </motion.p>
            
            <motion.div className={styles.benefitsContainer} variants={itemVariants}>
              <h4>Key Benefits</h4>
              <ul className={styles.benefitsList}>
                {activeIndustry.benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    custom={index}
                  >
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className={styles.testimonial} variants={itemVariants}>
              <blockquote>
                "{activeIndustry.testimonial.quote}"
              </blockquote>
              <cite>
                <span className={styles.authorName}>{activeIndustry.testimonial.author}</span>
                <span className={styles.authorPosition}>{activeIndustry.testimonial.position}</span>
              </cite>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.ctaContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <p>Learn how IntakeCoach can be customized for your specific industry needs</p>
          <button className={styles.ctaButton}>
            Request Industry Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryUseCasesSection; 