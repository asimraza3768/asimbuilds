/**
 * Asim Raza - Data Engineer Portfolio
 * Premium interactions, Scroll reveal, and Certificate Modal handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Remove Preload Class for Hero Animations ---
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);

    // --- 1. Dynamic Year for Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. Mobile Navigation Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 3. Smooth Scrolling for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 4. Scroll Reveal Animations (IntersectionObserver) ---
    // Handle stagger indices for grids
    const staggerContainers = [
        document.querySelector('.focus-grid'),
        document.querySelector('.approach-grid')
    ];
    
    staggerContainers.forEach(container => {
        if (!container) return;
        const items = container.querySelectorAll('[data-animate="stagger"]');
        items.forEach((item, index) => {
            item.style.setProperty('--stagger-idx', index);
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // --- 5. Certificate Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                    // Reset animation for visible cards
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = null; 
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // --- 6. Certificate Modal Handling ---
    const modal = document.getElementById('certModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalProvider = document.getElementById('modalProvider');
    const modalSummary = document.getElementById('modalSummary');

    function openModal(imageSrc, title, provider, summary) {
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalProvider.textContent = provider;
        modalSummary.textContent = summary;
        
        modal.classList.add('show');
        document.body.classList.add('no-scroll');
        modal.focus();
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.classList.remove('no-scroll');
        // Clear src after fade out to prevent flash on next open
        setTimeout(() => { modalImage.src = ''; }, 300);
    }

    // Attach click events to both the card image and the button
    certCards.forEach(card => {
        const img = card.querySelector('.cert-image-preview');
        const btn = card.querySelector('.view-cert-btn');
        
        const triggerOpen = () => {
            const title = card.querySelector('.cert-title').textContent;
            const provider = card.querySelector('.cert-provider').textContent;
            const summary = card.querySelector('.cert-summary-hidden').textContent;
            openModal(img.src, title, provider, summary);
        };

        img.addEventListener('click', triggerOpen);
        btn.addEventListener('click', triggerOpen);
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});