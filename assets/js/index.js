
const intro_container = document.getElementById('intro_container')
var start_bt = document.getElementById('start_bt');
var dark = document.getElementById('dark');

var banner = document.getElementById('banner3');
var bannerRect = banner.getBoundingClientRect();
var bannerWidth = bannerRect.width;
var bannerHeight = bannerRect.height;





start_bt.addEventListener('touchstart', (e) => {
    start_bt.style.display = 'none';

    setTimeout(function(){
        dark.style.display = 'none';
        intro_container.setAttribute('src', 'images/bg_intro2.png');
    },500);
    
    setTimeout(function(){ //dark 두번 깜빡임 구현
        dark.style.display = 'block';
    },650);
    setTimeout(function(){ //dark 두번 깜빡임 구현
        dark.style.display = 'none';
    },750);
    setTimeout(function(){ //dark 두번 깜빡임 구현
        dark.style.display = 'block';
    },850);
    
    e.preventDefault();
});