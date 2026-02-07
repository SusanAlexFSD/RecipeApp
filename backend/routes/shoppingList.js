const express = require('express');
const router = express.Router();
const ShoppingList = require('../models/ShoppingList');

// ------------------------------------------------------------
// GET shopping list for a user
// ------------------------------------------------------------
router.get('/:userId', async (req, res) => {
  console.log('📥 GET /api/shoppingList/:userId', req.params.userId);

  try {
    const list = await ShoppingList.findOne({ userId: req.params.userId });

    // Always return a list, even if none exists
    return res.json({ list: list ? list.items : [] });
  } catch (err) {
    console.error('❌ Failed to fetch shopping list:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ------------------------------------------------------------
// POST: Add recipe + ingredients to shopping list
// ------------------------------------------------------------
router.post('/', async (req, res) => {
  const { userId, recipeName, ingredients } = req.body;

  if (!userId || !recipeName || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'userId, recipeName and ingredients are required' });
  }

  try {
    let list = await ShoppingList.findOne({ userId });

    // Create list if it doesn't exist
    if (!list) {
      list = new ShoppingList({ userId, items: [] });
    }

    const existingRecipe = list.items.find(item => item.recipeName === recipeName);

    if (existingRecipe) {
      // Merge ingredients without duplicates
      existingRecipe.ingredients = [...new Set([...existingRecipe.ingredients, ...ingredients])];
    } else {
      list.items.push({ recipeName, ingredients });
    }

    await list.save();
    res.json({ list: list.items });
  } catch (err) {
    console.error('❌ Failed to update shopping list:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ------------------------------------------------------------
// DELETE a single ingredient from a recipe
// ------------------------------------------------------------
router.delete('/:userId/:recipeName/ingredient/:ingredient', async (req, res) => {
  try {
    const { userId } = req.params;
    const recipeName = decodeURIComponent(req.params.recipeName);
    const ingredient = decodeURIComponent(req.params.ingredient);

    const list = await ShoppingList.findOne({ userId });

    // If no list exists, return empty list
    if (!list) return res.json({ list: [] });

    const recipe = list.items.find(r => r.recipeName === recipeName);

    // If recipe doesn't exist, return current list
    if (!recipe) return res.json({ list: list.items });

    recipe.ingredients = recipe.ingredients.filter(ing => ing !== ingredient);
    await list.save();

    res.json({ list: list.items });
  } catch (err) {
    console.error('❌ Failed to remove ingredient:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ------------------------------------------------------------
// DELETE an entire recipe from the list
// ------------------------------------------------------------
router.delete('/:userId/:recipeName', async (req, res) => {
  try {
    const { userId } = req.params;
    const recipeName = decodeURIComponent(req.params.recipeName);

    const list = await ShoppingList.findOne({ userId });

    // If no list exists, return empty list
    if (!list) return res.json({ list: [] });

    list.items = list.items.filter(item => item.recipeName !== recipeName);
    await list.save();

    res.json({ list: list.items });
  } catch (err) {
    console.error('❌ Failed to remove recipe:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ------------------------------------------------------------
// DELETE all recipes for a user
// ------------------------------------------------------------
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const list = await ShoppingList.findOne({ userId });

    // If no list exists, return empty list
    if (!list) return res.json({ list: [] });

    list.items = [];
    await list.save();

    res.json({ list: [] });
  } catch (err) {
    console.error('❌ Failed to clear shopping list:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
