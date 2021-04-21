const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');

// Gets all blogs
router.get('/', (req, res) => {
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

// Gets single blog
router.get('/:title', (req, res) => {
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

// Delete blog
router.delete('/:title', (req, res) => {
  if (fs.existsSync(req.params.title)) {
    fs.unlinkSync(req.params.title);
    res.status(200);
    res.end('ok');
  } else {
    res.status(404);
    res.send('This blog does not exist!');
  }
});

// Create blog
router.post('/', (req, res) => {
  if (
    typeof req.body.title === 'undefined' ||
    typeof req.body.content === 'undefined'
  ) {
    return res.status(400).json({ msg: 'Invalid request' });
  }
  const title = req.body.title;
  const content = req.body.content;
  fs.writeFileSync(title, content);
  res.status(201);
  res.end('ok');
});

// Update blog
router.put('/:title', (req, res) => {
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

router.all('*', (req, res) => {
  res.status(404);
  res.send('Blog not found');
});

module.exports = router;
