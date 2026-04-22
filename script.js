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
                
                // Add placeholder for extra details
                const extraDetails = document.createElement('p');
                extraDetails.style.marginTop = "20px";
                extraDetails.style.borderTop = "1px solid rgba(255,255,255,0.1)";
                extraDetails.style.paddingTop = "20px";
                extraDetails.innerHTML = "<em>More detailed project analysis, diagrams, and photos will be displayed here upon expansion.</em>";
                modalBody.appendChild(extraDetails);

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

});