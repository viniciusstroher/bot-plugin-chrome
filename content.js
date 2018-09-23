// var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }
var pluginName = "PLUGIN WATZ";
// console.log(pluginName,document.querySelector("body"));
// console.log(pluginName,$("body").html());

console.log("START PLUGIN");
function simulateMouseEvents(element, eventName) {
    var mouseEvent= document.createEvent ('MouseEvents');
    mouseEvent.initEvent (eventName, true, true);
    element.dispatchEvent (mouseEvent);
}


function checkAlive() {
	// body...
	// console.log(pluginName,"ESTA VIVO?",$(":contains(Digite uma mensagem)"));

	var contatosDom = document.querySelectorAll("[tabindex]")[2];
	var imgDom 	    = $(contatosDom).find("img")[0];
	console.log('contatosDom',contatosDom);
	console.log('imgDom',imgDom);

	if(contatosDom){
		// console.log(imgDom);
		// imgDom.dispatchEvent(new Event("click"));
		if(imgDom != null){
			simulateMouseEvents(imgDom, 'mousedown');
		}
		

	}
	
	// $("[tabindex] div:eq(0)").trigger("click");
}


setInterval(checkAlive,1000);