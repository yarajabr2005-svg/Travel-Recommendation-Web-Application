// ============================================
// MAIN APPLICATION - COMPLETE
// ============================================

// ============================================
// DOM ELEMENTS
// ============================================

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');
const featuredContainer = document.getElementById('featuredDestinations');
const teamContainer = document.getElementById('teamMembers');
const contactForm = document.getElementById('contactForm');
const bookNowBtn = document.getElementById('bookNowBtn');

// ============================================
// STATE
// ============================================

let currentResults = [];
let searchHistory = [];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Display featured destinations on home page
    displayFeaturedDestinations();
    
    // Display team members on about page
    displayTeamMembers();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set up navigation
    setupNavigation();
    
    // Add dynamic styles
    addDynamicStyles();
    
    console.log('🌍 TravelWise App initialized successfully!');
    console.log('📝 Ready for: Beach, Temple, and Country searches!');
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Search button click
    searchBtn.addEventListener('click', handleSearch);
    
    // Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Clear button click
    clearBtn.addEventListener('click', clearSearch);
    
    // Search suggestions
    searchInput.addEventListener('input', showSuggestions);
    
    // Contact form submit
    contactForm.addEventListener('submit', handleContactForm);
    
    // Book now button
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', handleBookNow);
    }
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Hide results when navigating away from home
            if (this.getAttribute('href') !== '#home') {
                if (resultsContainer) {
                    resultsContainer.innerHTML = '';
                }
            }
        });
    });
}

// ============================================
// TASK 2: HOME PAGE INTRODUCTION
// ============================================

// Introduction is already in HTML, but we can add dynamic elements
function enhanceHomePage() {
    // Add any dynamic elements to the home page here
    console.log('🏠 Home page loaded with introduction');
}

// ============================================
// TASK 6, 7, 8: SEARCH FUNCTIONALITY
// ============================================

/**
 * Handle search button click
 * This function handles ALL search types:
 * - Task 6: Beach search
 * - Task 7: Temple search
 * - Task 8: Country search
 */
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    // Show loading state
    resultsContainer.innerHTML = `
        <div class="loading">
            <span>🌍</span>
            <p>Searching for amazing destinations...</p>
        </div>
    `;
    
    try {
        // Get recommendations
        const results = await getRecommendations(query);
        currentResults = results;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <span style="font-size: 3rem;">🔍</span>
                    <h3>No destinations found</h3>
                    <p>Try searching for:</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                        <button class="suggestion-tag" data-term="beach">🏖️ Beach</button>
                        <button class="suggestion-tag" data-term="temple">🛕 Temple</button>
                        <button class="suggestion-tag" data-term="Japan">🇯🇵 Japan</button>
                        <button class="suggestion-tag" data-term="Paris">🇫🇷 Paris</button>
                        <button class="suggestion-tag" data-term="Maldives">🏝️ Maldives</button>
                    </div>
                    <p style="margin-top: 1rem;">
                        <small>💡 Tip: Search for "beach", "temple", or a country name like "Japan"</small>
                    </p>
                </div>
            `;
            
            // Add click listeners to suggestion tags
            document.querySelectorAll('.suggestion-tag').forEach(btn => {
                btn.addEventListener('click', () => {
                    searchInput.value = btn.dataset.term;
                    handleSearch();
                });
            });
        } else {
            displayResultsWithImages(results);
            
            // Add to search history
            searchHistory.push(query);
            if (searchHistory.length > 10) searchHistory.shift();
            
            // Show success message
            const categoryNames = {
                'beaches': '🏖️ Beach',
                'temples': '🛕 Temple',
                'cities': '🏙️ City',
                'adventure': '⛰️ Adventure'
            };
            
            let categoryMsg = '';
            if (results[0] && results[0].category) {
                categoryMsg = ` in ${categoryNames[results[0].category] || results[0].category}`;
            }
            
            showNotification(`Found ${results.length} amazing destination${categoryMsg}!`, 'success');
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = `
            <div class="error-message">
                <span style="font-size: 3rem;">😅</span>
                <h3>Oops! Something went wrong</h3>
                <p>Please try again later.</p>
            </div>
        `;
        showNotification('Error searching. Please try again.', 'error');
    }
}

// ============================================
// DISPLAY RESULTS WITH 2 IMAGES
// ============================================

/**
 * Display search results with 2 images each
 * Used for Tasks 6, 7, 8
 */
function displayResultsWithImages(results) {
    resultsContainer.innerHTML = '';
    
    // Determine category for header
    let category = 'Destinations';
    let categoryEmoji = '🌍';
    
    if (results.length > 0 && results[0].category) {
        const categoryMap = {
            'beaches': { name: 'Beach Destinations', emoji: '🏖️' },
            'temples': { name: 'Temple Destinations', emoji: '🛕' },
            'cities': { name: 'City Destinations', emoji: '🏙️' },
            'adventure': { name: 'Adventure Destinations', emoji: '⛰️' }
        };
        
        const catInfo = categoryMap[results[0].category];
        if (catInfo) {
            category = catInfo.name;
            categoryEmoji = catInfo.emoji;
        }
    }
    
    // Results header
    const header = document.createElement('div');
    header.className = 'results-header';
    header.innerHTML = `
        <h3>${categoryEmoji} ${category}</h3>
        <p>Showing ${results.length} amazing places to visit</p>
        <p style="font-size: 0.9rem; opacity: 0.8;">✨ Each destination features 2 images</p>
    `;
    resultsContainer.appendChild(header);
    
    // Display each result with 2 images
    results.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Ensure we have 2 images
        let images = item.images || [item.image, item.image];
        if (!Array.isArray(images) || images.length < 2) {
            const img = images[0] || 'https://via.placeholder.com/400x200?text=Destination';
            images = [img, img];
        }
        
        // Get current time
        const currentTime = getCurrentTime(item.timezone || 'UTC');
        
        // Create star rating
        const stars = '⭐'.repeat(Math.floor(item.rating || 0)) + 
                     (item.rating % 1 >= 0.5 ? '⭐' : '');
        
        // Get category emoji
        const categoryEmojis = {
            'beaches': '🏖️',
            'temples': '🛕',
            'cities': '🏙️',
            'adventure': '⛰️'
        };
        const catEmoji = categoryEmojis[item.category] || '📍';
        
        card.innerHTML = `
            <div class="image-carousel">
                <img src="${images[0]}" alt="${item.name} - Image 1" class="result-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Image+1'">
                <img src="${images[1]}" alt="${item.name} - Image 2" class="result-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Image+2'">
            </div>
            <div class="result-content">
                <h3>${catEmoji} ${item.name}</h3>
                <div class="location">📍 ${item.location}</div>
                <div class="rating">${stars} ${item.rating || 4.5} / 5</div>
                <p class="description">${item.description}</p>
                <div class="time">🕐 Local Time: ${currentTime}</div>
                <div class="image-count">🖼️ 2 Images Included</div>
                <button class="book-btn" data-id="${item.id || index}">📅 Book Now</button>
            </div>
        `;
        
        // Add book button functionality
        const bookBtn = card.querySelector('.book-btn');
        bookBtn.addEventListener('click', () => {
            showNotification(`✈️ Booking ${item.name}! Our team will contact you shortly.`, 'success');
            
            // Scroll to contact form
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        });
        
        resultsContainer.appendChild(card);
    });
}

// ============================================
// TASK 6: BEACH RECOMMENDATIONS
// ============================================

/**
 * Display beach recommendations specifically
 * Called when user searches for "beach"
 */
function displayBeachRecommendations() {
    const beaches = getDestinationsByCategory('beaches');
    if (beaches.length > 0) {
        displayResultsWithImages(beaches);
        showNotification(`🏖️ Found ${beaches.length} amazing beach destinations!`, 'success');
    } else {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <span style="font-size: 3rem;">🏖️</span>
                <h3>No beach destinations found</h3>
                <p>Try searching for "beach" or a specific beach name.</p>
            </div>
        `;
    }
}

// ============================================
// TASK 7: TEMPLE RECOMMENDATIONS
// ============================================

/**
 * Display temple recommendations specifically
 * Called when user searches for "temple"
 */
function displayTempleRecommendations() {
    const temples = getDestinationsByCategory('temples');
    if (temples.length > 0) {
        displayResultsWithImages(temples);
        showNotification(`🛕 Found ${temples.length} incredible temple destinations!`, 'success');
    } else {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <span style="font-size: 3rem;">🛕</span>
                <h3>No temple destinations found</h3>
                <p>Try searching for "temple" or a specific temple name.</p>
            </div>
        `;
    }
}

// ============================================
// TASK 8: COUNTRY RECOMMENDATIONS
// ============================================

/**
 * Display country-based recommendations
 * Called when user searches for a country name
 */
function displayCountryRecommendations(countryName) {
    const category = getCategoryForCountry(countryName);
    
    if (category) {
        const destinations = getDestinationsByCategory(category);
        // Filter by country
        const filtered = destinations.filter(d => 
            d.location.toLowerCase().includes(countryName.toLowerCase())
        );
        
        if (filtered.length > 0) {
            displayResultsWithImages(filtered);
            showNotification(`🇯🇵 Found ${filtered.length} destinations in ${countryName}!`, 'success');
        } else {
            // Show all in that category
            displayResultsWithImages(destinations);
            showNotification(`🌍 Showing all ${category} destinations`, 'info');
        }
    } else {
        // Try searching by location
        const results = searchDestinations(countryName);
        if (results.length > 0) {
            displayResultsWithImages(results);
        } else {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <span style="font-size: 3rem;">🌍</span>
                    <h3>No destinations found for "${countryName}"</h3>
                    <p>Try searching for:</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                        <button class="suggestion-tag" data-term="Japan">🇯🇵 Japan</button>
                        <button class="suggestion-tag" data-term="France">🇫🇷 France</button>
                        <button class="suggestion-tag" data-term="Italy">🇮🇹 Italy</button>
                        <button class="suggestion-tag" data-term="Thailand">🇹🇭 Thailand</button>
                    </div>
                </div>
            `;
            
            document.querySelectorAll('.suggestion-tag').forEach(btn => {
                btn.addEventListener('click', () => {
                    searchInput.value = btn.dataset.term;
                    handleSearch();
                });
            });
        }
    }
}

// ============================================
// SEARCH SUGGESTIONS
// ============================================

function showSuggestions() {
    const query = searchInput.value.trim().toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');
    
    if (!suggestionsContainer) return;
    
    if (query.length < 2) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    const matches = searchDestinations(query);
    const suggestions = matches.slice(0, 5);
    
    if (suggestions.length > 0) {
        suggestionsContainer.style.display = 'block';
        suggestionsContainer.innerHTML = suggestions.map(s => `
            <div class="suggestion-item" data-name="${s.name}" data-category="${s.category || ''}">
                <span>🔍</span>
                ${s.name} <small>(${s.location})</small>
                ${s.category ? `<span style="margin-left: 0.5rem; font-size: 0.7rem; color: #667eea;">${s.category}</span>` : ''}
            </div>
        `).join('');
        
        suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                searchInput.value = item.dataset.name;
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.style.display = 'none';
                handleSearch();
            });
        });
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

// ============================================
// CLEAR SEARCH
// ============================================

function clearSearch() {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
    const suggestionsContainer = document.getElementById('suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
    }
    showNotification('Search cleared', 'info');
}

// ============================================
// TASK 2: FEATURED DESTINATIONS
// ============================================

function displayFeaturedDestinations() {
    if (!featuredContainer) return;
    
    featuredContainer.innerHTML = '';
    
    featuredDestinations.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=${dest.name}'">
            <div class="card-body">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <button class="explore-btn" data-name="${dest.name}">Explore →</button>
            </div>
        `;
        
        const exploreBtn = card.querySelector('.explore-btn');
        exploreBtn.addEventListener('click', () => {
            searchInput.value = dest.name;
            handleSearch();
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        });
        
        featuredContainer.appendChild(card);
    });
}

// ============================================
// TASK 3: TEAM MEMBERS
// ============================================

function displayTeamMembers() {
    if (!teamContainer) return;
    
    teamContainer.innerHTML = '';
    
    teamMembers.forEach(member => {
        const div = document.createElement('div');
        div.className = 'team-member';
        div.innerHTML = `
            <div class="avatar">${member.avatar}</div>
            <h4>${member.name}</h4>
            <p class="role">${member.role}</p>
            <p class="bio">${member.bio}</p>
        `;
        teamContainer.appendChild(div);
    });
}

// ============================================
// TASK 4: CONTACT FORM
// ============================================

function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (!name || name.length < 2) {
        document.getElementById('nameError').textContent = 'Please enter your full name (minimum 2 characters)';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }
    
    // Validate message
    if (!message || message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    } else {
        document.getElementById('messageError').textContent = '';
    }
    
    if (isValid) {
        // Show success
        document.getElementById('formSuccess').classList.remove('hidden');
        document.querySelector('.contact-form').reset();
        document.querySelector('.contact-form').style.display = 'none';
        
        // Log the message
        console.log('📧 Contact Form Submission:', {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        });
        
        showNotification('✅ Message sent successfully! We\'ll respond within 24 hours.', 'success');
        
        // Reset after 5 seconds
        setTimeout(() => {
            document.getElementById('formSuccess').classList.add('hidden');
            document.querySelector('.contact-form').style.display = 'block';
        }, 5000);
    } else {
        showNotification('⚠️ Please fix the errors in the form', 'warning');
    }
}

// ============================================
// BOOK NOW BUTTON
// ============================================

function handleBookNow() {
    showNotification('🎉 Ready to book your dream vacation? Our travel experts are here to help!', 'success');
    
    // Scroll to contact form
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1000);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span>${icons[type] || 'ℹ️'}</span>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto close after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// ============================================
// DYNAMIC STYLES
// ============================================

function addDynamicStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
        /* ===== IMAGE CAROUSEL ===== */
        .image-carousel {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
            height: 200px;
            overflow: hidden;
        }
        
        .image-carousel .result-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .image-carousel .result-image:hover {
            transform: scale(1.05);
        }
        
        /* ===== BOOK BUTTON ===== */
        .book-btn {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .book-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4);
        }
        
        /* ===== SUGGESTION TAGS ===== */
        .suggestion-tag {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            font-size: 1rem;
        }
        
        .suggestion-tag:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        /* ===== IMAGE COUNT BADGE ===== */
        .image-count {
            font-size: 0.8rem;
            color: #718096;
            margin: 0.25rem 0;
            padding: 0.25rem 0.5rem;
            background: #f8f9fa;
            border-radius: 5px;
            display: inline-block;
        }
        
        /* ===== NOTIFICATION ===== */
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
        }
        
        .notification-success { border-left-color: #48bb78; }
        .notification-error { border-left-color: #fc8181; }
        .notification-warning { border-left-color: #ecc94b; }
        .notification-info { border-left-color: #667eea; }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #a0aec0;
            padding: 0 0.5rem;
        }
        
        /* ===== LOADING ===== */
        .loading {
            text-align: center;
            padding: 3rem;
            color: white;
            grid-column: 1 / -1;
        }
        
        .loading span {
            font-size: 3rem;
            display: block;
            animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .loading p {
            margin-top: 1rem;
        }
        
        /* ===== NO RESULTS ===== */
        .no-results {
            text-align: center;
            padding: 3rem;
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            grid-column: 1 / -1;
        }
        
        .no-results h3 {
            margin: 1rem 0;
            color: #2d3748;
        }
        
        .no-results p {
            color: #718096;
        }
        
        /* ===== RESULTS HEADER ===== */
        .results-header {
            grid-column: 1 / -1;
            text-align: center;
            margin-bottom: 1rem;
            color: white;
            padding: 1rem;
            background: rgba(0,0,0,0.3);
            border-radius: 15px;
            backdrop-filter: blur(5px);
        }
        
        .results-header h3 {
            font-size: 1.8rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .results-header p {
            opacity: 0.9;
        }
        
        /* ===== KEYFRAMES ===== */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .result-card {
            animation: slideUp 0.5s ease;
        }
        
        /* ===== ERROR MESSAGE ===== */
        .error-message {
            text-align: center;
            padding: 3rem;
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            grid-column: 1 / -1;
        }
        
        .error-message h3 {
            margin: 1rem 0;
            color: #2d3748;
        }
        
        .error-message p {
            color: #718096;
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
            .image-carousel {
                height: 150px;
            }
            
            .results-header h3 {
                font-size: 1.3rem;
            }
            
            .notification {
                max-width: 90%;
                right: 5%;
                top: 80px;
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .image-carousel {
                height: 120px;
                grid-template-columns: 1fr 1fr;
            }
            
            .suggestion-tag {
                font-size: 0.8rem;
                padding: 0.4rem 0.8rem;
            }
        }
    `;
    document.head.appendChild(styles);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl + K or Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
    
    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        clearSearch();
        searchInput.blur();
    }
});

// ============================================
// CONSOLE HELP
// ============================================

console.log('🌍 TravelWise App');
console.log('📝 Quick Commands:');
console.log('  - Search for "beach" to see beach destinations (Task 6)');
console.log('  - Search for "temple" to see temple destinations (Task 7)');
console.log('  - Search for a country (e.g., "Japan") to see country destinations (Task 8)');
console.log('  - Press Ctrl+K (or Cmd+K) to focus the search bar');
console.log('  - Press Escape to clear search');
console.log('📊 Data loaded:', {
    beaches: destinations.beaches.length,
    temples: destinations.temples.length,
    cities: destinations.cities.length,
    adventure: destinations.adventure.length,
    total: getAllDestinations().length
});