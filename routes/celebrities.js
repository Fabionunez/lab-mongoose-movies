var express = require('express');
var router = express.Router();
const Celebrity = require('../models/Celebrity');


/* GET '/' */
router.get('/', (req, res, next) => {
  Celebrity.find({})
  .then( (allCelebrities) => res.render('celebrities', {allCelebrities}))
  .catch ( (err) => console.log(err));
});


/* GET '/celelebrities/add' */
router.get('/add', function(req, res, next) {
  res.render('celebrity-add');
});


/* POST '/celelebrities/add' */
router.post('/add', function(req, res, next) {
  //create a new book in the database. Post doesn't have a body
  console.log('req.body', req.body);
  const {name, occupation, catchPrase} = req.body;

  const newCelebrity = new Celebrity({name, occupation, catchPrase});
  newCelebrity.save()//insert hte book in the database
    .then ( (celebrity) => res.redirect('/celebrities'))
    .catch ( (err) => console.log(err));

});


/* GET '/celelebrities/:id/delete' */
router.get('/:id/delete', function(req, res, next) {
  const {id} = req.params;
  console.log({id});
  Celebrity.findOneAndRemove(id)
    .then((celebrity) => res.redirect('/celebrities'))
    .catch((err) => console.log(err));
});




// GET '/celebrities/edit'
router.get('/:id/edit', (req,res, next) => {
  const {id} = req.params;

  Celebrity.findById(id)
    .then ( (celebrity) => res.render('celebrity-edit', { celebrity })) //pass a book object
    .catch ( (err) => console.log(err))
});


// POST '/celebrities/edit'
router.post('/:id/edit', (req,res, next) => {
  const {id} = req.params;

  const {name, occupation, catchPrase} = req.body;


  Celebrity.findOneAndUpdate(id, {$set: {name, occupation, catchPrase}}, {new: true}) //te devuelve el nuevo objeto modificado
    .then ((celebrity) => res.redirect('/celebrities'))
    .catch((err) => console.log(err))
});






/* GET '/:id' */
router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  Celebrity.findById( id )
    .then((celebrity) => res.render('celebrity-details', {celebrity}))
    .catch( (err) => console.log(err));
});







module.exports = router;