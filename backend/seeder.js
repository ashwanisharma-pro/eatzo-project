const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Food = require('./models/Food');

const sampleRestaurants = [
  { name: 'Dominos', address: '123 Main St, Central City', description: 'Pizza, Fast Food', image: '/images/logo/restaurants/dominos.jpg', rating: 4.3 },
  { name: 'KFC', address: '456 West Ave, Central City', description: 'Chicken, Burger', image: '/images/logo/restaurants/kfc.jpg', rating: 4.2 },
  { name: 'Wow Momo', address: '789 North Blvd, Central City', description: 'Momos, Snacks', image: '/images/logo/restaurants/wow-momo.jpg', rating: 4.1 },
  { name: 'Haldirams', address: '101 East Sq, Central City', description: 'North Indian, Sweets', image: '/images/logo/restaurants/haldirams.jpg', rating: 4.4 },
  { name: 'Subway', address: '22 South Park, Central City', description: 'Healthy, Fast Food', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400', rating: 4.0 },
  { name: 'Burger King', address: '55 Mall Road, Central City', description: 'Burger, Fast Food', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400', rating: 4.1 },
  { name: 'Behrouz Biryani', address: '12 Royal Drive, Central City', description: 'Biryani, Mughlai', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400', rating: 4.6 },
  { name: 'Mainland China', address: '44 Oriental St, Central City', description: 'Chinese, Asian', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400', rating: 4.5 },
  { name: 'Pizza Hut', address: '19 Cheese Ln, Central City', description: 'Pizza, Italian', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400', rating: 4.2 },
  { name: 'Barbeque Nation', address: '50 Grill Station, Central City', description: 'North Indian, Kebabs', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400', rating: 4.7 }
];

const sampleFoods = [
  { name: 'Margherita Pizza', description: 'Cheesy classic delight', price: 249, image: '/images/logo/foods/margherita-pizza.jpg', category: 'Pizza' },
  { name: 'Veg Burger', description: 'Crunchy and loaded', price: 129, image: '/images/logo/foods/veg-burger.jpg', category: 'Burger' },
  { name: 'Chicken Biryani', description: 'Spicy and flavorful', price: 299, image: '/images/logo/foods/chicken-biryani.jpg', category: 'Biryani' },
  { name: 'Gulab Jamun', description: 'Soft sweet dessert', price: 99, image: '/images/logo/foods/gulab-jamun.jpg', category: 'Desserts' },
  { name: 'Chicken Whopper', description: 'Signature crispy chicken burger', price: 169, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400', category: 'Burger' },
  { name: 'Paneer Tikka', description: 'Tandoori roasted cottage cheese', price: 220, image: 'https://images.unsplash.com/photo-1599487405270-81f08be934d4?auto=format&fit=crop&w=400', category: 'Starters' },
  { name: 'Hakka Noodles', description: 'Wok tossed spicy noodles', price: 180, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400', category: 'Chinese' },
  { name: 'Pepperoni Pizza', description: 'Loaded with cheese and pepperoni', price: 349, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400', category: 'Pizza' }
];

const importData = async () => {
  try {
    const rCount = await Restaurant.countDocuments();
    if (rCount > 0) {
      console.log('Skipping seed - data already exists.');
      return;
    }

    console.log('Inserting sample restaurants...');
    const createdRestaurants = await Restaurant.insertMany(sampleRestaurants);

    console.log('Inserting sample foods...');
    const foodsWithIds = sampleFoods.map((food, idx) => {
      const restaurant = createdRestaurants[idx % createdRestaurants.length];
      return { ...food, restaurantId: restaurant._id };
    });

    await Food.insertMany(foodsWithIds);
    console.log('Success: In-memory data seeded.');
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
  }
};

module.exports = importData;
