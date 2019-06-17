const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');
const moment = require('moment');
const mongoose = require('mongoose');
const dbQueries = require('./utils/dbQueries')
const { Random } = require('random-js');


const app = express();
const random = new Random();

const NUM_EXCERCISES = 4;

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({
    defaultLayout: "main",
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

//mongo configuration
const mongoURI = "mongodb://jj10306:*JJ10306*@ds139037.mlab.com:39037/test-expressercise";
mongoose
    .connect(mongoURI)
    .then(() => console.log('\nmongo connected....'))
    .catch(err => console.log(err));



const logger = (req, res, next) => {
    console.log(
        `${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`
    );
    next();
};
app.use(logger);


app.get('/', (req, res) => {
    res.render("index", {
        style: "index.css",
        script: "index.js"
    });
});

 app.post('/workout', (req, res) => {
    let selections = Object.keys(req.body);

    //constructing an array for the logical 'or' query below see https://docs.mongodb.com/manual/reference/operator/query/or/
    let queryArr = selections.map(selection => ({group: selection}));

    
    let group1Arr;
    let group2Arr;
    let finalGroup1 = [];
    let finalGroup2 = [];
    //how to refactor this method into own file
    Excercise.find({$or : [{group: selections}]})
        .then((results) => {
            group1Arr = results.filter(excercise => excercise.group === selections[0]);
            //contigent on always selecting 2 groups
            group2Arr = results.filter(excercise => excercise.group === selections[1]);

            let randomInt;

            while (finalGroup1.length < NUM_EXCERCISES) {
                randomInt = random.integer(0, group1Arr.length - 1);
                if (group1Arr[randomInt]) {
                    finalGroup1.push(group1Arr[randomInt])
                }
            }
            while (finalGroup2.length < NUM_EXCERCISES) {
                randomInt = random.integer(0, group2Arr.length - 1);
                if (group2Arr[randomInt]) {
                    finalGroup2.push(group2Arr[randomInt])
                }
            }
            
        }).then(() => {
            console.log('in da cut');
            res.render("workout", {
                style: "workout.css",
                script: "workout.js",
                selections: {
                    group1: {
                        name: selections[0],
                        excercises: finalGroup1
                    },
                    group2: {
                        name: selections[1],
                        excercises: finalGroup2
                    }
                }
            });
        })

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));


