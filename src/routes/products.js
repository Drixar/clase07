const express = require("express");
const Contenedor = require("../components/contenedorProductos");
const productsRouter = express.Router();

const contenedorProductos = new Contenedor("productos.txt");

productsRouter.use((req, res, next)  =>{
    if (req.body.role == "admin"){
        console.log("Usuario Administrador");
        next();
    } else {
        console.log("Usuario NO ES Administrador");
        res.status(401).send("No está Autorizado")
    }
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
    console.log(req.body.producto);
    const productos = await contenedorProductos.save(req.body.producto);
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