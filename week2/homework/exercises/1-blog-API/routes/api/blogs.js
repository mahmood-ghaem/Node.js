const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');

const blogsFolder = path.join(__dirname, '..', '..', './blogs');

// Gets all blogs
router.get('/', (req, res) => {
  const allFiles = [];
  fs.readdir(blogsFolder, (err, files) => {
    if (err) {
      res.send('Something went wrong');
    }
    let counter = 0;
    files.forEach((file) => {
      const blog = {
        id: counter++,
        title: file,
      };
      allFiles.push(blog);
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
  if (fs.existsSync(path.join(blogsFolder, title))) {
    try {
      const data = fs.readFileSync(path.join(blogsFolder, title), 'utf8');
      console.log('data: ', data);
      res.status(200);
      res.json(data);
    } catch (err) {
      res.send('Can not read blog file!');
    }
  } else {
    res.status(404);
    res.send('This blog does not exist!');
  }
});

// Delete blog
router.delete('/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(path.join(blogsFolder, title))) {
    fs.unlinkSync(path.join(blogsFolder, title));
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
  fs.writeFileSync(path.join(blogsFolder, title), content);
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
  if (fs.existsSync(path.join(blogsFolder, title))) {
    fs.writeFileSync(path.join(blogsFolder, title), content);
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
