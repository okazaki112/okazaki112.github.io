import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { MouseParticles, FloatingParticles, ScrollProgress } from './components/effects';
import './index.css';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 全局滚动进度条 */}
      <motion.div
        className="global-progress"
        style={{ scaleX }}
      />
      
      {/* 背景浮动粒子 */}
      <FloatingParticles 
        count={30}
        colors={['#FF6B35', '#F7931E', '#FF4757', '#FFB347']}
        minSize={2}
        maxSize={5}
      />
      
      {/* 鼠标跟随粒子 */}
      <MouseParticles 
        color={['#FF6B35', '#F7931E', '#FF4757']}
        count={2}
        size={6}
        trailLength={15}
      />
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;