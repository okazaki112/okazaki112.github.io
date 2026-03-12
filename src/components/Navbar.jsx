import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { navLinkHover, fadeInDown, staggerContainer, staggerItem } from '../animations';
import './Navbar.css';

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '简介' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState(null);

  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.95)']
  );
  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="navbar"
      style={{ 
        background: navBackground,
        backdropFilter: navBlur,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }}
    >
      <motion.div
        className="nav-logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection('hero')}
      >
        <span className="logo-text">Vibe Coding</span>
        <motion.div
          className="logo-glow"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      <motion.ul
        className="nav-links"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {navItems.map((item, index) => (
          <motion.li
            key={item.id}
            variants={staggerItem}
            custom={index}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <motion.button
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              {...navLinkHover}
            >
              <span className="nav-link-text">{item.label}</span>
              
              {/* 活动指示器 */}
              <AnimatePresence>
                {activeSection === item.id && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              {/* 悬停背景 */}
              <AnimatePresence>
                {hoveredItem === item.id && activeSection !== item.id && (
                  <motion.div
                    className="nav-hover-bg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>

      {/* 滚动进度条 */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleX: useTransform(scrollY, [0, document.body.scrollHeight - window.innerHeight], [0, 1])
        }}
      />
    </motion.nav>
  );
}

export default Navbar;