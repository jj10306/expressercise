const excercise = require('../models/Excercise');

function getExcercisesByGroup(groups) {

    let queryResults = [];
    groups.forEach(group => {

        Excercise.find({group: group})
            .then((results) => {
                queryResults.push(results);
            })
        });
        console.log(queryResults);
}

module.exports = {
    getExcercisesByGroup: getExcercisesByGroup
};