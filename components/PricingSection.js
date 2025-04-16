import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from '../styles/PricingSection.module.css';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  // Pricing plans data
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small firms just getting started with call analysis",
      monthlyPrice: 99,
      annualPrice: 89,
      features: [
        { name: "Up to 200 calls per month", included: true },
        { name: "Basic call analytics", included: true },
        { name: "Email summaries", included: true },
        { name: "Conversion tracking", included: true },
        { name: "Single user access", included: true },
        { name: "Standard support", included: true },
        { name: "Custom integrations", included: false },
        { name: "Team performance tracking", included: false },
        { name: "Advanced AI coaching", included: false },
        { name: "White-label reports", included: false }
      ],
      cta: "Start Free Trial",
      highlight: false
    },
    {
      name: "Professional",
      description: "Ideal for growing firms looking to optimize their intake process",
      monthlyPrice: 249,
      annualPrice: 219,
      features: [
        { name: "Up to 750 calls per month", included: true },
        { name: "Advanced call analytics", included: true },
        { name: "Email and dashboard summaries", included: true },
        { name: "Conversion tracking", included: true },
        { name: "Up to 5 user accounts", included: true },
        { name: "Priority support", included: true },
        { name: "2 custom integrations", included: true },
        { name: "Team performance tracking", included: true },
        { name: "Basic AI coaching", included: true },
        { name: "White-label reports", included: false }
      ],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      name: "Enterprise",
      description: "Comprehensive solution for established firms with high call volume",
      monthlyPrice: 499,
      annualPrice: 449,
      features: [
        { name: "Unlimited calls", included: true },
        { name: "Premium call analytics", included: true },
        { name: "Custom reporting dashboard", included: true },
        { name: "Advanced conversion tracking", included: true },
        { name: "Unlimited user accounts", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Unlimited custom integrations", included: true },
        { name: "Advanced team performance tracking", included: true },
        { name: "Advanced AI coaching", included: true },
        { name: "White-label reports", included: true }
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section className={styles.section} id="pricing">
      <div className="container mx-auto px-4">
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className={styles.title}>Simple, Transparent Pricing</h2>
          <p className={styles.subtitle}>Choose the plan that's right for your firm's needs</p>
        </motion.div>

        <motion.div 
          className={styles.pricingToggle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <span className={!isAnnual ? styles.activeToggle : ''}>Monthly</span>
          <div 
            className={styles.toggleSwitch} 
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div className={`${styles.toggleThumb} ${isAnnual ? styles.toggleActive : ''}`}></div>
          </div>
          <span className={isAnnual ? styles.activeToggle : ''}>
            Annual <span className={styles.saveBadge}>Save 10%</span>
          </span>
        </motion.div>

        <motion.div 
          className={styles.plansContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`${styles.planCard} ${plan.highlight ? styles.highlightPlan : ''}`}
              variants={itemVariants}
            >
              {plan.highlight && <div className={styles.popularBadge}>Most Popular</div>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDescription}>{plan.description}</p>
              <div className={styles.planPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                <span className={styles.period}>/ month</span>
              </div>
              {isAnnual && (
                <div className={styles.savingText}>
                  Billed annually (${isAnnual ? plan.annualPrice * 12 : plan.monthlyPrice * 12})
                </div>
              )}
              <ul className={styles.featuresList}>
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className={feature.included ? '' : styles.disabledFeature}>
                    {feature.included ? (
                      <FaCheck className={styles.checkIcon} />
                    ) : (
                      <FaTimes className={styles.timesIcon} />
                    )}
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
              <button className={`${styles.ctaButton} ${plan.highlight ? styles.highlightButton : ''}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.guaranteeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <div className={styles.guaranteeBadge}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.guaranteeIcon}>
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3>100% Satisfaction Guarantee</h3>
            <p>Try IntakeCoach risk-free for 14 days. If you're not completely satisfied, cancel for a full refund.</p>
          </div>
        </motion.div>

        <motion.div 
          className={styles.faqContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
          <div className={styles.faqGrid}>
            <motion.div className={styles.faqItem} variants={itemVariants}>
              <h4>Can I switch plans later?</h4>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </motion.div>
            <motion.div className={styles.faqItem} variants={itemVariants}>
              <h4>Is there a setup fee?</h4>
              <p>No, IntakeCoach has no hidden fees. The price you see is the price you pay, and our team handles all setup at no additional cost.</p>
            </motion.div>
            <motion.div className={styles.faqItem} variants={itemVariants}>
              <h4>What happens if I exceed my call limit?</h4>
              <p>If you exceed your monthly call limit, additional calls are billed at a per-call rate. We{'ll'} notify you when you{'re'} approaching your limit.</p>
            </motion.div>
            <motion.div className={styles.faqItem} variants={itemVariants}>
              <h4>Do you offer custom plans?</h4>
              <p>Yes, we offer custom plans for firms with specialized needs. Contact our sales team to discuss a tailored solution.</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.contactContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h3>Need a custom solution for your firm?</h3>
          <p>Our team can create a tailored plan that perfectly fits your needs and budget.</p>
          <button className={styles.contactButton}>Contact Our Sales Team</button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 