import express from "express";
const router = express.Router();

/**
 * Specific route
 */
let route = '/';

/* GET home page. */
router.get('/', function (_req, res) {
  res.render("index", { title: "Express" });
});

export { 
    route, router
}