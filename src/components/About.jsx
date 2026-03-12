import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, staggerItem, hoverLift } from '../animations';
import './About.css';

const infoCards = [
  {
    icon: '📍',
    label: '位置',
    value: '中国',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  {
    icon: '💼',
    label: '经验',
    value: '5+ 年开发经验',
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
  },
  {
    icon: '🎯',
    label: '专注',
    value: 'Web应用 · AI集成',
    gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)',
  },
  {
    icon: '🚀',
    label: '理念',
    value: '快速迭代 · 持续优化',
    gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
  },
];

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.div className="about-header" variants={staggerItem}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">关于我</h2>
          </motion.div>

          <motion.div className="about-content" variants={staggerItem}>
            <div className="about-text">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                我是一名热爱技术的全栈开发者，专注于构建优雅、高效的数字产品。
                相信代码不仅是实现功能的工具，更是表达创意的媒介。
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                在Vibe Coding的理念下，我追求快速原型与迭代优化，让创意快速落地。
                擅长将复杂的技术问题转化为简洁的解决方案。
              </motion.p>
            </div>

            <motion.div
              className="about-info"
              variants={staggerContainer}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  className="info-card"
                  variants={staggerItem}
                  custom={index}
                  {...hoverLift}
                  style={{
                    '--card-gradient': card.gradient,
                  }}
                >
                  <div className="info-card-glow" />
                  <div className="info-icon">{card.icon}</div>
                  <div className="info-content">
                    <span className="info-label">{card.label}</span>
                    <span className="info-value">{card.value}</span>
                  </div>
                  <div className="info-card-border" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 装饰背景 */}
      <div className="about-bg">
        <div className="bg-gradient" />
        <div className="bg-grid" />
      </div>
    </section>
  );
}

export default About;