import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 鼠标跟随粒子效果 - Awwwards级别
 */
function MouseParticles({ 
  color = '#FF6B35',
  count = 3,
  size = 8,
  trailLength = 20 
}) {
  const [particles, setParticles] = useState([]);
  const [trail, setTrail] = useState([]);
  const idCounter = useRef(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      
      // 节流：每50ms发射一次粒子
      if (now - lastEmit.current > 50) {
        const newParticle = {
          id: idCounter.current++,
          x: e.clientX,
          y: e.clientY,
          size: size + Math.random() * 4,
          color: Array.isArray(color) 
            ? color[Math.floor(Math.random() * color.length)] 
            : color,
        };
        
        setParticles(prev => [...prev.slice(-count * 2), newParticle]);
        
        // 更新轨迹
        setTrail(prev => [...prev.slice(-trailLength), { x: e.clientX, y: e.clientY }]);
        
        lastEmit.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [color, count, size, trailLength]);

  // 清理旧粒子
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-count * 3));
    }, 100);
    return () => clearInterval(cleanup);
  }, [count]);

  return (
    <>
      {/* 粒子轨迹 */}
      <svg 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 9999 
        }}
      >
        {trail.length > 1 && (
          <motion.path
            d={`M ${trail.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke={Array.isArray(color) ? color[0] : color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0.6, pathLength: 0 }}
            animate={{ opacity: 0, pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>
      
      {/* 粒子 */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            style={{
              position: 'fixed',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: particle.color,
              pointerEvents: 'none',
              zIndex: 9999,
              boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}`,
            }}
            initial={{ scale: 0, opacity: 1, x: '-50%', y: '-50%' }}
            animate={{ 
              scale: [1, 1.5, 0], 
              opacity: [1, 0.8, 0],
              y: [0, -30 - Math.random() * 20],
              x: [0, (Math.random() - 0.5) * 40]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.8 + Math.random() * 0.4, 
              ease: 'easeOut' 
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

/**
 * 背景浮动粒子
 */
function FloatingParticles({ 
  count = 50,
  colors = ['#FF6B35', '#F7931E', '#FF4757', '#FFB347'],
  minSize = 2,
  maxSize = 6 
}) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      size: minSize + Math.random() * (maxSize - minSize),
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count, colors, minSize, maxSize]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: particle.color,
            opacity: 0.3,
          }}
          animate={{
            y: [particle.y, particle.y - 200, particle.y],
            x: [particle.x, particle.x + (Math.random() - 0.5) * 100, particle.x],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * 粒子汇聚效果
 */
function ParticleConvergence({ 
  targetRef,
  count = 100,
  colors = ['#FF6B35', '#F7931E', '#FF4757'],
  onComplete 
}) {
  const [particles, setParticles] = useState([]);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setTargetPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [targetRef]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      startY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, [count, colors]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
      <AnimatePresence onExitComplete={onComplete}>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            style={{
              position: 'absolute',
              left: particle.startX,
              top: particle.startY,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            initial={{ 
              x: 0, 
              y: 0,
              opacity: 0,
              scale: 0,
            }}
            animate={{ 
              x: targetPosition.x - particle.startX,
              y: targetPosition.y - particle.startY,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 1.5,
              delay: particle.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export { MouseParticles, FloatingParticles, ParticleConvergence };
