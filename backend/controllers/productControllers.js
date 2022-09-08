import Product from '../models/productModel.js'

const getProducts = async(req, res ) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.json({message: 'error'})
    }
}


const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product) {
        res.json(product)
        } else {
            res.status(404)
            throw new Error ('Product not found')
        }
    } catch (error) {
        res.json({message:'error'})
    }
}

export {getProducts, getProductById}