const express = require('express');
const path = require('path');
const moment = require('moment');
const hbs = require('express-handlebars');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({
    defaultLayout: "main",
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));



// const logger = (req, res, next) => {
//     console.log(
//         `${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`
//     );
//     next();
// };
// app.use(logger);


app.get('/', (req, res) => {
    res.render("index", {
        style: "index.css"
    });
});
app.get('/:type', (req, res) => {
    if (req.params.type !== "strength" && req.params.type !== "prevention") {
        res.send("error");
    } else {
        res.render("selection", {
            style: "selection.css",
            script: "selection.js"
        });
    }
});


//set static folder: serves static html
// app.use(express.static(path.join(__dirname, 'public/pages')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
