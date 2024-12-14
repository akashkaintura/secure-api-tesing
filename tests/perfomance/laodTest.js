const autocannon = require('autocannon');

function runLoadTest() {
    const instance = autocannon({
        url: 'http://localhost:3000/api/users/login',
        connections: 100,
        duration: 10,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123'
        })
    }, (err, results) => {
        if (err) {
            console.error('Load test failed', err);
        }
        console.log('Load Test Results:', results);
    });
}

module.exports = runLoadTest;