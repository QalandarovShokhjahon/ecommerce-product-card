document.addEventListener('DOMContentLoaded', function() {
    // Rating functionality
    const stars = document.querySelectorAll('.rating i');
    const ratingValue = document.querySelector('.rating');
    const addToCartBtn = document.querySelector('.button1 button');
    const loginBtn = document.querySelector('.button2 button');
    
    // Add click event to stars for rating
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            // Update star colors based on click
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('bxs-star');
                    s.classList.remove('bx-star');
                } else {
                    s.classList.remove('bxs-star');
                    s.classList.add('bx-star');
                }
            });
            
            // Show rating value (optional)
            const rating = index + 1;
            showNotification(`Rated ${rating} stars!`);
        });
    });
    
    // Add to Cart functionality
    let cartCount = 0;
    addToCartBtn.addEventListener('click', function() {
        cartCount++;
        const originalText = this.innerHTML;
        
        // Update button text and style
        this.innerHTML = '<i class="bx bx-check"></i> Added to Cart';
        this.style.background = 'linear-gradient(45deg, #00cec9, #00b894)';
        this.style.boxShadow = '0 4px 15px rgba(0, 184, 148, 0.4)';
        
        // Add pulse animation
        this.classList.add('pulse');
        
        // Show notification
        showNotification('Item added to cart!');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = 'linear-gradient(45deg, #00b894, #00cec9)';
            this.style.boxShadow = '0 4px 15px rgba(0, 184, 148, 0.3)';
            this.classList.remove('pulse');
        }, 2000);
    });
    
    // Login button functionality
    loginBtn.addEventListener('click', function() {
        const email = prompt('Please enter your email to continue:');
        if (email) {
            // Simple email validation
            if (email.includes('@') && email.includes('.')) {
                this.innerHTML = 'Checking...';
                // Simulate login process
                setTimeout(() => {
                    this.innerHTML = 'Logged In';
                    this.style.background = 'rgba(255, 255, 255, 0.2)';
                    showNotification('Login successful!');
                }, 1500);
            } else {
                showNotification('Please enter a valid email address.');
            }
        }
    });
    
    // Hover effect for stars
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            // Highlight stars on hover
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = '#ffd700';
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            // Reset star colors on mouse out
            stars.forEach(s => {
                s.style.color = '';
            });
        });
    });
    
    // Show notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Add show class after a small delay
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.5s ease;
        }
        
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});