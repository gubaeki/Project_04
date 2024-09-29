
const intro_container = document.getElementById('intro_container')
var start_bt = document.getElementById('start_bt');
var dark = document.getElementById('dark');




//---------------------------------------------------------------
// 이미지 Preload
let images = [
    "../../images/dark.png",
    "../../images/bg_intro1.png",
    "../../images/bg_intro2.png",
    "../../images/bottom.png",
    "../../images/bottom_success.png",
    "../../images/start.png",
    "../../images/item.png",
    "../../images/room1.png",
    "../../images/room1-1.png",
    "../../images/room1-2.png",
    "../../images/room1-2-1.png",
    "../../images/room1-3.png",
    "../../images/room1-3-1.png",
    "../../images/room1-3-2.png",
    "../../images/room1-3-3.png",
    "../../images/room1-4.png",
    "../../images/return.png",
    "../../images/hammer_bg.png",
    "../../images/hammer_item.png",
    "../../images/memo_bg_red.png",
    "../../images/memo_bg_blue.png",
    "../../images/towel_min.png",
    "../../images/switch_Off.png",
    "../../images/memo_red.png",
    "../../images/memo_blue.png",
    "../../images/tile.png",
    "../../images/light.png",
    "../../images/safe.png",
    "../../images/safe_open.png",
    "../../images/key.png",
    "../../images/glass.png",
    "../../images/success.png",
    "../../images/gotomain.png"];
let images_pre = [];

function preload(images) {
    for(let i = 0; i < images.length; i++) {
        images_pre[i] = new Image();
        images_pre[i].src = images[i];
      if(i === images.length - 1){console.log('preload finish');}
    }
  }

preload(images);


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
    setTimeout(function(){ //dark 두번 깜빡임 구현
        location.href='room_first.html'
    },3000);

    e.preventDefault();
});