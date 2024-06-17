const Seller = require("../models/Seller");

// Controller function to create a seller with vendor details
const createSeller = async (req, res) => {
  const { email, password, name, imglink, vendor } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !name || !vendor) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if seller with the same email already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new seller instance
    const newSeller = new Seller({
      email,
      password,
      name,
      imglink,
      vendor,
    });

    // Save the seller to the database
    const savedSeller = await newSeller.save();

    // Respond with the saved seller's email
    res.status(201).json({ email: savedSeller.email });
  } catch (error) {
    console.error("Error creating seller:", error);
    res.status(500).json({ message: "Failed to create seller", error });
  }
};

const getDetailsForFilter = async (req, res) => {
    try {
        const sellers = await Seller.find().populate('products');
        let vendors={};
        let forc={};
        let city={};
        let producttype={};
        let products=[];
        sellers.forEach((seller)=>{
            console.log(seller);
            vendors[seller.vendor.name]='0';
            seller.products.forEach((product)=>{
                forc[product.gender]='0';
                city[product.city]='0';
                producttype[product.producttype]='0';
                products.push({
                    id: product._id,
                    name: product.name,
                    imglink: product.imglink,
                    purity: product.purity
                })
            })
        })

        res.status(200).json({
            vendors: Object.keys(vendors),
            forc : Object.keys(forc), 
            city: Object.keys(city), 
            product: Object.keys(producttype), 
            products
        });
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({ message: 'Failed to fetch sellers', error });
    }
};


const getFilterData = async (req, res) => {
    const { text, product, city, gender, vendor } = req.body;

    try {
      // Build the match criteria for the sellers
      const vendorMatch = vendor ? { 'vendor.name': new RegExp(vendor, 'i') } : {};
  
      // Build the match criteria for the products
      const productMatch = {};
      if (text) {
        productMatch.name = new RegExp(text, 'i'); // Use regex for partial match
      }
      if (product) {
        productMatch.producttype = new RegExp(product, 'i'); // Use regex for partial match
      }
      if (city) {
        productMatch.city = city; // exact match
      }
      if (gender) {
        productMatch.gender = gender; //exact match
      }
  
      // Find sellers that match the vendor name and populate their products with the product match criteria
      const sellers = await Seller.find(vendorMatch).populate({
        path: 'products',
        match: productMatch
      });
  
      // Extract and combine the products from all matching sellers
      const filteredProducts = sellers.reduce((acc, seller) => {
        return acc.concat(seller.products);
      }, []);
  
      // Return the filtered products
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
  createSeller,getDetailsForFilter,getFilterData
};
