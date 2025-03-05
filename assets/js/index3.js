
const intro_container = document.getElementById('intro_container')
var start_bt = document.getElementById('start_bt');
var dark = document.getElementById('dark');
var loading = document.getElementById('loading');




//---------------------------------------------------------------
// 이미지 Preload
let images = [
    "../../images/dark.png",
    "../../images/bg3_intro.gif",
    "../../images/bg3_intro.png",
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
    intro_container.setAttribute('src', 'images/bg3_intro.gif');

    setTimeout(() => {
        dark.style.display = 'block';
        dark.style.animation = "masking_off 3s 1"; 
    }, 6000);

    setTimeout(function(){ 
        location.href='room_third.html'
    },7000);

    e.preventDefault();
});