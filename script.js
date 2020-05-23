

let dropdown = document.getElementById("drop-down");
dropdown.length = 0;
var keys;
var breeds;
const url = "https://dog.ceo/api/breeds/list/all";
var request = new XMLHttpRequest();
request.open("get",url,true);
request.send();
request.onload = function(){
    // console.log("Done");
    var res = JSON.parse(request.response);
    // console.log(res);
    breeds = res.message;
    keys = Object.keys(breeds);
    console.log(typeof(breeds));
    // console.log(breeds);
    for(var i in breeds){
        let x = document.createElement("option");
        x.text = i;
        let val = i;
        dropdown.add(x);
    }
    dropdown.selectedIndex = 0;
}
var myUrl="";
var clck = true;
$("#btn").on("click",function(event){
    event.preventDefault();
    var dd2 = document.getElementById("drop-down-second");
    if(dd2==null || dd2 == undefined){
        console.log("false");
    }else{
        $("#drop-down-second").change(function () {
            clck = true;
            console.log("very truee");
        });
        console.log("truee");
    }
    deleteChild();
    if(clck){
        let urlOpt = dropdown.options[dropdown.selectedIndex].value;
        let url;
        if(breeds[urlOpt].length==0){
            url = "https://dog.ceo/api/breed/" +urlOpt + "/images";
            // console.log(url);
             myUrl = "https://dog.ceo/api/breed/" +urlOpt ; 
        }else{
            var dd2 = document.getElementById("drop-down-second");
            let urlOpt2 = dd2.options[dd2.selectedIndex].value;
            url = "https://dog.ceo/api/breed/" +urlOpt +'/'+ urlOpt2+ "/images";
        }
       // console.log(urlOpt);
        
        var request1 = new XMLHttpRequest();
        request1.open("get",url);
        request1.send();
        request1.onload = function(){
            let jObj = JSON.parse(request1.response);
            let imgUrl = jObj.message;
            for(var index in imgUrl){
                $("#dog-container").append('<img src = '+imgUrl[index] + '>');
            }
            
        };
        clck = false;
    }else{
        return;
    }
});


$("#drop-down").change(function () {
    clck = true;
    // console.log("inside");
    var form = document.getElementsByTagName("form");
    var dd2 = document.getElementById("drop-down-second");
         if(dd2==null || dd2 == undefined){
           
        }else{
            form[0].removeChild(dd2);
        }
    let urlOpt = dropdown.options[dropdown.selectedIndex].value;
        if(breeds[urlOpt].length>0){
            // console.log("more inside");
            var dropDown2=document.createElement("select");
            dropDown2.setAttribute("id","drop-down-second");
            // dropDown2.setAttribute("order",5);
            form[0].append(dropDown2);
            for(var index in breeds[urlOpt]){
                var values=document.createElement("option");
                values.text = breeds[urlOpt][index];
                values.value = breeds[urlOpt][index];
                dropDown2.add(values);
                console.log("done");
            }
        }else{
            var dd2 = document.getElementById("drop-down-second");
            if(dd2==null || dd2 == undefined){
               
            }else{
                form[0].removeChild(dd2);
            }
        }
});
function deleteChild() { 
    var e = document.getElementById("dog-container"); 
    
    //e.firstElementChild can be used. 
    var child = e.firstElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.firstElementChild; 
    } 
} 