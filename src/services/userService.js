const User = require('../models/userModel');

exports.getAllUsers = async () => {
    return await User.findAll();
};

exports.createUser = async (userData) => {
    return await User.create(userData);
};
