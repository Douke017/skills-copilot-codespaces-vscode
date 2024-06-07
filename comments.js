// Create web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install nodemon
// 4. npm install mongoose

const express = require('express');
const bodyParser = require('body-parser');
const Comment = require('./comment');

const app = express();
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ comments });
  });
});

app.post('/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, newComment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ comment: newComment });
  });
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ comment });
  });
});

app.put('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.text = req.body.text;
    comment.save((err, updatedComment) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ comment: updatedComment });
    });
  });
});

app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ comment });
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});