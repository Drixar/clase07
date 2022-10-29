const express = require("express");
const Contenedor = require("../components/contenedorProductos");
const userRouter = express.Router();

const contenedorProductos = new Contenedor("productos.txt");


userRouter.get("/",async(req,res)=>{
    try {
        const products = await contenedorProductos.getAll();
        console.log(products)
        // res.render('home', { products: products })
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
    // res.render('home', { products })
})

userRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await contenedorProductos.getById(parseInt(id));
        res.render('singleProduct', {product})
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
    
})

// /api/productos/5
// /api/productos/:productId
userRouter.get("/detalle/:id", async(req,res)=>{
    const {id} = req.params;
    const product = await contenedorProductos.getById(parseInt(id));
    if(product){
        res.render('singleProduct', {product})
        // res.json({
            // message:"producto encontrado",
            // product: product
        // })
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
})

module.exports = userRouter;