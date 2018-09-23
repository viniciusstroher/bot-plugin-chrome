
var pluginName = "PLUGIN WATZ";
console.log(pluginName);

console.log("START PLUGIN");
function simulateMouseEvents(element, eventName) {
    var mouseEvent= document.createEvent ('MouseEvents');
    mouseEvent.initEvent (eventName, true, true);
    element.dispatchEvent (mouseEvent);
}

function checkAlive() {
	
	var contatosDom = document.querySelectorAll("[tabindex]")[2];
	var imgDom 	    = $(contatosDom).find("img")[0];
	
	if(contatosDom){
		
		if(imgDom != null){
			simulateMouseEvents(imgDom, 'mousedown');

			var event = new InputEvent('input', {bubbles: true});
			var textbox = document.querySelector('.selectable-text[spellcheck]');

			textbox.textContent = 'Bot do demonio feito para plugin do chrome !!!!!';
			textbox.dispatchEvent(event);
		

			// $('[data-icon="send"]').trigger('click');

		}
		

	}
	
	// $("[tabindex] div:eq(0)").trigger("click");
}


setInterval(checkAlive,1000);