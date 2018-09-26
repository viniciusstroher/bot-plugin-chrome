window.onload = function() {
	var pluginName 		   = "PLUGIN WATZ";
	console.log(pluginName);

	chrome.storage.sync.get(['status'], function(items) {
	  if(!items.status || items.status == "false"){
	  	console.log("STATUS OFF PLUGIN");
	  	throw "plugin desabilitado";
	  }
	  // setInterval(checkAlive,1000);
	  
	  setTimeout(function(){
	  	 var script = document.createElement("script");
		  script.setAttribute("type", "text/javascript");
		  // script.innerHTML = "console.log(document.querySelector(\"#app\")._reactRootContainer);";
		  script.innerHTML = "document.querySelector('#app')._reactRootContainer._internalRoot.current.child.child.child.child.child.child.sibling.sibling.sibling.sibling.sibling.child.child.child.child.child.sibling.sibling.sibling.sibling.sibling.child.child.child.child.memoizedState.chats[0].collection.find('555189549010@c.us').then(function(e) { e.sendMessage('teste') });";
		  document.getElementsByTagName("head")[0].appendChild(script);

		  console.log("RUN");
	  },10000);
	  //CARREGA SCRIPT
	 


	});
}






