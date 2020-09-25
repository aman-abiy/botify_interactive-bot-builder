var queryJson = require('./query.json');
var responseJson = require('./response.json');

//print query question with response
// console.log(queryJson, queryJson.length, '\n')
// console.log(responseJson[0], responseJson[0].length)
let whole = [];
for (let x = 0; x < queryJson.length; x++) {
    let selectedValue = null;
    let textValue = null;
    const curr = responseJson[x][`tier${x+1}`]._path._curr;
    const query = queryJson[x][`tier${x+1}`][`comp${curr.comp}`].query;
    selectedValue = responseJson[x][`tier${x+1}`].optionValue;
    if (!queryJson[x][`tier${x+1}`][`comp${curr.comp}`]._meta._textInput) {
        textValue = null;
    }
    textValue = responseJson[x][`tier${x+1}`].textValue;
    const response = {
        selectedValue,
        textValue
    }
    whole.push({
            query,
            response
        })
        // console.log(queryJson[x][`tier${x+1}`][`comp${curr.comp}`]._meta._textInput)
}
console.log(whole, )