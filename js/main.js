/**
 * MCV4U Calculus Academic Site - Core interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const mobileBreakpoint = 768;

    // 移动端折叠导航：只在小屏下通过汉堡按钮控制展开/收起
    const setNavOpen = (isOpen) => {
        if (!navbar) return;
        navbar.classList.toggle('nav-open', isOpen);
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    };

    // 切换折叠状态（点击汉堡按钮）
    const toggleNav = () => {
        if (!navbar) return;
        const isOpen = navbar.classList.contains('nav-open');
        setNavOpen(!isOpen);
    };

    // 回到桌面宽度时强制复位，避免菜单保持展开影响布局
    const syncNavForViewport = () => {
        if (window.innerWidth > mobileBreakpoint) {
            setNavOpen(false);
        }
    };

    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }

    // 点击任意导航链接后自动收起（移动端体验）
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.closest && target.closest('a')) {
                setNavOpen(false);
            }
        });
    }

    window.addEventListener('resize', syncNavForViewport);
    syncNavForViewport();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll reveal
    const revealElements = document.querySelectorAll('.feature-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // 3. Subtle floating effect for math background
    const mathDecos = document.querySelectorAll('.math-deco');

    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        mathDecos.forEach((deco, index) => {
            const factor = index + 1;
            deco.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px) rotate(${factor * 15}deg)`;
        });
    });

    // 4. Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log('MCV4U Academic Platform Initialized.');
});
