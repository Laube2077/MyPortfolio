document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Fade-in on Scroll ---
    const scrollTargets = document.querySelectorAll('.scroll-target, .work-item');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    scrollTargets.forEach(target => scrollObserver.observe(target));

    // --- Collapsible Sections ---
    const expandAllBtn = document.getElementById('expand-all');
    const collapseAllBtn = document.getElementById('collapse-all');
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            content.classList.toggle('expanded');
            const icon = header.querySelector('.collapsible-icon');
            icon.textContent = content.classList.contains('expanded') ? '-' : '+';
        });
    });

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            collapsibleHeaders.forEach(header => {
                header.classList.add('active');
                header.nextElementSibling.classList.add('expanded');
                header.querySelector('.collapsible-icon').textContent = '-';
            });
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', () => {
            collapsibleHeaders.forEach(header => {
                header.classList.remove('active');
                header.nextElementSibling.classList.remove('expanded');
                header.querySelector('.collapsible-icon').textContent = '+';
            });
        });
    }

    // --- Section Indicator Bar Logic ---
    const indicatorDots = document.querySelectorAll('#section-indicator-bar .indicator-dot');
    const sections = document.querySelectorAll('#hero, #works, #about, #contact');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                indicatorDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.dataset.section === currentSectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is roughly in the middle of the viewport
        threshold: 0 // No threshold needed, just intersection
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    indicatorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSectionId = dot.dataset.section;
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});