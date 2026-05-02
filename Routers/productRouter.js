import express from "express"
import { createMany, createOne, deleteMany, deleteOne, getAll, getOne, updateMany, updateOne,  } from "../Controller/productController.js"
import { verifyToken } from "../Middlewares/verifyAdmin.js"

const productRouter = express.Router()

productRouter.post('/createOne',verifyToken, createOne) 
productRouter.post('/createMany', verifyToken, createMany)
productRouter.get('/getOne', getOne)
productRouter.get('/getAll', getAll)
productRouter.post('/updateOne/:id', verifyToken, updateOne)
productRouter.post('/updateMany', verifyToken, updateMany) 
productRouter.delete('/deleteOne/:id', verifyToken, deleteOne)
productRouter.delete('/deleteMany', verifyToken, deleteMany)

export default productRouter