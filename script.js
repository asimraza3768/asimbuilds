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
    const header = document.querySelector('body > header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const handleScroll = () => {
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
            if (window.scrollY >= (sectionTop - 200)) {
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
});

// 5. Project Modals Logic (Progressive Disclosure)
    const modalButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.project-modal');

    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });

    const closeModal = () => {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.classList.remove('no-scroll');
    };

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });

    // ==========================================================================
    // INTERACTIVE PIPELINE LOGIC
    // ==========================================================================
    
    const pipelineData = {
        'interactive-job-market': [
            {
                simpleTitle: 'Collect Job Data',
                techTitle: 'Collect Job Data',
                techLabel: 'JobsPipe REST API',
                simpleDesc: 'I collect job listings from an external API.',
                techDesc: 'Extracting nested JSON data via REST API endpoints.',
                visual: '<div class="visual-data-list"><div class="visual-data-card" style="animation-delay:0.1s">Job Listing</div><div class="visual-data-card" style="animation-delay:0.2s">Job Title</div><div class="visual-data-card" style="animation-delay:0.3s">Skills</div><div class="visual-data-card" style="animation-delay:0.4s">Location</div><div class="visual-data-card" style="animation-delay:0.5s">Salary</div></div>'
            },
            {
                simpleTitle: 'Collect All Available Records',
                techTitle: 'Handle Pagination',
                techLabel: 'Cursor-based Pagination',
                simpleDesc: 'The API is processed page by page so the pipeline can collect the available listings.',
                techDesc: 'Automated loop handles API cursors to extract all pages until the payload is exhausted.',
                visual: '<div class="visual-data-list"><div class="visual-data-card" style="animation-delay:0.1s">Batch 1</div><span style="display:flex;align-items:center;color:var(--text-secondary);">→</span><div class="visual-data-card" style="animation-delay:0.2s">Batch 2</div><span style="display:flex;align-items:center;color:var(--text-secondary);">→</span><div class="visual-data-card" style="animation-delay:0.3s">Batch 3</div></div>'
            },
            {
                simpleTitle: 'Store the Original Data',
                techTitle: 'Raw Data Landing',
                techLabel: 'Amazon S3',
                simpleDesc: 'The original API response is stored before further processing.',
                techDesc: 'Decoupling extraction from transformation by landing raw JSON files into a secure AWS S3 bucket.',
                visual: '<div class="final-flow" style="margin:0; background:transparent;"><span>API Data</span> → <span>S3 Raw Landing</span></div>'
            },
            {
                simpleTitle: 'Preserve the Raw Data',
                techTitle: 'Bronze Layer',
                techLabel: 'Bronze Delta',
                simpleDesc: 'The raw data enters the Bronze layer so the original structure is preserved for processing.',
                techDesc: 'Databricks Auto Loader reads from S3 into a Bronze Delta table to maintain an immutable history of raw records.',
                visual: ''
            },
            {
                simpleTitle: 'Clean and Validate the Data',
                techTitle: 'Silver Layer',
                techLabel: 'PySpark + Silver Delta',
                simpleDesc: 'The raw records are transformed and checked before they are used for analytics.',
                techDesc: 'PySpark transformations enforce data quality, unpack nested arrays, and apply idempotent MERGE upserts.',
                visual: '<div class="visual-check-list"><div class="visual-check-item" style="animation-delay:0.1s">Required fields</div><div class="visual-check-item" style="animation-delay:0.2s">Duplicate records</div><div class="visual-check-item" style="animation-delay:0.3s">Salary validation</div><div class="visual-check-item" style="animation-delay:0.4s">Timestamp validation</div><div class="visual-check-item" style="animation-delay:0.5s">Remote-value validation</div><div class="visual-check-item" style="animation-delay:0.6s">Country-code validation</div></div>'
            },
            {
                simpleTitle: 'Create Analytics-Ready Data',
                techTitle: 'Gold Analytics',
                techLabel: 'Gold Delta Tables',
                simpleDesc: 'Clean data is organized into datasets designed for analysis.',
                techDesc: 'Silver data is aggregated into 6 highly optimized Gold tables designed specifically for BI consumption.',
                visual: '<div class="visual-data-list"><div class="visual-data-card" style="animation-delay:0.1s">Skill Demand</div><div class="visual-data-card" style="animation-delay:0.2s">Country Markets</div><div class="visual-data-card" style="animation-delay:0.3s">Skill Gaps</div><div class="visual-data-card" style="animation-delay:0.4s">Skill Co-occurrence</div><div class="visual-data-card" style="animation-delay:0.5s">Profile Skill Coverage</div></div>'
            },
            {
                simpleTitle: 'Turn Data Into Insights',
                techTitle: 'Dashboard',
                techLabel: 'Databricks AI/BI',
                simpleDesc: 'The analytics-ready data powers dashboards that make job market patterns easier to understand.',
                techDesc: 'Serverless Databricks SQL connects to the Gold layer to render interactive BI visualizations.',
                visual: '<img src="assets/dashboards/job-market-dashboard.png" class="panel-img" alt="Databricks AI/BI dashboard preview">'
            }
        ],
        'interactive-weather': [
            {
                simpleTitle: 'Collect Weather Data',
                techTitle: 'Collect Weather Data',
                techLabel: 'OpenWeather API',
                simpleDesc: 'I collect weather information from the API for multiple Pakistani cities.',
                techDesc: 'Executing REST API calls to extract live meteorological JSON data.',
                visual: '<div class="visual-data-list"><div class="visual-data-card" style="animation-delay:0.1s">Gojra</div><div class="visual-data-card" style="animation-delay:0.2s">Faisalabad</div><div class="visual-data-card" style="animation-delay:0.3s">Lahore</div><div class="visual-data-card" style="animation-delay:0.4s">Islamabad</div><div class="visual-data-card" style="animation-delay:0.5s">Karachi</div></div>'
            },
            {
                simpleTitle: 'Store the Original Data',
                techTitle: 'Bronze Layer',
                techLabel: 'Bronze Delta',
                simpleDesc: 'The original weather response is stored before transformation.',
                techDesc: 'Raw JSON is appended to a Bronze Delta table to ensure zero data loss during ingestion.',
                visual: '<div class="final-flow" style="margin:0; background:transparent;"><span>OpenWeather API</span> → <span>Bronze</span></div>'
            },
            {
                simpleTitle: 'Clean and Transform the Data',
                techTitle: 'Silver Transformation',
                techLabel: 'PySpark + Silver Delta',
                simpleDesc: 'The raw weather data is transformed into consistent fields that are easier to use.',
                techDesc: 'PySpark scripts apply type casting, metric conversions, and schema enforcement.',
                visual: '<div class="visual-check-list"><div class="visual-check-item" style="animation-delay:0.1s">Unix timestamp → weather time</div><div class="visual-check-item" style="animation-delay:0.2s">Visibility → kilometers</div><div class="visual-check-item" style="animation-delay:0.3s">Wind speed → km/h</div><div class="visual-check-item" style="animation-delay:0.4s">Wind direction → compass direction</div><div class="visual-check-item" style="animation-delay:0.5s">Country code → Pakistan</div></div>'
            },
            {
                simpleTitle: 'Check Data Quality',
                techTitle: 'Data Quality',
                techLabel: 'Data Quality Checks',
                simpleDesc: 'The transformed data is checked before it moves into analytics.',
                techDesc: 'Validating critical columns to prevent nulls and ensuring strict schema adherence.',
                visual: '<div class="visual-check-list"><div class="visual-check-item" style="animation-delay:0.1s">Null checks</div><div class="visual-check-item" style="animation-delay:0.2s">Timestamp conversions</div></div>'
            },
            {
                simpleTitle: 'Create Daily Weather Insights',
                techTitle: 'Gold Layer',
                techLabel: 'weather.gold.daily_weather_summary',
                simpleDesc: 'The cleaned data is organized into a dataset ready for analysis.',
                techDesc: 'Aggregating granular weather events into a daily summary table optimized for querying.',
                visual: '<div class="final-flow" style="margin:0; background:transparent;"><span>Silver Data</span> → <span>Gold Analytics</span></div>'
            },
            {
                simpleTitle: 'Visualize the Weather Data',
                techTitle: 'Dashboard',
                techLabel: 'Databricks SQL Dashboard',
                simpleDesc: 'The Gold dataset provides the foundation for weather analysis and visualization.',
                techDesc: 'Querying the Gold layer via Databricks SQL to track weather patterns across cities.',
                visual: ''
            }
        ]
    };

    class PipelineInteractive {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.steps = pipelineData[containerId];
            this.runBtn = this.container.querySelector('.run-pipeline-btn');
            this.toggleBtns = this.container.querySelectorAll('.toggle-btn');
            this.track = this.container.querySelector('.pipeline-track');
            this.infoPanel = this.container.querySelector('.pipeline-info-panel');
            this.progressText = this.container.querySelector('.pipeline-progress');
            this.viewArea = this.container.querySelector('.pipeline-view-area');
            this.finalState = this.container.querySelector('.pipeline-final-state');
            this.dataPacket = this.container.querySelector('.data-packet');
            
            this.isTechnical = false;
            this.currentStep = -1;
            this.interval = null;
            this.nodes = [];

            this.init();
        }

        init() {
            // Build Nodes
            this.steps.forEach((step, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'pipeline-node-wrapper';
                
                const node = document.createElement('div');
                node.className = 'pipeline-node';
                
                const label = document.createElement('div');
                label.className = 'pipeline-node-label';
                label.textContent = `Step ${index + 1}`;
                
                wrapper.appendChild(node);
                wrapper.appendChild(label);
                this.track.appendChild(wrapper);
                this.nodes.push(node);
            });

            // Toggles
            this.toggleBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.toggleBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.isTechnical = e.target.getAttribute('data-view') === 'technical';
                    if (this.currentStep >= 0 && this.currentStep < this.steps.length) {
                        this.renderPanel(this.currentStep);
                    }
                });
            });

            // Run Button
            this.runBtn.addEventListener('click', () => {
                if (this.runBtn.disabled) return;
                this.startPipeline();
            });
            
            // Set initial panel
            this.renderPanel(0);
        }

        renderPanel(index) {
            const step = this.steps[index];
            const title = this.isTechnical ? step.techTitle : step.simpleTitle;
            const desc = this.isTechnical ? step.techDesc : step.simpleDesc;
            
            this.progressText.textContent = `Step ${index + 1} of ${this.steps.length}`;
            
            let html = `<h5 class="pipeline-info-title">${title}</h5>`;
            if (this.isTechnical) html += `<span class="pipeline-info-tech">${step.techLabel}</span>`;
            html += `<p class="pipeline-info-desc">${desc}</p>`;
            if (step.visual) html += step.visual;

            this.infoPanel.innerHTML = html;
        }

        startPipeline() {
            this.runBtn.disabled = true;
            this.viewArea.style.display = 'block';
            this.finalState.style.display = 'none';
            this.nodes.forEach(n => { n.classList.remove('active', 'completed'); });
            this.dataPacket.classList.add('active');
            
            this.currentStep = 0;
            this.updateStep();

            this.interval = setInterval(() => {
                this.nodes[this.currentStep].classList.remove('active');
                this.nodes[this.currentStep].classList.add('completed');
                this.currentStep++;
                
                if (this.currentStep >= this.steps.length) {
                    this.finishPipeline();
                } else {
                    this.updateStep();
                }
            }, 1600); // ~1.6s per step hits the 8-12s target perfectly
        }

        updateStep() {
            this.nodes[this.currentStep].classList.add('active');
            this.renderPanel(this.currentStep);
            this.movePacket();
        }

        movePacket() {
            // Position the data packet over the current node
            const nodeWrapper = this.nodes[this.currentStep].parentElement;
            const trackRect = this.track.getBoundingClientRect();
            const nodeRect = nodeWrapper.getBoundingClientRect();
            
            // Calculate relative position based on desktop (horizontal) or mobile (vertical)
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                const top = nodeRect.top - trackRect.top + (nodeRect.height / 2);
                this.dataPacket.style.top = `${top}px`;
                this.dataPacket.style.left = '50%';
            } else {
                const left = nodeRect.left - trackRect.left + (nodeRect.width / 2);
                this.dataPacket.style.left = `${left}px`;
                this.dataPacket.style.top = '50%';
            }
        }

        finishPipeline() {
            clearInterval(this.interval);
            this.dataPacket.classList.remove('active');
            this.viewArea.style.display = 'none';
            this.finalState.style.display = 'block';
            this.runBtn.disabled = false;
            this.runBtn.innerHTML = '↻ Run Again';
        }
    }

    // Initialize both pipelines if they exist on the page
    new PipelineInteractive('interactive-job-market');
    new PipelineInteractive('interactive-weather');