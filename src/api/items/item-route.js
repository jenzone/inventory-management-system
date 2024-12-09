import { Router } from "express";

import ItemController from "./item-controller.js";

const ItemRouter = Router();

ItemRouter.route("/items")
  .get(ItemController.getAllItems)
  .post(ItemController.createNewItem);

ItemRouter.route("/items/:id")
  .get(ItemController.getItemById)
  .patch(ItemController.updateItem)
  .delete(ItemController.deleteItem);

export default ItemRouter;
