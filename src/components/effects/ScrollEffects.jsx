import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

/**
 * 3D卡片效果 - Awwwards级别
 */
function Card3D({ 
  children,
  className = '',
  intensity = 15,
  glare = true,
  glareColor = 'rgba(255, 107, 53, 0.3)',
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
        
        {/* 光泽效果 */}
        {glare && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${50 + (x.get() || 0) * 50}% ${50 - (y.get() || 0) * 50}%, ${glareColor}, transparent 50%)`,
              opacity: isHovered ? 1 : 0,
              pointerEvents: 'none',
              borderRadius: 'inherit',
            }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * 滚动视差效果
 */
function ScrollParallax({ 
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);
  const x = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        style={{ 
          y: direction === 'vertical' ? y : 0,
          x: direction === 'horizontal' ? x : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 多层视差容器
 */
function MultiLayerParallax({ 
  layers,
  className = '',
}) {
  const { scrollYProgress } = useScroll();

  return (
    <div className={className} style={{ position: 'relative' }}>
      {layers.map((layer, index) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [layer.speed * 100, -layer.speed * 100]
        );

        return (
          <motion.div
            key={index}
            style={{
              position: index === 0 ? 'relative' : 'absolute',
              inset: 0,
              y,
              zIndex: layer.zIndex || index,
            }}
          >
            {layer.content}
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * 滚动触发入场动画
 */
function ScrollReveal({ 
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
    },
    fadeDown: {
      initial: { opacity: 0, y: -60 },
      animate: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
    },
    fadeRight: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
    },
  };

  const { initial, animate } = animations[animation] || animations.fadeUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 磁性吸附效果
 */
function MagneticElement({ 
  children,
  strength = 0.3,
  className = '',
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/**
 * 滚动进度指示器
 */
function ScrollProgress({ 
  color = '#FF6B35',
  height = 3,
  position = 'top',
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        height,
        background: color,
        scaleX,
        transformOrigin: 'left',
        zIndex: 9999,
      }}
    />
  );
}

export { 
  Card3D, 
  ScrollParallax, 
  MultiLayerParallax, 
  ScrollReveal,
  MagneticElement,
  ScrollProgress,
};
