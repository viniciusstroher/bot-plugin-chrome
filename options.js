

function save_options() {
  var status            = document.getElementById('status').value;
  
  var msg         = document.querySelector('.msg');
  msg.style.color = 'green';
  msg.innerHTML   = 'Options saved.';
  
  chrome.storage.sync.set({'status': status}, function() {
      console.log('Settings saved');
      
      if(status == "true"){
        chrome.tabs.executeScript({
            code: 'ponteiroContato=1;fillContactIndex();' //argument here is a string but function.toString() returns function's code
        }, (results) => {
            //Here we have just the innerHTML and not DOM structure
            console.log('Popup script:')
            console.log(results[0]);
        });
      }else{
        chrome.tabs.executeScript({
            code: 'ponteiroContato=1;' //argument here is a string but function.toString() returns function's code
        }, (results) => {
            //Here we have just the innerHTML and not DOM structure
            console.log('Popup script:')
            console.log(results[0]);
        });
      }
  });

  setTimeout(function() {
    msg.innerHTML = '';
  }, 750);
}

function restore_options() {
  chrome.storage.sync.get(['status'], function(items) {
    console.log(items);
    document.getElementById('status').value = items.status;
  });
}  


function conversation(){

    ponteiroContato=document.querySelector('[name=indexCovnersation]').value;
    // fillContactIndex();

    chrome.tabs.executeScript({
        code: 'ponteiroContato='+ponteiroContato+';fillContactIndex(true);' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
    });
}

function conversation2(){

    nomeContato = document.querySelector('[name=indexCovnersationName]').value;
    // fillContactIndex();

    chrome.tabs.executeScript({
        code: '(function (){ '+
              'var domToSearch = $(\'[dir=auto][title*="'+nomeContato+'"]\');'+
              'console.log(domToSearch);'+
              'if(domToSearch.length > 0){'+
              // '   alert(\'Iniciando\'); '+
              '   simulateMouseEvents(domToSearch[0],\'mousedown\');'+
              
              '     var maxConversations = getConversationsIndex(); '+
              '     var conversas = []; '+
              '     for(i = 0;i<maxConversations;i++){               '+
              '         conversas.push(getConversation(i)); '+
              '     } return conversas;'+
              
              '} else {' +
              '   return false; '+
              '}'+
              '})();'

    }, function(results) {
       //passar dom par o simulateclick e baixar nomes
        // (function (){return document.body.innerText;})();
        alert(results);
        //Here we have just the innerHTML and not DOM structure
        // console.log('Popup script:')
        // alert(results);
    });
}

// var getText = Array();
// chrome.tabs.executeScript(tabs[tab].id, {
//     "code": "document.getElementById(\"_Your_ID_Here_\").innerText.split(' ')"
// }, function (result) {
//     for (i = 0; i < result[0].length; i++)
//     getText [i] = result[0][i];
//     console.log(getText);
// });
// You hav

function initPlugin(){
  restore_options();
  document.getElementById('save').addEventListener('click',save_options);
  document.querySelector('#btn-conversation').addEventListener('click',conversation);
  document.querySelector('#btn-conversation2').addEventListener('click',conversation2);

  // setInterval(function(){
    
  // },1000);
}

document.addEventListener('DOMContentLoaded', initPlugin);
