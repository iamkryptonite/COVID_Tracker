var express		=require('express'),
	app			=express(),
	request 	=require('request'),
	cors 		=require('cors');
var path = require('path');

app.set('view engine','ejs');

app.use('/public',express.static('public'));
app.use('/scripts',express.static('scripts'));
app.use(express.static('assets'));
// app.use(express.static(path.join(__dirname, 'assets')));
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
			var statewise=data["statewise"];
			statewise.forEach(state => {				
				if(state["statecode"]=="TT"){
					var total = {
						active:state["active"],
						confirmed:state["confirmed"],
						deaths:state["deaths"],
						recovered:state["recovered"],
						dconfirmed:state["deltaconfirmed"],
						ddeaths:state["deltadeaths"],
						drecovered:state["deltarecovered"],
						lastupdated:state["lastupdatedtime"]
					};
					res.render("homepage",{data:data,total:total});
				}								
			});
		}
		else{
			console.log(err)
			console.log("Problem")
			res.send("not working")
		}		
	});
})
app.get("/tips",function(req,res){
	res.render("tips");
})
app.get("/graph",function(req,res){
	console.log("working")
	res.send("working")
});
app.get("/:id",function(req,res){
	res.render("show",{code:req.params.id});
});
//process.env.PORT
//===============================================================================================================
app.listen(process.env.PORT,function(){
	console.log("server is live")
})
