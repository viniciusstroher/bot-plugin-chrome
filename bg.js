chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request);
    if (request.type == "notification"){
      chrome.notifications.create('notification', request.options, function() { });

    }

    if(request.type == "save"){
    	chrome.downloads.download({url:request.options.src,filename:request.options.src.split("/").pop()}, function(r){
    		console.log('chrome.downloads:',r);
    	});
    }
});