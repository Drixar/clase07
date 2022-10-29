const express = require("express");
const Contenedor = require("../components/contenedorProductos");
const productsRouter = express.Router();

const contenedorProductos = new Contenedor("productos.txt");

productsRouter.use ((req, res, next) =>{
    req.role = "User"
    if (req.role != "Admin"){
        // res.status(401).send("No está Autorizado")
        
        // cuando el usuario no es "Admin" esta línea da error. 
        // pero no sé cpomo solucionarlo
        res.render("/usuarios"); 
    }
    next();
})

productsRouter.get("/",async(req,res)=>{
    try {
        const products = await contenedorProductos.getAll();
        res.render('home', { products: products })
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
    // res.render('home', { products })
})

productsRouter.get("/listado",async(req,res)=>{
    try {
        const products = await contenedorProductos.getAll();
        res.render('products', { products })
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
    
})

// /api/productos/5
// /api/productos/:productId
productsRouter.get("/detalle/:id", async(req,res)=>{
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

productsRouter.post("/",async(req,res)=>{
    const newProduct = req.body;
    const productos = await contenedorProductos.save(newProduct);
    res.render('products', { products: productos})
})

productsRouter.post("/:id", async(req,res)=>{
    const {id} = req.params;
    const newInfo = req.body;
    const products = await contenedorProductos.updateById(parseInt(id),newInfo);
    res.redirect("/productos");
})

productsRouter.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const newInfo = req.body;
    const productosActualizados = await contenedorProductos.updateById(parseInt(id),newInfo);
    res.json({
        message:`El producto con el id ${id} fue actualizado`,
        response: productosActualizados
    })
})

productsRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params;
    const productosActualizados = await contenedorProductos.deleteById(parseInt(id));
    res.redirect("/productos");
})

productsRouter.get("/borrar/:id", async(req,res)=>{
    const {id} = req.params;
    const productosActualizados = await contenedorProductos.deleteById(parseInt(id));
    res.redirect("/productos");
})

productsRouter.get("/add",(req, res)=>{
    res.render("addproduct");
})

productsRouter.get("/editar/:id",async(req,res)=>{
    const {id} = req.params;
    const product = await contenedorProductos.getById(parseInt(id));
    if(product){
        res.render('editProduct', {product})
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
})

productsRouter.get("/home",(req,res)=>{
    res.send("peticion home")
})



module.exports = productsRouter;