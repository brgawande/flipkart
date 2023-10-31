import express from "express";
import {
  createproducts,
  deleteproduct,
  getAllProducts,
  updateproducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/createproducts").post(createproducts);
router.route("/updatesproducts/:id").put(updateproducts);
router.route("/deleteproduct/:id").delete(deleteproduct);
router.route("/getallproducts").get(getAllProducts);

export default router;
