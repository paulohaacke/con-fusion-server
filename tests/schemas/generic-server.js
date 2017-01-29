var mongoose = require('mongoose');

exports.createStandardTest = function(createData, updateData, callback) {
    return function(db, model) {
        model.create(createData, function(err, data) {
            if (err) throw err;
            console.log(model.modelName + ' created!');
            console.log(data);

            var id = data._id;

            model.findByIdAndUpdate(id, updateData, { new: true })
                .exec(function(err, data) {
                    if (err) throw err;
                    console.log('Updated ' + model.modelName + '!');
                    console.log(data);

                    typeof callback === 'function' && callback(err, model, data);

                    model.collection.drop(function() {
                        db.close();
                    });
                });
        });
    }
};

exports.connectModel = function(url, model, callback) {
    // Connection URL
    mongoose.connect(url);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log("Connected correctly to server");
        callback(db, model);
    });
}