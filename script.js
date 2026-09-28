document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    const updateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = `${progress}%`;
    };

    // 2. Sticky Header & Active State
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const handleScroll = () => {
        // Header shrink
        if (window.scrollY > 50 && header) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
        
        updateScrollProgress();

        // Active Navigation Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    const mobileLinks = document.querySelectorAll('.nav-links a, .nav-actions a');

    if (hamburger && navContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navContainer.classList.toggle('menu-open');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navContainer.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Pipeline Node Pulsing Animation (Now targets project architecture)
    const indicators = document.querySelectorAll('.pipeline-visual .node-indicator');
    if (indicators.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // Safety check if elements were removed/modified dynamically
            if(indicators[currentIndex]) {
                indicators[currentIndex].classList.add('active');
            }
            
            currentIndex = (currentIndex + 1) % indicators.length;
        }, 1200); 
    }
});