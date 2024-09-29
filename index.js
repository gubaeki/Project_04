
const intro_container = document.getElementById('intro_container')
var start_bt = document.getElementById('start_bt');
var dark = document.getElementById('dark');




//---------------------------------------------------------------
// 이미지 Preload
let images = [];

function preload() {
  for(let i = 0; i < preload.arguments.lenght; i++) {
    images[i] = new Image();
    images[i].src = preload.arguments.src;
  }
}
preload(
"./images/dark.png",
"./images/bg_intro1.png",
"./images/bg_intro2.png",
"./images/bottom.png",
"./images/bottom_success.png",
"./images/start.png",
"./images/item.png",
"./images/room1.png",
"./images/room1-1.png",
"./images/room1-2.png",
"./images/room1-2-1.png",
"./images/room1-3.png",
"./images/room1-3-1.png",
"./images/room1-3-2.png",
"./images/room1-3-3.png",
"./images/room1-4.png",
"./images/return.png",
"./images/hammer_bg.png",
"./images/hammer_item.png",
"./images/memo_bg_red.png",
"./images/memo_bg_blue.png",
"./images/towel_min.png",
"./images/switch_Off.png",
"./images/memo_red.png",
"./images/memo_blue.png",
"./images/tile.png",
"./images/light.png",
"./images/safe.png",
"./images/safe_open.png",
"./images/key.png",
"./images/glass.png",
"./images/success.png",
"./images/gotomain.png"
)





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