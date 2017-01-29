var genericServer = require('./generic-server');
var url = 'mongodb://localhost:27017/conFusion';

var dishes = require('../../models/dishes');
genericServer.connectModel(url, dishes, genericServer.createStandardTest({
    "name": "Uthapizza",
    "image": "images/uthapizza.png",
    "category": "mains",
    "price": "4.99",
    "description": "A unique . . .",
    "comments": [{
            "rating": 5,
            "comment": "Imagine all the eatables, living in conFusion!",
            "author": "John Lemon"
        },
        {
            "rating": 4,
            "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
            "author": "Paul McVites"
        }
    ]
}, {
    $set: {
        description: 'Updated Test'
    }
}));