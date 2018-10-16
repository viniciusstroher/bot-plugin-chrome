var contatos 		   = {};
var salaStandyIniciada = false;
var statusBot 		   = false;

function simulateMouseEvents(element, eventName) {
	if($(element).length > 0){
	    var mouseEvent = document.createEvent ('MouseEvents');
	    mouseEvent.initEvent (eventName, true, true);
	    element.dispatchEvent (mouseEvent);
	}
}

function mobileNotOnline(){
	alert = $("[data-animate-modal-body='true'] div:contains(Tentando conectar ao celular)").length;
	if(alert.length > 0){
		//CELULAR OFFLINE !!!!!!!!!
	}
}


//ID IMG 
//#pane-side > div > div > div > div:nth-child(18) > div > div > div.dIyEr > div
var checkAliveThread = null;
function checkAlive() {
	chrome.storage.sync.get(['status'], function(items) {
	  console.log('checkAlive',items);
	  
	  if(!items.status || items.status == "false"){
	  	statusBot = false;
	  }else{
	  	statusBot = true;
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

	});
	

}

function isOfflinePhone(){
	return document.querySelector('[data-icon="alert-phone"]') != null ? true : false;
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

var ponteiroContato = 1;
function loadContacts(){
	if(!statusBot){
		return;
	}

	if(checkAliveThread == null){
				
		var numeroContatos  = document.querySelectorAll("#pane-side > div > div > div > div").length;
		// var numeroContatos  = 1;
		// var ponteiroContato = 1;
		if(numeroContatos == 0){
			salaStandyIniciada  = true;
			return;
		}

		console.log('numeroContatos',numeroContatos);
		console.log('ponteiroContato',ponteiroContato);

		checkAliveThread = setInterval(function(){
   			//+1 por causa que o nth-child recisa sair em +1
		   	if(ponteiroContato == numeroContatos || !statusBot){
		   	 	console.log('Contatos carregados',contatos);
		   	 	//LIBERA A SALA PARA INICIAR O DETECT()
		   	 	salaStandyIniciada  = true;
		   	 	clearInterval(checkAliveThread);
		   	 	checkAliveThread = null;
		   	 	return;
		   	}

		   	console.log("Contatos "+ponteiroContato+" de "+numeroContatos);
		   	fillContactIndex();
		   	//CUIDAR TEMPO DE RESPOSTA AUMENTAR SE PRECISO PARA EVITAR BAN
	   },4000);
	}

	
}

function mountNamePlugins(){
	var names = getAllContatcsNamesLabel();
	
	$.each(names,function(k,v){

	});
}

function getAllContatcsNamesLabel(){
	return document.querySelectorAll("[tabindex] span[title][dir=auto]");
}

function getAllContatcsNamesLabelByName(name){
	return document.querySelectorAll("[tabindex] span[title="+name+"][dir=auto]");
}

function isLoadedConversationScreen(){
	//verificar se a tela de conversas ja foi carregada !!!!
	return document.querySelector("[title*='Carregando mensagens']") != null ? true : false;
}

function fillContactIndex(contatoAlreadyLoaded){

	if(contatoAlreadyLoaded == undefined){
		contatoAlreadyLoaded = false;
	}

	//DPS DE CARREGAR
	//COLOCA isLoaded para a tela de mensagem do contato -> verificar se o loading ainda existe
   	if(!isLoaded() && !isLoadedConversationScreen()){
   		console.log('ponteiroContato',ponteiroContato);

		//CUIDAR !!!! POIS DIV div.dIyEr PODE MUDAR A CLASS dIyEr SE PARAR DE BUSCAR TODOS OS CONTATOS REVER ESSE PONTO
	 		var domSearch = "#pane-side > div > div > div > div:nth-child("+ponteiroContato+") > div > div > div.dIyEr > div";
	 		console.log('domSearch',domSearch,document.querySelector(domSearch));
	 		
	 		try{	 			
	 			var domExists = document.querySelector(domSearch);
	 			simulateMouseEvents(domExists, 'mousedown');
	 			if(domExists != null){
	 				domExists2 = domExists.parentElement.parentElement;
	 				console.log('domExists',domExists);
	 				
	 				if(domExists2 != null){
	 					if(  domExists2.querySelector('.index-contato') == null){
	 						domExists2.innerHTML += "<span class='index-contato' style='color:red;'>"+ponteiroContato+"</span>";
	 					}
	 				}
	 			}
	 		}catch(ex){
	 			console.log('loadContacts simulateMouseEvents ',ex);
	 		}
	 		//PEGA CONVERSAS CONTATOS AQUI

	 		var name = getActualName();

	 		console.log('nomeContato',name);

		if((!contatos.hasOwnProperty(name) ||  contatoAlreadyLoaded) && name != "" && name != null){
			

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
				contatos[name].conversas.push(getConversation(i,name));
 			}
	 		
 			ponteiroContato++;
 			sendMSg('addContact',{nome:name,conversas:contatos[name].conversas});
 		}

   	}
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
	return document.querySelectorAll(".message-out .copyable-text[data-pre-plain-text], .message-in .copyable-text[data-pre-plain-text], .message-in img[src*='blob:'], .message-in input[type=range] ~ audio").length;
}


function getConversation(i){
	//PEGAR DATA TB AQUI

	var obj  = document.querySelectorAll(".message-out .copyable-text[data-pre-plain-text], .message-in .copyable-text[data-pre-plain-text], .message-in img[src*='blob:'], .message-in input[type=range] ~ audio")[i];
	var date = null;
	//tagname nao funciona
	console.log(obj.tagName,obj);

	if(obj.tagName == "IMG" || obj.tagName == "AUDIO" ){
		//carregar ajax obj.src e pegar o blob e salvar
	  	data = obj.src;
	  	// ,filename:name+ https://developer.chrome.com/extensions/downloads
	  	//manda para o bg
	  	// chrome.runtime.sendMessage({url: obj.src});
	  	
	  	console.log("IMG OR AUDIO",data);
	  	sendMSg('save',{src:data.replace("blob:","")});

	  	//pegar a data da img e audio aqui
	}else{
		console.log(obj,obj.parentElement);
	 	
	 	//SE TIVER EMOJIS 
	 	if(obj.querySelectorAll("img").length > 0){
	 		data = obj;
	 		sendMSg('save',{src:obj.querySelector("img").src.replace("blob:","")});
	 		console.log("TEXTO COM IMG",data);
	 	}else{
	 		data = obj.textContent;
	 		console.log("TEXTO",data);
	 	}
	 	
	 	date = obj.parentElement.querySelector("div:nth-child(1) [data-pre-plain-text]").getAttribute("data-pre-plain-text");
	  	date = parseDate(date);

	 	//pegar data da msg aqui
	}
	
	
	return {data:data,date:date};
	
}

function getActualName(){
	if(document.querySelectorAll("#main header div:nth-child(2) div") == null){
		return null;
	}

	if(document.querySelectorAll("#main header div:nth-child(2) div")[1] == undefined){
		return null;
	}

	return document.querySelectorAll("#main header div:nth-child(2) div")[1].textContent;
	
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


function parseDate(dateWithName){
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
	return dateConversation;
}



function sendMSg(event,data){
	chrome.extension.sendMessage({type: event, data}, function(response) {
	    //code to initialize my extension
	});
	console.log('sendMsg',data);
	//code to send message to open notification. This will eventually move into my extension logic
	// chrome.runtime.sendMessage({type: event, data});
}