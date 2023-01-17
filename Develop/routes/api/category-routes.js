const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.params.id, {
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update({
    id: req.body.id,
    category_id: req.body.category_id
   },
   {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    }).catch((err) => res.json(err));
});

router.delete('/:id',  async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(deleteCategory)
});

module.exports = router;
