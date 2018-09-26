var contatos 	= {};
var salaStandBy = "STANDY_BY_BOT";
var salaStandyIniciada = false;
salaStandyIniciada 	   = true;

function simulateMouseEvents(element, eventName) {
    var mouseEvent = document.createEvent ('MouseEvents');
    mouseEvent.initEvent (eventName, true, true);
    element.dispatchEvent (mouseEvent);
}

function checkAlive() {

	
	if(!salaStandyIniciada){
		// writeMsgToContact("5551995412459","#-SALA STANDY BY DO BOT-#");
		
		var contactsDOM = getAllContacts();
		console.log(contactsDOM);

		if(contactsDOM != null){
			console.log(contactsDOM);
		}
	}else{
		detectMsg();
	}
	

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


					//ATUALIZA CONTATOS
					var nomeContato = getActualName();
					if(!contatos.hasOwnProperty(nomeContato)){
						contatos[nomeContato] 			= {};
						contatos[nomeContato].conversas = [];
						console.log('atualizando contato',nomeContato);
					}
					
					// console.log(number);
					// getConversation(i)

				}
			}
		});
		
		function getConversations(){
			return document.querySelectorAll("[data-pre-plain-text]");
		}
		// console.log(contatosListDom);
		// $(contatosListDom).each(function(){
		// 	var dom =$(this).find("div:eq(1) div:eq(1) div:eq(1)");
		// 	console.log(dom[0]);
		// });
		//$(contatosListDom).find(":has(span:lt(3))");
		// console.log(spansDom);
	}
}

function getAllContacts(){
	var contatosDom  	= document.querySelectorAll("[tabindex]")[2];
	if(contatosDom != null){
		//TROCAR PARA querySelectorAll ao invez de querySelector
		// var contatosListDom   = contatosDom.querySelector("[tabindex]");
		var contatosListDom   = contatosDom.querySelectorAll("[tabindex]");
		return contatosListDom;
	}
	return null;
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


function avaliableWriteMsgToContact(){
	if(document.querySelector("#app").hasOwnProperty('_reactRootContainer')){
		return true;
	}
	return false;
}

function writeMsgToContact(num,msg){
	document.querySelector("#app")._reactRootContainer._internalRoot.current.child.child.child.child.child.child.sibling.sibling.
sibling.sibling.sibling.child.child.child.child.child.sibling.sibling.sibling.sibling.sibling.child.
child.child.child.memoizedState.chats[0].collection.find(num+"@c.us")
.then(function(e) { e.sendMessage(msg) });

}

function write(num,msg){
	setTimeout(function(){
	  	var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		// script.innerHTML = "console.log(document.querySelector(\"#app\")._reactRootContainer);";
		script.innerHTML = "document.querySelector('#app')._reactRootContainer._internalRoot.current.child.child.child.child.child.child.sibling.sibling.sibling.sibling.sibling.child.child.child.child.child.sibling.sibling.sibling.sibling.sibling.child.child.child.child.memoizedState.chats[0].collection.find('"+num+"@c.us').then(function(e) { e.sendMessage('"+msg+"') });";
		document.getElementsByTagName("head")[0].appendChild(script);
		console.log("RUN");
	},10000);
  
}


function getActualName(){
	return document.querySelectorAll("#main header div:nth-child(2) div")[1].textContent
}

function getNameAndDate(i){
	return document.querySelectorAll("[data-pre-plain-text]")[i].parentElement.querySelector("div:nth-child(1)").getAttribute("data-pre-plain-text");
}