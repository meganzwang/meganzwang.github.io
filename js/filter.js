document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality for research and projects
    const setupFilter = (containerClass, itemClass) => {
        const filterButtons = document.querySelectorAll(`${containerClass} .filter-btn`);
        const items = document.querySelectorAll(`${containerClass} ${itemClass}`);

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                items.forEach(item => {
                    if (filterValue === 'all') {
                        item.classList.remove('hide');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else if (item.getAttribute('data-category').includes(filterValue)) {
                        item.classList.remove('hide');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            item.classList.add('hide');
                        }, 300);
                    }
                });
            });
        });
    };

    // Initialize filters for both sections
    setupFilter('#research', '.research-card');
    setupFilter('#projects', '.project-card');

    // Add animation for project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const image = card.querySelector('img');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
            
            // Parallax effect for the image
            if (image) {
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
            
            // Position the overlay icons
            if (overlay) {
                overlay.style.transform = `translate(${angleY * 2}px, ${angleX * 2}px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            
            if (image) {
                image.style.transform = 'translate(0, 0) scale(1)';
            }
            
            if (overlay) {
                overlay.style.transform = 'translate(0, 0)';
            }
        });
    });

    // Add click effect to project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            ripple.classList.add('ripple');
            
            link.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    .project-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
`;
document.head.appendChild(style);
