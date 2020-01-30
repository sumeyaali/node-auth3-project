const router = require('express').Router();

const User = require('./userModel');

const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, onlyDepartment('sales'), (req,res) => {
    User.find()
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.send(error)
    })
});


function onlyDepartment(department) {
    return function(req,res,next) {
        console.log(req.user.department)
        if(req.user && req.user.department && req.user.department.toLowerCase() === department) {
            next();
        } else {
            
            res.status(403).json({Error: 'Wrong Department'})
        }
    }
}



module.exports = router;