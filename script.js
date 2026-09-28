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

    // --- 5. Certificate Engine (Text-only listing & Filtering) ---
    if (typeof certificateData !== 'undefined') {
        const certGrid = document.getElementById('certGrid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const loadMoreCertsBtn = document.getElementById('loadMoreCertsBtn');

        if (certGrid) {
            let currentCertFilter = 'all';
            let visibleCertsCount = 9; // Display 9 initially

            function renderCertificates() {
                certGrid.innerHTML = '';
                
                // Filter the centralized data array
                let matchedCerts = certificateData.filter(cert => {
                    return currentCertFilter === 'all' || cert.category === currentCertFilter;
                });

                // Slice array for pagination
                let visibleCerts = matchedCerts.slice(0, visibleCertsCount);

                // Dynamically build text-only cards
                visibleCerts.forEach(cert => {
                    const card = document.createElement('div');
                    card.className = 'cert-card';
                    card.innerHTML = `
                        <div class="cert-card-content">
                            <h3 class="cert-title">${cert.title}</h3>
                            <p class="cert-provider">${cert.provider}</p>
                            <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem; flex-grow: 1;">${cert.summary}</p>
                            <a href="certificate.html?certificate=${cert.id}" class="btn btn-sm btn-outline view-cert-btn" style="margin-top: auto;">View Certificate &rarr;</a>
                        </div>
                    `;
                    certGrid.appendChild(card);
                });

                // Toggle "Load More"
                if (loadMoreCertsBtn) {
                    loadMoreCertsBtn.style.display = matchedCerts.length > visibleCertsCount ? 'inline-flex' : 'none';
                }
            }

            // Bind filter events
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentCertFilter = btn.getAttribute('data-filter');
                    visibleCertsCount = 9; // Reset pagination
                    renderCertificates();
                });
            });

            // Bind Load More event
            if (loadMoreCertsBtn) {
                loadMoreCertsBtn.addEventListener('click', () => {
                    visibleCertsCount += 9;
                    renderCertificates();
                });
            }

            // Initial DOM render
            renderCertificates();
        }
    }
}); // <--- THIS WAS THE MISSING BRACKET YOU NEEDED!


/* ==========================================================================
   DATA ENGINEERING PIPELINE LOADER
   ========================================================================== */
(function initPipelineLoader() {
    const loader = document.getElementById('de-loader');
    if (!loader) return;

    const statusText = document.getElementById('de-status-text');
    const progressText = document.getElementById('de-progress-text');
    const nodes = document.querySelectorAll('.de-node');
    const arrows = document.querySelectorAll('.de-arrow');
    
    // Config
    const startTime = Date.now();
    const minDisplayTime = 400; // anti-flash minimum (ms)
    const failsafeTimeout = 5000; // absolute max time before closing (ms)
    let simProgress = 0;
    let simInterval;
    let isLoaded = false;

    // Messages array matching pipeline stages
    const messages = [
        "Initializing data systems...",
        "Connecting to APIs...",
        "Landing raw data in S3...",
        "Validating Bronze layer...",
        "Transforming to Silver...",
        "Aggregating Gold datasets...",
        "Loading analytics interface..."
    ];

    function updateVisuals(percent) {
        progressText.textContent = `${percent}%`;

        // Calculate which pipeline node should be active (0 to 6)
        const activeStage = Math.min(6, Math.floor((percent / 100) * 7));
        
        // Update nodes and arrows
        nodes.forEach((node, idx) => {
            if (idx <= activeStage) node.classList.add('active');
        });
        arrows.forEach((arrow, idx) => {
            if (idx < activeStage) arrow.classList.add('active');
        });

        // Update text safely
        if (percent < 100) {
            statusText.textContent = messages[activeStage] || messages[messages.length - 1];
        }
    }

    // Simulate progress while waiting for network
    function startSimulation() {
        simInterval = setInterval(() => {
            if (isLoaded) return;
            // Slow down simulation as it gets closer to 90%
            const increment = simProgress > 70 ? 2 : Math.floor(Math.random() * 8) + 4;
            simProgress += increment;
            
            if (simProgress >= 90) {
                simProgress = 90; // Cap at 90% until native load fires
            }
            updateVisuals(simProgress);
        }, 120);
    }

    function finalizeLoader() {
        if (isLoaded) return;
        isLoaded = true;
        clearInterval(simInterval);

        // Instantly finish visual state
        updateVisuals(100);
        statusText.textContent = "Ready.";
        
        // Calculate remaining time to satisfy minDisplayTime (prevents jarring flash)
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        setTimeout(() => {
            loader.classList.add('is-hidden');
            // Remove from DOM after fade completes to free memory and ensure no keyboard trapping
            setTimeout(() => loader.remove(), 400); 
        }, remainingTime);
    }

    // 1. Start simulated progress
    startSimulation();

    // 2. Listen for actual page load
    window.addEventListener('load', finalizeLoader);

    // 3. Absolute Failsafe: Remove loader if network hangs
    setTimeout(finalizeLoader, failsafeTimeout);
})();