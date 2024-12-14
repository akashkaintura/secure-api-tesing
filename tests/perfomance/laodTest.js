const autocannon = require('autocannon');

const instance = autocannon({
    url: 'http://localhost:3000/api/users',
    connections: 100,
    duration: 10
}, (err, results) => {
    if (err) {
        console.error('Load test failed', err);
    }
    console.log('Load Test Results:', results);
});