// ===================================
// REDWOOD ISLAND WEBSITE JAVASCRIPT
// ===================================

// Wait for DOM to load

//let currentSlide = 0;
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ===================================
    // TRANSLATION BUTTON
    // ===================================
    const translateBtn = document.getElementById('translateBtn');
    /*
    let isArabic = false;
    
    if (translateBtn) {
        translateBtn.addEventListener('click', function() {
            if (!isArabic) {
                // Switch to Arabic
                document.documentElement.setAttribute('lang', 'ar');
                document.body.setAttribute('dir', 'rtl');
                translateBtn.querySelector('.lang-text').textContent = 'English';
                isArabic = true;
                
                // Translate all elements with data-ar attribute
                translateContent('ar');
                
                console.log('Switched to Arabic');
            } else {
                // Switch to English
                document.documentElement.setAttribute('lang', 'en');
                document.body.setAttribute('dir', 'ltr');
                translateBtn.querySelector('.lang-text').textContent = 'العربية';
                isArabic = false;
                
                // Translate back to English
                translateContent('en');
                
                console.log('Switched to English');
            }
        });
    }
    
    // Function to translate content
    function translateContent(lang) {
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(element => {
            if (lang === 'ar' && element.getAttribute('data-ar')) {
                element.textContent = element.getAttribute('data-ar');
            } else if (lang === 'en' && element.getAttribute('data-en')) {
                element.textContent = element.getAttribute('data-en');
            }
        });
    }*/
    // ===================================
    // PERSISTENT TRANSLATION LOGIC
    // ===================================
    
    
    // Check localStorage for saved language or default to English
    let savedLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Apply the saved language immediately on load
    applyLanguage(savedLang);

    if (translateBtn) {
        translateBtn.addEventListener('click', function() {
            // Toggle language based on current state
            const currentLang = document.documentElement.getAttribute('lang');
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            
            // Save choice to browser memory
            localStorage.setItem('selectedLanguage', newLang);
            applyLanguage(newLang);
        });
    }

    function applyLanguage(lang) {
        const isAr = lang === 'ar';
        document.documentElement.setAttribute('lang', lang);
        document.body.setAttribute('dir', isAr ? 'rtl' : 'ltr');
        
        if (translateBtn) {
            translateBtn.querySelector('.lang-text').textContent = isAr ? 'English' : 'العربية';
        }

        // Translate ALL elements with data attributes (Header, Content, Footer)
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });
    }
    
    // ===================================
    // HERO SLIDER (Homepage)
    // ===================================
   currentSlide = 0; 
   const slides = document.querySelectorAll('.slide');
    
    if (slides.length > 0) {
        // Auto-play slider now works because it calls the global changeSlide
        setInterval(function() {
            changeSlide(1);
        }, 5000); 
    }
    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================================
    // CONTACT FORM SUBMISSION
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would normally send this data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // In production, you would use something like:
            // fetch('your-form-handler.php', {
            //     method: 'POST',
            //     body: JSON.stringify(formData),
            //     headers: { 'Content-Type': 'application/json' }
            // }).then(response => response.json())
            //   .then(data => console.log(data));
        });
    }
    
    // ===================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// SLIDER FUNCTIONS (Global scope)
// ===================================

// Hero Slider
/*function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    if (indicators.length > 0) {
        indicators[currentSlide].classList.remove('active');
    }
    
    // Calculate new slide index
    currentSlide += direction;
    
    // Loop around
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    if (indicators.length > 0) {
        indicators[currentSlide].classList.add('active');
    }
}
    */
   function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    
    if (slides.length === 0) return;
    
    // Now this function knows what 'currentSlide' is!
    slides[currentSlide].classList.remove('active');
    if (indicators.length > 0) {
        indicators[currentSlide].classList.remove('active');
    }
    
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides[currentSlide].classList.add('active');
    if (indicators.length > 0) {
        indicators[currentSlide].classList.add('active');
    }
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    if (indicators.length > 0) {
        indicators[currentSlide].classList.remove('active');
    }
    
    // Set new slide
    currentSlide = index;
    
    // Add active class
    slides[currentSlide].classList.add('active');
    if (indicators.length > 0) {
        indicators[currentSlide].classList.add('active');
    }
}

// ===================================
// CUSTOMERS SLIDER
// ===================================
let customerIndex = 0;

function changeCustomer(direction) {
    const track = document.getElementById('customersTrack');
    if (!track) return;
    
    const logos = track.querySelectorAll('.customer-logo');
    const totalLogos = logos.length;
    const visibleLogos = window.innerWidth <= 768 ? 2 : 4;
    const maxIndex = Math.max(0, totalLogos - visibleLogos);
    
    customerIndex += direction;
    
    // Boundaries
    if (customerIndex < 0) {
        customerIndex = 0;
    } else if (customerIndex > maxIndex) {
        customerIndex = maxIndex;
    }
    
    // Calculate offset
    const logoWidth = logos[0].offsetWidth;
    const gap = 40;
    const offset = -(customerIndex * (logoWidth + gap));
    
    track.style.transform = `translateX(${offset}px)`;
}

// ===================================
// PRODUCTS SLIDER
// ===================================
let productIndex = 0;

function changeProduct(direction) {
    const track = document.getElementById('productsTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.product-card');
    const totalCards = cards.length;
    const visibleCards = window.innerWidth <= 768 ? 1 : 4;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    productIndex += direction;
    
    // Boundaries
    if (productIndex < 0) {
        productIndex = 0;
    } else if (productIndex > maxIndex) {
        productIndex = maxIndex;
    }
    
    // Calculate offset
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const offset = -(productIndex * (cardWidth + gap));
    
    track.style.transform = `translateX(${offset}px)`;
}

// ===================================
// WINDOW RESIZE HANDLER
// ===================================
window.addEventListener('resize', function() {
    // Reset sliders on resize
    customerIndex = 0;
    productIndex = 0;
    
    const customersTrack = document.getElementById('customersTrack');
    const productsTrack = document.getElementById('productsTrack');
    
    if (customersTrack) {
        customersTrack.style.transform = 'translateX(0)';
    }
    
    if (productsTrack) {
        productsTrack.style.transform = 'translateX(0)';
    }
});

// ===================================
// PAGE LOAD ANIMATIONS
// ===================================
/*window.addEventListener('load', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Fade in elements on scroll (optional)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});*/
// Find this at the bottom of your main.js
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // THE FIX: Observe sections but EXEMPT the hero slider
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.classList.contains('hero-slider')) {
            // Force visibility immediately for the hero section
            section.style.opacity = '1';
            section.style.transform = 'none';
        } else {
            // Apply fade-in effect to all other sections
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        }
    });
});
