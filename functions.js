var contatos 	= {};
var salaStandBy = "STANDY_BY_BOT";

var salaStandyIniciada = false;

function simulateMouseEvents(element, eventName) {
    var mouseEvent = document.createEvent ('MouseEvents');
    mouseEvent.initEvent (eventName, true, true);
    element.dispatchEvent (mouseEvent);
}



//ID IMG 
//#pane-side > div > div > div > div:nth-child(18) > div > div > div.dIyEr > div
var checkAliveThread = null;
function checkAlive() {
	
	if(!isLoaded()){
		if(!salaStandyIniciada){
			// writeMsgToContact("5551995412459","#-SALA STANDY BY DO BOT-#");
			
			//CARREGA CONTATOS NO START DA APLICAÇAO
			
			loadContacts();
			
			// if(contactsDOM != null){
			// 	console.log(contactsDOM);
			// }
		}else{
			detectMsg();
		}
	}else{
		console.log("Carregando whatzweb",isLoaded());
	}

}


function isLoaded(){
	return document.querySelector("#startup") != null ? true : false;
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

					// console.log(number);
					// getConversation(i)

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

function loadContacts(){
	if(checkAliveThread == null){
				
		var numeroContatos  = document.querySelectorAll("#pane-side > div > div > div > div").length;
		var ponteiroContato = 1;
		console.log('numeroContatos',numeroContatos);

		checkAliveThread = setInterval(function(){
   		
		   	if(ponteiroContato == numeroContatos+1){
		   	 	console.log('Contatos carregados',contatos);
		   	 	//LIBERA A SALA PARA INICIAR O DETECT()
		   	 	salaStandyIniciada  = true;
		   	 	clearInterval(checkAliveThread);
		   	 	checkAliveThread = null;

		   	}

		   	//DPS DE CARREGAR
		   	if(!isLoaded()){
				//CUIDAR !!!! POIS DIV div.dIyEr PODE MUDAR A CLASS dIyEr SE PARAR DE BUSCAR TODOS OS CONTATOS REVER ESSE PONTO
	   	 		var domSearch = "#pane-side > div > div > div > div:nth-child("+ponteiroContato+") > div > div > div.dIyEr > div";
	   	 		console.log('domSearch',domSearch,document.querySelector(domSearch));
	   	 		
	   	 		try{
	   	 			simulateMouseEvents(document.querySelector(domSearch), 'mousedown');
	   	 		}catch(ex){
	   	 			console.log('loadContacts simulateMouseEvents ',ex);
	   	 		}
	   	 		//PEGA CONVERSAS CONTATOS AQUI

	   	 		var nomeContato = getActualName();
				if(!contatos.hasOwnProperty(name)){
					contatos[name] 			  = {};
					contatos[name].nome 	  = name;
					contatos[name].conversas  = [];

					var maxConversations = getConversationsIndex();

					for(i = 0;i<maxConversations;i++){

						contatos[name].conversas.push({msg:  getConversationText(i),
													   date: getConversationNameAndDate(i)
													 });
	   	 			}
	   	 		}

	   	 		ponteiroContato++;
		   	 	
		   	}
		   	//CUIDAR TEMPO DE RESPOSTA AUMENTAR SE PRECISO PARA EVITAR BAN
	   },1000);
	}

	
}

function getConversationsIndex(){
	return document.querySelectorAll("[data-pre-plain-text]").length;
}

function getConversations(){
	return document.querySelectorAll("[data-pre-plain-text]");
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

function getConversationData(i){
	return document.querySelectorAll("[data-pre-plain-text]")[i].textContent;
}

function getConversationNameAndDate(i){
	return document.querySelectorAll("[data-pre-plain-text]")[i].parentElement.querySelector("div:nth-child(1)").getAttribute("data-pre-plain-text");
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}