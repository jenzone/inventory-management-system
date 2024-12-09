import { Router } from "express";

const HomePageRouter = Router();

HomePageRouter.get("/", (req, res) => {
  res.render("home");
});

export default HomePageRouter;
