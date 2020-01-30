const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secret');

const User = require('../User/userModel');

router.post('/register', (req,res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    User.add(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    });
});

router.post('/login', (req,res) => {
    const {username,password} = req.body;

    User.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = signToken(user)
            res.status(200).json({token})
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


function signToken(user) {

const payload = {
    userId: user.id,
    username: user.username,
    department: user.department
};

const options = {
    expiresIn: '7d'
}

return jwt.sign(payload, jwtSecret, options)

}


module.exports = router;
