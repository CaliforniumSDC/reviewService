require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
let db = require('./index.js');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/reviews/:id', (req, res) => {
  let prodId = parseInt(req.params.id);
  db.findReviews(prodId)
    .then((data) => { return db.buildReviewObject(data); })
    .then((data) => { res.send(data).status(200) })
    .catch(() => { res.sendStatus(500); console.log(err) });
})

app.get('/meta/:id', (req, res) => {
  let prodId = parseInt(req.params.id);
  db.findReviews(prodId)
    .then((data) => { return db.buildMetaObject(data); })
    .then((data) => { res.send(data).status(200) })
    .catch(() => { res.sendStatus(500); console.log(err) });
})

app.post('/postReview', (req, res) => {
  db.handlePost(req.body)
    .then(() => {res.send('goodgood').status(200)})
    .catch((err) => {res.send('badbad').status(); console.log(err)})
})

app.put('/helpful/:reviewId', (req, res) => {
  let reviewId = req.params.reviewId;
  db.handleHelpful(reviewId)
  .then(() => {res.send('goodgood').status(200)})
  .catch((err) => {res.send('badbad').status(); console.log(err)})
})

app.put('/report/:reviewId', (req, res) => {
  let reviewId = req.params.reviewId;
  db.handleReport(reviewId)
  .then(() => {res.send('goodgood').status(200)})
  .catch((err) => {res.send('badbad').status(); console.log(err)})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

