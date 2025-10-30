// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Projects horizontal scrolling
    const projectsTrack = document.querySelector('.projects-track');
    const projectCards = document.querySelectorAll('.project-card');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    
    if (projectsTrack && scrollLeftBtn && scrollRightBtn) {
        const cardWidth = projectCards[0].offsetWidth + 30; // width + gap
        let scrollPosition = 0;
        const maxScroll = projectsTrack.scrollWidth - projectsTrack.parentElement.offsetWidth;
        
        scrollRightBtn.addEventListener('click', function() {
            scrollPosition += cardWidth * 2; // Scroll 2 cards at a time
            scrollPosition = Math.min(scrollPosition, maxScroll);
            projectsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        scrollLeftBtn.addEventListener('click', function() {
            scrollPosition -= cardWidth * 2; // Scroll 2 cards at a time
            scrollPosition = Math.max(scrollPosition, 0);
            projectsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        // Touch/swipe support for mobile
        let startX;
        let currentX;
        let isDragging = false;
        
        projectsTrack.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        projectsTrack.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            projectsTrack.style.transform = `translateX(-${scrollPosition + diff}px)`;
        });
        
        projectsTrack.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    // Swiped left
                    scrollPosition += cardWidth * 2;
                } else {
                    // Swiped right
                    scrollPosition -= cardWidth * 2;
                }
                scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
            }
            
            projectsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});