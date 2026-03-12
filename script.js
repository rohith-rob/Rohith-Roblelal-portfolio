document.addEventListener('DOMContentLoaded', () => {
    // Add Mouse Follower Blob
    const mouseBlob = document.createElement('div');
    mouseBlob.className = 'mouse-blob';
    document.body.appendChild(mouseBlob);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        mouseBlob.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // Animate hamburger lines
        hamburger.classList.toggle('toggle');
    });

    // Close nav when a link is clicked
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // Intersection Observer for scroll animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Form submission handling (prevent default reload)
    const form = document.getElementById('portfolio-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';

            // Send data to Google Forms
            const formData = new FormData(form);
            fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScEWSOKDVXDGIZbCcI3tG5bmsIYO2OqVcDpCbZhHzOsFUvTGg/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            }).then(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = 'linear-gradient(90deg, #10b981, #059669)'; // Green success
                btn.style.opacity = '1';
                form.reset();

                // Revert after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 3000);
            }).catch((error) => {
                console.error('Error!', error.message);
                btn.textContent = 'Error!';
                btn.style.background = '#e11d48'; // Red error
                btn.style.opacity = '1';

                // Revert after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 3000);
            });
        });
    }

    // Active state for navigation based on scroll position
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add gentle hover tilt effect for cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
