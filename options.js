console.log = function(){};
function save_options() {
  var status            = document.getElementById('status').value;
  
  var msg         = document.querySelector('.msg');
  msg.style.color = 'green';
  msg.innerHTML   = 'Options saved.';
  
  chrome.storage.sync.set({'status': status}, function() {
      console.log('Settings saved');
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
    fillContactIndex();

}
      

function initPlugin(){
  restore_options();
  document.getElementById('save').addEventListener('click',save_options);
  document.querySelector('#btn-conversation').addEventListener('click',conversation);

}

document.addEventListener('DOMContentLoaded', initPlugin);
