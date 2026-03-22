 /*=============== SHOW MENU ===============*/
        const navMenu = document.getElementById('nav-menu'),
              navToggle = document.getElementById('nav-toggle'),
              navLinks = document.querySelectorAll('.nav__link');
 
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show-menu');
            });
        }
 
        /*=============== REMOVE MENU MOBILE ===============*/
        navLinks.forEach(n => n.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        }));
 
        /*=============== SMOOTH SCROLL NAV ===============*/
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
 
        const smoothScrollTo = (targetPosition, duration = 700) => {
            const start = window.pageYOffset;
            const distance = targetPosition - start;
            const startTime = performance.now();
            const animate = (currentTime) => {
                const timeElapsed = currentTime - startTime;
                const nextStep = easeInOutQuad(timeElapsed, start, distance, duration);
                window.scrollTo(0, nextStep);
                if (timeElapsed < duration) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        };
 
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const section = document.querySelector(href);
                    if (section) smoothScrollTo(section.offsetTop - 60, 700);
                }
            });
        });
 
        /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
        const sections = document.querySelectorAll('section[id]');
 
        function scrollActive() {
            const scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight,
                      sectionTop = current.offsetTop - 50,
                      sectionId = current.getAttribute('id');
                const activeLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    if (activeLink) activeLink.classList.add('active-link');
                } else {
                    if (activeLink) activeLink.classList.remove('active-link');
                }
            });
        }
 
        /*=============== STATS COUNTER ANIMATION ===============*/
        const statsSection = document.getElementById('home-stats');
        const statSpans = document.querySelectorAll('.home__stats-item span');
        let statsAnimated = false;
 
        function animateStats() {
            if (!statsSection || statsAnimated) return;
            const sectionTop = statsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 80) {
                statsAnimated = true;
                statSpans.forEach(span => {
                    const target = Number(span.dataset.target || 0);
                    const duration = 1200;
                    let start = 0;
                    const stepTime = Math.abs(Math.floor(duration / (target || 1)));
                    const counter = setInterval(() => {
                        start += 1;
                        span.textContent = start < target ? start : target;
                        if (start >= target) {
                            clearInterval(counter);
                            span.textContent = target + (target > 0 ? '+' : '');
                        }
                    }, stepTime);
                });
            }
        }
 
        /*=============== SHOW SCROLL UP ===============*/
        function scrollUp() {
            const scrollUpEl = document.getElementById('scroll-up');
            if (scrollUpEl) scrollUpEl.classList.toggle('show-scroll', window.scrollY >= 350);
        }
 
        /*=============== CHANGE BACKGROUND HEADER ===============*/
        function scrollHeader() {
            const header = document.getElementById('header');
            if (header) header.classList.toggle('scroll-header', window.scrollY >= 50);
        }
 
        /*=============== SCROLL EVENT ===============*/
        window.addEventListener('scroll', () => {
            scrollActive();
            scrollUp();
            scrollHeader();
            animateStats();
        });
 
        scrollActive();
        animateStats();
 
        /*=============== DARK LIGHT THEME ===============*/
        const themeButton = document.getElementById('theme-button');
        const darkTheme = 'dark-theme';
        const lightIcon = 'ri-moon-line';
        const darkIcon = 'ri-sun-line';
 
        if (themeButton) {
            const themeIcon = themeButton.querySelector('i');
            const selectedTheme = localStorage.getItem('selected-theme');
            const selectedIcon = localStorage.getItem('selected-icon');
 
            const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
 
            if (selectedTheme) {
                document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
            }
 
            if (themeIcon) {
                themeIcon.classList.remove(lightIcon, darkIcon);
                const iconToShow = selectedIcon
                    ? selectedIcon
                    : document.body.classList.contains(darkTheme) ? darkIcon : lightIcon;
                themeIcon.classList.add(iconToShow);
            }
 
            themeButton.addEventListener('click', () => {
                const isDarkNow = document.body.classList.toggle(darkTheme);
                if (themeIcon) {
                    themeIcon.classList.remove(lightIcon, darkIcon);
                    themeIcon.classList.add(isDarkNow ? darkIcon : lightIcon);
                }
                localStorage.setItem('selected-theme', getCurrentTheme());
                localStorage.setItem('selected-icon', isDarkNow ? darkIcon : lightIcon);
            });
        }
 
        /*=============== EMAILJS CONTACT FORM ===============*/
        // ─────────────────────────────────────────────────────
        // 🔧 REPLACE THESE 3 VALUES FROM YOUR EMAILJS DASHBOARD
        //    https://dashboard.emailjs.com/admin
        // ─────────────────────────────────────────────────────
        const EMAILJS_PUBLIC_KEY  = 'DmRNUQIyC609ploVE';  // Account → API Keys → Public Key
        const EMAILJS_SERVICE_ID  = 'service_57b14ov';    // Email Services → Service ID
        const EMAILJS_TEMPLATE_ID = 'template_px21wgs';   // Email Templates → Template ID
        // ─────────────────────────────────────────────────────
 
        (function () { emailjs.init(EMAILJS_PUBLIC_KEY); })();
 
        const contactForm = document.getElementById('contact-form');
        const contactMessage = document.getElementById('contact-message');
 
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const name    = this.name.value.trim();
                const email   = this.email.value.trim();
                const message = this.message.value.trim();
 
                if (name === '' || email === '' || message === '') {
                    contactMessage.textContent = '❌ Please fill in all fields.';
                    contactMessage.style.color = '#e76f51';
                    return;
                }
 
                contactMessage.textContent = 'Sending... ⏳';
                contactMessage.style.color = '#888';
 
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { name, email, message })
                    .then(() => {
                        contactMessage.textContent = '✅ Message sent successfully!';
                        contactMessage.style.color = '#2a9d8f';
                        contactForm.reset();
                        setTimeout(() => contactMessage.textContent = '', 5000);
                    })
                    .catch((error) => {
                        const reason = error.text || error.message || JSON.stringify(error);
                        contactMessage.textContent = '❌ Failed: ' + reason;
                        contactMessage.style.color = '#e76f51';
                        console.error('EmailJS error:', error);
                    });
            });
        }
 
        /*=============== SLIDER (Skills, Projects, Testimonials) ===============*/
        function initSlider(trackId, dotsId, cardWidth) {
            const track = document.getElementById(trackId);
            const dotsContainer = document.getElementById(dotsId);
            if (!track || !dotsContainer) return;
 
            const total = track.children.length;
 
            // Build dots
            dotsContainer.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('span');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    track.scrollTo({ left: i * (cardWidth + 16), behavior: 'smooth' });
                });
                dotsContainer.appendChild(dot);
            }
 
            // Update dots on scroll
            track.addEventListener('scroll', () => {
                const idx = Math.round(track.scrollLeft / (cardWidth + 16));
                dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
                    d.classList.toggle('active', i === idx);
                });
            });
 
            // Drag to scroll (mouse)
            let isDown = false, startX, scrollLeft;
            track.addEventListener('mousedown', e => {
                isDown = true;
                track.classList.add('dragging');
                startX = e.pageX - track.offsetLeft;
                scrollLeft = track.scrollLeft;
            });
            track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
            track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
            track.addEventListener('mousemove', e => {
                if (!isDown) return;
                e.preventDefault();
                track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX);
            });
 
            // Touch swipe
            let touchStartX = 0;
            track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
            track.addEventListener('touchend', e => {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) slide(trackId, diff > 0 ? 1 : -1, cardWidth);
            });
        }
 
        function slide(trackId, dir, cardWidth) {
            const track = document.getElementById(trackId);
            if (!track) return;
            if (!cardWidth) {
                const firstCard = track.firstElementChild;
                cardWidth = firstCard ? firstCard.offsetWidth : 160;
            }
            track.scrollBy({ left: dir * (cardWidth + 16), behavior: 'smooth' });
        }
 
        window.addEventListener('load', () => {
            initSlider('skills-track', 'skills-dots', 140);
            initSlider('projects-track', 'projects-dots', 280);
            initSlider('testimonials-track', 'testimonials-dots', 300);
 
            // Certifications — Swiper
            new Swiper('.cert-swiper', {
                loop: true,
                grabCursor: true,
                spaceBetween: 24,
                slidesPerView: 1,
                pagination: {
                    el: '.cert-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                breakpoints: {
                    600:  { slidesPerView: 2 },
                    900:  { slidesPerView: 3 },
                }
            });
        });
 
        /*=============== SCROLL REVEAL ANIMATION ===============*/
        window.addEventListener('load', () => {
            const sr = ScrollReveal({
                distance: '60px',
                duration: 2000,
                delay: 200,
                reset: false
            });
 
            sr.reveal('.home__data, .home__img-box', { origin: 'top' });
            sr.reveal('.home__info, .home__stats, .skill-card, .project-card, .testimonial-card, .services-card, .qualification-content, .cert-card', {
                origin: 'bottom',
                interval: 100
            });
            sr.reveal('.section__title, .section__subtitle', { origin: 'top', interval: 100 });
        });
        /*=============== BACKGROUND AUDIO ===============*/
        const bgAudio   = document.getElementById('bg-audio');
        const audioBtn  = document.getElementById('audio-btn');
        const audioIcon = audioBtn.querySelector('i');
 
        bgAudio.volume = 0.3;
 
        // Helper — set UI to playing state
        function setPlaying() {
            audioIcon.className = 'ri-pause-line';
            audioBtn.classList.add('playing');
            audioBtn.title = 'Pause background music';
            localStorage.setItem('audio-playing', 'true');
        }
 
        // Helper — set UI to paused state
        function setPaused() {
            audioIcon.className = 'ri-music-2-line';
            audioBtn.classList.remove('playing');
            audioBtn.title = 'Play background music';
            localStorage.setItem('audio-playing', 'false');
        }
 
        // On first interaction — start audio and remember it
        const startAudio = () => {
            bgAudio.play().then(() => {
                setPlaying();
            }).catch(() => {});
            document.removeEventListener('click',   startAudio);
            document.removeEventListener('keydown', startAudio);
            document.removeEventListener('scroll',  startAudio);
            document.removeEventListener('touchstart', startAudio);
        };
 
        // Check if user had music ON before reload
        const wasPlaying = localStorage.getItem('audio-playing');
 
        if (wasPlaying === null || wasPlaying === 'true') {
            // First visit OR was playing — try auto-play
            bgAudio.play().then(() => {
                setPlaying();
            }).catch(() => {
                // Browser blocked — resume on first interaction
                document.addEventListener('click',      startAudio);
                document.addEventListener('keydown',    startAudio);
                document.addEventListener('scroll',     startAudio);
                document.addEventListener('touchstart', startAudio);
            });
        } else {
            // User had manually paused before reload — keep it paused
            setPaused();
        }
 
        // Manual toggle button
        audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgAudio.paused) {
                bgAudio.play().then(() => setPlaying()).catch(() => {});
            } else {
                bgAudio.pause();
                setPaused();
            }
        });