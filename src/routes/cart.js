const express = require("express");
const CartContainer = require("../components/contenedorCarrito");
const cartRouter = express.Router();

const contenedorCarrito = new  CartContainer("carrito.txt")

cartRouter.get("/",async(req,res)=>{
    try {
        const carritos = await contenedorCarrito.getAll();
        // falta implementar
        // res.render('cart', { carritos: carritos })
        console.log(carritos)
        res.status(200).send("Todo OK")
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

cartRouter.get("/detalle/:id", async(req,res)=>{
    const {id} = req.params;
    const carrito = await contenedorCarrito.getById(parseInt(id));
    if(carrito){
        // falta implementar
        // res.render('singlecartt', {carrito})
        console.log(carrito)
        res.status(200).send("Todo OK")
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
})

cartRouter.post("/",async(req,res)=>{
    const carrito = req.body;
    const carritos = await contenedorCarrito.save(carrito);
    // falta implementar
    // res.render('cart', { carritos: carritos })
    console.log(carritos)
    res.status(200).send("Todo OK")
})

cartRouter.post("/:id", async(req,res)=>{
    const {id} = req.params;
    const carrito = req.body;
    const carritos = await contenedorCarrito.updateById(parseInt(id),carrito);
    // falta implementar
    // res.render('cart', { carritos: carritos })
    console.log(carritos)
    res.status(200).send("Todo OK")
})

cartRouter.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const carrito = req.body;
    const carritos = await contenedorCarrito.updateById(parseInt(id),carrito);
    res.json({
        message:`El carrito con el id ${id} fue actualizado`,
        response: carritos
    })
})

cartRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params;
    const carritos = await contenedorCarrito.deleteById(parseInt(id));
    // falta implementar
    // res.render('cart', { carritos: carritos })
    console.log(carritos)
    res.status(200).send("Todo OK")
})

module.exports = cartRouter;