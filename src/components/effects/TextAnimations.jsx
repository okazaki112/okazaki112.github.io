import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * 逐字入场动画 - Awwwards级别
 */
function TextReveal({ 
  text, 
  delay = 0,
  staggerDelay = 0.03,
  className = '',
  once = true 
}) {
  const letters = text.split('');
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ 
        display: 'inline-flex', 
        flexWrap: 'wrap',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ 
            display: 'inline-block',
            transformStyle: 'preserve-3d',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

/**
 * 打字机效果
 */
function TypewriterEffect({ 
  text, 
  speed = 0.05,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  className = '',
  onComplete 
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed * 1000);

    return () => clearInterval(timer);
  }, [text, speed, started, onComplete]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayedText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{ marginLeft: '2px' }}
        >
          {cursorChar}
        </motion.span>
      )}
    </motion.span>
  );
}

/**
 * 文字渐变描边动画
 */
function TextStrokeAnimation({ 
  text,
  fontSize = '48px',
  fontWeight = 'bold',
  strokeColor = '#FF6B35',
  fillColor = '#FFFBF7',
  strokeWidth = 2,
  className = '',
}) {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const fillOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <svg 
      viewBox="0 0 500 100" 
      style={{ width: '100%', height: 'auto', maxHeight: fontSize }}
      className={className}
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="50%" stopColor="#FF4757" />
          <stop offset="100%" stopColor="#F7931E" />
        </linearGradient>
      </defs>
      
      {/* 描边文字 */}
      <motion.text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={fontWeight}
        fill="none"
        stroke="url(#textGradient)"
        strokeWidth={strokeWidth}
        style={{ pathLength }}
      >
        {text}
      </motion.text>
      
      {/* 填充文字 */}
      <motion.text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={fontWeight}
        fill={fillColor}
        style={{ opacity: fillOpacity }}
      >
        {text}
      </motion.text>
    </svg>
  );
}

/**
 * 文字分割动画
 */
function TextSplit({ 
  text,
  splitBy = 'word',
  delay = 0,
  staggerDelay = 0.1,
  className = '',
}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = splitBy === 'word' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ 
        display: 'inline-flex', 
        flexWrap: 'wrap',
        gap: splitBy === 'word' ? '0.3em' : '0',
        perspective: '1000px',
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          style={{ 
            display: 'inline-block',
            transformStyle: 'preserve-3d',
            whiteSpace: splitBy === 'word' ? 'nowrap' : 'normal',
          }}
        >
          {item}{splitBy === 'word' ? ' ' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
}

export { TextReveal, TypewriterEffect, TextStrokeAnimation, TextSplit };
