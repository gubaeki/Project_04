//이미지 관련선언
var room = document.getElementById('room_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;
var bottom_img = document.getElementById('bottom_img');
var return_img = document.getElementById('return_img');
var loading = document.getElementById('loading');
var hint_icon = document.getElementById('hint_icon');
var driver_bg = document.getElementById('driver_bg');
var driver_item = document.getElementById('driver_item');
var cover_large = document.getElementById('cover_large');
var cover_small = document.getElementById('cover_small');
var line_cut = document.getElementById('line_cut');
var line_cut_small = document.getElementById('line_cut_small');
var crowbar = document.getElementById('crowbar');
var door_left = document.getElementById('door_left');
var door_right = document.getElementById('door_right');
var line_item = document.getElementById('line_item');
var lever_down = document.getElementById('lever_down');
var lever_up = document.getElementById('lever_up');
var room21_inner_bg = document.getElementById('room2-1_inner_bg');
var room21_inner = document.getElementById('room2-1_inner');
var pass_lever_light = document.getElementById('pass_lever_light');
var pass_lever = document.getElementById('pass_lever');
var close = document.getElementById('close');


//item 관련선언
var item = [,,,,];
item[1] = document.getElementById('item_1');
item[2] = document.getElementById('item_2');
item[3] = document.getElementById('item_3');
item[4] = document.getElementById('item_4');

var itemFillName = ['base','none','none','none','none']; //채워진 아이템 이름
var itemSelectNum = 0; //선택한 아이템 번호
var itemSelectName; //선택한 아이템 이름

//cable 슬라이딩 퍼즐 관련선언
var cable = [];
var cable_position = [];
cable[0] = document.getElementById('cable1'); cable_position[0] = 5;
cable[1] = document.getElementById('cable2'); cable_position[1] = 4;
//cable[2] = document.getElementById('cable3'); cable_position[2] = 3;
cable[3] = document.getElementById('cable4'); cable_position[3] = 7;
cable[4] = document.getElementById('cable5'); cable_position[4] = 8;
cable[5] = document.getElementById('cable6'); cable_position[5] = 2;
cable[6] = document.getElementById('cable7'); cable_position[6] = 9;
cable[7] = document.getElementById('cable8'); cable_position[7] = 1;
cable[8] = document.getElementById('cable9'); cable_position[8] = 6;
var cable_select = 0;
var cable_empty = 3;


//기타 변수
var room_number = 1;
var driver_get = false;
var cover_open = false;
var line_connection = false;
var crowbar_get = false;
var door_open = false;
var line_get = false;
var puzzle_clear = false;
var electrical_connection = false;
var pass_lever_open = false;

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
    "../../images/room2-1.png",
    "../../images/room2-2.png",
    "../../images/room2-3.png",
    "../../images/cover_large.png",
    "../../images/cover_small.png",
    "../../images/driver_bg.png",
    "../../images/driver_item.png",
    "../../images/line_cut.png",
    "../../images/line_cut_small.png",
    "../../images/crowbar.png",
    "../../images/room2-1_inner.png",
    "../../images/door_left.png",
    "../../images/door_right.png",
    "../../images/line_item.png",
    "../../images/lever_down.png",
    "../../images/lever_up.png",
    "../../images/1.png",
    "../../images/2.png",
    "../../images/4.png",
    "../../images/5.png",
    "../../images/6.png",
    "../../images/7.png",
    "../../images/8.png",
    "../../images/9.png"

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

    


    //터치좌표 입력 시 clientX 대신 pageX 사용(clientX는 현재보이는 화면 좌측 상단이 무조건 0, pageX는 문서의 좌측 상단이 0이고 스크롤이 생겨도 화면 좌측상단은 0이 아님)
    var x = event.pageX;
    var y = event.pageY;


    // 비밀번호 레버창 열려있을 시 창 닫기
    if (pass_lever_open && (y < roomHeight * 0.2 ||  y > roomHeight * 0.8)) {
        pass_lever.style.display = 'none';
        pass_lever_open = false;
        close.style.display = 'none';
        return; // 메시지가 이미 표시되고 있을 때는 클릭 이벤트를 무시
    }

    if(room_number === 1){ // 메인룸
        if(x > roomWidth * 0.05 && x < roomWidth * 0.21 && y < roomHeight * 0.52 && y > roomHeight * 0.35){ // 터치패드 클릭
            room_number = 2;
            room.setAttribute('src', 'images/room2-2.png');
            return_img.style.display = 'block';
            cover_small.style.display = 'none';
            line_cut_small.style.display = 'none';
            crowbar.style.display = 'none';

            if(cover_open){
                cover_large.style.display = 'none';
                if(line_connection){
                    line_cut.style.display = 'none';
                }
                else{
                    line_cut.style.display = 'block';
                }
            }
            else{
                cover_large.style.display = 'block';
                line_cut.style.display = 'block';
            }

        }
        else if(x > roomWidth * 0.27 && x < roomWidth * 0.73 && y < roomHeight * 0.11){ // 천장 클릭
            room_number = 3;
            room.setAttribute('src', 'images/room2-3.png');
            return_img.style.display = 'block';
            cover_small.style.display = 'none';
            cover_small.style.display = 'none';
            line_cut_small.style.display = 'none';
            crowbar.style.display = 'none';

            if(driver_get == false){
                driver_bg.style.display = 'block';
            }
            

        }
        else if(x > roomWidth * 0.06 && x < roomWidth * 0.22 && y > roomHeight * 0.69 && y < roomHeight * 0.90){ // crowbar 클릭
            if(crowbar_get == false){
                crowbar.style.display = 'none';
                crowbar_get = true;
                item_get('crowbar');
                item_reset();
            } 
        }
        else if(x > roomWidth * 0.4 && x < roomWidth * 0.60 && y > roomHeight * 0.25 && y < roomHeight * 0.85 && door_open == false){ // 중앙 엘리베이터 문 클릭
            if(itemSelectName == 'crowbar'){
                item_used('crowbar');
                item_reset();

                door_open = true;
                door_left.style.left = "-28%";
                door_left.style.transition = "all 1s 0.4s"; 
                door_right.style.left = "28%";
                door_right.style.transition = "all 1s 0.4s"; 
                room.style.pointerEvents = 'none'; // 슬라이딩 퍼즐 클릭이 가능하도록(하위 z-index 클릭이 가능하도록) 옵션 부여
            }

        }
        else if(x > roomWidth * 0.80 && x < roomWidth * 0.95 && y > roomHeight * 0.05 && y < roomHeight * 0.15){ // CCTV 클릭
            if(line_get == false){
                line_get = true;
                item_get('line');
                item_reset();
            }
        }

    }

    else if(room_number === 2){ // 터치패드
        if(x < roomWidth * 0.2 && y > roomHeight * 0.83 && y < roomHeight * 0.97){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room2-1.png');
            return_img.style.display = 'none';
            cover_large.style.display = 'none';
            line_cut.style.display = 'none';
            room_number = 1;

            if(cover_open){
                cover_small.style.display = 'none';
                if(line_connection){
                    line_cut_small.style.display = 'none';
                }
                else{
                    line_cut_small.style.display = 'block';
                }
            }
            else{
                cover_small.style.display = 'block';
                line_cut_small.style.display = 'block';
                
            }
            if(crowbar_get == false){
                crowbar.style.display = 'block';
            }
        }
        else if(x < roomWidth * 0.73 && x > roomWidth * 0.3 && y > roomHeight * 0.75 && y < roomHeight * 0.97){ // 커버 클릭
            if(itemSelectName === 'driver'){
                cover_open = true;
                cover_large.style.rotate = '10deg';
                var a = 1;
                var interval = setInterval(function(){
                    cover_large.style.opacity = a;
                    a = a - 0.1;
                    if(a < 0){clearInterval(interval);};
                }, 50);
                setTimeout(() => {
                    cover_large.style.display = 'none';
                }, 500);

                item_used('driver');
                item_reset();
            }
        }
    }

    else if(room_number === 3){ // 천장
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room2-1.png');
            return_img.style.display = 'none';
            driver_bg.style.display = 'none';
            room_number = 1;

            if(cover_open){
                cover_small.style.display = 'none';
                if(line_connection){
                    line_cut_small.style.display = 'none';
                }
                else{
                    line_cut_small.style.display = 'block';
                }
            }
            else{
                cover_small.style.display = 'block';
                line_cut_small.style.display = 'block';
                
            }
            if(crowbar_get == false){
                crowbar.style.display = 'block';
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


//---------------------------------------- 아이템 사용 or 획득----------------------------------------------
// 드라이버 발견
driver_bg.addEventListener('click', function(event) {
    driver_bg.style.display = 'none';
    driver_get = true;
    item_get('driver');
    item_reset();
});
// 전선 사용
line_cut.addEventListener('click', function(event) {
    if(itemSelectName === 'line'){
        line_connection = true;
        line_cut.style.display = 'none';
        item_used('line');
        item_reset();
    }
});
// 메인레버 클릭
lever_down.addEventListener('click', function(event) {
    if( electrical_connection == true){
        lever_down.style.display = 'none';
        lever_up.style.display = 'block';
    }
    else{
        lever_down.style.animation = "jiggle_lever 0.3s 1";
        setTimeout(() => {
            lever_down.style.animation = "none";
        }, 300);
        console.log('aa');
    }
});
// 패스워드 레버 클릭(퍼즐 클리어 후)
pass_lever_light.addEventListener('click', function(event) {
    pass_lever.style.display = 'block';
    close.style.display = 'block';
    pass_lever_open = true;
});
// 패스워드 레버 창에서 닫기 버튼 클릭
close.addEventListener('click', function(event) {
    pass_lever.style.display = 'none';
    pass_lever_open = false;
    close.style.display = 'none';
});

//---------------------------------------- 슬라이딩 퍼즐----------------------------------------------
cable[0].addEventListener('click', function(event) {
    cable_select = cable_position[0];
    console.log(cable_position[0] + ' 클릭, origin : cable[0]');
    empty_check(cable_select, 0);
});
cable[1].addEventListener('click', function(event) {
    cable_select = cable_position[1];
    console.log(cable_position[1] + ' 클릭, origin : cable[1]');
    empty_check(cable_select, 1);
});
/*
cable[2].addEventListener('click', function(event) {
    cable_select = cable_position[2];
    console.log(cable_position[2] + ' 클릭, origin : cable[2]');
    empty_check(cable_select, 2);
});
*/
cable[3].addEventListener('click', function(event) {
    cable_select = cable_position[3];
    console.log(cable_position[3] + ' 클릭, origin : cable[3]');
    empty_check(cable_select, 3);
});
cable[4].addEventListener('click', function(event) {
    cable_select = cable_position[4];
    console.log(cable_position[4] + ' 클릭, origin : cable[4]');
    empty_check(cable_select, 4);
});
cable[5].addEventListener('click', function(event) {
    cable_select = cable_position[5];
    console.log(cable_position[5] + ' 클릭, origin : cable[5]');
    empty_check(cable_select, 5);});
cable[6].addEventListener('click', function(event) {
    cable_select = cable_position[6];
    console.log(cable_position[6] + ' 클릭, origin : cable[6]');
    empty_check(cable_select, 6);
});
cable[7].addEventListener('click', function(event) {
    cable_select = cable_position[7];
    console.log(cable_position[7] + ' 클릭, origin : cable[7]');
    empty_check(cable_select, 7);
});
cable[8].addEventListener('click', function(event) {
    cable_select = cable_position[8];
    console.log(cable_position[8] + ' 클릭, origin : cable[8]');
    empty_check(cable_select, 8);
});

// 4방향 empty 확인
function empty_check(selectNum, origin){ 
    if(selectNum-1===cable_empty && selectNum%3!=1){
        console.log("왼쪽 비어있음");
        cable_position[origin] = cable_empty;
        cable_empty = selectNum;
        console.log('cable[' + origin + ']위치 ' + cable_position[origin]+'으로 변경');
        if(selectNum%3===2){
            cable[origin].style.left = "39.5%";
            cable[origin].style.transition = "all 0.2s 0s";        
        }
        else{
            cable[origin].style.left = "51.9%";
            cable[origin].style.transition = "all 0.2s 0s"; 
        }
              
        matching_check();
    }
    else if(selectNum+1===cable_empty && selectNum%3!=0){
        console.log("오른쪽 비어있음");
        cable_position[origin] = cable_empty;
        cable_empty = selectNum;
        console.log('cable[' + origin + ']위치 ' + cable_position[origin]+'으로 변경');
        if(selectNum%3===1){
            cable[origin].style.left = "51.9%";
            cable[origin].style.transition = "all 0.2s 0s";        
        }
        else{
            cable[origin].style.left = "64.2%";
            cable[origin].style.transition = "all 0.2s 0s"; 
        }
        matching_check();
    }
    else if(selectNum-3===cable_empty){
        console.log("위쪽 비어있음");
        cable_position[origin] = cable_empty;
        cable_empty = selectNum;
        console.log('cable[' + origin + ']위치 ' + cable_position[origin]+'으로 변경');
    if(selectNum>6){
        cable[origin].style.top = "41.3%";
        cable[origin].style.transition = "all 0.2s 0s";        
        }
        else{
            cable[origin].style.top = "35.8%";
            cable[origin].style.transition = "all 0.2s 0s"; 
        }
        matching_check();
    }
    else if(selectNum+3===cable_empty){
        console.log("아래쪽 비어있음");
        cable_position[origin] = cable_empty;
        cable_empty = selectNum;
        console.log('cable[' + origin + ']위치 ' + cable_position[origin]+'으로 변경');
        if(selectNum<4){
            cable[origin].style.top = "41.3%";
            cable[origin].style.transition = "all 0.2s 0s";        
        }
        else{
            cable[origin].style.top = "46.8%";
            cable[origin].style.transition = "all 0.2s 0s"; 
        }
        matching_check();
    }
    
}

// 퍼즐 완성 여부 확인
function matching_check(){
  var i = 0 ;
  var matching_count = 0;
  for(i;i<9;i++){
    if(cable_position[i]===i+1){
      matching_count++;
    }
  }
  if(matching_count===8){
    cable[0].style.display = 'none';
    cable[1].style.display = 'none';
    cable[3].style.display = 'none';
    cable[4].style.display = 'none';
    cable[5].style.display = 'none';
    cable[6].style.display = 'none';
    cable[7].style.display = 'none';
    cable[8].style.display = 'none';
    room21_inner_bg.style.display = 'none';
    puzzle_clear = true;
    pass_lever_light.style.display = 'block';
    
  }
  console.log(matching_count);
}




//---------------------------------------- 아이템 컨테이너 ----------------------------------------------
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
});

function item_get(itemName){
    console.log('item get');
    var i;
    for(i=1;i<5;i++){
        if(itemFillName[i]=='none'){
            itemFillName[i] = itemName;
            if(itemName=='driver'){
                item[i].setAttribute('src', 'images/driver_item.png');
            }
            else if(itemName=='crowbar'){
                item[i].setAttribute('src', 'images/crowbar.png');
            }
            else if(itemName=='line'){
                item[i].setAttribute('src', 'images/line_item.png');
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



// 금고 비밀번호 입력
/*
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
*/
/*
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
*/

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

