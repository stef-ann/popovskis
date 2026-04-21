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

    // --- 6. Skills Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillGrids = document.querySelectorAll('.skills-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            skillGrids.forEach(g => g.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

});