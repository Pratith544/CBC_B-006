// This is a mock API service to simulate fetching data from a government API
// In a real application, this would make actual API calls to the government data service

// Mock commodity data
const mockCommodities = {
  'rice': {
    name: 'Rice',
    currentPrice: '₹2,250',
    priceChange: '+2.5%',
    marketSentiment: 'Bullish',
    priceHistory: [
      { date: '2023-01', price: 2100 },
      { date: '2023-02', price: 2150 },
      { date: '2023-03', price: 2080 },
      { date: '2023-04', price: 2120 },
      { date: '2023-05', price: 2180 },
      { date: '2023-06', price: 2200 },
      { date: '2023-07', price: 2170 },
      { date: '2023-08', price: 2150 },
      { date: '2023-09', price: 2190 },
      { date: '2023-10', price: 2210 },
      { date: '2023-11', price: 2230 },
      { date: '2023-12', price: 2250 },
    ],
    forecast: {
      trend: 'up',
      value: '₹2,320 - ₹2,380',
      insight: 'Rice prices are expected to increase due to strong domestic demand and lower production estimates.',
      factors: [
        'Delayed monsoon affecting transplanting in key regions',
        'Government procurement policies supporting price floor',
        'Increased export demand from neighboring countries',
        'Lower carryover stocks compared to previous year'
      ]
    },
    demand: {
      trend: 'up',
      value: 'High',
      insight: 'Demand remains strong in both domestic and export markets, particularly for premium varieties.',
      factors: [
        'Growing export opportunities in Middle Eastern markets',
        'Stable domestic consumption patterns',
        'Increasing demand for organic and specialty rice varieties',
        'Government distribution programs maintaining steady demand'
      ]
    },
    details: {
      description: 'Rice is one of India\'s most important staple food crops and a significant source of livelihood for millions of farmers. India is the world\'s second-largest producer of rice after China and accounts for about 20% of global rice production.',
      varieties: [
        {
          name: 'Basmati',
          characteristics: 'Known for its long grains, distinctive aroma and flavor. Primarily grown in northern India, particularly Punjab, Haryana and western Uttar Pradesh.'
        },
        {
          name: 'Non-Basmati',
          characteristics: 'Includes various types like long-grain, medium-grain, and short-grain. Widely grown across India in various agro-climatic regions.'
        },
        {
          name: 'Parboiled Rice',
          characteristics: 'Rice that has been partially boiled in the husk. This process changes the texture and helps preserve nutritional value.'
        }
      ],
      seasonality: 'Rice in India is primarily grown in two seasons: Kharif (monsoon) from June to October, and Rabi (winter) from November to May. The Kharif crop accounts for about 85% of the country\'s rice production.',
      majorProducers: ['West Bengal', 'Uttar Pradesh', 'Punjab', 'Odisha', 'Andhra Pradesh', 'Bihar'],
      storage: 'Rice should be stored in cool, dry conditions with humidity levels below 14% to prevent spoilage and pest infestation. Proper storage can maintain quality for up to 12 months.',
      uses: [
        'Staple food consumed in various forms',
        'Manufacturing of rice flour and rice bran oil',
        'Production of rice-based alcoholic beverages',
        'Animal feed from by-products',
        'Straw used for thatching, rope-making, and as livestock fodder'
      ],
      nutritionalInfo: {
        calories: '130 kcal per 100g (cooked)',
        protein: '2.7g per 100g',
        carbohydrates: '28g per 100g',
        fats: '0.3g per 100g',
        otherNutrients: [
          'Rich in B vitamins, especially B1 (thiamine)',
          'Contains essential minerals including manganese and selenium',
          'Brown rice provides additional fiber and micronutrients',
          'Low in sodium and cholesterol-free'
        ]
      }
    },
    learningResources: {
      articles: [
        {
          title: 'Modern Rice Cultivation Techniques',
          description: 'Learn about System of Rice Intensification (SRI) and other modern methods to increase yield.',
          url: '#',
          type: 'article',
          duration: '10 min read'
        },
        {
          title: 'Water Management in Rice Cultivation',
          description: 'Effective techniques to optimize water usage while maintaining high yields.',
          url: '#',
          type: 'guide',
          duration: '15 min read'
        },
        {
          title: 'Post-Harvest Processing of Rice',
          description: 'Steps to minimize losses and maintain quality after harvesting rice.',
          url: '#',
          type: 'video',
          duration: '12 min watch'
        },
        {
          title: 'Marketing Strategies for Rice Farmers',
          description: 'How to get better prices for your rice produce through proper marketing and timing.',
          url: '#',
          type: 'article',
          duration: '8 min read'
        }
      ],
      bestPractices: [
        'Use quality seeds of high-yielding varieties suitable for your region',
        'Follow recommended plant spacing and transplanting techniques',
        'Apply balanced fertilizers based on soil test recommendations',
        'Implement integrated pest management to reduce chemical use',
        'Harvest at the right time (when 80-85% of grains turn golden yellow)',
        'Ensure proper drying to reduce moisture content to 14% before storage'
      ],
      relatedCommodities: [
        { name: 'Wheat', id: 'wheat' },
        { name: 'Corn', id: 'corn' },
        { name: 'Pulses', id: 'pulses' }
      ]
    }
  },
  'wheat': {
    name: 'Wheat',
    currentPrice: '₹1,960',
    priceChange: '-1.2%',
    marketSentiment: 'Neutral',
    priceHistory: [
      { date: '2023-01', price: 1950 },
      { date: '2023-02', price: 1920 },
      { date: '2023-03', price: 1980 },
      { date: '2023-04', price: 2020 },
      { date: '2023-05', price: 2050 },
      { date: '2023-06', price: 2020 },
      { date: '2023-07', price: 2000 },
      { date: '2023-08', price: 1990 },
      { date: '2023-09', price: 1970 },
      { date: '2023-10', price: 1980 },
      { date: '2023-11', price: 1990 },
      { date: '2023-12', price: 1960 },
    ],
    forecast: {
      trend: 'stable',
      value: '₹1,940 - ₹2,000',
      insight: 'Wheat prices are expected to remain stable with minor fluctuations based on international market trends.',
      factors: [
        'Adequate domestic production meeting demand',
        'Government procurement at MSP providing price stability',
        'Global wheat prices affecting export competitiveness',
        'Weather conditions remaining favorable for upcoming crop'
      ]
    },
    demand: {
      trend: 'stable',
      value: 'Moderate',
      insight: 'Demand remains consistent with seasonal variations primarily driven by domestic consumption patterns.',
      factors: [
        'Steady demand from flour mills and food processing industry',
        'Government procurement for public distribution system',
        'Limited export demand due to international price competition',
        'Consistent industrial usage for various wheat-based products'
      ]
    },
    details: {
      description: 'Wheat is the second most important cereal crop in India after rice. It\'s a major staple food in northern and central India and plays a crucial role in the country\'s food security. India is the second-largest producer of wheat globally.',
      varieties: [
        {
          name: 'Common Bread Wheat',
          characteristics: 'Most widely grown type, used for making chapati, bread, and other baked products. Has moderate protein content.'
        },
        {
          name: 'Durum Wheat',
          characteristics: 'Hard wheat with high protein content, primarily used for making pasta, semolina, and coarse flour products.'
        },
        {
          name: 'Emmer Wheat',
          characteristics: 'Ancient wheat variety with higher nutritional value, growing in popularity for health-conscious consumers.'
        }
      ],
      seasonality: 'Wheat in India is primarily a rabi (winter) crop, sown from October to December and harvested from February to May. The ideal temperature for wheat cultivation is between 15-20°C.',
      majorProducers: ['Uttar Pradesh', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Rajasthan', 'Bihar'],
      storage: 'Wheat should be stored with moisture content below 12% in cool, dry conditions to prevent fungal growth and pest infestation. Properly stored wheat can maintain quality for 1-2 years.',
      uses: [
        'Making flour for bread, chapati, and other baked goods',
        'Production of semolina and pasta products',
        'Brewing and distilling industries',
        'Animal feed from by-products like bran',
        'Straw used as livestock fodder and for various industrial applications'
      ],
      nutritionalInfo: {
        calories: '340 kcal per 100g (uncooked)',
        protein: '13g per 100g',
        carbohydrates: '71g per 100g',
        fats: '2g per 100g',
        otherNutrients: [
          'Good source of dietary fiber',
          'Contains B vitamins and minerals like iron and zinc',
          'Whole wheat provides additional nutrients compared to refined wheat',
          'Contains gluten proteins which give bread its structure'
        ]
      }
    },
    learningResources: {
      articles: [
        {
          title: 'Wheat Varieties for Different Regions',
          description: 'Guide to selecting the right wheat variety based on local climate and soil conditions.',
          url: '#',
          type: 'guide',
          duration: '12 min read'
        },
        {
          title: 'Efficient Irrigation Techniques for Wheat',
          description: 'Methods to optimize water usage while maintaining high yields in wheat cultivation.',
          url: '#',
          type: 'video',
          duration: '10 min watch'
        },
        {
          title: 'Integrated Pest Management in Wheat',
          description: 'Sustainable approaches to manage pests and diseases in wheat crops.',
          url: '#',
          type: 'article',
          duration: '15 min read'
        },
        {
          title: 'Post-Harvest Handling of Wheat',
          description: 'Best practices for threshing, cleaning, drying, and storing wheat after harvest.',
          url: '#',
          type: 'guide',
          duration: '8 min read'
        }
      ],
      bestPractices: [
        'Use certified seeds of varieties recommended for your region',
        'Follow proper land preparation techniques including adequate tillage',
        'Sow at the optimal time to avoid temperature extremes during critical growth stages',
        'Apply fertilizers based on soil test results, with emphasis on nitrogen timing',
        'Practice timely weed management to prevent yield losses',
        'Monitor for pests and diseases regularly, especially during vegetative and grain-filling stages'
      ],
      relatedCommodities: [
        { name: 'Rice', id: 'rice' },
        { name: 'Barley', id: 'barley' },
        { name: 'Corn', id: 'corn' }
      ]
    }
  },
  // Add more commodities as needed
};

// Function to simulate API call to get commodity data
export async function getCommodityData(commodityId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if commodity exists in our mock data
  if (mockCommodities[commodityId as keyof typeof mockCommodities]) {
    return mockCommodities[commodityId as keyof typeof mockCommodities];
  }
  
  // If commodity is not found in our mock data, return generic data
  return {
    name: commodityId.charAt(0).toUpperCase() + commodityId.slice(1),
    currentPrice: '₹2,000',
    priceChange: '+0.5%',
    marketSentiment: 'Neutral',
    priceHistory: [
      { date: '2023-01', price: 1900 },
      { date: '2023-02', price: 1950 },
      { date: '2023-03', price: 1970 },
      { date: '2023-04', price: 1940 },
      { date: '2023-05', price: 1960 },
      { date: '2023-06', price: 1980 },
      { date: '2023-07', price: 1990 },
      { date: '2023-08', price: 1970 },
      { date: '2023-09', price: 1980 },
      { date: '2023-10', price: 1990 },
      { date: '2023-11', price: 1995 },
      { date: '2023-12', price: 2000 },
    ],
    forecast: {
      trend: 'stable',
      value: '₹1,950 - ₹2,050',
      insight: 'Prices are expected to remain relatively stable in the coming months.',
      factors: [
        'Current supply meeting market demand',
        'Seasonal variations affecting production',
        'Government policies providing price stability',
        'International market trends'
      ]
    },
    demand: {
      trend: 'stable',
      value: 'Moderate',
      insight: 'Demand follows typical seasonal patterns with no significant disruptions expected.',
      factors: [
        'Consistent domestic consumption',
        'Stable industrial usage',
        'Regular export channels functioning normally',
        'No major supply chain disruptions'
      ]
    },
    details: {
      description: `${commodityId.charAt(0).toUpperCase() + commodityId.slice(1)} is an important agricultural commodity in India with significant economic importance for farmers across various regions.`,
      varieties: [
        {
          name: 'Common Variety',
          characteristics: 'Widely grown across multiple regions, adaptable to various growing conditions.'
        },
        {
          name: 'Premium Variety',
          characteristics: 'Higher quality grade with enhanced characteristics, fetching better market prices.'
        }
      ],
      seasonality: 'The crop follows typical seasonal patterns, with main growing seasons determined by regional climate conditions.',
      majorProducers: ['Major State 1', 'Major State 2', 'Major State 3', 'Major State 4'],
      storage: 'Standard storage practices involve maintaining appropriate moisture levels and protecting from pests in clean, dry conditions.',
      uses: [
        'Primary food product',
        'Industrial applications',
        'Secondary processing into various consumer goods',
        'By-products utilized in multiple industries'
      ]
    },
    learningResources: {
      articles: [
        {
          title: 'Cultivation Best Practices',
          description: 'Learn about modern techniques to increase yield and quality.',
          url: '#',
          type: 'article',
          duration: '10 min read'
        },
        {
          title: 'Market Timing Strategies',
          description: 'How to optimize selling times to maximize profits.',
          url: '#',
          type: 'guide',
          duration: '12 min read'
        },
        {
          title: 'Pest Management Approaches',
          description: 'Integrated strategies to protect crops while minimizing chemical use.',
          url: '#',
          type: 'video',
          duration: '15 min watch'
        }
      ],
      bestPractices: [
        'Use quality seeds appropriate for your region',
        'Follow recommended fertilization schedules',
        'Implement modern irrigation techniques to conserve water',
        'Monitor for pests and diseases regularly',
        'Harvest at optimal maturity for best quality and price'
      ],
      relatedCommodities: [
        { name: 'Related Crop 1', id: 'related-1' },
        { name: 'Related Crop 2', id: 'related-2' }
      ]
    }
  };
}