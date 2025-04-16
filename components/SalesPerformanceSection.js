import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUserTie, FaHandshake, FaRegLightbulb, FaUsers } from 'react-icons/fa';
import styles from '../styles/SalesPerformanceSection.module.css';

const SalesPerformanceSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
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

  // Performance metrics
  const metrics = [
    {
      stat: "27%",
      label: "Average Increase in Conversion Rate",
      icon: <FaChartLine />,
      color: "#3B82F6"
    },
    {
      stat: "40%",
      label: "Reduction in Missed Client Opportunities",
      icon: <FaUserTie />,
      color: "#10B981"
    },
    {
      stat: "35%",
      label: "Improved Client Satisfaction",
      icon: <FaHandshake />,
      color: "#F59E0B"
    }
  ];

  // Key benefits
  const benefits = [
    {
      icon: <FaRegLightbulb />,
      title: "AI-Powered Coaching",
      description: "Personalized coaching recommendations based on real call data help your team continually improve their conversion techniques."
    },
    {
      icon: <FaUsers />,
      title: "Team Performance Comparison",
      description: "See how individual team members perform against benchmarks and identify top performers whose techniques can be shared across the team."
    },
    {
      icon: <FaChartLine />,
      title: "Performance Tracking Over Time",
      description: "Monitor how your team's performance evolves with training and coaching, identifying trends and areas for improvement."
    }
  ];

  return (
    <section className={styles.section} id="sales-performance">
      <div className="container mx-auto px-4">
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className={styles.title}>Transform Your Sales Performance</h2>
          <p className={styles.subtitle}>
            IntakeCoach helps firms increase conversion rates and maximize revenue from existing call volume
          </p>
        </motion.div>

        <motion.div 
          className={styles.metricsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              className={styles.metricCard}
              variants={fadeIn}
            >
              <div 
                className={styles.iconContainer} 
                style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
              >
                {metric.icon}
              </div>
              <div className={styles.stat} style={{ color: metric.color }}>{metric.stat}</div>
              <div className={styles.label}>{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.chartContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className={styles.chart}>
            {/* This would be replaced with an actual chart component */}
            <div className={styles.chartPlaceholder}>
              <div className={styles.barContainer}>
                <div className={styles.barLabel}>Before</div>
                <div className={styles.bar} style={{ height: '40%' }}></div>
                <div className={styles.barValue}>40%</div>
              </div>
              <div className={styles.barContainer}>
                <div className={styles.barLabel}>After 30 Days</div>
                <div className={styles.bar} style={{ height: '55%' }}></div>
                <div className={styles.barValue}>55%</div>
              </div>
              <div className={styles.barContainer}>
                <div className={styles.barLabel}>After 90 Days</div>
                <div className={styles.bar} style={{ height: '67%' }}></div>
                <div className={styles.barValue}>67%</div>
              </div>
            </div>
            <div className={styles.chartCaption}>
              Average conversion rate improvement for new clients
            </div>
          </div>
          <div className={styles.chartText}>
            <h3>Measurable Results, Fast</h3>
            <p>
              IntakeCoach clients see significant improvement in conversion rates within the first month. 
              By analyzing every call and providing actionable coaching, your team develops better client 
              relationships and closing techniques that translate directly to increased revenue.
            </p>
            <ul className={styles.bulletPoints}>
              <li>Start seeing improvements in as little as 2 weeks</li>
              <li>Sustainable, long-term performance gains</li>
              <li>Average ROI of 300% within first quarter</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className={styles.benefitsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <h3 className={styles.benefitsTitle}>How IntakeCoach Improves Performance</h3>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className={styles.benefitCard}
                variants={fadeIn}
              >
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.testimonial}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <blockquote>
            "We've increased our conversion rate by 32% in just two months using IntakeCoach. 
            The insights into our calls and the coaching recommendations have transformed how 
            our intake specialists handle potential clients."
          </blockquote>
          <div className={styles.testimonialAuthor}>
            <div className={styles.testimonialAvatar}>
              {/* Avatar placeholder - would be replaced with actual image */}
              <div className={styles.avatarPlaceholder}>MJ</div>
            </div>
            <div>
              <div className={styles.testimonialName}>Michael Johnson</div>
              <div className={styles.testimonialTitle}>Managing Partner, Johnson Legal Group</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.ctaContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <button className={styles.ctaButton}>
            Book a Performance Analysis
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SalesPerformanceSection; 