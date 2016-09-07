var Beer = require('./../models/beer');



module.exports.controller = function(router) {

    router.get('/beer', function(req, res) {
            // Use the Beer model to find all beer
            Beer.find({ userId: req.user._id }, function(err, beers) {
                if (err) {
                    res.send(err);
                }
                res.json(beers);
            });
        }),
        router.get('/beer/:beer_id', function(req, res) {
          Beer.find({userId: req.user._id, _id: req.params.beer_id}, function(err, beer) {
            if (err){
              res.send(err);
            }
            res.json(beer);
          });
        }),
        router.post('/beer/:beer_id', function(req, res) {
          Beer.find({userId: req.user._id, _id: req.params.beer_id}, function(err, beer) {
             if (err)
               res.send(err);

             // Update the existing beer quantity
             beer.quantity = req.body.quantity;

             // Save the beer and check for errors
             beer.save(function(err) {
               if (err)
                 res.send(err);

               res.json(beer);
             });
           });
        }),
        router.put('/beer/:beer_id', function(req, res) {
          Beer.update({ userId: req.user._id, _id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
            if (err)
              res.send(err);

            res.json({ message: num + ' updated' });
          });

        }),
        router.delete('/beer/:beer_id', function(req, res) {
          // Use the Beer model to find a specific beer and remove it
          Beer.remove({ userId: req.user._id, _id: req.params.beer_id }, function(err) {
            if (err)
              res.send(err);

            res.json({ message: 'Beer removed from your locker!' });
          });
        }),
        // Create endpoint /api/beers for POSTS
        router.post('/beer/add', function(req, res) {
            // Create a new instance of the Beer model
            var beer = new Beer();
            // Set the beer properties that came from the POST data
            beer.name = req.body.name;
            beer.type = req.body.type;
            beer.quantity = req.body.quantity;
            beer.userId = req.user._id;

            // Save the beer and check for errors
            beer.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Beer added to your locker!', data: beer });
            });
        })
}
