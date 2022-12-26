var attempt = 1;
var flagString = "";
var countryCode = "";
var countryName = "";

function setDropdown() {    
    var f = new XMLHttpRequest();
    f.open("GET", "images/codes.txt", false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                var res= f.responseText;
                var arr = [];
               
                arr = res.split("\n");
                var i;
                for(i = 0; i<arr.length;i++) {
                    arr[i] = arr[i].replaceAll('"',"");
                    arr[i] = arr[i].replaceAll(",","");
                    arr[i] = arr[i].trim();
                    arr[i] = arr[i].substring(arr[i].indexOf(":")+1).trim();
                    
                    document.getElementById("myDropdown").innerHTML += "<a href='#"+arr[i]+"' onclick='choiceMade(\""+arr[i]+"\")'>"+arr[i]+"</a>"                    
                }
                getRandomFlag();
            }
        }
    }
    f.send(null);     
}

function hint() {
    var countryCodeUpper = countryCode.toUpperCase();
    var f = new XMLHttpRequest();
    f.open("GET", "continent.txt", false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                var res= f.responseText;
                var arr = [];
               
                arr = res.split("\n");
                var i;
                console.log("Country Code: "+countryCodeUpper);
                for(i = 0; i<arr.length;i++) {
                    arr[i] = arr[i].replaceAll('"',"");
                    arr[i] = arr[i].replaceAll(",","");
                    arr[i] = arr[i].trim();
                    var hintCode = arr[i].substring(0, arr[i].indexOf(":")).trim();
                    //console.log(arr[i]);
                    if(hintCode === countryCodeUpper) {
                        document.getElementById("hintDrop").innerHTML = "<a href='#"+arr[i]+"'>"+arr[i]+"</a>";    
                        console.log("Continent found");
                        console.log(arr[i]);
                    }

                                        
                }
                if(document.getElementById("hintDrop").innerHTML === null || document.getElementById("hintDrop").innerHTML === "")                
                    document.getElementById("hintDrop").innerHTML = "<a href='#"+"contierror"+"'>"+"Continent error"+"</a>";
                document.getElementById("hintDrop").classList.toggle("show");
            }
        }
    }
    f.send(null); 

}

function choiceMade(str) {    
    document.getElementById("butt"+attempt).disabled = false;
    document.getElementById("attempt"+attempt).innerHTML = str;
    document.getElementById("myDropdown").classList.toggle("show");        
}

function choice() {    
    document.getElementById("butt"+attempt).disabled = true;
    if(countryName === document.getElementById("attempt"+attempt).innerHTML) {
        //alert("You won!");        
        document.getElementById("attempt"+attempt).style.color = "rgb(0, 255, 0)";
        //getRandomFlag();
    }
    else if(attempt<=5){        
        //alert("Wrong guess\nAttempt no. "+attempt);
        document.getElementById("attempt"+attempt).style.color = "red";
        attempt++;
    } else {        
        alert("You Lost!\nCorrect Ans: "+countryName);        
        //getRandomFlag();
    }
}

function getRandomFlag() {
    attempt =1;
    document.getElementById("attempt1").innerHTML = "";
        document.getElementById("attempt2").innerHTML = "";
        document.getElementById("attempt3").innerHTML = "";
        document.getElementById("attempt4").innerHTML = "";
        document.getElementById("attempt5").innerHTML = "";
        document.getElementById("attempt6").innerHTML = "";

        document.getElementById("attempt1").style.color = "black";
        document.getElementById("attempt2").style.color = "black";
        document.getElementById("attempt3").style.color = "black";
        document.getElementById("attempt4").style.color = "black";
        document.getElementById("attempt5").style.color = "black";
        document.getElementById("attempt6").style.color = "black";

    var f = new XMLHttpRequest();
    f.open("GET", "images/codes.txt", false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                var res= f.responseText;
                var arr = [];
               
                arr = res.split("\n");
                var i = arr.length;
                
                var index = Math.floor(Math.random() * i);
                console.log(index);
                var temp = arr[index];
                temp = temp.replaceAll('"',"");
                countryCode = temp.substring(0,temp.indexOf(":")).trim();
                countryName = temp.substring(temp.indexOf(":")+1).trim();
                countryName = countryName.replaceAll(",","");
                document.getElementById("flagImage").src = "images/"+countryCode+".png";
                console.log("Code: "+countryCode);
                console.log("Name: "+countryName);
            }
        }
    }
    f.send(null); 
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
}