const users = []; // Mock database

exports.getAllUsers = (req, res) => {
    if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'User with this email already exists' });
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};