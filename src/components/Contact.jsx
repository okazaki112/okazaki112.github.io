import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, staggerItem, buttonHover } from '../animations';
import './Contact.css';

const contactInfo = [
  {
    icon: '📧',
    label: '邮箱',
    value: 'okazaki112.github.io',
    link: 'https://okazaki112.github.io',
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'okazaki112.github.io',
    link: 'https://okazaki112.github.io',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'okazaki112.github.io',
    link: 'https://okazaki112.github.io',
  },
];

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [focusedField, setFocusedField] = useState(null);

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-container">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.div className="contact-header" variants={staggerItem}>
            <span className="section-label">Contact</span>
            <h2 className="section-title">联系我</h2>
            <p className="section-subtitle">
              有项目想法或合作机会？随时与我联系
            </p>
          </motion.div>

          <div className="contact-content">
            <motion.div
              className="contact-info"
              variants={staggerContainer}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.link}
                  className="contact-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  custom={index}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    borderColor: 'var(--border-strong)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="contact-icon-wrapper"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <span className="contact-icon">{item.icon}</span>
                  </motion.div>
                  <div className="contact-text">
                    <span className="contact-label">{item.label}</span>
                    <span className="contact-value">{item.value}</span>
                  </div>
                  <motion.div
                    className="contact-arrow"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <div className="input-wrapper">
                    <motion.input
                      type="text"
                      id="name"
                      placeholder="您的姓名"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        borderColor: focusedField === 'name' ? 'var(--primary)' : 'var(--border-default)'
                      }}
                    />
                    <motion.div
                      className="input-glow"
                      animate={{
                        opacity: focusedField === 'name' ? 1 : 0,
                        scale: focusedField === 'name' ? 1 : 0.8
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">邮箱</label>
                  <div className="input-wrapper">
                    <motion.input
                      type="email"
                      id="email"
                      placeholder="您的邮箱"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        borderColor: focusedField === 'email' ? 'var(--primary)' : 'var(--border-default)'
                      }}
                    />
                    <motion.div
                      className="input-glow"
                      animate={{
                        opacity: focusedField === 'email' ? 1 : 0,
                        scale: focusedField === 'email' ? 1 : 0.8
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">消息</label>
                  <div className="input-wrapper">
                    <motion.textarea
                      id="message"
                      rows="4"
                      placeholder="请输入您的消息..."
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        borderColor: focusedField === 'message' ? 'var(--primary)' : 'var(--border-default)'
                      }}
                    />
                    <motion.div
                      className="input-glow"
                      animate={{
                        opacity: focusedField === 'message' ? 1 : 0,
                        scale: focusedField === 'message' ? 1 : 0.8
                      }}
                    />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  className="submit-btn"
                  {...buttonHover}
                >
                  <span>发送消息</span>
                  <motion.svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 背景装饰 */}
      <div className="contact-bg">
        <div className="bg-gradient" />
      </div>
    </section>
  );
}

export default Contact;