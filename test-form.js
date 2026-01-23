// test-form.js
const http = require('http');

const data = JSON.stringify({
  name: "Test User",
  email: "test@example.com",
  message: "Simple test message"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/form/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();
