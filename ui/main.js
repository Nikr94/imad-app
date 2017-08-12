console.log('Loaded!');
var element = document.getElementById('main-text');

element.innerHTML ='New value';

//move th eimage

var img =document.getElementById('madi');
var marginLeft=0;
function moveRight()
{
    mmarginLeft = marginLeft +10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var interval = setInterval(moveRight,100);
};