// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 400);
        }
    }, 900);
});

// Parallax effect
const parallax = document.querySelector('.parallax-bg');
let latestScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    latestScroll = window.pageYOffset;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (parallax) {
                parallax.style.transform = `translateY(${latestScroll * 0.35}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Form validation and submission
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const submitBtn = reservationForm.querySelector('.reserve-btn');
        
        // Validation
        if (!name) {
            alert('Veuillez entrer votre nom complet.');
            return;
        }
        
        if (!phone || !/^\+?[0-9\s\-\(\)]+$/.test(phone)) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return;
        }
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Send to backend
            const response = await fetch('http://localhost:3000/api/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store in localStorage
                const reservation = { name, phone, timestamp: new Date().toISOString() };
                localStorage.setItem('reservation', JSON.stringify(reservation));
                
                // Show success message
                alert(data.message);
                
                // Redirect to confirmation
                window.location.href = 'confirmation.html';
            } else {
                alert('Erreur: ' + data.message);
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Erreur de connexion au serveur. Assurez-vous que le backend est démarré.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Display reservation data on confirmation page
if (window.location.pathname.includes('confirmation.html')) {
    const reservation = JSON.parse(localStorage.getItem('reservation'));
    if (reservation) {
        // You can display the data if needed, but for now, it's just stored
        console.log('Reservation:', reservation);
    }
}

// WhatsApp functions
function openWhatsApp() {
    const phoneNumber = '+22897995583'; // Primary contact
    const message = 'Bonjour, je suis intéressé par La Nuit au Zénith.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Navigation functions
function goToMenu() {
    window.location.href = 'menu.html';
}

function goHome() {
    window.location.href = 'index.html';
}

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.8)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
    });
});

// Floating particles animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Bubble animation
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    if (!bubblesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 30 + 's';
        bubble.style.animationDuration = (Math.random() * 20 + 20) + 's';
        bubble.style.width = (Math.random() * 20 + 10) + 'px';
        bubble.style.height = bubble.style.width;
        bubblesContainer.appendChild(bubble);
    }
}

createBubbles();

// Add CSS for dynamic particles and bubbles
const style = document.createElement('style');
style.textContent = `
.particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #D4AF37;
    border-radius: 50%;
    animation: particleFloat linear infinite;
}

@keyframes particleFloat {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

.bubble {
    position: absolute;
    background: rgba(212, 175, 55, 0.2);
    border-radius: 50%;
    animation: bubbleRise linear infinite;
}

@keyframes bubbleRise {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 0.5; }
    90% { opacity: 0.5; }
    100% { transform: translateY(-100px) scale(1); opacity: 0; }
}
`;
document.head.appendChild(style);

// Music (disabled by default)
let audio = null;
function toggleMusic() {
    if (!audio) {
        audio = new Audio('ambient-music.mp3'); // Placeholder, user would need to add music file
        audio.loop = true;
        audio.volume = 0.3;
    }
    
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Uncomment to add music toggle button
// const musicBtn = document.createElement('button');
// musicBtn.textContent = '🎵';
// musicBtn.className = 'btn music-btn';
// musicBtn.onclick = toggleMusic;
// document.body.appendChild(musicBtn);