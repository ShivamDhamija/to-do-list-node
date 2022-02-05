const express=require("express");
const fs= require("fs")
const app=express();

app.use(express.static("public"));

app.use(express.json());

app.get("/",function(req,res){
    res.sendFile("index.html");
});

app.get('/gettingdata', (req, res) => 
{
	fs.readFile(__dirname+"/data.txt", "utf-8" ,function(err, data)
	{
		let text=[];

		if( data.length >0  )
			text = JSON.parse(data);
		
        res.json(text);

	})
})

app.post("/addindata",function(req,res)
{
    fs.readFile("./data.txt","utf-8",function(err,data)
    {    
        var text=[]
        
        if(data.length>0)
            text=JSON.parse(data);
        
        text.push(req.body);   
        
        fs.writeFile("./data.txt", JSON.stringify(text) ,function(err)
		{
			res.end()
		})
    });
});

app.post("/linethrow",function(req,res)
{      
    fs.readFile(__dirname+"/data.txt", "utf-8" ,function(err, data)
	{
		let text=[];

		text = JSON.parse(data);
		
        var value=req.body.value;
   
        text.forEach(element => {
            if(element.task===value)
            {element.isDone=!element.isDone; 
         }           
        });

        fs.writeFile("./data.txt", JSON.stringify(text) ,function(err)
		{
            res.send();
		});
        
	});
});

app.post("/delete",function(req,res)
{      
    fs.readFile(__dirname+"/data.txt", "utf-8" ,function(err, data)
	{
		let text=[];

		if( data.length >0  )
			text = JSON.parse(data);
		
        var value=req.body.value;
   
        var toBeDeleted=text.filter(element => {
            if(element.task===value)
                return element;           
        });
       
        var index=text.indexOf(toBeDeleted[0]);
        
        if(index>-1)
        text.splice(index,1);
        
        fs.writeFile("./data.txt", JSON.stringify(text) ,function(err)
		{
            res.send();
		});
        
	});
});


app.listen(3000,function(){
    console.log("working on port 3000")
})