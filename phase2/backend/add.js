const http = require('http');
const mysql = require('mysql');
const getData = require('./first');

// Create a MySQL connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "prudects"
});



// Create an HTTP server
const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin (replace '*' with specific origins if needed)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if (req.method === 'POST') {
    let body = '';

    // Read the form data from the request
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // Parse the form data
      const formData = new URLSearchParams(body);
      const sanitizedValue = pool.escape(formData);
      console.log(sanitizedValue[0]);
      // Extract values from form data
      if (formData.get('formName') === 'formContact') {

        const fname = formData.get('firstName');
        const lname = formData.get('lastName');
        const gender = formData.get('gender');
        const mobile = formData.get('mobile');
        const dob = formData.get('dob');
        const email = formData.get('email');
        const language = formData.get('language');
        const message = formData.get('message');

        // Check if first name is valid
        if (!/^[A-Za-z\s]+$/.test(fname) || fname.length > 50) {
          console.error('Invalid First Name');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid First Name');
          return;
        } else {
          console.log('Valid First Name:', fname);
        }

        // Check if last name is valid
        if (!/^[A-Za-z\s]+$/.test(lname) || lname.length > 50) {
          console.error('Invalid Last Name');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid Last Name');
          return;
        } else {
          console.log('Valid Last Name:', lname);
        }

        // Check if gender is selected
        if (!gender) {
          console.error('Please select a Gender');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Please select a Gender');
          return;
        } else {
          console.log('Selected Gender:', gender);
        }

        // Check if mobile number is valid
        if (!/^[0-9]{9}$/.test(mobile) || mobile.length !== 9) {
          console.error('Invalid Mobile Number');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid Mobile Number');
          return;
        } else {
          console.log('Valid Mobile Number:', mobile);
        }

        // Check if date of birth is valid
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
          console.error('Invalid Date of Birth');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid Date of Birth');
          return;
        } else {
          console.log('Valid Date of Birth:', dob);
        }

        // Check if email address is valid
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150) {
          console.error('Invalid Email Address');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid Email Address');
          return;
        } else {
          console.log('Valid Email Address:', email);
        }

        // Check if language is selected
        if (!language) {
          console.error('Please select a Language');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Please select a Language');
          return;
        } else {
          console.log('Selected Language:', language);
        }

        // Check if message length is valid
        if (message.length > 300) {
          console.error('Message exceeds maximum length');
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Message exceeds maximum length');
          return;
        } else {
          console.log('Valid Message Length:', message.length);
        }

        // Insert data into MySQL

        const query = `INSERT INTO ${`contact_us`} (${`ID`},${`fname`}, ${`Lname`}, ${`gender`}, ${`mobile`}, ${`birthDate`}, ${`email`}, ${`language`}, ${`message`}) 
         VALUES (NULL,'${fname}', '${lname}', '${gender}', '${mobile}', '${dob}', '${email}', '${language}', '${message}')`;

        pool.query(query, (error, results, fields) => {
          if (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Data inserted successfully');
          }
        });

      } else {

        const name = formData.get('name');
        const type = formData.get('type');
        const Price = formData.get('Price');
        const image = formData.get('image');

        const query = `INSERT INTO ${`products_alt`} (${`ID`},${`Name`},${`type`}, ${`image`}, ${`price`}) 
         VALUES (NULL,'${name}','${type}', '${image}', '${Price}')`;

        pool.query(query, (error, results, fields) => {
          if (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Data inserted successfully');
          }
        });

      }

    });
  } else if (req.method === 'GET') {
    let data = getData.getData(pool, res, req);
    setTimeout(() => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }, 1000);
  }
});

// Start the server
const PORT = 7000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});