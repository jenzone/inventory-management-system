// import sampleData from "../db/sample-data.json"

import { Router } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const DOMAIN_URL = process.env.DOMAIN_URL;

const ItemPageRouter = Router();

// List all Items
ItemPageRouter.get("/items", async (req, res) => {
  const { search, filter } = req.query;

  const response = await fetch(`${DOMAIN_URL}/api/items`);
  const result = await response.json();
  const items = result.items;

  const categories = items.map((item) => item.category.toLowerCase());

  const filteredData = () => {
    const formattedData = items.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }));

    if (search) {
      const searchFilterData = formattedData.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()),
      );

      return {
        data: searchFilterData,
        totalItems: searchFilterData.length,
      };
    }

    if (filter) {
      switch (filter.toLowerCase()) {
        case categories.includes(filter.toLowerCase())
          ? filter.toLowerCase()
          : "":
          const categoryFilterData = formattedData.filter((item) =>
            item.category.toLowerCase().includes(filter.toLowerCase()),
          );
          return {
            data: categoryFilterData,
            totalItems: categoryFilterData.length,
          };
        case "all-items":
          return { data: formattedData, totalItems: formattedData.length };
        case "in-stock":
          const inStockData = formattedData.filter((item) => item.quantity > 0);
          return {
            data: inStockData,
            totalItems: inStockData.length,
          };
        case "out-of-stock":
          const outOfStockData = formattedData.filter(
            (item) => item.quantity === 0,
          );
          return {
            data: outOfStockData,
            totalItems: outOfStockData.length,
          };
        default:
          return { data: formattedData, totalItems: formattedData.length };
      }
    }

    return { data: formattedData, totalItems: formattedData.length };
  };

  const { data, totalItems } = filteredData();

  res.render("items/items", {
    data,
    totalItems,
    categories,
    search,
    filter,
  });
});

// Render the new item form
ItemPageRouter.get("/items/new", async (req, res) => {
  res.render("items/new");
});

// Handle the creation of a new item
ItemPageRouter.post("/items/new", async (req, res) => {
  await fetch(`${DOMAIN_URL}/api/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  // for sample-data
  // sampleData.data.push({ name, quantity, category, price, description });

  res.redirect("/items");
});

// Render of Viewing an Item
ItemPageRouter.get("/items/:id", async (req, res) => {
  const { id } = req.params;

  const response = await fetch(`${DOMAIN_URL}/api/items/${id}`);
  const result = await response.json();
  const item = result.item;

  // for sample-data
  // const item = sampleData.data.find((item) => item.id === parseInt(id));

  res.render("items/details", { item: item });
});

// Render the edit item form
ItemPageRouter.get("/items/:id/edit", async (req, res) => {
  const { id } = req.params;

  const categories = ["Electronics", "Books", "Clothing", "Others"];

  const response = await fetch(`${DOMAIN_URL}/api/items/${id}`);
  const result = await response.json();
  const item = result.item;

  // for sample-data
  // const item = sampleData.data.find((item) => item.id === parseInt(id));

  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.render("items/edit", { item: item, categories: categories });
});

// Handle the updating of an item
ItemPageRouter.patch("/items/:id/edit", async (req, res) => {
  const { id } = req.params;

  await fetch(`${DOMAIN_URL}/api/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  // for sample-data
  // const item = sampleData.data.find((item) => item.id === parseInt(id));

  // for sample-data
  // Object.assign(item, req.body);

  res.redirect("/items");
});

// Handle the deleting of an item
ItemPageRouter.delete("/items/:id", async (req, res) => {
  const { id } = req.params;

  await fetch(`${DOMAIN_URL}/api/items/${id}`, {
    method: "DELETE",
  });

  // for sample-data
  // sampleData.data = sampleData.data.filter((item) => item.id !== parseInt(id));

  res.redirect("/items");
});

export default ItemPageRouter;
