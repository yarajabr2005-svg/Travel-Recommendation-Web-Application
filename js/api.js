// ============================================
// API FUNCTIONS FOR EXTERNAL SERVICES
// ============================================

// ============================================
// WEATHER API (Optional - Free from OpenWeatherMap)
// ============================================

// Get your free API key from: https://openweathermap.org/api
// Replace with your actual API key
const WEATHER_API_KEY = 'd7b94280cb444978354f18fce9721ba7';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch weather data for a specific city
 * @param {string} city - City name
 * @param {string} country - Country code (optional)
 * @returns {Promise<Object|null>} Weather data or null if error
 */
async function fetchWeather(city, country = '') {
    try {
        const query = country ? `${city},${country}` : city;
        const url = `${WEATHER_API_URL}?q=${query}&units=metric&appid=${WEATHER_API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
            city: data.name,
            country: data.sys.country
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

// ============================================
// TIMEZONE FUNCTIONS
// ============================================

/**
 * Get current time for a specific timezone
 * @param {string} timezone - Timezone string (e.g., "UTC+5", "UTC-10")
 * @returns {string} Formatted time string
 */
function getCurrentTime(timezone) {
    try {
        if (!timezone) return 'Time unavailable';
        
        // Parse timezone offset
        const match = timezone.match(/UTC([+-])(\d{1,2})(?::(\d{2}))?/);
        if (!match) return 'Time unavailable';
        
        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2]) || 0;
        const minutes = parseInt(match[3]) || 0;
        const totalOffset = (hours * 60 + minutes) * sign;
        
        // Get current time in UTC
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        
        // Apply timezone offset
        const localTime = new Date(utcTime + (totalOffset * 60000));
        
        return localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error('Error getting time:', error);
        return 'Time unavailable';
    }
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

/**
 * Search destinations based on query
 * @param {string} searchTerm - Search query
 * @returns {Array} Array of matching destinations
 */
function searchDestinations(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return getAllDestinations();
    }
    
    const term = searchTerm.toLowerCase().trim();
    let results = [];
    
    // Check all destination categories
    Object.keys(destinations).forEach(category => {
        destinations[category].forEach(dest => {
            // Search by name, location, description, or category
            if (dest.name.toLowerCase().includes(term) ||
                dest.location.toLowerCase().includes(term) ||
                dest.description.toLowerCase().includes(term) ||
                category.toLowerCase().includes(term)) {
                results.push({
                    ...dest,
                    category: category
                });
            }
        });
    });
    
    return results;
}

/**
 * Get all destinations
 * @returns {Array} Array of all destinations with category
 */
function getAllDestinations() {
    let all = [];
    Object.keys(destinations).forEach(category => {
        destinations[category].forEach(dest => {
            all.push({
                ...dest,
                category: category
            });
        });
    });
    return all;
}

/**
 * Get destinations by category
 * @param {string} category - Category name (beaches, temples, cities, adventure)
 * @returns {Array} Array of destinations in that category
 */
function getDestinationsByCategory(category) {
    if (destinations[category]) {
        return destinations[category].map(dest => ({
            ...dest,
            category: category
        }));
    }
    return [];
}

/**
 * Simulate API call with delay (for demo purposes)
 * @param {string} searchTerm - Search query
 * @returns {Promise<Array>} Promise with search results
 */
function getRecommendations(searchTerm) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            const results = searchDestinations(searchTerm);
            resolve(results);
        }, 500);
    });
}

// ============================================
// COUNTRY MAPPING FOR TASK 8
// ============================================

// Map countries to their categories for country-based search
const countryCategoryMap = {
    'japan': 'cities',
    'france': 'cities',
    'usa': 'cities',
    'america': 'cities',
    'united states': 'cities',
    'thailand': 'cities',
    'italy': 'cities',
    'uae': 'cities',
    'united arab emirates': 'cities',
    'cambodia': 'temples',
    'indonesia': 'temples',
    'india': 'temples',
    'maldives': 'beaches',
    'greece': 'beaches',
    'switzerland': 'adventure',
    'new zealand': 'adventure'
};

/**
 * Get category for a country
 * @param {string} country - Country name
 * @returns {string|null} Category or null if not found
 */
function getCategoryForCountry(country) {
    const lowerCountry = country.toLowerCase().trim();
    return countryCategoryMap[lowerCountry] || null;
}

// ============================================
// EXPORT FOR USE IN OTHER FILES
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchWeather,
        getCurrentTime,
        searchDestinations,
        getAllDestinations,
        getDestinationsByCategory,
        getRecommendations,
        getCategoryForCountry,
        countryCategoryMap
    };
}