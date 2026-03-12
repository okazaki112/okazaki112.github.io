import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, staggerItem } from '../animations';
import { Card3D, ScrollReveal, MagneticElement } from './effects';
import './Projects.css';

const projects = [
  {
    title: 'AI 智能助手',
    description: '基于 GPT-4 的多模态对话助手，支持文本、图像、代码等多种输入形式，提供智能化的交互体验。',
    tech: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
    color: '#FF6B35',
    icon: '🤖',
  },
  {
    title: '数据可视化平台',
    description: '企业级数据分析与可视化平台，支持实时数据流处理，提供丰富的图表组件和自定义仪表板。',
    tech: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    color: '#F7931E',
    icon: '📊',
  },
  {
    title: '在线协作工具',
    description: '实时协作文档编辑器，支持多人同时编辑、评论、版本控制，提供流畅的协作体验。',
    tech: ['React', 'WebSocket', 'Node.js', 'Redis'],
    color: '#FF4757',
    icon: '📝',
  },
  {
    title: '移动端电商应用',
    description: '跨平台移动电商应用，支持商品浏览、购物车、支付等完整购物流程，性能优异。',
    tech: ['React Native', 'GraphQL', 'Node.js', 'AWS'],
    color: '#FFB347',
    icon: '🛒',
  },
  {
    title: '设计模板库',
    description: '高质量UI设计模板集合，包含落地页、仪表板、电商等多种场景，支持Figma和代码导出。',
    tech: ['Figma', 'React', 'Tailwind', 'Storybook'],
    color: '#FF6B35',
    icon: '🎨',
  },
  {
    title: '桌面效率工具',
    description: '跨平台桌面应用，提供文件管理、快捷操作、系统监控等功能，提升日常工作效率。',
    tech: ['Electron', 'React', 'Node.js', 'SQLite'],
    color: '#F7931E',
    icon: '🖥️',
  },
  {
    title: '数据分析平台',
    description: '企业级数据分析平台，支持多数据源接入、智能报表生成、可视化大屏展示。',
    tech: ['Python', 'Pandas', 'FastAPI', 'ECharts'],
    color: '#FF4757',
    icon: '📈',
  },
  {
    title: '自动化工作流',
    description: '可视化工作流编排工具，支持拖拽式流程设计，集成多种API服务，实现业务自动化。',
    tech: ['Vue.js', 'Node-RED', 'Docker', 'Redis'],
    color: '#FFB347',
    icon: '⚡',
  },
];

function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="projects-container">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.div className="projects-header" variants={staggerItem}>
            <span className="section-label">Projects</span>
            <h2 className="section-title">项目作品</h2>
            <p className="section-subtitle">
              精选项目展示，每个项目都是技术与创意的结合
            </p>
          </motion.div>

          <motion.div className="projects-grid" variants={staggerItem}>
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.title}
                animation="fadeUp"
                delay={index * 0.12}
              >
                <Card3D 
                  intensity={10}
                  glare={true}
                  glareColor="rgba(255, 107, 53, 0.2)"
                >
                  <motion.div
                    className="project-card"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    style={{
                      '--project-color': project.color,
                    }}
                  >
                    {/* 卡片光效 */}
                    <motion.div
                      className="card-glow"
                      animate={{
                        opacity: hoveredIndex === index ? 0.2 : 0,
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ background: project.color }}
                    />

                    {/* 卡片内容 */}
                    <div className="project-card-inner">
                      <div className="project-header">
                        <motion.div
                          className="project-icon"
                          animate={{
                            scale: hoveredIndex === index ? 1.1 : 1,
                            rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)` }}
                        >
                          <span>{project.icon}</span>
                        </motion.div>
                        <motion.div
                          className="project-number"
                          animate={{ opacity: hoveredIndex === index ? 1 : 0.3 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </motion.div>
                      </div>

                      <div className="project-body">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                          {project.tech.map((tech) => (
                            <motion.span
                              key={tech}
                              className="tech-tag"
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        className="project-footer"
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MagneticElement strength={0.2}>
                          <motion.button
                            className="project-link"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>查看详情</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.button>
                        </MagneticElement>
                      </motion.div>
                    </div>

                    {/* 边框渐变 */}
                    <div className="card-border" />
                  </motion.div>
                </Card3D>
              </ScrollReveal>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 背景装饰 */}
      <div className="projects-bg">
        <div className="bg-line line-1" />
        <div className="bg-line line-2" />
      </div>
    </section>
  );
}

export default Projects;
