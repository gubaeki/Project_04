var room = document.getElementById('intro_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;
const intro_container = document.getElementById('intro_container')
var loading = document.getElementById('loading');




//---------------------------------------------------------------
// 이미지 Preload
let images = [
    "../../images/main.png",
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



document.addEventListener('click', function(event) {

    var x = event.pageX;
    var y = event.pageY;

    if(x > roomWidth * 0.2 && x < roomWidth * 0.8 && y < roomHeight * 0.45 && y > roomHeight * 0.08){ // 터치패드 클릭
        console.log('방1');
        location.href='index.html'
    }
    else if(x > roomWidth * 0.2 && x < roomWidth * 0.8 && y < roomHeight * 0.95 && y > roomHeight * 0.55){ // 터치패드 클릭
        console.log('방2');
        location.href='index2.html'
    }
    
});