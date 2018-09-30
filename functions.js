var contatos 	= {};
var salaStandBy = "STANDY_BY_BOT";

var salaStandyIniciada = false;

function simulateMouseEvents(element, eventName) {
	if($(element).length > 0){
	    var mouseEvent = document.createEvent ('MouseEvents');
	    mouseEvent.initEvent (eventName, true, true);
	    element.dispatchEvent (mouseEvent);
	}
}



//ID IMG 
//#pane-side > div > div > div > div:nth-child(18) > div > div > div.dIyEr > div
var checkAliveThread = null;
function checkAlive() {
	
	if(!isLoaded()){
		if(!salaStandyIniciada){
			//CARREGA CONTATOS NO START DA APLICAÇAO
			loadContacts();
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
		var numeroContatos  = 1;
		var ponteiroContato = 1;

		if(numeroContatos == 0){
			salaStandyIniciada  = true;
			return;
		}

		console.log('numeroContatos',numeroContatos);

		checkAliveThread = setInterval(function(){
   			//+1 por causa que o nth-child recisa sair em +1
		   	if(ponteiroContato == numeroContatos+1){
		   	 	console.log('Contatos carregados',contatos);
		   	 	//LIBERA A SALA PARA INICIAR O DETECT()
		   	 	salaStandyIniciada  = true;
		   	 	clearInterval(checkAliveThread);
		   	 	checkAliveThread = null;
		   	 	return;
		   	}

		   	//DPS DE CARREGAR
		   	if(!isLoaded()){
		   		console.log("Contatos "+ponteiroContato+" de "+numeroContatos);
				//CUIDAR !!!! POIS DIV div.dIyEr PODE MUDAR A CLASS dIyEr SE PARAR DE BUSCAR TODOS OS CONTATOS REVER ESSE PONTO
	   	 		var domSearch = "#pane-side > div > div > div > div:nth-child("+ponteiroContato+") > div > div > div.dIyEr > div";
	   	 		console.log('domSearch',domSearch,document.querySelector(domSearch));
	   	 		
	   	 		try{
	   	 			simulateMouseEvents(document.querySelector(domSearch), 'mousedown');
	   	 		}catch(ex){
	   	 			console.log('loadContacts simulateMouseEvents ',ex);
	   	 		}
	   	 		//PEGA CONVERSAS CONTATOS AQUI

	   	 		var name = getActualName();

	   	 		console.log('nomeContato',name);

				if(!contatos.hasOwnProperty(name) && name != ""){
					$.toast({
					    heading: 'Information',
					    text: 'Carregando '+name,
					    icon: 'info',
					    loader: true,        // Change it to false to disable loader
					    loaderBg: '#9EC600'  // To change the background
					})
					contatos[name] 			  = {};
					contatos[name].nome 	  = name;
					contatos[name].conversas  = [];

					var maxConversations = getConversationsIndex();

					for(i = 0;i<maxConversations;i++){
						//PEGA DATA
						dateWithName     = getConversationNameAndDate(i);
						console.log('dateWithName',maxConversations,i,dateWithName);
						dateConversation = null;
						if(dateWithName != null){
							dateWithoutName = dateWithName.match("\\[[^\\]]*]");

							dateConversation = null;
							if(dateWithoutName != null){
								
								isDate = dateWithoutName[0].substring(1,dateWithoutName[0].length-1).split(", ");
								console.log(isDate);
								if(isDate.length > 0){
									dateConversation = new Date(isDate[1].split("/").reverse().join("-")+" "+isDate[0]);
								}
							}
						}

						console.log(getConversationTextAudioImg(i));
						//PEGA DATA
						//DEIXA O METODO PEGANDO TEXT-AUDIO-IMG ea data
						contatos[name].conversas.push({msg:  getConversationText(i),
													   date: dateConversation
													 });
	   	 			}
	   	 		
	   	 			ponteiroContato++;
	   	 		}
	   	 		
	   	 		
		   	 	
		   	}
		   	//CUIDAR TEMPO DE RESPOSTA AUMENTAR SE PRECISO PARA EVITAR BAN
	   },4000);
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
	return document.querySelectorAll("[data-pre-plain-text]")[i].parentElement.querySelector("div:nth-child(1) [data-pre-plain-text]").getAttribute("data-pre-plain-text");
}


function getConversationsIndex(){
	// audio -> .message-in > input[type=range] ~ audio - pega o irmao audio de inpút type=range 
	// apenas imagem q tem blob: no incio do src sao os ativos de imagens mandados por usuario 
	return document.querySelectorAll(".message-in [data-pre-plain-text], .message-in img[src*=blob:], .message-in input[type=range] ~ audio");
}


function getConversationTextAudioImgAndData(i){
	//PEGAR DATA TB AQUI

	var obj = document.querySelectorAll(".message-out .copyable-text[data-pre-plain-text], .message-in .copyable-text[data-pre-plain-text], .message-in img[src*='blob:'], .message-in input[type=range] ~ audio")[i];

	// console.log(obj);

	// if(obj.tagName == "img" || obj.tagName == "audio" ){
	//  	data = obj.src;
	// }else{
	//  	data = obj.parentElement.querySelector("div:nth-child(1) [data-pre-plain-text]").getAttribute("data-pre-plain-text").textContent;
	// }
	
	console.log(data);

	// return obj;
	
}

function getActualName(){
	return document.querySelectorAll("#main header div:nth-child(2) div")[1].textContent
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

