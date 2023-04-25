let fs = require('fs');

// A list of content, each page is an object
let content = [] 

// Use object literals to find use string as variable when calling writeJSON(path)
let obj = {}

// Add each page's content (object) to our content list
let index = "index";
obj[index] = JSON.parse(fs.readFileSync('./content/index.json', 'utf8'));
content.push(obj[index]);

let mealdelivery = "mealdelivery";
obj[mealdelivery] = JSON.parse(fs.readFileSync('./content/mealdelivery.json', 'utf8'));
content.push(obj[mealdelivery]);

let donate = "donate";
obj[donate] = JSON.parse(fs.readFileSync('./content/donate.json', 'utf8'));
content.push(obj[donate]);

let programs = "programs";
obj[programs] = JSON.parse(fs.readFileSync('./content/programs.json', 'utf8'));
content.push(obj[programs]);

let volunteer = "volunteer"
obj[volunteer] = JSON.parse(fs.readFileSync('./content/volunteer.json', 'utf8'))
content.push(obj[volunteer])

let aboutus = "aboutus"
obj[aboutus] = JSON.parse(fs.readFileSync('./content/aboutus.json','utf8'))
content.push(obj[aboutus])

let aldergrove = "aldergrove"
obj[aldergrove] = JSON.parse(fs.readFileSync('./content/aldergrove.json', 'utf8'))
content.push(obj[aldergrove])

let pay = "pay"
obj[pay] = JSON.parse(fs.readFileSync('./content/pay.json', 'utf8'))
content.push(obj[pay])

let supporters = "supporters"
obj[supporters] = JSON.parse(fs.readFileSync('./content/supporters.json', 'utf8'))
content.push(obj[supporters])

let contact = "contact"
obj[contact] = JSON.parse(fs.readFileSync('./content/contact.json', 'utf8'))
content.push(obj[contact])

let signup = "signup"
obj[signup] = JSON.parse(fs.readFileSync('./content/signup.json', 'utf8'))
content.push(obj[signup])

const writeJSON = (path) =>  {
    let content = JSON.stringify(obj[path], null, '\t')
    fs.writeFile(`./content/${path}.json`, content, function(err, result) {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        //console.log('done')
})
}

module.exports = { content, writeJSON };
