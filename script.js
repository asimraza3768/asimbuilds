/**
 * Asim Raza - Data Engineer Portfolio
 * Minimal, vanilla JS to handle UI interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Year for Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Mobile Navigation Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when a navigation link is clicked
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
            
            if (targetId === '#') return; // Skip empty hashes
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Smooth scroll via API, accounts for CSS scroll-padding-top
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. Certifications Live Filtering ---
    const certSearchInput = document.getElementById('certSearch');
    const certItems = document.querySelectorAll('.cert-item');
    const noResultsMsg = document.getElementById('noCertResults');

    if (certSearchInput && certItems.length > 0) {
        certSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;

            certItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                // Also check dataset categories to make search smarter
                const categories = item.getAttribute('data-category') ? item.getAttribute('data-category').toLowerCase() : '';
                
                if (text.includes(searchTerm) || categories.includes(searchTerm)) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Toggle "No results" message
            if (visibleCount === 0) {
                noResultsMsg.classList.remove('hidden');
            } else {
                noResultsMsg.classList.add('hidden');
            }
        });
    }

    // --- 5. Pipeline Scroll Hint (Optional subtlety) ---
    // Make sure horizontal pipeline scroll is at start on load
    const pipelineContainer = document.querySelector('.pipeline-container');
    if (pipelineContainer) {
        pipelineContainer.scrollLeft = 0;
    }
});