function showSpinner() {
  document.getElementsByClassName('layerPopup')[0].style.display='block';
}
function hideSpinner() {
  document.getElementsByClassName('layerPopup')[0].style.display='none';
}

showSpinner()
setTimeout(function(){
  hideSpinner();
}, 1000);