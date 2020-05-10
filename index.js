var express		=require('express'),
	app			=express(),
	request 	=require('request'),
	cors 		=require('cors');

app.set('view engine','ejs');
app.use('/scripts',express.static('scripts'));
app.use(cors());

//===================================================================================================

app.get("/",function(req,res){    
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
			res.render("homepage",{data:data});
		}
		else{
			console.log(err)
			console.log("Problem")
			res.send("not working")
		}		
	});
})
app.get("/graph",function(req,res){
	res.render("graph");
});
app.get("/:id",function(req,res){
	res.render("show",{code:req.params.id});
});
// app.get("/",function(req,res){
// 	res.send("working")
// })
//===============================================================================================================
app.listen(3000,function(){
	console.log("server is live")
})
