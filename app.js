const express = require("express");
const productRouter = require("./src/routes/products");
const userRouter = require("./src/routes/user");
const cartRouter = require("./src/routes/cart");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const folderViews = path.join(__dirname, "/src/views/");

app.listen(8080,()=>console.log("Servidor funcionando en el puerto  8080"));
app.use(express.static(path.join(__dirname, 'public/')))
app.engine("handlebars",handlebars.engine());
app.set('views', folderViews)
app.set("view engine", "handlebars");



app.use("/productos", productRouter);
app.use("/usuarios", userRouter);
app.use("/cart", cartRouter);
