// ============================================
// TRAVEL DESTINATION DATA
// ============================================

const destinations = {
    // ============ TASK 6: BEACH RECOMMENDATIONS WITH 2 IMAGES ============
    beaches: [
        {
            id: 1,
            name: "Maldives Paradise",
            location: "Indian Ocean",
            description: "Crystal clear waters and white sandy beaches make this a tropical paradise. Perfect for honeymooners and beach lovers.",
            images: [
                "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600",
                "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600"
            ],
            rating: 4.9,
            timezone: "UTC+5"
        },
        {
            id: 2,
            name: "Bora Bora",
            location: "French Polynesia",
            description: "Famous for its turquoise lagoon and overwater bungalows. A true paradise in the South Pacific.",
            images: [
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600"
            ],
            rating: 4.8,
            timezone: "UTC-10"
        },
        {
            id: 3,
            name: "Santorini",
            location: "Greece",
            description: "Stunning beaches with black sand and crystal clear waters. Known for its beautiful sunsets and white-washed buildings.",
            images: [
                "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600",
                "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600"
            ],
            rating: 4.7,
            timezone: "UTC+2"
        },
        {
            id: 4,
            name: "Bali Beaches",
            location: "Indonesia",
            description: "Beautiful beaches with golden sand and perfect waves for surfing. A tropical paradise with rich culture.",
            images: [
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
            ],
            rating: 4.6,
            timezone: "UTC+8"
        }
    ],

    // ============ TASK 7: TEMPLE RECOMMENDATIONS WITH 2 IMAGES ============
    temples: [
        {
            id: 5,
            name: "Angkor Wat",
            location: "Cambodia",
            description: "The largest religious monument in the world, a UNESCO World Heritage site. A masterpiece of Khmer architecture.",
            images: [
                "https://images.unsplash.com/photo-1563485935325-53c1ec24c595?w=600",
                "https://images.unsplash.com/photo-1563485935325-53c1ec24c595?w=600"
            ],
            rating: 4.9,
            timezone: "UTC+7"
        },
        {
            id: 6,
            name: "Borobudur",
            location: "Indonesia",
            description: "The world's largest Buddhist temple, with intricate stone carvings and stunning views of surrounding mountains.",
            images: [
                "https://images.unsplash.com/photo-1570722118906-21dec984bc09?w=600",
                "https://images.unsplash.com/photo-1570722118906-21dec984bc09?w=600"
            ],
            rating: 4.8,
            timezone: "UTC+7"
        },
        {
            id: 7,
            name: "Kyoto Temples",
            location: "Japan",
            description: "Ancient temples surrounded by beautiful Japanese gardens. Experience traditional Japanese culture and spirituality.",
            images: [
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600"
            ],
            rating: 4.7,
            timezone: "UTC+9"
        },
        {
            id: 8,
            name: "Taj Mahal",
            location: "India",
            description: "One of the Seven Wonders of the World, a stunning white marble mausoleum and UNESCO World Heritage site.",
            images: [
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600"
            ],
            rating: 4.9,
            timezone: "UTC+5:30"
        }
    ],

    // ============ TASK 8: COUNTRY-BASED RECOMMENDATIONS WITH 2 IMAGES ============
    cities: [
        {
            id: 9,
            name: "Tokyo",
            location: "Japan",
            description: "A vibrant metropolis blending tradition with cutting-edge technology. Experience amazing cuisine, culture, and shopping.",
            images: [
                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
                "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600"
            ],
            rating: 4.8,
            timezone: "UTC+9"
        },
        {
            id: 10,
            name: "Paris",
            location: "France",
            description: "The city of love, known for the Eiffel Tower, rich culture, world-class museums, and exquisite cuisine.",
            images: [
                "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
                "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600"
            ],
            rating: 4.7,
            timezone: "UTC+1"
        },
        {
            id: 11,
            name: "New York City",
            location: "USA",
            description: "The city that never sleeps, with iconic landmarks like Times Square, Central Park, and the Statue of Liberty.",
            images: [
                "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600",
                "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600"
            ],
            rating: 4.6,
            timezone: "UTC-5"
        },
        {
            id: 12,
            name: "Bangkok",
            location: "Thailand",
            description: "A vibrant city known for ornate temples, bustling markets, amazing street food, and rich cultural heritage.",
            images: [
                "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600",
                "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600"
            ],
            rating: 4.5,
            timezone: "UTC+7"
        },
        {
            id: 13,
            name: "Rome",
            location: "Italy",
            description: "The Eternal City, home to ancient ruins, Renaissance art, delicious pasta, and the Vatican City.",
            images: [
                "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600",
                "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600"
            ],
            rating: 4.7,
            timezone: "UTC+1"
        },
        {
            id: 14,
            name: "Dubai",
            location: "UAE",
            description: "A futuristic city with stunning architecture, luxury shopping, desert adventures, and world-class entertainment.",
            images: [
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600"
            ],
            rating: 4.6,
            timezone: "UTC+4"
        }
    ],

    // ============ ADDITIONAL: ADVENTURE DESTINATIONS ============
    adventure: [
        {
            id: 15,
            name: "Swiss Alps",
            location: "Switzerland",
            description: "World-class skiing, hiking, and breathtaking mountain views. Perfect for adventure seekers and nature lovers.",
            images: [
                "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
            ],
            rating: 4.9,
            timezone: "UTC+1"
        },
        {
            id: 16,
            name: "New Zealand",
            location: "New Zealand",
            description: "Adventure capital with bungee jumping, skydiving, and stunning landscapes featured in Lord of the Rings.",
            images: [
                "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600",
                "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600"
            ],
            rating: 4.8,
            timezone: "UTC+12"
        }
    ]
};

// ============================================
// FEATURED DESTINATIONS FOR HOME PAGE
// ============================================

const featuredDestinations = [
    {
        name: "Maldives",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400",
        description: "Paradise on earth with crystal clear waters"
    },
    {
        name: "Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
        description: "Land of the rising sun and ancient temples"
    },
    {
        name: "Switzerland",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
        description: "Alpine adventure in the heart of Europe"
    },
    {
        name: "Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
        description: "Mediterranean magic with stunning sunsets"
    }
];

// ============================================
// TEAM MEMBERS FOR ABOUT US PAGE
// ============================================

const teamMembers = [
    {
        name: "Sarah Johnson",
        role: "CEO & Founder",
        avatar: "👩‍💼",
        bio: "Travel enthusiast with 15 years of experience in the tourism industry"
    },
    {
        name: "Michael Chen",
        role: "Lead Developer",
        avatar: "👨‍💻",
        bio: "Full-stack developer and travel blogger who has visited 50+ countries"
    },
    {
        name: "Emily Rodriguez",
        role: "Head of Content",
        avatar: "👩‍✈️",
        bio: "Content creator and digital nomad with a passion for storytelling"
    },
    {
        name: "David Kim",
        role: "Customer Experience",
        avatar: "👨‍🎓",
        bio: "Passionate about helping travelers create unforgettable memories"
    }
];

// ============================================
// EXPORT FOR USE IN OTHER FILES
// ============================================

// Make data available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { destinations, featuredDestinations, teamMembers };
}