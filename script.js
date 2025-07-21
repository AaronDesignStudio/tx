document.addEventListener('DOMContentLoaded', () => {
    const chatDrawer = document.getElementById('chatDrawer');
    const logoContainer = document.getElementById('logoContainer');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const micButton = document.getElementById('micButton');
    const chatMessages = document.getElementById('chatMessages');
    const inspirationCarousel = document.getElementById('inspirationCarousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    

    setTimeout(() => {
        chatInput.focus();
    }, 3800);

    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            const query = item.querySelector('.carousel-query').textContent;
            chatInput.value = query;
            chatInput.focus();
            
            item.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                item.style.animation = '';
            }, 300);
        });
    });

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    let isScrolling = false;
    
    carouselWrapper.addEventListener('scroll', () => {
        if (!isScrolling) {
            carouselWrapper.style.cursor = 'grabbing';
        }
        
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            carouselWrapper.style.cursor = 'grab';
        }, 100);
    });

    carouselWrapper.style.cursor = 'grab';

    const createGlitchEffect = () => {
        const logo = document.querySelector('.logo');
        logo.style.filter = `
            drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))
            hue-rotate(${Math.random() * 10}deg)
        `;
        
        setTimeout(() => {
            logo.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))';
        }, 100);
    };

    setInterval(createGlitchEffect, 5000);

    // Microphone button functionality
    const simulateVoiceInput = () => {
        const targetPhrase = "red dress for dinner party";
        const words = targetPhrase.split(' ');
        micButton.classList.add('recording');
        chatInput.value = '';
        chatInput.focus();
        
        // Add animation style to input
        chatInput.style.transition = 'all 0.3s ease';
        
        // Create word-by-word effect
        let currentWordIndex = 0;
        const addWord = () => {
            if (currentWordIndex < words.length) {
                // Add space before word if not the first word
                if (currentWordIndex > 0) {
                    chatInput.value += ' ';
                }
                
                // Add the word with a slight fade effect
                chatInput.style.opacity = '0.8';
                chatInput.value += words[currentWordIndex];
                
                // Restore full opacity
                setTimeout(() => {
                    chatInput.style.opacity = '1';
                }, 50);
                
                currentWordIndex++;
                
                // Continue with next word
                setTimeout(addWord, 300); // 300ms delay between words
            } else {
                // All words added
                micButton.classList.remove('recording');
                chatInput.style.transition = '';
                
                // Don't trigger search automatically - let user click send button
            }
        };
        
        // Start adding words
        setTimeout(addWord, 200); // Initial delay before first word
    };

    micButton.addEventListener('click', () => {
        simulateVoiceInput();
    });

    micButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        micButton.classList.add('active');
    });

    micButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        micButton.classList.remove('active');
        simulateVoiceInput();
    });

    const handleSend = () => {
        const message = chatInput.value.trim();
        if (message) {
            // Check if the search query contains keywords related to red dress
            const searchKeywords = ['red dress', 'dinner party', 'red', 'dress'];
            const containsSearchKeywords = searchKeywords.some(keyword => 
                message.toLowerCase().includes(keyword)
            );
            
            if (containsSearchKeywords) {
                // Redirect to chat page with the search query
                window.location.href = `chat.html?q=${encodeURIComponent(message)}`;
            } else {
                addMessage(message, 'user');
                chatInput.value = '';
                
                setTimeout(() => {
                    addMessage('This is a prototype. Messages are not processed.', 'assistant');
                }, 1000);
            }
        }
    };

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    sendButton.addEventListener('click', handleSend);
    sendButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        sendButton.classList.add('active');
    });
    sendButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        sendButton.classList.remove('active');
        handleSend();
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });


    chatInput.addEventListener('focus', () => {
        const container = chatInput.parentElement;
        container.style.animation = 'pulse 2s infinite';
    });

    chatInput.addEventListener('blur', () => {
        const container = chatInput.parentElement;
        container.style.animation = '';
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
            }
        }
    `;
    document.head.appendChild(style);

    let particles = [];
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '1px';
        particle.style.height = '1px';
        particle.style.background = 'var(--accent-yellow)';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-10px';
        particle.style.zIndex = '1';
        document.body.appendChild(particle);
        
        const speed = 1 + Math.random() * 2;
        const angle = Math.random() * 0.2 - 0.1;
        
        const animate = () => {
            const top = parseFloat(particle.style.top);
            const left = parseFloat(particle.style.left);
            
            if (top > window.innerHeight) {
                particle.remove();
                particles = particles.filter(p => p !== particle);
            } else {
                particle.style.top = (top + speed) + 'px';
                particle.style.left = (left + angle) + 'px';
                particle.style.opacity = parseFloat(particle.style.opacity) * 0.99;
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
        particles.push(particle);
    };

    setInterval(() => {
        if (particles.length < 10 && Math.random() > 0.8) {
            createParticle();
        }
    }, 200);

    const typewriterEffect = (element, text, speed = 50) => {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    window.typewriterEffect = typewriterEffect;

    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    document.addEventListener('gesturestart', (e) => {
        e.preventDefault();
    });

    chatInput.addEventListener('touchstart', () => {
        setTimeout(() => {
            chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    });
});