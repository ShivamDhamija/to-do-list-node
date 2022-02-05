let ip=document.getElementById("ip");
let parent=document.getElementById("parent");

//when page is first lode

function firstPage(){
  var request = new XMLHttpRequest();

  request.open("get", "/gettingdata");
  request.send();

  request.addEventListener("load", function()
    {
        var text =JSON.parse(request.responseText);

        text.forEach(element => {
            addInUl(element.task,element.isDone);
        });
    });
}

firstPage();

//when btn is click/to be added in data    
ip.addEventListener("keyup",function(event){
    var value=ip.value;
   if(value&&event.keyCode===13) 
    {
        addInData(value,addInUl);
        ip.value="";
    }
});

//to be added in ul
function addInUl(value,isDone){

    var div=document.createElement("div");
    div.innerText=value;
    var del=document.createElement("button");
    del.innerText="x";    
    var tick= document.createElement('input');           
    tick.type = "checkbox";

    div.setAttribute("id","div3");
    del.setAttribute("id","del");
    tick.setAttribute("id","tick");

    if(isDone)
    {
        div.style.textDecoration="line-through";
        tick.setAttribute("checked","true");
    }
    

    div.appendChild(tick);
    div.appendChild(del);
    parent.appendChild(div);    
    
    tick.addEventListener("click",function(){
        lineThrow(value,function()
        {
            if(!isDone)
            {
                div.style.textDecoration="line-through";
                tick.setAttribute("checked","true");
                isDone=!isDone;
            }
            else
            {
                div.style.textDecoration="none";
                tick.setAttribute("checked","false");
                isDone=!isDone;
            }
        });
    });
    del.addEventListener("click",function(){
        deleteFromData(value);
    });

}

//line throw function
function lineThrow(value,callback){
    
  var request = new XMLHttpRequest();
 
  request.open("POST","/linethrow");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({value}));
  request.addEventListener("load", function()
  { 
      if(request.status === 200){
          callback();
      }
  });
}

//delete function
function deleteFromData(value){

    var request = new XMLHttpRequest();
 
    request.open("POST","/delete");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({value}));
  
    request.addEventListener("load", function()
      { 
          if(request.status === 200){
              parent.innerText="";
              firstPage()
          }
      });
}

//to be added in data
function addInData(value,addInUl)
{
    var request = new XMLHttpRequest();

    request.open("POST","/addindata");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ task: value ,isDone:false}));

    request.addEventListener("load", function()
    {
        request.status === 200 && addInUl(value,false)
    });
}