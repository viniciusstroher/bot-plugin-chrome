
function save_options() {
  var status            = document.getElementById('status').value;
  localStorage.CRstatus = status;

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
  document.getElementById('status').value = localStorage.CRstatus ? localStorage.CRstatus : "true";
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);