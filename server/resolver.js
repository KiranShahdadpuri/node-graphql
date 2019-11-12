var Product = require('./Model/product.model');
const PRODUCTS = [{
    name: 'Movie',
    id   :0
  }]
const getProduct = (args) => { 
    var id = args.id;
    return PRODUCTS.filter(product => {
        return product.id == id;
    })[0];
}
const getProducts = async() => {
    // return Promise.resolve(PRODUCTS);
    console.log("model:",Product)
    const productData = await Product.find().exec()
    console.log("Product:", productData)
    if (!productData) {
    throw new Error('Error')
    }
    return productData
}  

const createdProduct = (input) =>{
    // var id = (PRODUCTS.length - 1) + 1
    // console.log("input is:",product)
    // var product = {...product, id:id}
    // PRODUCTS.push(product)
    // return product;
    var productBody = {...input}
    let product = new Product(
        productBody
    );

    const res = product.save()
    if(!res){
        throw new Error('error')
    }
    return res
}
const updatedProduct = (id, product) =>{
    // console.log("product:", id, product,  PRODUCTS[id])
    // PRODUCTS[id].name = product.name
    // return product;
    var res = Product.findByIdAndUpdate(id, {
        name: product.name
    }, {new: true})
    return res
}
const deleteProduct = (id) =>{
    var res = Product.findByIdAndRemove(id).then(()=>{
        return "Deleted"
    }).catch(
        (error)=>{
            console.log(error)
        }     
    )
    
}
var root = {
    hello: () => {
        return "Hello world!";
    },
    products: () => {
        return getProducts();
    },
    product:(args)=>{
        return getProduct(args);
    },
    createProduct:({input})=>{
        return createdProduct(input)
    },
    updateProduct:({id,input})=>{
        return updatedProduct(id,input)
    },
    deleteProduct:({id})=>{
        return deleteProduct(id)
    }
};

module.exports =  root;