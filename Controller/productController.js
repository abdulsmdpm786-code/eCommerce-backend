import mongoose from "mongoose";
import { productModel } from "../Models/productModels.js";

const createOne = async (req, res) => {
  try {
    console.log("in create one section");

    const { name, description, price, stock } = req.body;

    if (!name || !description || !price || !stock) {
      return res.status(400).json({ errMsg: "Fill all the fields" });
    }

    const oneProduct = await productModel.create(req.body);
    return res
      .status(200)
      .json({ product: oneProduct, message: "item created" });
  } catch (error) {
    console.log(error);
  }
};

const createMany = async (req, res) => {
  try {
    console.log("in create many section");
    console.log("data", req.body);

    const [{ name, description, price, stock }] = req.body;
    console.log("important", name, description, price, stock);

    if (!name || !description || !price || !stock) {
      return res.status(400).json({ errMsg: "Fill all the fields" });
    }

    const products = await productModel.insertMany(req.body);
    return res
      .status(200)
      .json({ products: products, message: "items created" });
    console.log("items created");
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  try {
    console.log("in get on section");
    if (!req.query) {
      return res.status(400).json({ errMsg: "invalid query" });
    }

    const product = await productModel.findOne(req.query);

    return res.status(200).json({ product: product, message: "success" });
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req, res) => {
  try {
    console.log("in get all section");

    const allItems = await productModel.find();
    if (!allItems) {
      return res.status(404).json({ message: "no items found" });
    }
    console.log("all item list", allItems);
    return res
      .status(200)
      .json({ AllItems: allItems, message: "got all items" });
  } catch (error) {
    console.log(error);
  }
};

const updateOne = async (req, res) => {
  try {
    console.log("in updated one section");

    const updatedItem = await productModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (!updatedItem) {
      return res.status(404).json({ errMsg: "item not available" });
    }

    return res.status(200).json({ item: updatedItem, message: "item updated" });
  } catch (error) {
    console.log(error);
  }
};

const updateMany = async (req, res)=>{
    try {
        console.log("in update many section");

        const { data, update} = req.body

        if (!data || !update){
            return res.status(400).json({errMsg: "fill both data and update field"})
        }

        const updatedItems = await productModel.updateMany(
            data,
            {$set: update}
        )

        return res.status(200).json({
            items: updatedItems,
            message: "items updated"
        })
        
    } catch (error) {
        console.log(error);
    }
}

const deleteOne = async (req,res)=> {
    try {
        console.log("in delete many section");

        const deleteOne = await productModel.findByIdAndDelete(req.params.id,)
        if(!deleteOne){
            return res.status(404).json({errMsg: "item not found"})
        }

        return res.status(200).json({item: deleteOne, message: "item deleted"})
        
    } catch (error) {
        console.log(error);
        
    }
}

const deleteMany = async(req, res)=> {
    try {
        console.log("delete many section");

        const deleteMany = await productModel.deleteMany(req.body)
        if(!deleteMany){
            return res.status(404).json({errMsg: "item not found"})
        }

                return res.status(200).json({item: deleteMany, message: "item deleted"})
    } catch (error) {
        console.log(error);
        
    }
}

export { createOne, createMany, getOne, getAll, updateOne, updateMany, deleteOne, deleteMany };

