import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * 波浪效果
 */
function WaveEffect({ 
  color = '#FF6B35',
  height = 100,
  speed = 5,
  opacity = 0.3,
}) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{ 
        width: '100%', 
        height,
        opacity,
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
    >
      <motion.path
        d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
        fill={color}
        animate={{
          d: [
            "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
            "M0,60 C150,0 350,120 600,60 C850,0 1050,120 1200,60 L1200,120 L0,120 Z",
            "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
          ],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

/**
 * 涟漪扩散效果
 */
function RippleEffect({ 
  x = 0, 
  y = 0,
  color = '#FF6B35',
  size = 10,
  duration = 1,
}) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 15, opacity: 0 }}
      transition={{ duration, ease: 'easeOut' }}
    />
  );
}

/**
 * 涟漪按钮
 */
function RippleButton({ 
  children, 
  onClick,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.3)',
  ...props 
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
    
    onClick?.(e);
  };

  return (
    <motion.button
      className={className}
      onClick={handleClick}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <RippleEffect
          key={ripple.id}
          x={ripple.x}
          y={ripple.y}
          color={rippleColor}
          size={20}
          duration={0.8}
        />
      ))}
    </motion.button>
  );
}

/**
 * SVG路径描边动画
 */
function SVGPathAnimation({ 
  pathD,
  strokeColor = '#FF6B35',
  strokeWidth = 3,
  width = 200,
  height = 200,
  duration = 2,
}) {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <motion.path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </svg>
  );
}

/**
 * 圆形进度指示器
 */
function CircularProgress({ 
  progress = 0,
  size = 60,
  strokeWidth = 4,
  color = '#FF6B35',
  trackColor = 'rgba(255, 107, 53, 0.1)',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      {/* 轨道 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* 进度 */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset,
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
        }}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
}

/**
 * 加载动画 - 暖色主题
 */
function LoadingSpinner({ 
  size = 40,
  color = '#FF6B35',
  secondaryColor = '#F7931E',
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <defs>
        <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="url(#spinnerGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{
          pathLength: [0, 0.5, 1],
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  );
}

/**
 * 脉冲圆环
 */
function PulseRing({ 
  size = 100,
  color = '#FF6B35',
  duration = 2,
}) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            border: `2px solid ${color}`,
            borderRadius: '50%',
          }}
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration,
            delay: i * (duration / 3),
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
      <motion.div
        style={{
          position: 'absolute',
          inset: '30%',
          background: color,
          borderRadius: '50%',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export { 
  WaveEffect, 
  RippleEffect, 
  RippleButton, 
  SVGPathAnimation, 
  CircularProgress,
  LoadingSpinner,
  PulseRing,
};
