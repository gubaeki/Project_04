const start_container = document.getElementById('start_container')
const intro_container = document.getElementById('intro_container')


var banner = document.getElementById('banner3');
var bannerRect = banner.getBoundingClientRect();
var bannerWidth = bannerRect.width;
var bannerHeight = bannerRect.height;





start_container.addEventListener('touchstart', (e) => {
    console.log('aaa');
    intro_container.style.backgroundImage = "url('../../images/bg_intro2.png')";
    e.preventDefault();
});