import { Router } from "express";

import ItemController from "./item-controller.js";
import ItemSchema from "./item-validator.js";

import validate from "../../utils/validate.js";

const ItemRouter = Router();

ItemRouter.route("/items")
  .get(ItemController.getAllItems)
  .post(validate(ItemSchema), ItemController.createNewItem);

ItemRouter.route("/items/:id")
  .get(ItemController.getItemById)
  .patch(validate(ItemSchema), ItemController.updateItem)
  .delete(ItemController.deleteItem);

export default ItemRouter;
