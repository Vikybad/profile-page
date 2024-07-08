document.addEventListener('DOMContentLoaded', () => {
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle animations
    function handleAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }

    // Initial check for animations
    handleAnimations();

    // Listen for scroll and resize events
    window.addEventListener('scroll', handleAnimations);
    window.addEventListener('resize', handleAnimations);

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Immediately show the target section
                targetElement.classList.add('animate');
                
                // Smooth scroll to the target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // Handle initial hash in URL
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            targetElement.classList.add('animate');
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 0);
        }
    }

    // Typewriter effect for the name
    const nameElement = document.querySelector('#home h1');
    const nameText = nameElement.textContent;
    nameElement.textContent = '';

    for (let i = 0; i < nameText.length; i++) {
        const span = document.createElement('span');
        span.textContent = nameText[i];
        span.style.opacity = '0';
        nameElement.appendChild(span);

        setTimeout(() => {
            span.style.opacity = '1';
        }, i * 100);
    }

    // Animate profile image
    const profileImage = document.querySelector('.profile-image');
    profileImage.style.opacity = '0';
    profileImage.style.transform = 'scale(0)';
    setTimeout(() => {
        profileImage.style.transition = 'opacity 1s, transform 1s';
        profileImage.style.opacity = '1';
        profileImage.style.transform = 'scale(1)';
    }, 500);
});

