var getData = function(){
    var my_JSON_object = {};
    var http_request = new XMLHttpRequest();
    var str, queryInput = document.getElementById("searchPages");
    var searchFormRow = document.getElementsByClassName('form-search-row')[0];
    var image=document.createElement('img');

    if(!queryInput.value){
        return;
    }

    str = encodeURIComponent(queryInput.value);
    image.setAttribute('src', 'img/ajax-loader.gif');
    image.setAttribute('width', '30px');
    searchFormRow.appendChild(image);

    var url = "https://graph.facebook.com/search?type=page&q="+ str;
    http_request.open("GET", url, true);
    http_request.onreadystatechange = function () {
        var done = 4, ok = 200;
        if (http_request.readyState == done && http_request.status == ok) {
            my_JSON_object = JSON.parse(http_request.responseText);
            displayResults(my_JSON_object);
            image.parentNode.removeChild(image);
        }
    };
    http_request.send(null);
};


var displayResults = function(pages){
    var resultDiv = document.getElementsByClassName('page-results')[0];
    if(pages.data.length){
        resultDiv.innerHTML = "";
    }
    else{
        resultDiv.innerHTML = "No results found";
    }
    for(var i=0; i<pages.data.length; i++)
    {
        var name = pages.data[i].name, category = pages.data[i].category, id= pages.data[i].id;
        var page = document.createElement("div");
        var pname = document.createElement("p");
        var findmore = document.createElement("a");
        var pcategory = document.createElement("p");
        pname.innerHTML = name;
        findmore.innerHTML = " find out more";
        findmore.href= "detail.html?id="+id;
        findmore.target = "_blank";
        pname.appendChild(findmore);
        pcategory.innerHTML = "Category: " + category;
        pcategory.setAttribute('class',"small-font");
        page.setAttribute('class','span2 pageDiv');
        page.appendChild(pname);
        page.appendChild(pcategory);
        resultDiv.appendChild(page);
        console.log(pages.data[i].name);
    }
};


var getPageDeatil = function(){
    var query = window.location.search.substring(1);
    var vars = query.split("=");
    getDetailsAjax(vars[1]);
};

var getDetailsAjax = function(pageId){
    var my_JSON_object = {};
    var http_request = new XMLHttpRequest();
    var str = encodeURIComponent(pageId);

    var url = "https://graph.facebook.com/"+ str;
    http_request.open("GET", url, true);
    http_request.onreadystatechange = function () {
        var done = 4, ok = 200;
        if (http_request.readyState == done && http_request.status == ok) {
            my_JSON_object = JSON.parse(http_request.responseText);
            displayDetailsResult(my_JSON_object);
        }
    };
    http_request.send(null);
};

var displayDetailsResult = function(detail){
    var resultDiv = document.getElementById('details');
    var displayImage;
    for (key in detail) {
        if (detail.hasOwnProperty(key)) {
            if(key=="cover"){
                displayImage =true;
            }
            else{
                var li = document.createElement("li");
                li.setAttribute('class',"removeDecor");
                li.innerHTML = key+ " : " + detail[key];
                resultDiv.appendChild(li);
            }
        }
    }
    if(displayImage){
        var heading = document.getElementById('header');
        var image =  document.createElement('img');
        image.setAttribute('src', detail.cover.source);
        heading.insertBefore(image);
    }
};





























