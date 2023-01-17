const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
   try {
    const TagData = await Tag.findAll({
      include: [{ model: Product, ProductTag}],
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag}],
    });

    if (!TagData) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});
  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
 Tag.update({
  id: req.body.id,
  tag_name: req.body.tag_name
 },
 {
  where: {
    id: req.params.id,
  },
})
  .then((updatedTag) => {
    res.json(updatedTag);
  }).catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  }) .then((deletedBook) => {
    res.json(deletedBook);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
