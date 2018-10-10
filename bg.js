chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request);
    if (request.type == "notification"){
      chrome.notifications.create('notification', request.options, function() { });

    }

    if(request.type == "save"){
    	// chrome.downloads.download({url:request.options.src,filename:request.options.src.split("/").pop()}, function(r){
    	// 	console.log('chrome.downloads:',r);
    	// });

    	var xmlhttp = null;
	    if (window.XMLHttpRequest) {
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    var url    	   = "http://localhost:8093/files";
	    var params 	   = "url="+request.options.src;
	  	xmlhttp.onload = function(e){
	  		console.log('onload',e);
	  	};

	    xmlhttp.open("POST", url, true);
	    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xmlhttp.send(params);

    }
});