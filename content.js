window.onload = function() {
	var pluginName 		   = "PLUGIN WATZ";

	console.log(pluginName);

	chrome.storage.sync.get(['status'], function(items) {
	  if(!items.status || items.status == "false"){
	  	console.log("STATUS OFF PLUGIN");
	  	throw "plugin desabilitado";
	  }
	  setInterval(checkAlive,1000);

	});
}






