import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

import StartDB from "./db/setup.js";
import ErrorHandler from "./middlewares/error-middleware.js";

// app routes imports
import ItemPageRoutes from "./apps/item-page.js";
import HomePageRoutes from "./apps/home-page.js";

// api routes imports
import ItemApiRoutes from "./api/items/item-route.js";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "apps/templates"));
app.use(express.static(path.join(__dirname, "../public")));

// App Routes
app.use("/", ItemPageRoutes, HomePageRoutes);

// App Pages
app.use("/api", ItemApiRoutes);

// Initialize mongodb connection
StartDB();

// Catch-all route for 404 errors
app.get("/*", (req, res) => {
  res.status(404).render("404");
});

// Error handler
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: localhost:${port}`);
});
