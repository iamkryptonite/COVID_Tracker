var express		=require('express'),
	app			=express(),
	request 	=require('request'),
	fetch		=require('node-fetch');
	cors 		=require('cors');

app.set('view engine','ejs');
app.use('/scripts',express.static('scripts'));
app.use(cors());

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//====================================================================================================


// var url="https://api.covid19india.org/data.json";
// async function getData(){
// 	const response = await fetch(url);
// 	const data = await response.json();
// 	let statewise = await data.statewise;
// 	let label=[];
// 	let active=[];
// 	let deaths=[];
// 	let recovered=[];
// 	statewise.forEach(element => {
// 		label.push(element["state"]);
// 		active.push(element["active"]);
// 		deaths.push(element["deaths"]);
// 		recovered.push(element["recovered"]);		
// 	});
// }
app.get("/",function(req,res){
    // getData();
    var url="https://api.covid19india.org/data.json";
    url = url.replace(" ", "%20");
	request({
		uri:url,
		qs:{
			api_key: '20200509194709'
		}
	},function(err,response,body){
		if(!err && response.statusCode===200){
			var data=JSON.parse(body);
			var statewise=data.statewise;
			// console.log(statewise);
			// res.send("working")
			res.render("homepage",{data:data});
		}
		else{
			console.log(err)
			console.log("Problem")
			res.send("not working")

		}
		
	});
	// res.send("not working")	
})
app.get("/graph",function(req,res){
	res.render("graph");
});
app.get("/:id",function(req,res){
	res.render("show",{code:req.params.id});
});



//===============================================================================================================

app.listen(3000,function(){
	console.log("server is live")
})
