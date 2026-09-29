// Blog Posts Data
const blogPosts = [
    {
        id: 'what-i-learned-pipeline',
        title: 'What I Learned From Building an End-to-End Data Pipeline',
        category: 'Data Engineering',
        date: 'September 27, 2026',
        timestamp: 1790476800000,
        readTime: '5 min read',
        excerpt: 'Moving beyond tutorials and understanding the real complexities of data ingestion, quality validation, and modeling in production environments.',
        url: 'posts/what-i-learned-from-building-an-end-to-end-data-pipeline.html',
        isFeatured: false
    },
    {
        id: 'busy-vs-moving',
        title: 'The Difference Between Being Busy and Moving Forward',
        category: 'Thoughts',
        date: 'September 25, 2026',
        timestamp: 1790304000000,
        readTime: '3 min read',
        excerpt: 'A short reflection on productivity, avoiding burnout, and the subtle difference between mere movement and meaningful progress.',
        url: 'posts/busy-vs-moving-forward.html',
        isFeatured: false
    },
    {
        id: 'note-about-time',
        title: 'A Short Note About Time',
        category: 'Poetry',
        date: 'September 20, 2026',
        timestamp: 1789872000000,
        readTime: '1 min read',
        excerpt: 'A few lines about distance, patience, and trusting the process when the road ahead is not entirely clear.',
        url: 'posts/short-note-about-time.html',
        isFeatured: false
    },
    {
        id: 'idempotent-pipelines',
        title: 'How I Made My Data Pipeline Idempotent',
        category: 'Data Engineering',
        date: 'October 12, 2026',
        timestamp: 1791782400000,
        readTime: '4 min read',
        excerpt: 'Discussing MERGE-based upserts and how safe reruns prevent duplicate records from polluting analytics tables.',
        url: 'posts/how-i-made-my-pipeline-idempotent.html',
        isFeatured: true
    },
    {
        id: 'bronze-silver-gold',
        title: 'Bronze vs Silver vs Gold: What I Learned Building My Pipeline',
        category: 'Data Engineering',
        date: 'October 10, 2026',
        timestamp: 1791609600000,
        readTime: '5 min read',
        excerpt: 'Moving beyond theory to explain the practical purpose and strict isolation of each layer in a Medallion architecture.',
        url: 'posts/bronze-vs-silver-vs-gold.html',
        isFeatured: false
    },
    {
        id: 'api-failure-handling',
        title: 'What Happens When an API Fails Mid-Pipeline?',
        category: 'Data Engineering',
        date: 'October 8, 2026',
        timestamp: 1791436800000,
        readTime: '3 min read',
        excerpt: 'Discussing fail-fast handling, raising exceptions, and preventing incomplete data from flowing downstream.',
        url: 'posts/api-failure-handling.html',
        isFeatured: false
    },
    {
        id: 'data-quality-checks',
        title: 'Why Data Quality Checks Matter Before Analytics',
        category: 'Data Engineering',
        date: 'October 5, 2026',
        timestamp: 1791177600000,
        readTime: '4 min read',
        excerpt: 'Exploring the six validation categories used in my project to ensure analytics-ready data.',
        url: 'posts/data-quality-checks.html',
        isFeatured: false
    },
    {
        id: 'incremental-pipelines',
        title: 'Building Incremental Data Pipelines with Databricks',
        category: 'Data Engineering',
        date: 'October 2, 2026',
        timestamp: 1790918400000,
        readTime: '5 min read',
        excerpt: 'How to process only new job data without rebuilding the entire massive dataset on every workflow run.',
        url: 'posts/incremental-pipelines.html',
        isFeatured: false
    },
    {
        id: 'rest-api-to-dashboard',
        title: 'From REST API to Analytics Dashboard',
        category: 'Data Engineering',
        date: 'September 30, 2026',
        timestamp: 1790745600000,
        readTime: '6 min read',
        excerpt: 'A high-level walkthrough of the complete engineering flow from JSON extraction to Databricks AI/BI.',
        url: 'posts/rest-api-to-dashboard.html',
        isFeatured: false
    },
    {
        id: 's3-raw-landing',
        title: 'Why I Used Amazon S3 for Raw Data Landing',
        category: 'Data Engineering',
        date: 'September 28, 2026',
        timestamp: 1790572800000,
        readTime: '3 min read',
        excerpt: 'Explaining the architectural safety net of dumping raw API responses into cloud storage before transformation.',
        url: 'posts/s3-raw-landing.html',
        isFeatured: false
    },
    {
        id: 'nested-json-pyspark',
        title: 'What I Learned From Working With Nested JSON',
        category: 'Data Engineering',
        date: 'September 22, 2026',
        timestamp: 1790054400000,
        readTime: '4 min read',
        excerpt: 'Practical transformation challenges and PySpark techniques when dealing with deeply nested API data.',
        url: 'posts/nested-json-pyspark.html',
        isFeatured: false
    },
    {
        id: 'gold-tables-analytics',
        title: 'Designing Analytics-Ready Data With Gold Tables',
        category: 'Data Engineering',
        date: 'September 18, 2026',
        timestamp: 1789708800000,
        readTime: '4 min read',
        excerpt: 'How heavily transformed, validated, and aggregated data becomes genuinely useful for business dashboards.',
        url: 'posts/gold-tables-analytics.html',
        isFeatured: false
    },
    {
        id: 'future-pipeline-improvements',
        title: 'What I Would Improve in My Data Pipeline Next',
        category: 'Data Engineering',
        date: 'September 15, 2026',
        timestamp: 1789449600000,
        readTime: '3 min read',
        excerpt: 'A look at realistic future feature additions, including automated retries, scheduling, and better observability.',
        url: 'posts/future-pipeline-improvements.html',
        isFeatured: false
    },

    {
        id: 'tech-simple-architecture',
        title: 'Why Simple Architecture Usually Wins',
        category: 'Technology',
        date: 'October 20, 2026',
        timestamp: 1792473600000,
        readTime: '4 min read',
        excerpt: 'A look at why over-engineering hurts projects and why simplicity is the ultimate sophistication in software design.',
        url: 'posts/why-simple-architecture-wins.html',
        isFeatured: false
    },
    {
        id: 'career-building-scratch',
        title: 'The Value of Building Things From Scratch',
        category: 'Career',
        date: 'October 22, 2026',
        timestamp: 1792646400000,
        readTime: '3 min read',
        excerpt: 'Why stepping away from tutorials and facing a blank canvas is the fastest way to grow as an engineer.',
        url: 'posts/value-of-building-from-scratch.html',
        isFeatured: false
    },
    {
        id: 'life-finding-balance',
        title: 'Finding Balance in a Screen-Heavy World',
        category: 'Life',
        date: 'October 25, 2026',
        timestamp: 1792905600000,
        readTime: '3 min read',
        excerpt: 'Reflections on stepping away from the keyboard and the importance of offline hobbies.',
        url: 'posts/finding-balance-offline.html',
        isFeatured: false
    },
    {
        id: 'books-systems-thinking',
        title: 'How Reading Changes the Way We Build',
        category: 'Books',
        date: 'October 28, 2026',
        timestamp: 1793164800000,
        readTime: '3 min read',
        excerpt: 'Why reading books outside of your technical discipline makes you a better engineer.',
        url: 'posts/books-on-systems-thinking.html',
        isFeatured: false
    },
    {
        id: 'poetry-quiet-builder',
        title: 'The Quiet Builder',
        category: 'Poetry',
        date: 'October 30, 2026',
        timestamp: 1793337600000,
        readTime: '1 min read',
        excerpt: 'A short poem about the logic and quiet beauty of building systems.',
        url: 'posts/the-quiet-builder.html',
        isFeatured: false
    }



];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('article-grid');
    const featuredContainer = document.getElementById('featured-article-container');
    const emptyState = document.getElementById('blog-empty-state');
    
    // Check if we are on the blog page
    if (!grid) return;

    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    const searchInput = document.getElementById('blog-search');
    const sortSelect = document.getElementById('blog-sort');

    let currentCategory = 'All';
    let searchQuery = '';
    let sortOrder = 'newest';

    const renderPosts = () => {
        // Filter
        let filtered = blogPosts.filter(post => {
            const matchCategory = currentCategory === 'All' || post.category === currentCategory;
            const matchSearch = post.title.toLowerCase().includes(searchQuery) || 
                                post.excerpt.toLowerCase().includes(searchQuery) ||
                                post.category.toLowerCase().includes(searchQuery);
            return matchCategory && matchSearch;
        });

        // Sort
        filtered.sort((a, b) => {
            return sortOrder === 'newest' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
        });

        // Determine if Featured should show
        // Only show featured layout if we are viewing "All", no search query, and default sort
        const showFeatured = (currentCategory === 'All' && searchQuery === '' && sortOrder === 'newest' && filtered.length > 0);
        
        featuredContainer.innerHTML = '';
        grid.innerHTML = '';
        emptyState.style.display = 'none';

        if (filtered.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        let gridPosts = filtered;

        if (showFeatured) {
            const featuredPost = filtered.find(p => p.isFeatured) || filtered[0];
            gridPosts = filtered.filter(p => p.id !== featuredPost.id);
            
            const categoryClass = `category-${featuredPost.category.replace(/\s+/g, '-')}`;
            
            featuredContainer.innerHTML = `
                <div class="featured-card reveal">
                    <div class="article-meta">
                        <span class="${categoryClass}">${featuredPost.category}</span>
                        <span style="margin: 0 0.5rem; color: var(--border-medium);">|</span>
                        <span>${featuredPost.date} · ${featuredPost.readTime}</span>
                    </div>
                    <h2>${featuredPost.title}</h2>
                    <p class="article-excerpt">${featuredPost.excerpt}</p>
                    <a href="${featuredPost.url}" class="read-more">Read Article <span class="read-more-arrow">→</span></a>
                </div>
            `;
        }

        // Render Grid
        gridPosts.forEach((post, index) => {
            const delay = `delay-${(index % 3) + 1}`;
            const categoryClass = `category-${post.category.replace(/\s+/g, '-')}`;
            
            const card = document.createElement('div');
            card.className = `editorial-card reveal ${delay}`;
            card.innerHTML = `
                <div class="article-meta">
                    <span class="${categoryClass}">${post.category}</span>
                    <span>${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="article-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="read-more">Read Article <span class="read-more-arrow">→</span></a>
            `;
            grid.appendChild(card);
        });

        // Re-trigger reveal animations for new elements
        const newReveals = document.querySelectorAll('#article-grid .reveal, #featured-article-container .reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
        
        newReveals.forEach(el => observer.observe(el));
    };

    // Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-category');
            renderPosts();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderPosts();
    });

    sortSelect.addEventListener('change', (e) => {
        sortOrder = e.target.value;
        renderPosts();
    });

    // Initial render
    renderPosts();
});