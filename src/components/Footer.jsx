import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations';
import './Footer.css';

const socialLinks = [
  { name: 'GitHub', icon: '💻', url: 'https://okazaki112.github.io' },
  { name: 'LinkedIn', icon: '💼', url: 'https://okazaki112.github.io' },
  { name: 'Email', icon: '📧', url: 'https://okazaki112.github.io' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="footer-brand" variants={staggerItem}>
            <motion.span 
              className="footer-logo"
              whileHover={{ scale: 1.05 }}
            >
              Vibe Coding
            </motion.span>
            <p className="footer-tagline">
              用代码创造价值，用设计传递温度
            </p>
          </motion.div>

          <motion.div className="footer-social" variants={staggerItem}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <span>{link.icon}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="footer-bottom" variants={staggerItem}>
            <div className="footer-divider" />
            <div className="footer-info">
              <p className="copyright">
                © {new Date().getFullYear()} Vibe Coder. All rights reserved.
              </p>
              <p className="footer-credit">
                Built with{' '}
                <motion.span 
                  className="heart"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
                {' '}using React & Framer Motion
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 背景装饰 */}
      <div className="footer-bg">
        <div className="footer-gradient" />
      </div>
    </footer>
  );
}

export default Footer;