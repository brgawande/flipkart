import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Product } from "../model/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";

export const createproducts = catchAsyncError(async (req, res, next) => {
  const { name, price, description, category, createdAt } = req.body;

  if (!name || !price || !description || !category)
    return next(new ErrorHandler("Please Enter all The Fields", 404));

  const file = req.file;

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Product.create({
    name,
    price,
    description,
    category,
    createdAt,
    image: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
  });
});

export const updateproducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  const { name, price, description, category } = req.body;

  if (name) {
    product.name = name;
  }
  if (price) {
    product.price = price;
  }
  if (description) {
    product.description = description;
  }
  if (category) {
    product.category = category;
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const deleteproduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  await cloudinary.v2.uploader.destroy(product.image.public_id);

  await Product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
