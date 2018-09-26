window.onload = function() {
	var pluginName 		   = "PLUGIN WATZ";

	var p = ['#pane-side > div > div > div > div:nth-child(18) > div > div > div.dIyEr > div',
			 '#pane-side > div > div > div > div:nth-child(17) > div > div > div.dIyEr > div'];

	console.log(pluginName);

	chrome.storage.sync.get(['status'], function(items) {
	  if(!items.status || items.status == "false"){
	  	console.log("STATUS OFF PLUGIN");
	  	throw "plugin desabilitado";
	  }
	  // setInterval(checkAlive,2000);

	   intervalo = setInterval(function(){
	   		 console.log(p);
		   	 if(p.length == 0){
		   	 	clearInterval(intervalo);
		   	 }

		   	 if(!isLoaded()){
		   	 	
		   	 	p2 = p.pop();
		   	 	if(p2 != null){
		   	 		console.log(p2);
		   	 		simulateMouseEvents(document.querySelector(p2), 'mousedown');
		   	 	}

		   	 }
		   },1000);

	});
}






