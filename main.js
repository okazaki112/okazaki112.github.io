// ===== 主题切换功能 =====
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('[data-theme-toggle]');
        this.storageKey = 'blog-theme';
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        
        this.init();
    }
    
    init() {
        // 应用初始主题
        this.applyTheme(this.currentTheme);
        
        // 绑定切换事件
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    getStoredTheme() {
        return localStorage.getItem(this.storageKey);
    }
    
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem(this.storageKey, newTheme);
    }
    
    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// ===== 移动端菜单 =====
class MobileMenu {
    constructor() {
        this.toggleButton = document.querySelector('[data-nav-toggle]');
        this.menu = document.querySelector('.nav__menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.toggleButton && this.menu) {
            this.toggleButton.addEventListener('click', () => this.toggle());
            
            // 点击菜单项后关闭菜单
            const menuLinks = this.menu.querySelectorAll('.nav__link');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => this.close());
            });
            
            // 点击菜单外部关闭菜单
            document.addEventListener('click', (e) => {
                if (!this.menu.contains(e.target) && !this.toggleButton.contains(e.target)) {
                    this.close();
                }
            });
        }
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.menu.classList.add('nav__menu--open');
        this.toggleButton.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }
    
    close() {
        this.menu.classList.remove('nav__menu--open');
        this.toggleButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// ===== 平滑滚动 =====
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href === '#' || href === '#!') return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            // 计算偏移量（考虑固定导航栏）
            const navHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 更新URL但不滚动
            history.pushState(null, null, href);
        }
    }
}

// ===== 导航栏滚动效果 =====
class NavbarScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.isHidden = false;
        this.init();
    }
    
    init() {
        if (this.header) {
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        }
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // 添加阴影效果
        if (currentScroll > 10) {
            this.header.style.boxShadow = 'var(--shadow-md)';
        } else {
            this.header.style.boxShadow = 'none';
        }
        
        // 自动隐藏/显示导航栏
        if (currentScroll > 100) {
            if (currentScroll > this.lastScroll && !this.isHidden) {
                // 向下滚动，隐藏导航栏
                this.hide();
            } else if (currentScroll < this.lastScroll && this.isHidden) {
                // 向上滚动，显示导航栏
                this.show();
            }
        }
        
        this.lastScroll = currentScroll;
    }
    
    hide() {
        this.header.style.transform = 'translateY(-100%)';
        this.isHidden = true;
    }
    
    show() {
        this.header.style.transform = 'translateY(0)';
        this.isHidden = false;
    }
}

// ===== 滚动动画 =====
class ScrollAnimation {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }
    
    init() {
        if (this.elements.length > 0) {
            this.observe();
        }
    }
    
    observe() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ===== 表单验证 =====
class FormValidator {
    constructor(form) {
        this.form = form;
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // 实时验证
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            // 模拟表单提交
            this.submitForm();
        }
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        let error = null;
        
        // 必填验证
        if (input.hasAttribute('required') && !value) {
            error = '此项为必填项';
        }
        
        // 邮箱验证
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = '请输入有效的邮箱地址';
            }
        }
        
        // 显示或隐藏错误
        if (error) {
            this.showError(input, error);
            return false;
        } else {
            this.clearError(input);
            return true;
        }
    }
    
    showError(input, message) {
        const formGroup = input.closest('.form__group');
        let errorElement = formGroup.querySelector('.form__error');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'form__error';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('form__input--error');
    }
    
    clearError(input) {
        const formGroup = input.closest('.form__group');
        const errorElement = formGroup.querySelector('.form__error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('form__input--error');
    }
    
    submitForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // 显示加载状态
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="iconify" data-icon="ph:spinner-gap" data-inline="true"></span>
            发送中...
        `;
        
        // 模拟API请求
        setTimeout(() => {
            // 重置表单
            this.form.reset();
            
            // 显示成功消息
            this.showSuccessMessage();
            
            // 恢复按钮
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 1500);
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form__success';
        message.innerHTML = `
            <span class="iconify" data-icon="ph:check-circle-bold"></span>
            消息已发送成功！
        `;
        
        this.form.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// ===== 回到顶部按钮 =====
class BackToTop {
    constructor() {
        this.button = this.createButton();
        this.init();
    }
    
    createButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.setAttribute('aria-label', '回到顶部');
        button.innerHTML = '<span class="iconify" data-icon="ph:arrow-up-bold"></span>';
        document.body.appendChild(button);
        return button;
    }
    
    init() {
        window.addEventListener('scroll', () => this.toggleVisibility(), { passive: true });
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    toggleVisibility() {
        if (window.pageYOffset > 500) {
            this.button.classList.add('back-to-top--visible');
        } else {
            this.button.classList.remove('back-to-top--visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===== 图片懒加载 =====
class LazyLoad {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }
    
    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // 浏览器支持原生懒加载
            this.images.forEach(img => {
                img.addEventListener('load', () => img.classList.add('loaded'));
            });
        } else {
            // 使用Intersection Observer实现懒加载
            this.observeImages();
        }
    }
    
    observeImages() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.addEventListener('load', () => img.classList.add('loaded'));
                    observer.unobserve(img);
                }
            });
        }, options);
        
        this.images.forEach(img => {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            observer.observe(img);
        });
    }
}

// ===== 性能监控 =====
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                this.reportPerformance();
            });
        }
    }
    
    reportPerformance() {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (perfData) {
            console.log('页面性能指标：');
            console.log(`DNS查询: ${perfData.domainLookupEnd - perfData.domainLookupStart}ms`);
            console.log(`TCP连接: ${perfData.connectEnd - perfData.connectStart}ms`);
            console.log(`请求响应: ${perfData.responseEnd - perfData.requestStart}ms`);
            console.log(`DOM解析: ${perfData.domComplete - perfData.domInteractive}ms`);
            console.log(`页面加载: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        }
    }
}

// ===== 初始化所有功能 =====
document.addEventListener('DOMContentLoaded', () => {
    // 主题管理
    new ThemeManager();
    
    // 移动端菜单
    new MobileMenu();
    
    // 平滑滚动
    new SmoothScroll();
    
    // 导航栏滚动效果
    new NavbarScroll();
    
    // 滚动动画
    new ScrollAnimation();
    
    // 表单验证
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        new FormValidator(contactForm);
    }
    
    // 回到顶部
    new BackToTop();
    
    // 图片懒加载
    new LazyLoad();
    
    // 性能监控
    new PerformanceMonitor();
});

// ===== 添加CSS动画类到CSS文件 =====
const additionalStyles = `
/* 回到顶部按钮 */
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all var(--transition-base);
    z-index: var(--z-sticky);
    box-shadow: var(--shadow-lg);
}

.back-to-top--visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.back-to-top:hover {
    background: var(--color-primary-dark);
    transform: translateY(-4px);
}

.back-to-top:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* 表单错误样式 */
.form__input--error {
    border-color: #ef4444 !important;
}

.form__error {
    display: block;
    margin-top: 0.25rem;
    font-size: var(--font-size-sm);
    color: #ef4444;
}

/* 表单成功消息 */
.form__success {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--color-secondary);
    color: white;
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 图片加载动画 */
img {
    opacity: 0;
    transition: opacity var(--transition-base);
}

img.loaded {
    opacity: 1;
}

/* 滚动动画 */
[data-animate] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-animate].animate {
    opacity: 1;
    transform: translateY(0);
}
`;

// 将额外样式添加到页面
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);