const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.json());

// YOUR CODE GOES IN HERE
app.post('/blogs', (req, res) => {
  if (
    typeof req.body.title === 'undefined' ||
    typeof req.body.content === 'undefined'
  ) {
    res.status(400);
    res.send('Invalid request');
    return;
  }
  const title = req.body.title;
  const content = req.body.content;
  fs.writeFileSync(title, content);
  res.status(201);
  res.end('ok');
});

app.put('/posts/:title', (req, res) => {
  if (
    typeof req.body.title === 'undefined' ||
    typeof req.body.content === 'undefined'
  ) {
    res.status(400);
    res.send('Invalid request');
    return;
  }
  const title = req.params.title;
  const content = req.body.content;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.status(200);
    res.end('ok');
  } else {
    res.status(404);
    res.send('This blog does not exist!');
  }
});

app.delete('/blogs/:title', (req, res) => {
  if (fs.existsSync(req.params.title)) {
    fs.unlinkSync(req.params.title);
    res.status(200);
    res.end('ok');
  } else {
    res.status(404);
    res.send('This blog does not exist!');
  }
});

app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.status(200);
    res.send(post);
  } else {
    res.status(404);
    res.send('This blog does not exist!');
  }
});

app.get('/blogs', (req, res) => {
  const allFiles = [];
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      res.send('Something went wrong');
    }
    files.forEach((file) => {
      if (!path.extname(file) && fs.statSync(file).isFile()) {
        const blog = {
          title: file,
        };
        allFiles.push(blog);
      }
    });
    if (allFiles.length === 0) {
      res.send("Sorry, There isn't any blog");
      return;
    }
    res.send(allFiles);
  });
});

app.all('*', (req, res) => {
  res.status(404);
  res.send('Blog not found');
});

app.listen(3000);
