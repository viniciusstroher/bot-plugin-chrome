chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request);
    if (request.type == "notification"){
      chrome.notifications.create('notification', request.options, function() { });

    }
});