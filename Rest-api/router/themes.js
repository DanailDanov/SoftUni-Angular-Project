const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController } = require('../controllers');

// middleware that is specific to this router

//router.get('/', themeController.getThemes);
router.get('/', themeController.getLatestsThemes);
router.post('/', auth(), themeController.createTheme);

//my route
router.get('/category/:category', themeController.getThemesCategory);
//
router.get('/:themeId', themeController.getTheme);
router.post('/:themeId', auth(), postController.createPost);
router.put('/:themeId', auth(), themeController.subscribe);
router.put('/:themeId/posts/:postId', auth(), postController.editPost);
router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);

//my route 
router.put('/edit/:productId', postController.editProduct);
router.delete('/:productId', postController.deleteProduct);
//

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router