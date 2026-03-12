import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem, progressBar } from '../animations';
import './Skills.css';

const skillCategories = [
  {
    title: '前端开发',
    icon: '⚡',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Vue.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    title: '后端开发',
    icon: '🔧',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 88 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 82 },
    ],
  },
  {
    title: 'AI & 工具',
    icon: '🤖',
    skills: [
      { name: 'OpenAI API', level: 90 },
      { name: 'LangChain', level: 85 },
      { name: 'Docker', level: 78 },
      { name: 'Git', level: 92 },
    ],
  },
];

const otherSkills = ['REST API', 'GraphQL', 'Figma', 'CI/CD', 'AWS', 'Vercel', 'Linux', 'Agile'];

function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="skills-container">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.div className="skills-header" variants={staggerItem}>
            <span className="section-label">Skills</span>
            <h2 className="section-title">技能栈</h2>
          </motion.div>

          <motion.div className="skills-grid" variants={staggerItem}>
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="skill-category"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  delay: 0.2 + categoryIndex * 0.15, 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        delay: 0.3 + categoryIndex * 0.15 + skillIndex * 0.08, 
                        duration: 0.5 
                      }}
                    >
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <motion.span 
                          className="skill-level"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.5 + categoryIndex * 0.15 + skillIndex * 0.08 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: skill.level / 100 } : {}}
                          transition={{ 
                            delay: 0.4 + categoryIndex * 0.15 + skillIndex * 0.08, 
                            duration: 1, 
                            ease: [0.16, 1, 0.3, 1] 
                          }}
                          style={{ originX: 0 }}
                        />
                        <div className="skill-glow" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="skill-tags"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="tags-title">其他技能</h3>
            <div className="tags-container">
              {otherSkills.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    delay: 1 + index * 0.05, 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 背景装饰 */}
      <div className="skills-bg">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
      </div>
    </section>
  );
}

export default Skills;