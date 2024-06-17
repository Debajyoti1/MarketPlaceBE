const Seller = require('../models/Seller');
const Product = require('../models/Product');

// Function to add products to an existing seller identified by id
const addProductsToSellerById = async (req, res) => {
    const { id, products } = req.body;

    try {
        // Find the seller by id
        const seller = await Seller.findById(id);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Create new Product instances based on Product schema
        const productInstances = products.map(product => new Product({
            name: product.name,
            availability: product.availability,
            city: product.city,
            gender: product.gender,
            purity: product.purity,
            producttype: product.producttype,
            imglink: product.imglink,
            seller: id // Assigning the seller's ObjectId to each product
        }));

        // Save all products to the database
        const savedProducts = await Product.insertMany(productInstances);

        // Add saved product references to seller's products array
        seller.products.push(...savedProducts.map(product => product._id));

        // Save the updated seller object with new product references
        await seller.save();

        // Respond with the saved products
        res.status(200).json(savedProducts);
    } catch (error) {
        console.error('Error adding products to seller:', error);
        res.status(500).json({ message: 'Error adding products to seller', error });
    }
};


module.exports = {
    addProductsToSellerById
};
