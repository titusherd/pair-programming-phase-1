const { User, Order, Laundry, UserProfile } = require('../models')
const bcryptjs = require('bcryptjs')
class Controller {
    static home(req, res) {
        res.render('home')
    }
    static loginForm(res, req) {
        // const { errMsg } = req.query
        res.render('login')
    }

    static loginFormPost(req, res) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    if (bcryptjs.compareSync(password, user.password)) {
                        req.session.email = user.email
                        req.session.role = user.role
                        return res.redirect(`/user/${user.id}`)
                    } else {
                        const errMsg = 'email or password is invalid!'
                        return res.redirect(`/login?errMsg=${errMsg}`)
                    }
                } else {
                    const errMsg = 'email or password is invalid!'
                    return res.redirect(`/login?errMsg=${errMsg}`)
                }
            })
            .catch(err => res.send(err))
    }

    static registerForm(req, res) {
        res.render('register')
    }

    static registerPost(req, res) {
        const { email, password, role } = req.body
        User.create({ email, password, role })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => res.send('error bro '))
    }

    static showUsers(req, res) {
        const { role } = req.body
        User.findAll({
            include: {
                UserProfile
            }
        })
            .then(user => {
                // res.render('user',{user, role})
                res.send(user)
            })
            .catch(err => err)
    }

    static showCustomers(req, res) {

    }

    static formOrder(req, res) {

    }
    static createOrder(req, res) {

    }
}

module.exports = Controller