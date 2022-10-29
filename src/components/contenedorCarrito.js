const fs = require("fs");

class CartContainer{
    constructor(nameFile){
        this.nameFile = nameFile;
    }

    save = async(product)=>{
        try {
            //leer el archivo existe
            if(fs.existsSync(this.nameFile)){
                const carritos = await this.getAll();
                const lastIdAdded = carritos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newcarrito={
                    id: lastIdAdded+1,
                    carritoTimestamP: Date.now(),
                    producto: {
                        productoTimestamP: Date.now(),
                        ...product
                    }
                }
                carritos.push(newcarrito);
                await fs.promises.writeFile(this.nameFile, JSON.stringify(carritos, null, 2))
                return carritos;
            } else{
                // si el archivo no existe
                const carritos = await this.getAll();
                const newcarrito={
                    id: 1,
                    carritoTimestamP: Date.now(),
                    producto: {
                        productoTimestamP: Date.now(),
                        ...product
                    }
                }
                //creamos el archivo
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newcarrito], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const carritos = await this.getAll();
                const carrito = carritos.find(item=>item.id===id);
                return carrito
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async()=>{
        try {
            const contenido = await fs.promises.readFile(this.nameFile,"utf8");
            const carritos = JSON.parse(contenido);
            return carritos
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            const carritos = await this.getAll();
            const newCarritos = carritos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newCarritos, null, 2));
            return await this.getAll(); 
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }

    updateById = async(id, body)=>{
        try {
            const carritos = await this.getAll();
            const carrtotPos = carritos.findIndex(elm=>elm.id === id);
            productos[carrtotPos] = {
                id:id,
                ...body
            };
            await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
            return await this.getAll();
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartContainer;