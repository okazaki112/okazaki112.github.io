/**
 * Framer Motion 动画配置 - Awwwards级别动画
 */

// 物理弹簧配置
export const spring = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  default: { type: 'spring', stiffness: 300, damping: 20 },
  stiff: { type: 'spring', stiffness: 400, damping: 25 },
  bouncy: { type: 'spring', stiffness: 600, damping: 15 },
  slow: { type: 'spring', stiffness: 100, damping: 20 },
};

// 缓动函数
export const ease = {
  smooth: [0.25, 1, 0.5, 1],
  outExpo: [0.16, 1, 0.3, 1],
  inOutExpo: [0.87, 0, 0.13, 1],
  spring: [0.34, 1.56, 0.64, 1],
};

// 入场动画变体
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { ...spring.default }
  },
  exit: { opacity: 0, y: -30 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { ...spring.default }
  },
  exit: { opacity: 0, y: 30 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { ...spring.default }
  },
  exit: { opacity: 0, x: 30 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { ...spring.default }
  },
  exit: { opacity: 0, x: -30 },
};

// 缩放入场
export const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { ...spring.bouncy }
  },
  exit: { scale: 0, opacity: 0 },
};

export const scaleInBounce = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1.15, 1],
    opacity: 1,
    transition: { duration: 0.6, ease: ease.outExpo }
  },
  exit: { scale: 0, opacity: 0 },
};

// 旋转入场
export const rotateIn = {
  initial: { rotate: -180, scale: 0, opacity: 0 },
  animate: { 
    rotate: 0, 
    scale: 1, 
    opacity: 1,
    transition: { ...spring.default }
  },
  exit: { rotate: 180, scale: 0, opacity: 0 },
};

// 交错动画容器
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
};

export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

// 交错子元素
export const staggerItem = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { ...spring.default }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  }
};

// 悬停效果
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: { ...spring.stiff }
  },
  whileTap: { scale: 0.98 }
};

export const hoverLift = {
  whileHover: { 
    y: -8,
    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
    transition: { ...spring.stiff }
  },
  whileTap: { y: 0 }
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)',
    transition: { duration: 0.3 }
  }
};

// 3D卡片效果
export const card3D = {
  initial: { rotateX: 0, rotateY: 0 },
  whileHover: {
    rotateX: -5,
    rotateY: 5,
    scale: 1.02,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(99, 102, 241, 0.2)',
    transition: { ...spring.stiff }
  }
};

// 按钮动画
export const buttonHover = {
  whileHover: { 
    scale: 1.02,
    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
  },
  whileTap: { 
    scale: 0.98,
  },
  transition: { ...spring.stiff }
};

// 导航链接动画
export const navLinkHover = {
  whileHover: { 
    scale: 1.1,
    color: '#F8FAFC',
  },
  whileTap: { scale: 0.95 }
};

// 滚动触发动画
export const scrollReveal = {
  initial: { opacity: 0, y: 80 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: ease.outExpo
    }
  }
};

// 页面过渡
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// 模态框动画
export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.9, y: 40 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { ...spring.default }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 40,
    transition: { duration: 0.2 }
  }
};

// 进度条动画
export const progressBar = (delay = 0) => ({
  initial: { scaleX: 0, originX: 0 },
  animate: { 
    scaleX: 1,
    transition: {
      delay,
      duration: 1.2,
      ease: ease.outExpo
    }
  }
});

// 数字计数动画
export const countUp = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { ...spring.bouncy }
  }
};

// 浮动动画
export const float = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// 脉冲动画
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// 旋转动画
export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// 视差滚动配置
export const parallaxConfig = {
  slow: { speed: 0.3 },
  normal: { speed: 0.5 },
  fast: { speed: 0.8 }
};
