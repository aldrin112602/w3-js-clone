const querystring = require('querystring');
const https = require('https');
const fs = require('fs');

fs.readFile('src/w3.js', 'utf8', function (err, data) {
    if (err) throw err;
    const query = querystring.stringify({
        input: data,
    });

    const req = https.request(
        {
            method: 'POST',
            hostname: 'www.toptal.com',
            path: '/developers/javascript-minifier/api/raw',
        },
        function (resp) {
            if (resp.statusCode !== 200) {
                console.log('StatusCode=' + resp.statusCode);
                return;
            }

            let responseData = '';
            resp.on('data', function(chunk) {
                responseData += chunk;
            });

            resp.on('end', function() {
                fs.writeFile('src/w3.min.js', responseData, function(err) {
                    if (err) throw err;
                    console.log('File w3.min.js has been saved successfully.');
                });
            });
        }
    );

    req.on('error', function (err) {
        throw err;
    });

    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.setHeader('Content-Length', query.length);
    req.end(query, 'utf8');
});
