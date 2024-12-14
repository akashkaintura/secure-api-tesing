exports.handleError = (err, res) => {
    console.error(err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
};
