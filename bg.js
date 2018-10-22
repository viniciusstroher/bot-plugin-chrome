chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request);

    if(request.type == "save"){
  
    	var xmlhttp = new XMLHttpRequest();
	    xmlhttp.open("GET", 'blob:'+request.data.src, true);
		xmlhttp.responseType = "blob";
		
		xmlhttp.onload = function(oEvent) {
		  	var blob 	 = xmlhttp.response;
			var ext 	 = request.data.src.split('.').pop();
		  	var formData = new FormData();
			formData.append("object", blob,'arquivo.watz.'+ext);

			//SERVER
			var xmlhttp2    = new XMLHttpRequest();
		    var url    	   = "http://localhost:8093/files";
		  	xmlhttp2.onload = function(e){
		  		console.log('onload',e);
		  	};

		    xmlhttp2.open("POST", url, true);
		    xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		    xmlhttp2.send(formData);
		}
		xmlhttp.send();
    }
    
    if(request.type == "addContact"){
    	var xmlhttp = null;
	    if (window.XMLHttpRequest) {
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
		  
		var url    	   = "http://localhost:8093/contatos";
	    var params 	   = "url="+request.data.src;
	  	xmlhttp.onload = function(e){
	  		console.log('onload',e);
	  	};

	    xmlhttp.open("POST", url, true);
	    // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xmlhttp.setRequestHeader("Content-Type", "application/json");
	    xmlhttp.send(JSON.stringify(request.data));
	    // xmlhttp.send(params);

    }
});