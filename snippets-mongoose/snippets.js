var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

mongoose.connection.once('open', function() {
   var snippetSchema = mongoose.Schema({
       name: {type: String, unique: true},
       content: String
    });
//Create:
//To create a document you use the Snippet.create method:
    var Snippet = mongoose.model('Snippet', snippetSchema);
    var create = function(name, content) {
        var snippet = {
            name: name,
            content: content
        };
        Snippet.create(snippet, function(err, snippet) {
            if (err || !snippet) {
                console.error("Could not create snippet", name);
                mongoose.disconnect();
                return;
            }
            console.log("Created snippet", snippet.name);
            mongoose.disconnect();
        });
    };
//Read:
//To read a single snippet you use the Snippet.findOne method:
    var read = function(name) {
        Snippet.findOne({name: name}, function(err, snippet) {
            if (err || !snippet) {
                console.error("Could not read snippet", name);
                mongoose.disconnect();
                return;
            }
            console.log("Read snippet", snippet.name);
            console.log(snippet.content);
            mongoose.disconnect();
        });
    };
//Update:
//To update attributes of a single snippet you can use the Snippet.findOneAndUpdate method:    
    var update = function(name, content) {
        Snippet.findOneAndUpdate({name: name}, {content: content}, function(err, snippet) {
            if (err || !snippet) {
                console.error("Could not update snippet", name);
                mongoose.disconnect();
                return;
            }
            console.log("Updated snippet", snippet.name);
            mongoose.disconnect();
        });
    };
//Delete:
//To delete a snippet, use the Snippet.findOneAndRemove method:    
    var del = function(name, content) {
        Snippet.findOneAndRemove({name: name}, function(err, snippet) {
            if (err || !snippet) {
                console.error("Could not delete snippet", name);
                mongoose.disconnect();
                return;
            }
            console.log("Deleted snippet", snippet.name);
            mongoose.disconnect();
        });
    };
});