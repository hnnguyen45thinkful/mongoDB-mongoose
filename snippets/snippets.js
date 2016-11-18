var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/', function(err, db) {
    if (err) {
        console.error(err);
        db.close();
        return;
    }
    console.log('Connected to MongoDB database');
    db.close();


	var collection = db.collection('snippets');
	//Updating the create method function
    var create = function(name, content) {
    	var snippet = {
        	name: name,
        	content: content
    	};
    	collection.insert(snippet, function(err, result) {
        	if (err) {
            	console.error("Could not create snippet", name);
            	db.close();
            	return;
        }
        	console.log("Created snippet", name);
        	db.close();
    	});
	};
	//Updating the read method function
    var read = function(name) {
    	var query = {
        	name: name
    	};
    	collection.findOne(query, function(err, snippet) {
        	if (!snippet || err) {
            	console.error("Could not read snippet", name);
            	db.close();
            	return;
        	}
        	console.log("Read snippet", snippet.name);
        	console.log(snippet.content);
        	db.close();
    	});
	};
	//Updating the read method function
	//To update documents you use the findAndModify method in Mongo. This modifies the first document returned by a query.
	var update = function(name, content) {
    	var query = {
        	name: name
    	};

    	var update = {
        	$set: {content: content}
    	};

    	collection.findAndModify(query, null, update, function(err, result) {
        	var snippet = result.value;
        	if (!snippet || err) {
            	console.error("Could not update snippet", name);
            	db.close();
            	return;
        	}
        	console.log("Updated snippet", snippet.name);
        	db.close();
    	});
	};
	//Finally to delete documents you use the findAndRemove method. This removes the first item which matches a query.
	var del = function(name, content) {
    	var query = {
        	name: name
    	};
    	collection.findAndRemove(query, function(err, result) {
        	var snippet = result.value;
        	if (!snippet || err) {
            	console.error("Could not delete snippet", name);
            	db.close();
            	return;
        	}
        	console.log("Deleted snippet", snippet.name);
        	db.close();
    	});
	};

    var main = function() {
        if (process.argv[2] == 'create') {
            create(process.argv[3], process.argv[4]);
        }
        else if (process.argv[2] == 'read') {
            read(process.argv[3]);
        }
        else if (process.argv[2] == 'update') {
            update(process.argv[3], process.argv[4]);
        }
        else if (process.argv[2] == 'delete') {
            del(process.argv[3]);
        }
        else {
            console.error('Command not recognized');
            db.close();
        }
    };

    main();
});

//:
//w-write
//q-quit
    //"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"
