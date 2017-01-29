var genericServer = require('./generic-server');
var url = 'mongodb://localhost:27017/conFusion';

testModel = "Leadership";

if (testModel === "Dish") {
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
} else if (testModel === "Promotions") {
    var promotions = require('../../models/promotions');
    genericServer.connectModel(url, promotions, genericServer.createStandardTest({
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
    }, {
        $set: {
            description: 'Updated Test'
        }
    }));
} else if (testModel === "Leadership") {
    var leadership = require('../../models/leadership');
    genericServer.connectModel(url, leadership, genericServer.createStandardTest({
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    }, {
        $set: {
            description: 'Updated Test'
        }
    }))
};