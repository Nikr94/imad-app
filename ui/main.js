console.log('Loaded!');
var element = document.getElementById('main-text');

element.innerHTML ='New value';

//move th eimage

var img =document.getElementById('madi');
img.onclick = function () {
    img.style.marginLeft ='100px';
};