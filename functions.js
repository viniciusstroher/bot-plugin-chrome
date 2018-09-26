function simulateMouseEvents(element, eventName) {
    var mouseEvent= document.createEvent ('MouseEvents');
    mouseEvent.initEvent (eventName, true, true);
    element.dispatchEvent (mouseEvent);
}

function checkAlive() {
	
	// selectPerfil(0);
	detectMsg()

}

function selectPerfil(index){
	var contatosDom = document.querySelectorAll("[tabindex]")[2];
	var imgDom 	    = $(contatosDom).find("img")[index];
	
	if(contatosDom){
		if(imgDom != null){
			simulateMouseEvents(imgDom, 'mousedown');
			write();
		}
	}
}

function write(){
	var event   = new InputEvent('input', {bubbles: true});
	var textbox = document.querySelector('.selectable-text[spellcheck]');

	if(textbox != null){
		textbox.textContent = 'Bot do demonio feito para plugin do chrome !!!!!';
		textbox.dispatchEvent(event);
	}
	// $('[data-icon="send"]').trigger('click');

	// $("[tabindex] div:eq(0)").trigger("click");
}

function detectMsg(){
	var contatosDom  	= document.querySelectorAll("[tabindex]")[2];
	if(contatosDom != null){
								//TROCAR PARA querySelectorAll ao invez de querySelector
		// var contatosListDom   = contatosDom.querySelector("[tabindex]");

		var contatosListDom   = contatosDom.querySelectorAll("[tabindex]");
		// var conversasNaoLidas = $(contatosListDom).find("div > div:eq(3) > div:eq(1) > div:eq(1) span div span");
		
		$.each(contatosListDom,function(k,v){
			var conversasNaoLidas = $(v).find("div > div:eq(3) > div:eq(1) > div:eq(1) span div span");
			number = 0;
			if(conversasNaoLidas.html()){
				number = parseInt(conversasNaoLidas.html());

				if(number > 0){
					simulateMouseEvents($(v).find("img")[0], 'mousedown');
					console.log(number);
				}
			}
		});
		
		
		// console.log(contatosListDom);
		// $(contatosListDom).each(function(){
		// 	var dom =$(this).find("div:eq(1) div:eq(1) div:eq(1)");
		// 	console.log(dom[0]);
		// });
		//$(contatosListDom).find(":has(span:lt(3))");
		// console.log(spansDom);
	}
}

function getConversations(){
	return document.querySelectorAll("[data-pre-plain-text]");
}


function getConversation(i){
	return document.querySelectorAll("[data-pre-plain-text]")[i];
}

function getConversationText(i){
	return document.querySelectorAll("[data-pre-plain-text]")[i].textContent;
}

function getConversationText(i){
	return document.querySelectorAll("[data-pre-plain-text]")[i].textContent;
}


function writeMsgToContact(num,msg){
	document.querySelector("#app")._reactRootContainer._internalRoot.current.child.child.child.child.child.child.sibling.sibling.
sibling.sibling.sibling.child.child.child.child.child.sibling.sibling.sibling.sibling.sibling.child.
child.child.child.memoizedState.chats[0].collection.find(num+"@c.us")
.then(function(e) { e.sendMessage(msg) });

}

function getActualName(){
	return document.querySelectorAll("#main header div:nth-child(2) div")[1].textContent
}

function getNameAndDate(i){
	return document.querySelectorAll("[data-pre-plain-text]")[i].parentElement.querySelector("div:nth-child(1)").getAttribute("data-pre-plain-text");
}