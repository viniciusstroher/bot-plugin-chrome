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
		// var numeroContatos  = 3;
		var ponteiroContato = 1;

		if(numeroContatos == 0){
			salaStandyIniciada  = true;
			return;
		}

		console.log('numeroContatos',numeroContatos);

		checkAliveThread = setInterval(function(){
   		
		   	if(ponteiroContato == numeroContatos){
		   	 	console.log('Contatos carregados',contatos);
		   	 	//LIBERA A SALA PARA INICIAR O DETECT()
		   	 	salaStandyIniciada  = true;
		   	 	clearInterval(checkAliveThread);
		   	 	checkAliveThread = null;
		   	 	return;
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

						contatos[name].conversas.push({msg:  getConversationText(i),
													   date: getConversationNameAndDate(i)
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