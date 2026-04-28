/**
 * script.js
 * Handles modern interactivities:
 * 1. Intersection Observer for fade-in animations on scroll.
 * 2. Active nav link tracking based on scroll position.
 * 3. Parallax/Smooth rotational math for the mechanical gear.
 */

document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const gearImage = document.getElementById('gear');
    const fullpage = document.getElementById('fullpage');

    // --- 1. Fade-in animations via Intersection Observer ---
    const observerOptions = {
        root: fullpage,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove to allow repeated animations, or keep for one-time
                // entry.target.classList.remove('visible'); 
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        sectionObserver.observe(sec);
    });

    // Handle load visibility immediately for the first section
    setTimeout(() => {
        if(sections[0]) sections[0].classList.add('visible');
    }, 100);


    // --- 2. Update Nav Links Based on Scroll ---
    const navObserverOptions = {
        root: fullpage,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(sec => {
        navObserver.observe(sec);
    });


    // --- 3. Gear Rotation on Scroll ---
    // Instead of locked jumps, we map the rotation directly to the scroll distance
    // We listen to the native scroll event of the scroll container
    let scrollPos = 0;
    
    fullpage.addEventListener('scroll', () => {
        scrollPos = fullpage.scrollTop;
        
        // Calculate rotation degrees based on scroll. 
        // 0.2 is the rotation speed factor. Adjust as needed.
        const rotationDegrees = scrollPos * 0.25; 
        
        if (gearImage) {
            gearImage.style.transform = `rotate(${rotationDegrees}deg)`;
        }
    });

    // --- 4. Smooth Anchor Scrolling inside native scroll container ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smoothly scroll the container to the actual offset inside the fullpage container
                fullpage.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. Time & Weather Gadget ---
    const timeEl = document.getElementById('gadget-time');
    const weatherText = document.getElementById('weather-text');
    const locText = document.getElementById('loc-text');

    // Live clock logic (24 Hour Format)
    function updateClock() {
        if (!timeEl) return;
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        timeEl.textContent = timeString;
    }
    
    // Initial call and set interval
    updateClock();
    setInterval(updateClock, 1000);

    // Weather & Location fetching logic
    async function fetchData(lat, lon) {
        // Fetch Weather
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const data = await res.json();
            
            if (data && data.current_weather) {
                const temp = Math.round(data.current_weather.temperature);
                weatherText.textContent = `${temp}°C`;
            } else {
                weatherText.textContent = `N/A`;
            }
        } catch (e) {
            console.error("Failed to fetch weather: ", e);
            weatherText.textContent = `Offline`;
        }

        // Fetch Reverse Geolocation
        try {
            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const geoData = await geoRes.json();
            // Fallback strategy for accurate name
            const locationName = geoData.city || geoData.locality || geoData.principalSubdivision || "Unknown Area";
            locText.textContent = locationName;
        } catch (e) {
            console.error("Failed to fetch location: ", e);
            locText.textContent = "Unknown";
        }
    }

    // Request client geo-location
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            // Success
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchData(lat, lon);
            },
            // Error
            (error) => {
                console.warn("Geolocation blocked or failed: ", error.message);
                locText.textContent = `Location Denied`;
                weatherText.textContent = `--°C`;
            },
            {
                timeout: 5000 // 5 seconds wait
            }
        );
    } else {
        locText.textContent = `Geo unavailable`;
    }

    // --- 6. Generic Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find the closest tab group
            const tabsContainer = btn.closest('.skills-tabs');
            
            // Remove active from all buttons in this specific tab container
            if (tabsContainer) {
                tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            }

            // Get target content area
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                const contentArea = targetContent.parentElement;
                
                // Remove active from all grids in the matching content area
                Array.from(contentArea.children).forEach(child => child.classList.remove('active'));

                // Add active class to clicked button and target content
                btn.classList.add('active');
                targetContent.classList.add('active');
            }
        });
    });

    // --- 7. Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksList = document.getElementById('nav-links');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');

    if (mobileMenuBtn && navLinksList) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            
            // Toggle icon between menu and x
            if (navLinksList.classList.contains('active')) {
                mobileMenuIcon.setAttribute('data-lucide', 'x');
            } else {
                mobileMenuIcon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // Re-render the icon
        });

        // Close menu when a link is clicked
        navLinksList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                mobileMenuIcon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // --- 8. Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (modal && projectItems) {
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const contentClone = item.cloneNode(true);
                
                modalBody.innerHTML = '';
                
                // Re-build layout for modal
                const img = contentClone.querySelector('img');
                const h3 = contentClone.querySelector('h3');
                const strong = contentClone.querySelector('strong'); // usually the subtitle
                const ps = contentClone.querySelectorAll('p'); // The rest of the descriptions
                
                if (img) {
                    const newImg = img.cloneNode();
                    newImg.style.width = '100%';
                    newImg.style.maxHeight = '300px';
                    newImg.style.objectFit = 'contain';
                    modalBody.appendChild(newImg);
                }
                if (h3) modalBody.appendChild(h3.cloneNode(true));
                if (strong) {
                    const subtitle = document.createElement('div');
                    subtitle.className = 'modal-subtitle';
                    subtitle.textContent = strong.textContent;
                    modalBody.appendChild(subtitle);
                }
                
                // Append all paragraphs that aren't the strong one
                ps.forEach(p => {
                    if (!p.querySelector('strong')) {
                        modalBody.appendChild(p.cloneNode(true));
                    }
                });
                
                // Render expanded details from data-details attribute
                const detailsHTML = item.getAttribute('data-details');
                if (detailsHTML) {
                    const detailsSection = document.createElement('div');
                    detailsSection.className = 'modal-details';
                    detailsSection.innerHTML = detailsHTML;
                    modalBody.appendChild(detailsSection);
                }

                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close logic
        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            setTimeout(() => { modalBody.innerHTML = ''; }, 300); // Clear content after transition
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // --- 9. Language Localization ---
    const langBtns = document.querySelectorAll('.lang-btn');
    
    function setLanguage(lang) {
        if (!window.translations || !window.translations[lang]) return;
        
        // Update active class on buttons
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations[lang][key]) {
                el.innerHTML = window.translations[lang][key];
            }
        });
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.getAttribute('data-lang');
            setLanguage(targetLang);
        });
    });

    // --- 10. Gear Toggle: Professional ↔ Hobby Mode ---
    const gearToggle = document.getElementById('gear-toggle');
    const modeOverlay = document.getElementById('mode-overlay');
    let isHobbyMode = false;

    // Particle configurations
    const proParticlesConfig = {
        "particles": {
            "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ff3333" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ff3333", "opacity": 0.3, "width": 1.5 },
            "move": { "enable": true, "speed": 1.0, "direction": "none", "random": true, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true },
            "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } } }
        },
        "retina_detect": true
    };

    const hobbyParticlesConfig = {
        "particles": {
            "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#3388ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#3388ff", "opacity": 0.3, "width": 1.5 },
            "move": { "enable": true, "speed": 1.0, "direction": "none", "random": true, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true },
            "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } } }
        },
        "retina_detect": true
    };

    function toggleMode() {
        isHobbyMode = !isHobbyMode;

        // Flash overlay
        if (modeOverlay) {
            modeOverlay.style.background = isHobbyMode
                ? 'radial-gradient(circle, rgba(51,136,255,0.3), transparent)'
                : 'radial-gradient(circle, rgba(255,51,51,0.3), transparent)';
            modeOverlay.classList.add('flash');
            setTimeout(() => modeOverlay.classList.remove('flash'), 800);
        }

        // Toggle body class
        document.body.classList.toggle('hobby-mode', isHobbyMode);

        // Toggle gear position
        if (gearToggle) {
            gearToggle.classList.toggle('hobby-position', isHobbyMode);
        }

        // Spin gear on toggle (extra rotation animation)
        if (gearImage) {
            const currentRotation = parseFloat(gearImage.style.transform?.replace(/[^0-9.-]/g, '')) || 0;
            const spinAmount = isHobbyMode ? 360 : -360;
            gearImage.style.transition = 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)';
            gearImage.style.transform = `rotate(${currentRotation + spinAmount}deg)`;
            // Reset transition for scroll-based rotation
            setTimeout(() => {
                gearImage.style.transition = 'transform 0.1s linear';
            }, 1000);
        }

        // Re-init particles with new color
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }
        const config = isHobbyMode ? hobbyParticlesConfig : proParticlesConfig;
        particlesJS('particles-js', config);

        // Scroll to top
        if (fullpage) {
            fullpage.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    if (gearToggle) {
        gearToggle.addEventListener('click', toggleMode);
        // Keyboard accessibility
        gearToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMode();
            }
        });
    }

    // --- 11. Photo Gallery Logic ---
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryFilters = document.getElementById('gallery-filters');
    const galleryCounter = document.getElementById('gallery-counter');
    const galleryEmpty = document.getElementById('gallery-empty');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentLightboxIndex = 0;
    let currentFilteredPhotos = [];

    function initGallery() {
        if (!window.galleryConfig || !galleryGrid) return;

        const { categories, photos } = window.galleryConfig;

        // Build filter buttons
        if (galleryFilters && categories) {
            categories.forEach((cat, i) => {
                const btn = document.createElement('button');
                btn.className = `gallery-filter-btn${i === 0 ? ' active' : ''}`;
                btn.setAttribute('data-category', cat.key);
                btn.innerHTML = `<span class="filter-icon">${cat.icon}</span> ${cat.label}`;
                btn.addEventListener('click', () => filterGallery(cat.key));
                galleryFilters.appendChild(btn);
            });
        }

        // Render the gallery
        renderGallery('all');
    }

    function renderGallery(category) {
        if (!window.galleryConfig) return;

        const { photos } = window.galleryConfig;

        // Filter photos
        currentFilteredPhotos = category === 'all'
            ? [...photos]
            : photos.filter(p => p.category === category);

        // Clear existing items (but keep empty state element)
        const existingItems = galleryGrid.querySelectorAll('.gallery-item');
        existingItems.forEach(item => item.remove());

        // Show/hide empty state
        if (currentFilteredPhotos.length === 0) {
            if (galleryEmpty) galleryEmpty.style.display = 'flex';
            if (galleryCounter) galleryCounter.textContent = '';
            return;
        }

        if (galleryEmpty) galleryEmpty.style.display = 'none';

        // Update counter
        if (galleryCounter) {
            const totalPhotos = photos.length;
            const showing = currentFilteredPhotos.length;
            galleryCounter.textContent = category === 'all'
                ? `${totalPhotos} photo${totalPhotos !== 1 ? 's' : ''}`
                : `Showing ${showing} of ${totalPhotos} photos`;
        }

        // Create gallery items
        currentFilteredPhotos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = `gallery-item${photo.featured ? ' featured' : ''}`;
            item.style.animationDelay = `${index * 0.08}s`;

            // Find category label
            const catInfo = window.galleryConfig.categories.find(c => c.key === photo.category);
            const catLabel = catInfo ? catInfo.label : photo.category;

            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <p class="gallery-caption">${photo.alt}</p>
                    <span class="gallery-category-badge">${catLabel}</span>
                </div>
            `;

            item.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(item);
        });
    }

    function filterGallery(category) {
        // Update active button
        const buttons = galleryFilters.querySelectorAll('.gallery-filter-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === category);
        });

        renderGallery(category);
    }

    // Lightbox controls
    function openLightbox(index) {
        if (!lightbox || currentFilteredPhotos.length === 0) return;
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
        // Re-render lucide icons inside lightbox
        lucide.createIcons();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    function updateLightbox() {
        const photo = currentFilteredPhotos[currentLightboxIndex];
        if (!photo) return;
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.alt;
        lightboxCaption.textContent = photo.alt;
    }

    function lightboxPrevious() {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredPhotos.length) % currentFilteredPhotos.length;
        updateLightbox();
    }

    function lightboxNextFn() {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredPhotos.length;
        updateLightbox();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', lightboxPrevious);
    if (lightboxNext) lightboxNext.addEventListener('click', lightboxNextFn);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrevious();
        if (e.key === 'ArrowRight') lightboxNextFn();
    });

    // Initialize gallery
    initGallery();

});