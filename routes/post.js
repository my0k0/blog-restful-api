const { postController } = require('../controllers')
const isAuth = require('../middlewares/isAuth')
const { addPostValidator, idValidator, updatePostValidator } = require('../validators/post')
const { validate } = require('../validators/validate')

const router = require('express').Router()

router.post('/', isAuth, addPostValidator, validate, postController.addPost)

router.put('/:id', isAuth, updatePostValidator, idValidator, validate, postController.updatePost)

router.delete('/:id', isAuth, idValidator, validate, postController.deletePost)

router.get('/', isAuth, postController.getPosts)

router.get('/:id', isAuth, idValidator, validate, postController.getPost)

module.exports = router