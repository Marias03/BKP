const next = require('next');
const https = require('https');
const fs = require('fs');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync('./ssl/local.key'),
  cert: fs.readFileSync('./ssl/local.crt')
};

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    handle(req, res);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Server started on https://localhost:${port}`);
  });
});
