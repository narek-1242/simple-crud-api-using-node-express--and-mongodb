const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product_model');
const PORT = 3000;


//Built-in middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/',  (req, res) => {
  try{
    const date = new Date().toLocaleDateString()
    res.send(`Hello my username is PROJECTOR-42 and this is a CRUD(Create Read Update Delete) API with Express.js. My first Backend Project made in ${date}`)
  }catch(err){
    res.status(500).json({message:err.message})
  }
})


//Get products
app.get('/api/products', async (req,res) => {
  try{
      const products = await Product.find({})
      res.status(200).json(products)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})


// Get a single product (GET API)
app.get('/api/products/:id', async (req, res) => {
  try{
    const {id} = req.params
    if(id === req.params.id){
      const product = await Product.findById(id)
      res.status(200).json(product)
    }
  }catch(err){
      res.status(404).json({message:err.message})
  }
})


//Create products (POST API)
app.post('/api/products', async (req, res) => {
      try{
        const product = await  Product.create(req.body)
        res.status(200).json(product)
      }catch(err){
        res.status(500).json({message:err.message})
      }
})


// Update products (PUT API)

app.put('/api/products/:id', async (req, res) => {
  try{
      const {id} = req.params
      const product =  await Product.findByIdAndUpdate(id, req.body)

      if(!product){
        return res.status(404).json({message: `Product Not Found`})
      }

    let updatedProduct = await Product.findById(id)
    res.status(200).json({message: `Product updated successfully ${updatedProduct}`})
  }catch(err){
    res.status(500).json({message:err.message})
  }
})


// Delete products (DELETE API)


app.delete('/api/products/:id', async (req, res) => {
try{
const {id} = req.params
const product =  await Product.findByIdAndDelete(id)

if(!product){
  return res.status(404).json('Product Not Found')
}
res.status(200).json({message: "Product deleted successfully"})

}catch(error){
  res.status(404).json({message:err.message})
}
})




app.listen(3000, ()=>{
    console.log(`Listening to http://localhost:${PORT}`)
})
mongoose.connect('mongodb+srv://admin:Nzhdeh196924@cluster0.wul9l.mongodb.net/Node_API?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected! to database')
    
}).catch((err) => {
    console.log('Connection failed', err)
})

 
// CRUD API is ready to go to my github repository but now we will make changes to make a directory routes and directory controllers for structuring a file system of our project


