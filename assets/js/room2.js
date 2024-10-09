//이미지 관련선언
var room = document.getElementById('room_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;
var bottom_img = document.getElementById('bottom_img');
var return_img = document.getElementById('return_img');
var loading = document.getElementById('loading');
var hint_icon = document.getElementById('hint_icon');


//item 관련선언
var item = [,,,,];
item[1] = document.getElementById('item_1');
item[2] = document.getElementById('item_2');
item[3] = document.getElementById('item_3');
item[4] = document.getElementById('item_4');

var itemFillName = ['base','none','none','none','none']; //채워진 아이템 이름
var itemSelectNum = 0; //선택한 아이템 번호
var itemSelectName; //선택한 아이템 이름


//기타 변수
var room_number = 1;
var hammer_get = false;
var towel_open = false;
var switch_open = true;
var darkness = false;
var memo_open = false;
var wall_broken = false;
var tile_broken = false;
var safe_value;
var safe_value_next;
var safe_count = 0;
var safe_open = false;
var subroom_open = false;
var subroom_in = false;
var glass_get = false;
var baekho_get = false;
var memo_blue_get = false;



//---------------------------------------------------------------
// 이미지 Preload

let images = [
    "../../images/bottom.png",
    "../../images/item.png",
    "../../images/room2-1.png"];

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

    
    if (baekho_get) {
        return; // 메시지가 이미 표시되고 있을 때는 클릭 이벤트를 무시
    }

    //터치좌표 입력 시 clientX 대신 pageX 사용(clientX는 현재보이는 화면 좌측 상단이 무조건 0, pageX는 문서의 좌측 상단이 0이고 스크롤이 생겨도 화면 좌측상단은 0이 아님)
    var x = event.pageX;
    var y = event.pageY;

    /*
    if(memo_open){ // 터치이벤트가 발생했을때 쪽지가 열려있으면 닫기(파랑도 추가 필요)
        console.log('1');
        memo_red.style.display = 'none';
        memo_open = false;
        item[1].style.backgroundColor="transparent";
        item[2].style.backgroundColor="transparent";
        item[3].style.backgroundColor="transparent";
        item[4].style.backgroundColor="transparent";
    }*/


    if(room_number === 1){ // 메인룸
        if(x > roomWidth * 0.85 && y < roomHeight * 0.4){ // 우측상단 소변기 클릭
            room.setAttribute('src', 'images/room1-1.png');
            return_img.style.display = 'block';
            room_number = 2;
            if(hammer_get == false){
                hammer_bg.style.display = 'block';
            }
            if(tile_broken){
                tile.style.display = 'block';
                light.style.display = 'none';
            }
            else{
                if(darkness){
                    light.style.display = 'block';
                    tile.style.display = 'none';
                }
                else{
                    light.style.display = 'none';
                    tile.style.display = 'none';
                }
            }
            
        }
    
        if(x > roomWidth * 0.5 && x < roomWidth * 0.67 && y < roomHeight * 0.5){ // 중앙 1사로 클릭
            console.log("1사로");
            if(wall_broken){
                room.setAttribute('src', 'images/room1-2-1.png');
            }
            else{
                room.setAttribute('src', 'images/room1-2.png');
            }
            return_img.style.display = 'block';
            room_number = 3;
            
        }

        if(x < roomWidth * 0.83 && x > roomWidth * 0.7 && y < roomHeight * 0.4){ // 우측상단 2사로 클릭
            console.log("2사로");
            if(subroom_open){
                room.setAttribute('src', 'images/room1-3-1.png');
            }
            else{
                room.setAttribute('src', 'images/room1-3.png');
            }
            return_img.style.display = 'block';
            room_number = 4;
        }

        if(x < roomWidth * 0.2 && y > roomHeight * 0.3 && y < roomHeight * 0.8){ // 좌측면(정문) 클릭
            console.log("정문");
            room.setAttribute('src', 'images/room1-4.png');
            return_img.style.display = 'block';
            room_number = 5;
            if(towel_open == true){
                towel_min.style.display = 'block';
            }
            if(switch_open == false){
                switch_Off.style.display = 'block';
            }
        }
    }

    else if(room_number === 2){ // 소변기 구석
        if(x < roomWidth * 0.2 && y > roomHeight * 0.83 && y < roomHeight * 0.97){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            memo_bg_blue.style.display = 'none';
            hammer_bg.style.display = 'none';
            tile.style.display = 'none';
            light.style.display = 'none';
            room_number = 1;
        }
        if(x < roomWidth * 0.6 && x > roomWidth * 0.5 && y > roomHeight * 0.62 && y < roomHeight * 0.72){ // 빛 위치 클릭
            if(darkness && tile_broken == false){
                light.style.display = 'none';
                tile.style.display = 'block';
                tile_broken = true;
                memo_bg_blue.style.display = 'block';
                var a = 1;
                    var interval = setInterval(function(){
                        memo_bg_blue.style.opacity = a;
                        a = a - 0.1;
                        if(a < 0){clearInterval(interval);};
                    }, 100);
                item_get('memo_blue');
                memo_blue_get = true;
            }
            console.log('1');
        }

    }

    else if(room_number === 3){ // 1사로
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            memo_bg_red.style.display = 'none';
            room_number = 1;
        }
        if(x < roomWidth * 0.78 && x > roomWidth * 0.67 && y > roomHeight * 0.35 && y < roomHeight * 0.45){ // 균열 클릭
            if(itemSelectName === 'hammer'){
                room.setAttribute('src', 'images/room1-2-1.png');
                memo_bg_red.style.display = 'block';
                wall_broken = true;
                var a = 1;
                var interval = setInterval(function(){
                    memo_bg_red.style.opacity = a;
                    a = a - 0.1;
                    if(a < 0){clearInterval(interval);};
                }, 100);

                item_used('hammer');
                item_reset();
                item_get('memo_red');

            }
        }
    }
    
    else if(room_number === 4){ // 2사로
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            subroom_in = false;
            room_number = 1;
        }
        if(subroom_open){
            if(subroom_in){
                if(x > roomWidth * 0.25 && x < roomWidth * 0.75 && y > roomHeight * 0.3 && y < roomHeight * 0.7){ // 백호돌이 클릭
                    if(itemSelectName == 'glass'){
                        room.setAttribute('src', 'images/room1-3-3.png');
                        baekho_get = true;
                        bottom_img.setAttribute('src', 'images/bottom_success.png');
                        hint_icon.style.display = 'none';
                        dark2.style.display = 'none';
                        return_img.style.display = 'none';
                        exit.style.display='block';
                        item_used('glass');
                        item_reset();
                    }
                }
            }
            else{
                if(y < roomHeight * 0.7){ // 백호돌이방 들어가기
                    room.setAttribute('src', 'images/room1-3-2.png');
                    subroom_in = true;
                }
            }
            
        }
        else{
            if(x > roomWidth * 0.17 && x < roomWidth * 0.43 && y > roomHeight * 0.3 && y < roomHeight * 0.61){ // 열쇠로 자물쇠 오픈
                if(itemSelectName === 'key'){
                    subroom_open = true;
                    room.setAttribute('src', 'images/room1-3-1.png');
    
                    item_used('key');
                    item_reset();
    
                }
            }
        }
        
        
        

    }

    else if(room_number === 5){ // 좌측면(정문)
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            towel_min.style.display = 'none';
            switch_Off.style.display = 'none';
            safe.style.display = 'none';
            safe_number.style.display = 'none';
            safe_reset();
            room_number = 1;

        }
        if(x > roomWidth * 0.35 && x < roomWidth * 0.53 && y > roomHeight * 0.4 && y < roomHeight * 0.54){ // 수건 클릭
            if(towel_open == false){
                towel_min.style.display = 'block';
                towel_open = true;
            }
            else{
                safe.style.display = 'block';
                safe_number.style.display = 'block';
            }
        }
        if(x > roomWidth * 0.9 && x < roomWidth * 0.95 && y > roomHeight * 0.55 && y < roomHeight * 0.66){ // 스위치 클릭
            if(switch_open == true){
                switch_Off.style.display = 'block';
                dark2.style.display = 'block';
                switch_open = false;
                darkness = true;
            }
            else{
                switch_Off.style.display = 'none';
                dark2.style.display = 'none';
                switch_open = true;
                darkness = false;
            }
        }
        if(x > roomWidth * 0.7 && x < roomWidth * 0.8 && y > roomHeight * 0.06 && y < roomHeight * 0.17){ // 시계 클릭
            if(glass_get == false){
                item_get('glass');
                glass_get = true;
            }
            else{
                //skip
            }
   
        }


        if(y < roomHeight * 0.2 || (y < roomHeight * 0.95 && y > roomHeight * 0.8)){  // 금고 창 닫기
            safe.style.display = 'none';
            safe_number.style.display = 'none';
            safe_reset();
        }
    }
});

// 해머 발견
hammer_bg.addEventListener('click', function(event) {
    hammer_bg.style.display = 'none';
    hammer_get = true;
    item_get('hammer');
});

// 메모 닫기
memo_red.addEventListener('click', function(event) {
    memo_red.style.display = 'none';
    memo_open = false;
    item_reset();
});
memo_blue.addEventListener('click', function(event) {
    memo_blue.style.display = 'none';
    memo_open = false;
    item_reset();
});

// 아이템컨테이너에서 아이템 선택 시
item[1].addEventListener('click', function(event) {
    if(itemSelectNum === 1){
        item[1].style.backgroundColor="transparent";
        itemSelectNum = 0;
        itemSelectName = 0;
    }
    else{
        item[1].style.backgroundColor="rgb(248, 144, 84)";
        item[2].style.backgroundColor="transparent";
        item[3].style.backgroundColor="transparent";
        item[4].style.backgroundColor="transparent";
        itemSelectNum = 1;
        itemSelectName = itemFillName[itemSelectNum];
    }
    memo_check(itemSelectName);
});
item[2].addEventListener('click', function(event) {
    if(itemSelectNum === 2){
        item[2].style.backgroundColor="transparent";
        itemSelectNum = 0;
        itemSelectName = 0;
    }
    else{
        item[1].style.backgroundColor="transparent";
        item[2].style.backgroundColor="rgb(248, 144, 84)";
        item[3].style.backgroundColor="transparent";
        item[4].style.backgroundColor="transparent";
        itemSelectNum = 2;
        itemSelectName = itemFillName[itemSelectNum];
    }
    memo_check(itemSelectName);
});
item[3].addEventListener('click', function(event) {
    if(itemSelectNum === 3){
        item[3].style.backgroundColor="transparent";
        itemSelectNum = 0;
        itemSelectName = 0;
    }
    else{
        item[1].style.backgroundColor="transparent";
        item[2].style.backgroundColor="transparent";
        item[3].style.backgroundColor="rgb(248, 144, 84)";
        item[4].style.backgroundColor="transparent";
        itemSelectNum = 3;
        itemSelectName = itemFillName[itemSelectNum];
    }
    memo_check(itemSelectName);
});
item[4].addEventListener('click', function(event) {
    if(itemSelectNum === 4){
        item[4].style.backgroundColor="transparent";
        itemSelectNum = 0;
        itemSelectName = 0;
    }
    else{
        item[1].style.backgroundColor="transparent";
        item[2].style.backgroundColor="transparent";
        item[3].style.backgroundColor="transparent";
        item[4].style.backgroundColor="rgb(248, 144, 84)";
        itemSelectNum = 4;
        itemSelectName = itemFillName[itemSelectNum];
    }
    memo_check(itemSelectName);
});

function item_get(itemName){
    console.log('item get');
    var i;
    for(i=1;i<5;i++){
        if(itemFillName[i]=='none'){
            itemFillName[i] = itemName;
            if(itemName=='hammer'){
                item[i].setAttribute('src', 'images/hammer_item.png');
            }
            else if(itemName=='memo_red'){
                item[i].setAttribute('src', 'images/memo_bg_red.png');
            }
            else if(itemName=='memo_blue'){
                item[i].setAttribute('src', 'images/memo_bg_blue.png');
            }
            else if(itemName=='key'){
                item[i].setAttribute('src', 'images/key.png');
            }
            else if(itemName=='glass'){
                item[i].setAttribute('src', 'images/glass.png');
            }
            break;
        }
        else{
            //skip
        }
    } 
}
function item_used(itemName){
    console.log('item used');
    var i;
    for(i=1;i<5;i++){
        if(itemFillName[i]==itemName){
            itemFillName[i] = 'none';
            item[i].setAttribute('src', 'images/sample.png');
            break;
        }
        else{
            //skip
        }
    } 
}
function item_reset(){
    console.log('item reset');
    itemSelectNum = 0;
    itemSelectName = 0;
    item[1].style.backgroundColor="transparent";
    item[2].style.backgroundColor="transparent";
    item[3].style.backgroundColor="transparent";
    item[4].style.backgroundColor="transparent";
}


function memo_check(itemSelectName){
    if(memo_open){
        memo_red.style.display = 'none';
        memo_blue.style.display = 'none';
        memo_open = false;
        item[1].style.backgroundColor="transparent";
        item[2].style.backgroundColor="transparent";
        item[3].style.backgroundColor="transparent";
        item[4].style.backgroundColor="transparent";
    }
    else{
        if(itemSelectName=='memo_red'){
            memo_red.style.display = 'block';
            memo_blue.style.display = 'none';
            memo_open = true;
        }
        else if(itemSelectName=='memo_blue'){
            memo_blue.style.display = 'block';
            memo_red.style.display = 'none';
            memo_open = true;
        }
    }
}

// 금고 비밀번호 입력
safe.addEventListener('click', function(event) {
    var x = event.pageX;
    var y = event.pageY;

    if(safe_open == false){
        if(x > roomWidth * 0.675 && x < roomWidth * 0.745 && y > roomHeight * 0.585 && y < roomHeight * 0.635){ // 0
            safe_check('0');
        }
        else if(x > roomWidth * 0.585 && x < roomWidth * 0.655 && y > roomHeight * 0.515 && y < roomHeight * 0.565){ // 1
            safe_check('1');
        }
        else if(x > roomWidth * 0.675 && x < roomWidth * 0.745 && y > roomHeight * 0.515 && y < roomHeight * 0.565){ // 2
            safe_check('2');
        }
        else if(x > roomWidth * 0.765 && x < roomWidth * 0.835 && y > roomHeight * 0.515 && y < roomHeight * 0.565){ // 3
            safe_check('3');
        }
        else if(x > roomWidth * 0.585 && x < roomWidth * 0.655 && y > roomHeight * 0.445 && y < roomHeight * 0.495){ // 4
            safe_check('4');
        }
        else if(x > roomWidth * 0.675 && x < roomWidth * 0.745 && y > roomHeight * 0.445 && y < roomHeight * 0.495){ // 5
            safe_check('5');
        }
        else if(x > roomWidth * 0.765 && x < roomWidth * 0.835 && y > roomHeight * 0.445 && y < roomHeight * 0.495){ // 6
            safe_check('6');
        }
        else if(x > roomWidth * 0.585 && x < roomWidth * 0.655 && y > roomHeight * 0.385 && y < roomHeight * 0.425){ // 7
            safe_check('7');
        }
        else if(x > roomWidth * 0.675 && x < roomWidth * 0.745 && y > roomHeight * 0.385 && y < roomHeight * 0.425){ // 8
            safe_check('8');
        }
        else if(x > roomWidth * 0.765 && x < roomWidth * 0.835 && y > roomHeight * 0.385 && y < roomHeight * 0.425){ // 9
            safe_check('9');
        }
        else if(x > roomWidth * 0.765 && x < roomWidth * 0.835 && y > roomHeight * 0.585 && y < roomHeight * 0.635){ // Del
            safe_reset();
        }
    }
    
    event.preventDefault();
    
});

//금고 비밀번호 체크 함수
function safe_check(safe_value_next){
    if(safe_count === 0){
        safe_value = safe_value_next;
        safe_count++;
        console.log(safe_value);
    }
    else{
        if(safe_count === 4){
            safe_value = safe_value_next;
            safe_count = 1;
        }
        else{
            safe_value = safe_value + safe_value_next;
            safe_count++;
        }
        console.log(safe_value);
    }
    safe_number.textContent = safe_value;
    if(safe_value=='2019'){
        safe_open = true;
        safe_number.style.display = 'none';
        safe.setAttribute('src', 'images/safe_open.png');
        key.style.display = 'block';
        var a = 1;
        var interval = setInterval(function(){
            key.style.opacity = a;
            a = a - 0.1;
            if(a < 0){clearInterval(interval);};
        }, 100);

        item_used('memo_red');
        item_used('memo_blue');
        item_reset();
        item_get('key');
        
    }
} 
function safe_reset(){
    safe_count = 0;
    safe_value = 0;
    safe_number.textContent = '';
}

exit.addEventListener('click', function(event) {
    exit.style.display = 'none';
    masking.style.display = 'block';
    masking.style.animation = "masking_off 1.5s 1";
    setTimeout(() => {
        masking.style.animation = "masking_on 1.5s 1";
        room.setAttribute('src', 'images/ending.gif');
    }, 1500);
    setTimeout(() => {
        masking.style.display = 'none';
        finish.style.display = 'block';
        gotomain.style.display='block';
        finish.style.animation = "masking_off 4s 1";
        gotomain.style.animation = "masking_off 4s 1"; 
    }, 8000);
    
    
});

gotomain.addEventListener('click', function(event) {
    gotomain.style.display = 'none';
    location.replace('https://gubaeki.github.io/Project_04');

});

hint_icon.addEventListener('click', function(event) {
    if(subroom_open){
        bottom_img.setAttribute('src', 'images/hint_3.png');
    }
    else if(memo_blue_get){
        bottom_img.setAttribute('src', 'images/hint_2.png');
    }
    else{
        bottom_img.setAttribute('src', 'images/hint_1.png');
    }
});

