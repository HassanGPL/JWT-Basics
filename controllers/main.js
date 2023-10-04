const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {
    const { username, password } = req.body;

    // Check for Validate Username and Password
    if (!username || !password) {
        if (!username && !password) {
            throw new BadRequestError('Please Validate Your Username and Password');
        } else if (!username) {
            throw new BadRequestError('Please Validate Your Username');
        } else if (!password)
            throw new BadRequestError('Please Validate Your Password');
    }

    // Create an ID
    const id = new Date().getDate();

    // Create Token using JWT
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ msg: 'User Created', id, username, token });
}

exports.getDashboard = (req, res, next) => {

    // Create Lucky Number
    const luckyNumber = Math.floor(Math.random() * 100);

    // Response to Dashboard Page
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
}