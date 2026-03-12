import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  fadeInUp, 
  scaleInBounce, 
  staggerContainer, 
  staggerItem,
  buttonHover,
  float,
  pulse,
  spin
} from '../animations';
import { TextReveal, TypewriterEffect } from './effects';
import './Hero.css';

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);

  return (
    <section id="hero" className="hero">
      {/* 动态背景 */}
      <div className="hero-background">
        {/* 暖色渐变光球 */}
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="gradient-orb orb-4"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* 网格背景 */}
        <div className="grid-overlay" />
        
        {/* 动态波浪 */}
        <svg className="wave-bg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="rgba(255, 107, 53, 0.05)"
            animate={{
              d: [
                "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
                "M0,60 C150,0 350,120 600,60 C850,0 1050,120 1200,60 L1200,120 L0,120 Z",
                "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>

      {/* 内容 */}
      <motion.div 
        className="hero-content"
        style={{ y, opacity, scale }}
      >
        <motion.div
          className="avatar-container"
          variants={scaleInBounce}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="avatar-ring"
            {...spin}
          />
          <motion.div
            className="avatar"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="avatar-emoji">👨‍💻</span>
          </motion.div>
          {/* 状态指示器 - 脉冲效果 */}
          <motion.div
            className="status-indicator"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 0 0 rgba(16, 185, 129, 0.7)',
                '0 0 0 10px rgba(16, 185, 129, 0)',
                '0 0 0 0 rgba(16, 185, 129, 0)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* 逐字入场标题 */}
          <motion.div className="hero-title-wrapper" variants={staggerItem}>
            <TextReveal 
              text="你好，我是" 
              delay={0.3}
              staggerDelay={0.02}
              className="hero-title-prefix"
            />
          </motion.div>
          
          <motion.h1 className="hero-title" variants={fadeInUp}>
            <motion.span 
              className="highlight"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Vibe Coder
            </motion.span>
          </motion.h1>

          {/* 打字机效果副标题 */}
          <motion.div className="hero-typewriter" variants={staggerItem}>
            <TypewriterEffect 
              text="用代码创造价值，用设计传递温度"
              speed={0.05}
              delay={1.2}
              cursor={false}
            />
          </motion.div>

          <motion.div
            className="hero-tags"
            variants={staggerItem}
          >
            {['全栈开发者', 'AI应用工程师', '创意设计师'].map((tag, index) => (
              <motion.span
                key={tag}
                className="tag"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 1.5 + index * 0.1,
                  type: 'spring',
                  stiffness: 300
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="hero-cta"
            variants={staggerItem}
          >
            <motion.button
              className="btn-primary"
              {...buttonHover}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              <span>查看作品</span>
              <motion.svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ 
                scale: 1.02,
                borderColor: 'var(--primary)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              联系我
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 滚动指示器 - 移到 hero-content 外部 */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="scroll-wheel" />
        </motion.div>
        <span className="scroll-text">向下滚动探索</span>
      </motion.div>

      {/* 装饰元素 */}
      <div className="hero-decorations">
        <motion.div
          className="decoration decoration-1"
          {...float}
        />
        <motion.div
          className="decoration decoration-2"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="decoration decoration-3"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}

export default Hero;