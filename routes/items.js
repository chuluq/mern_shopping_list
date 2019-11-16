const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../models/Item");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST items
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name
  });

  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }

  // DELETE items
  router.delete("/:id", async (req, res) => {
    try {
      const removedItem = await Item.deleteOne({ _id: req.params.id });
      res.json(removedItem);
    } catch (err) {
      res.json({ message: err });
    }
  });
});

module.exports = router;
