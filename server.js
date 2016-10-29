var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db=mongojs('mongodb://localhost:27017/usecaseDB',['testcollection']); 

app.use(express.static(__dirname + "/public")); //setting the default static directory

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.get('/getusecases', function (req, res) {
    console.log("i received a get request");
    db.testcollection.find(function (err, docs) {

        console.log(docs);
        res.json(docs);
    }

    );

});

app.post('/postusecase', function (req, res) {
    console.log("post call requested");
    console.log(req.body);
    db.testcollection.insert(req.body, function (err, doc) {
        res.json(doc);
        })
    });


    app.get('/getusecasebyid', function (req, res) {
       var id = req.query.id;
        console.log(id);
        
        db.testcollection.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            res.json(doc);
        }
        );

    });

    

app.listen(3000);
console.log("server running at port 3000");