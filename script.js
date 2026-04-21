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
});