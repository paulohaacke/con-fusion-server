var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        unique: true
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;