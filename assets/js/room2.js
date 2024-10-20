//이미지 관련선언
var room = document.getElementById('room_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;
var bottom_img = document.getElementById('bottom_img');
var return_img = document.getElementById('return_img');
var loading = document.getElementById('loading');
var hint_icon = document.getElementById('hint_icon');
var puzzle_skip_icon = document.getElementById('puzzle_skip_icon');
var password_skip_icon = document.getElementById('password_skip_icon');
var password_icon = document.getElementById('password_icon');
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
var spark = document.getElementById('spark');
var lever_light = document.getElementById('lever_light');
var cctv_before = document.getElementById('cctv_before');
var nipper_bg = document.getElementById('nipper_bg');
var floor = document.getElementById('floor');
var light_1 = document.getElementById('light_1');
var exit = document.getElementById('exit');
var masking = document.getElementById('masking');
var krun_intro = document.getElementById('krun_intro');
var krun_masking = document.getElementById('krun_masking');
var gameover = document.getElementById('gameover');
var ending2 = document.getElementById('ending2');
var finish = document.getElementById('finish');
var gotomain = document.getElementById('gotomain');


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

//password 관련선언
var pass = [];
pass[0] = document.getElementById('pass1');
pass[1] = document.getElementById('pass2');
pass[2] = document.getElementById('pass3');
pass[3] = document.getElementById('pass4');
var pass1_num=0;
var pass2_num=0;
var pass3_num=0;
var pass4_num=0;
var pass_type_check = 0; // pass_lever 창 오픈되는 동시에 pass2_num 증가하는 문제 해결하기 위한 변수



//터치패드 게임 애니메이션 관련선언
var touchpad_container = document.getElementById('touchpad_container');
var mainRect = touchpad_container.getBoundingClientRect();
var bg_river = document.getElementById('bg_river');
var bg_road = document.getElementById('bg_road');
var current_distance = document.getElementById('distance');
var running_tiger = document.getElementById('running_tiger');
var tigerRect = running_tiger.getBoundingClientRect();
var moving_hurdle1 = document.getElementById('hurdle1'); // 허들
var moving_hurdle1Rect = moving_hurdle1.getBoundingClientRect();
var butterfly = document.getElementById('butterfly');
var donuts = document.getElementById('donuts');

let requestAni;
let riverCount = 0;
let riverSpeed = 1; // 강 흐르는 속도
let roadCount = 0;
let hurdle1IntervalCount = 0; // 난도 설정을 위해 장애물이 반복된 횟수 체크

let roadSpeed = 3; // 도로 움직이는 속도

let hurdlePositionX;
let hurdlePositionY;
let butterflyPositionX;
let donutsPositionX;
let donutsPositionY;


console.log(mainRect.height);




//백호돌이 세팅
let myposX = mainRect.width * 0.25; //첫위치 가져오기
let myposY = mainRect.height * 0.77;
let groundStandard = myposY; // 땅에 닿았음을 판단하는 기준
let isJumping = false; // 점프 여부
let isDoubleJumping = false; // 더블점프 여부
let jumpVelocityY = -8; //점프 시 한번에 이동하는 픽셀 크기(점프 속도 결정)
let jumpingGravity = 0.4; // 점프 중력
let start_waiting = false; // readygo 중 클릭방지

// 거리 세팅
let highDistance = 0;
let distanceStandard = 0;
let currentDistance = 0.0;
let gameDifficulty = 1;
let krun_playing = false;



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
var password_matching = false;
var nipper_get = false;
var clear = false;
var press_1 = false;


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
    "../../images/9.png",
    "../../images/spark.png"

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

    if(press_1){ // 탈출완료 시 터치액션 방지
        return;
    }

    // 비밀번호 레버창 열려있을 때
    if(pass_lever_open){
        pass_type_check++;
        if (y < roomHeight * 0.2 ||  y > roomHeight * 0.8) { // 비밀번호 레버창 닫기
            pass_lever.style.display = 'none';
            pass_lever_open = false;
            close.style.display = 'none';
            pass[0].style.display = 'none'; pass[1].style.display = 'none'; pass[2].style.display = 'none'; pass[3].style.display = 'none';
            spark.style.display = 'none';
            pass_type_check = 0;
            return; // 메시지가 이미 표시되고 있을 때는 클릭 이벤트를 무시
        }
         // 비밀번호 숫자 변경
        else if(x > roomWidth * 0.16 && x < roomWidth * 0.3 && y < roomHeight * 0.48 && y > roomHeight * 0.36 && pass_type_check > 1 && password_matching == false){
            pass1_num++;
            if(pass1_num>9){pass1_num=0;}
            pass[0].textContent = pass1_num;
        }
        else if(x > roomWidth * 0.34 && x < roomWidth * 0.48 && y < roomHeight * 0.48 && y > roomHeight * 0.36 && pass_type_check > 1 && password_matching == false){
            pass2_num++;
            if(pass2_num>9){pass2_num=0;}
            pass[1].textContent = pass2_num;
        }
        else if(x > roomWidth * 0.52 && x < roomWidth * 0.66 && y < roomHeight * 0.48 && y > roomHeight * 0.36 && pass_type_check > 1 && password_matching == false){
            pass3_num++;
            if(pass3_num>9){pass3_num=0;}
            pass[2].textContent = pass3_num;
        }
        else if(x > roomWidth * 0.70 && x < roomWidth * 0.84 && y < roomHeight * 0.48 && y > roomHeight * 0.36 && pass_type_check > 1 && password_matching == false){
            pass4_num++;
            if(pass4_num>9){pass4_num=0;}
            pass[3].textContent = pass4_num;
        }
        if(pass1_num === 0 && pass2_num === 4 && pass3_num === 2 && pass4_num === 1){
            console.log('정답');
            password_matching = true;
            electrical_connection = true;
            spark.style.display = 'block';
            lever_light.style.display = 'block';
            
        }
        
    }
    

    if(room_number === 1){ // 메인룸
        if(x > roomWidth * 0.05 && x < roomWidth * 0.21 && y < roomHeight * 0.52 && y > roomHeight * 0.35 && pass_lever_open == false){ // 터치패드 클릭
            room_number = 2;
            room.setAttribute('src', 'images/room2-2.png');
            return_img.style.display = 'block';
            cover_small.style.display = 'none';
            line_cut_small.style.display = 'none';
            crowbar.style.display = 'none';
            cctv_before.style.display = 'none';
            floor.style.display = 'none';

            if(cover_open){
                cover_large.style.display = 'none';
                if(line_connection){
                    line_cut.style.display = 'none';
                    touchpad_container.style.display = 'block';
                    krun_intro.style.display = 'block';
                    reset();
                }
                else{
                    line_cut.style.display = 'block';
                }
            }
            else{
                cover_large.style.display = 'block';
                line_cut.style.display = 'block';
            }
            if(nipper_get == false){
                nipper_bg.style.display = 'block';
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
            cctv_before.style.display = 'none';
            floor.style.display = 'none';

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
        else if(x > roomWidth * 0.81 && x < roomWidth * 0.92 && y > roomHeight * 0.42 && y < roomHeight * 0.60){ // 엘리베이터 버튼 클릭
            console.log('엘리베이터 버튼 클릭');
            if(clear){
                room_number = 4;
                room.setAttribute('src', 'images/room2-4.png');
                return_img.style.display = 'block';
                cover_small.style.display = 'none';
                cover_small.style.display = 'none';
                line_cut_small.style.display = 'none';
                crowbar.style.display = 'none';
                cctv_before.style.display = 'none';
                nipper_bg.style.display = 'none';
                floor.style.display = 'none';
            }
            
           
        }
        
    }

    else if(room_number === 2){ // 터치패드
        if(x < roomWidth * 0.2 && y > roomHeight * 0.83 && y < roomHeight * 0.97){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room2-1.png');
            return_img.style.display = 'none';
            cover_large.style.display = 'none';
            line_cut.style.display = 'none';
            nipper_bg.style.display = 'none';
            room_number = 1;

            if(cover_open){
                cover_small.style.display = 'none';
                if(line_connection){
                    line_cut_small.style.display = 'none';
                    touchpad_container.style.display = 'none';
                    krun_intro.style.display = 'none';
                    krun_masking.style.display = 'none';
                    gameover.style.display = 'none';
                    reset();
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
            if(line_get == false){
                cctv_before.style.display = 'block';
            }
            if(clear){
                floor.style.display = 'block';
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
            if(line_get == false){
                cctv_before.style.display = 'block';
            }
            if(clear){
                floor.style.display = 'block';
            }
        }
    }

    else if(room_number === 4){ // 엘리베이터 버튼
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room2-1.png');
            return_img.style.display = 'none';
            light_1.style.display = 'none';
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
            if(line_get == false){
                cctv_before.style.display = 'block';
            }
            if(clear){
                floor.style.display = 'block';
            }
        }
        else if(x < roomWidth * 0.42 && x > roomWidth * 0.30 && y > roomHeight * 0.63 && y < roomHeight * 0.74){ // 1층 버튼 클릭
            press_1 = true;
            light_1.style.display = 'block';
            return_img.style.display = 'none';
            bottom_img.setAttribute('src', 'images/bottom_success2.png');
            hint_icon.style.display = 'none';
            puzzle_skip_icon.style.display = 'none';
            password_skip_icon.style.display = 'none';
            password_icon.style.display = 'none';

            setTimeout(() => {
                masking.style.display = 'block';
                masking.style.animation = "masking_off 2s 1";
            }, 1000);
            setTimeout(() => {
                //masking.style.animation = "masking_on 1.5s 1";
                masking.style.display = 'none';
                light_1.style.display = 'none';
                room.setAttribute('src', 'images/ending2.gif');
            }, 3000);

            setTimeout(() => {
                masking.style.display = 'none';
                finish.style.display = 'block';
                gotomain.style.display='block';
                finish.style.animation = "masking_off 4s 1";
                gotomain.style.animation = "masking_off 4s 1"; 
            }, 20000);
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
// 니퍼 발견
nipper_bg.addEventListener('click', function(event) {
    nipper_bg.style.display = 'none';
    nipper_get = true;
    item_get('nipper');
    item_reset();
});
// CCTV 클릭 & 니퍼 사용
cctv_before.addEventListener('click', function(event) {
    if(itemSelectName === 'nipper'){
        cctv_before.style.display = 'none';
        line_get = true;
        item_get('line');
        item_used('nipper');
        item_reset();
    }
});
// 전선 사용
line_cut.addEventListener('click', function(event) {
    if(itemSelectName === 'line'){
        line_connection = true;
        line_cut.style.display = 'none';
        item_used('line');
        item_reset();
        touchpad_container.style.display = 'block';
        krun_intro.style.display = 'block';
        reset();
    }
});
// 메인레버 클릭
lever_down.addEventListener('click', function(event) {
    if( electrical_connection == true){
        lever_down.style.display = 'none';
        lever_up.style.display = 'block';

        room.style.animation = "jiggle_room 0.2s 5";
        setTimeout(() => {
            door_left.style.left = "0";
            door_left.style.transition = "all 1s 0.4s"; 
            door_right.style.left = "0";
            door_right.style.transition = "all 1s 0.4s"; 
            floor.style.display = 'block';
            clear = true;
        }, 1200);
    }
    else{
        lever_down.style.animation = "jiggle_lever 0.3s 1";
        setTimeout(() => {
            lever_down.style.animation = "none";
        }, 300);
    }
});
// 패스워드 레버 클릭(퍼즐 클리어 후)
pass_lever_light.addEventListener('click', function(event) {
    pass_lever.style.display = 'block';
    close.style.display = 'block';
    pass[0].style.display = 'block'; pass[1].style.display = 'block'; pass[2].style.display = 'block'; pass[3].style.display = 'block';
    pass_lever_open = true;
});
// 패스워드 레버 창에서 닫기 버튼 클릭
close.addEventListener('click', function(event) {
    pass_lever.style.display = 'none';
    pass_lever_open = false;
    close.style.display = 'none';
    pass[0].style.display = 'none'; pass[1].style.display = 'none'; pass[2].style.display = 'none'; pass[3].style.display = 'none';
    spark.style.display = 'none';
    pass_type_check = 0;
});
// 힌트 보기
hint_icon.addEventListener('click', function(event) {
    if(electrical_connection){
        bottom_img.setAttribute('src', 'images/hint_6.png');
        puzzle_skip_icon.style.display = 'none';
        password_skip_icon.style.display = 'none';
        password_icon.style.display = 'none';
    }
    else if(driver_get){
        bottom_img.setAttribute('src', 'images/hint_5.png');
        puzzle_skip_icon.style.display = 'block';
    }
    else{
        bottom_img.setAttribute('src', 'images/hint_4.png');
    }
});
puzzle_skip_icon.addEventListener('click', function(event) {
    puzzle_skip_icon.style.display = 'none';
    password_skip_icon.style.display = 'block';
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

});
password_skip_icon.addEventListener('click', function(event) {
    password_skip_icon.style.display = 'none';
    password_icon.style.display = 'block';
});
gotomain.addEventListener('click', function(event) {
    gotomain.style.display = 'none';
    location.replace('https://gubaeki.github.io/Project_04/index2.html');
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

//---------------------------------------- 터치패드 게임 ----------------------------------------------
//애니메이션
function gameStart() {

    // 배경 움직이기
    bg_river.style.left = `-${riverCount}px`;
    bg_road.style.left = `-${roadCount}px`;
    if(riverCount >= bg_river.offsetWidth/2 - riverSpeed){
        riverCount = riverCount - (bg_river.offsetWidth/2 - riverSpeed);
    }else{
        riverCount += riverSpeed;
    }
    if(roadCount >= bg_road.offsetWidth/2 - roadSpeed){
        roadCount = roadCount - (bg_road.offsetWidth/2 - roadSpeed);
    }else{
        roadCount += roadSpeed;
    }

    // 장애물 움직이기 & 충돌 감지
    if(gameDifficulty === 1){
        moving_hurdle1.style.left = `${hurdlePositionX}px`;
        if(hurdlePositionX <= 0 - (moving_hurdle1.width/2)){
            hurdle1IntervalCount += 1 ;
            hurdlePositionX = mainRect.width + (moving_hurdle1.width)/2;
        }else{
            hurdlePositionX -= roadSpeed;
        }
        if(isCollisionCheck(hurdlePositionX, hurdlePositionY, myposX, myposY)){return};
    }
    else if(gameDifficulty === 2){
        donuts.style.left = `${donutsPositionX}px`;
        if(donutsPositionX <= 0 - (donuts.width/2)){
            hurdle1IntervalCount += 1 ;
            donutsPositionX = mainRect.width + (donuts.width)/2;
        }else{
            donutsPositionX -= roadSpeed;
        }
        if(isCollisionCheck_donuts(donutsPositionX, donutsPositionY, myposX, myposY)){return};
    }

    // 점프 & 더블점프
    if(isJumping){
        jumpVelocityY += jumpingGravity;
        myposY += jumpVelocityY;
        if(myposY > groundStandard){ //착지하면 초기화
            myposY -= jumpVelocityY;
            isJumping = false;
            isDoubleJumping = false;
            jumpVelocityY = -8;
        }
        running_tiger.style.top = `${myposY}px`;
    }
    // 이동거리 증가
    distanceStandard += roadSpeed/2;
    currentDistance = Math.round((distanceStandard/100)*10)/10;
    current_distance.textContent = `${currentDistance} m`;

    // 거리별 난도 설정
    if(2 <= hurdle1IntervalCount && 6 > hurdle1IntervalCount){
        butterfly.style.left = `${butterflyPositionX}px`;
        butterflyPositionX -= 1;
    }else if(6 <= hurdle1IntervalCount){
        gameDifficulty = 2;
    }

    requestAni = requestAnimationFrame(gameStart);
}

//점프관련 함수
function startJumpMoving() {
    if(isJumping){
        if(!isDoubleJumping){
            isDoubleJumping = true;
            jumpVelocityY = -8;
            jumpVelocityY += jumpingGravity;
            myposY += jumpVelocityY;
        }
    }else{
        isJumping = true;
        isDoubleJumping = false;
    }
}

// 충돌감지 함수
function isCollisionCheck(hurdlePositionX, hurdlePositionY, myposX, myposY) {
    let diffX = Math.abs(hurdlePositionX - myposX);
    if (diffX <= tigerRect.width/3) {
      let diffY = Math.abs(hurdlePositionY - myposY);
      if (diffY <= tigerRect.height/2) {
        //초기화
        krun_masking.style.display = 'block';
        gameover.style.display = 'block';
        krun_playing = false;
        
        return true;
      }
    }
    return false;
  }
function isCollisionCheck_donuts(hurdlePositionX, hurdlePositionY, myposX, myposY) { //도넛용 충돌체크 함수
    let diffX = Math.abs(hurdlePositionX - myposX);
    if (diffX <= tigerRect.width/1) {
      let diffY = Math.abs(hurdlePositionY - myposY);
      if (diffY <= tigerRect.height/1.25) {
        //초기화
        krun_masking.style.display = 'block';
        gameover.style.display = 'block';
        krun_playing = false;
        
        return true;
      }
    }
    return false;
  }

// krun intro 클릭
krun_intro.addEventListener('click', function(event) {
    krun_intro.style.display = 'none';
    event.stopPropagation();
    krun_playing = true;
    start_waiting = true;
    setTimeout(() => {
        start_waiting = false;
        gameStart();
    }, 1000);
    console.log('intro 클릭');
});

// touchpad_container 클릭
touchpad_container.addEventListener('click', function(event) {
    if(krun_playing){
        if(start_waiting){
            //skip
        }
        else{
            startJumpMoving();
        }
    }
    else{
        krun_masking.style.display = 'none';
        gameover.style.display = 'none';
        krun_intro.style.display = 'block';
        reset();
    }
});
// reset 함수
function reset() {
    cancelAnimationFrame(requestAni);
    mainRect = touchpad_container.getBoundingClientRect();
    tigerRect = running_tiger.getBoundingClientRect();
    myposX = mainRect.width * 0.25;
    myposY = mainRect.height * 0.77;
    hurdlePositionX = mainRect.width + (moving_hurdle1.width)/2;
    hurdlePositionY = mainRect.height - (mainRect.height*0.05) - (moving_hurdle1.height)/2;
    butterflyPositionX = mainRect.width + (butterfly.width)/2;
    donutsPositionX = mainRect.width + (donuts.width)/2;
    donutsPositionY = mainRect.height - (mainRect.height*0.05) - (donuts.height)/2;

    krun_playing = false;
    currentDistance = 0.0;
    current_distance.textContent = `${currentDistance} m`;
    gameDifficulty = 1;
    groundStandard = myposY;
    isJumping = false;
    isDoubleJumping = false;
    jumpVelocityY = -8;
    moving_hurdle1.style.display = 'block';
    roadSpeed = 3; // 도로 움직이는 속도
    riverSpeed = 1;
    riverCount = 0;
    roadCount = 0;
    distanceStandard = 0;
    hurdle1IntervalCount = 0; // 난도 설정을 위해 장애물이 반복된 횟수 체크
    start_waiting = false;

    moving_hurdle1.style.left = hurdlePositionX + 'px';
    moving_hurdle1.style.top = hurdlePositionY + 'px';
    running_tiger.style.left = `${myposX}px`
    running_tiger.style.top = `${myposY}px`
    bg_river.style.left = `-${riverCount}px`;
    bg_road.style.left = `-${roadCount}px`;
    moving_hurdle1.style.left = `${hurdlePositionX}px`;
    butterfly.style.left = `${butterflyPositionX}px`;
    donuts.style.left = `${donutsPositionX}px`;
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
            else if(itemName=='nipper'){
                item[i].setAttribute('src', 'images/nipper_item.png');
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