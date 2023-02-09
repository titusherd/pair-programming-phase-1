const express = require('express');
const router = express.Router()
const userRouter= require ('./user')
const Controller = require('../controllers/controller')

router.get('/', Controller.home)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginFormPost)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.registerPost)
router.get('/users', Controller.showUsers)
router.get('/orders/add', Controller.formOrder)
router.post('/orders/add', Controller.home) 




module.exports = router