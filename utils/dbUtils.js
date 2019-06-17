const mongoose = require('mongoose');
const fs = require('fs');
const excercise = require('../Excercise');

const mongoURI = "mongodb://jj10306:*JJ10306*@ds139037.mlab.com:39037/test-expressercise";
mongoose
    .connect(mongoURI)
    .then(() => console.log('\nmongo connected....'))
    .catch(err => console.log(err));

const readImages = (path) => fs.readdir(path, (err, dirs) => {
    dirs.forEach(dir => {

        fs.readdir(path + `/${dir}`,(err, files) => {
            files.forEach(file => {
                if (file[0] !== ".")
                    dbInsert(file.substring(0, file.length - 4), dir, file);
            })
        });
    })
});
//pass relative path of dir w/ images in function call below to populate db w/ data
// readImages("../public/images");  

const dbInsert = (name, group, image) => {
    const new_item = new Excercise({
        name: name,
        group: group,
        image: image
    });
    new_item.save().then(console.log(new_item));
};
