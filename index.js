var fs = require('fs');
var md5 = require('md5');
var express	=	require("express");
var bodyParser =	require("body-parser");
var multer	=	require('multer');
var app	=	express();
console.clear();
app.use(express.static('static'));
app.use(bodyParser.json());
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage }).array('file',2);
var dir = __dirname + "/uploads";

// app.get('/',function(req,res){
//       res.sendFile(__dirname + "/index.html");
// });

app.get('/files',function(req,res){
    console.log(dir);

    var test = "hi there";
    var json = [];
    fs.readdir(dir, function(err, items) {
    	console.log(test);

    	for (var i=0; i<items.length; i++) {
    		var pad = dir + "/" + items[i];
    		console.log(items[i]);
    		var text = fs.readFileSync(pad,'utf8')
    		var hash = md5(text);
        console.log(hash + "  -> " + test);
        json.push({name: items[i], md5: hash});
    	}
      console.log("kom issssk");
      console.log("kom ik");
      res.send(json);
    });

});

app.post('/upload',function(req,res){
  console.log("-> upload");
	upload(req,res,function(err) {
		console.log(req.body);
		console.log(req.files);
		if(err) {
			return res.end("Error uploading file.");
		}
    var pad = dir + "/" + req.files[0].filename;
    console.log(pad);
    var text = fs.readFileSync(pad,'utf8')
    var hash = md5(text);

    console.log(hash);
		res.send(hash);
	});
});


app.listen(3000,function(){
    console.log("Working on port 3000");
});
