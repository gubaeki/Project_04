
const intro_container = document.getElementById('intro_container')
var start_bt = document.getElementById('start_bt');
var dark = document.getElementById('dark');
var loading = document.getElementById('loading');




//---------------------------------------------------------------
// 이미지 Preload
let images = [
    "../../images/dark.png",
    "../../images/bg_intro1.png",
    "../../images/bg_intro2.png",
    "../../images/bottom.png",
    "../../images/start.png"
];
    let images_pre = [];

    var fail_count = 0;
    
    function preload(images) {
        for(let i = 0; i < images.length; i++) {
            images_pre[i] = new Image();
            images_pre[i].src = images[i];
            if(images_pre[i].complete == false){
                fail_count++;
                console.log(i);
            }
            
          if(i === images.length - 1){console.log('preload finish');}
        }
      }
    
    preload(images);
    console.log(fail_count);
    
    
    window.onload = function(){
        console.log('로드완료');
        loading.style.display = 'none';
    }


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