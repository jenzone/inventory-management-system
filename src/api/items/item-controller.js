import Item from "./item-model.js";

// List all Items
async function getAllItems(req, res, next) {
  try {
    const items = await Item.find();

    return res.status(200).json({ items: items });
  } catch (err) {
    next(err);
  }
}

async function getItemById(req, res, next) {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    return res.status(200).json({ item: item });
  } catch (err) {
    next(err);
  }
}

// Create New Item
async function createNewItem(req, res, next) {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    return res
      .status(200)
      .json({ message: "Item created successfully.", item: newItem });
  } catch (err) {
    next(err);
  }
}

// Update an Item
async function updateItem(req, res, next) {
  const { id } = req.params;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body);

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res
      .status(200)
      .json({ message: "Item updated successfully.", item: updatedItem });
  } catch (err) {
    next(err);
  }
}

// Delete an Item
async function deleteItem(req, res, next) {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    s;
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res
      .status(200)
      .json({ message: "Item deleted successfully.", item: deletedItem });
  } catch (err) {
    next(err);
  }
}

export default {
  getAllItems,
  getItemById,
  createNewItem,
  updateItem,
  deleteItem,
};
