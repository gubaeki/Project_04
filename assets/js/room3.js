//이미지 관련선언
var room = document.getElementById('room_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;
var bottom_img = document.getElementById('bottom_img');
var return_img = document.getElementById('return_img');
var loading = document.getElementById('loading');
var hint_icon = document.getElementById('hint_icon');
var fire = document.getElementById('fire');
var fireextinguisher_bg = document.getElementById('fireextinguisher_bg');
var key = document.getElementById('key');
var key_item = document.getElementById('key_item');
var door3_1 = document.getElementById('door3-1');
var door3_2 = document.getElementById('door3-2');
var water = document.getElementById('water');
var light_water = document.getElementById('light_water');
var smoke = document.getElementById('smoke');
var paint_info = document.getElementById('paint_info');
var smartphone = document.getElementById('smartphone');
var press_up = document.getElementById('press_up');
var press_down = document.getElementById('press_down');
var press_both = document.getElementById('press_both');
var app1 = document.getElementById('app1');
var app2 = document.getElementById('app2');
var app3 = document.getElementById('app3');
var app4 = document.getElementById('app4');
var app5 = document.getElementById('app5');
var check_green = document.getElementById('check_green');
var success_app = document.getElementById('success_app');
var fail_app = document.getElementById('fail_app');
var masking = document.getElementById('masking');
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

//엘리베이터 버튼 관련선언
var correct_sequence = ['down', 'up', 'down', 'down', 'up'];
var user_input = [];  //사용자 입력 기록


//password 관련선언
var correct_passward = ['8', '1', '6', '0'];
var user_passward = []; //사용자 입력 기록
var pass3_1 = document.getElementById('pass3-1');
var pass3_2 = document.getElementById('pass3-2');
var pass3_3 = document.getElementById('pass3-3');
var pass3_4 = document.getElementById('pass3-4');


// 강건너기 퀴즈 관련선언
var boat = document.getElementById('boat');
var wolf = document.getElementById('wolf');
var sheep = document.getElementById('sheep');
var cabbage = document.getElementById('cabbage');
var moving = false;
var boat_position = 'left';
var wolf_position = 'left';
var sheep_position = 'left';
var cabbage_position = 'left';
var left_count = 3;
var right_count = 0;




//기타 변수
var room_number = 1;
var app_number = 1;
var fireextinguisher_get = false;
var key_get = false;
var press_1 = false;
var door3_1_open = false;
var door3_2_open = false;
var fire_off = false;
var cleaning_info = false;
var smartphone_get = false;
var cleaning_get = false;
var password_matching = false;
var clear = false;



//---------------------------------------------------------------
// 이미지 Preload

let images = [
    "../../images/bottom.png",
    "../../images/item.png",
    "../../images/room3-1.png",
    "../../images/room3-1-1.png",
    "../../images/room3-2.png",
    "../../images/room3-3.png",
    "../../images/room3-4.png",
    "../../images/room3-5.png",
    "../../images/door_3-1.png",
    "../../images/door_3-2.png",
    "../../images/fire.png",
    "../../images/fireextinguisher_bg.png",
    "../../images/key3.png",
    "../../images/key3_item.png",
    "../../images/press_up.png",
    "../../images/press_down.png",
    "../../images/water.png",
    "../../images/light_water.gif",
    "../../images/smoke.gif",
    "../../images/app1.png",
    "../../images/app2.png",
    "../../images/app3.png",
    "../../images/app4.png",
    "../../images/app5.png",
    "../../images/star.png",
    "../../images/boat.png",
    "../../images/wolf.png",
    "../../images/sheep.png",
    "../../images/cabbage.png",
    "../../images/check_green.png",
    "../../images/success_app.png",
    "../../images/fail_app.png",
    "../../images/ending3.gif"
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

    if(clear){ // 탈출완료 시 터치액션 방지
        return;
    }

    
    if(room_number === 1){ // 메인룸
        if(x > roomWidth * 0.03 && x < roomWidth * 0.14 && y < roomHeight * 0.77 && y > roomHeight * 0.2){ // 왼쪽 벽 클릭
            room_number = 2;
            room.setAttribute('src', 'images/room3-2.png');
            return_img.style.display = 'block';
            door3_1.style.display = 'none';
            light_water.style.display = 'none';
            smartphone.style.display = 'none';

            if(door3_2_open){
                door3_2.style.display = 'none';
                if(fire_off){
                    fire.style.display = 'none';
                    water.style.display = 'block';
                }
                else{
                    fire.style.display = 'block';
                    smoke.style.display = 'block';
                }
            }
            else{
                door3_2.style.display = 'block';
                smoke.style.display = 'block';
            }
            if(fireextinguisher_get == false){
                fireextinguisher_bg.style.display = 'block';
            }

        }
        else if(x > roomWidth * 0.16 && x < roomWidth * 0.39 && y < roomHeight * 0.55 && y > roomHeight * 0.33){ // 게이트 클릭
            room_number = 3;
            room.setAttribute('src', 'images/room3-3.png');
            return_img.style.display = 'block';
            door3_1.style.display = 'none';
            light_water.style.display = 'none';
            smartphone.style.display = 'none';
            
            if(key_get == false){
                key.style.display = 'block';
            }
            

        }
        else if(x > roomWidth * 0.59 && x < roomWidth * 0.71 && y > roomHeight * 0.4 && y < roomHeight * 0.52){ // 엘리베이터 버튼 클릭
            room_number = 1.1;
            room.setAttribute('src', 'images/room3-1-1.png');
            return_img.style.display = 'block';
            door3_1.style.display = 'none';
            light_water.style.display = 'none';
            smartphone.style.display = 'none';

            if(door3_1_open){
                press_both.style.display = 'block';
            }

        }
        else if(x > roomWidth * 0.81 && x < roomWidth * 0.97 && y > roomHeight * 0.55 && y < roomHeight * 0.7 && door3_1_open){ // 청소도구 클릭
            if(cleaning_get == false){
                cleaning_get = true;
                item_get('cleaning');
                item_reset();
            }
        }
        
    }

    else if(room_number === 1.1){ // 엘리베이터 버튼
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room_number = 1;
            room.setAttribute('src', 'images/room3-1.png');
            return_img.style.display = 'none';
            press_up.style.display = 'none';
            press_down.style.display = 'none';
            press_both.style.display = 'none';
            user_input = [];

            if(door3_1_open){
                if(smartphone_get==false){
                    smartphone.style.display = 'block';
                }
            }
            else{
                door3_1.style.display = 'block';
            }

            if(fire_off){
                light_water.style.display = 'block';
            }
        }

        if(door3_1_open == false){  // 엘리베이터 버튼 입력 체크
            if(x > roomWidth * 0.35 && x < roomWidth * 0.62 && y > roomHeight * 0.26 && y < roomHeight * 0.45){
                press_up.style.display = 'block';
                press_down.style.display = 'none';
                setTimeout(() => {
                    press_up.style.display = 'none';
                }, 100);
                if(fire_off){
                    user_input.push('up');
                    if(user_input.length == 5){
                        press_up.style.display = 'none';
                        press_down.style.display = 'none';
                        press_both.style.display = 'block';
                        if(JSON.stringify(user_input) === JSON.stringify(correct_sequence)){
                            door3_1_open = true;
                        }
                        else{
                            user_input = [];
                            setTimeout(() => {
                                press_both.style.display = 'none';
                            }, 300);
                        }
                    }
                }
                
            }
            else if(x > roomWidth * 0.35 && x < roomWidth * 0.62 && y > roomHeight * 0.52 && y < roomHeight * 0.72){
                press_up.style.display = 'none';
                press_down.style.display = 'block';
                setTimeout(() => {
                    press_down.style.display = 'none';
                }, 100);
                if(fire_off){
                    user_input.push('down');
                    if(user_input.length == 5){
                        press_up.style.display = 'none';
                        press_down.style.display = 'none';
                        press_both.style.display = 'block';
                        if(JSON.stringify(user_input) === JSON.stringify(correct_sequence)){
                            door3_1_open = true;
                        }
                        else{
                            user_input = [];
                            setTimeout(() => {
                                press_both.style.display = 'none';
                            }, 300);
                        }
                    }
                }
                
            }

        }   
    }

    else if(room_number === 2){ // 화장실 앞
        if(x < roomWidth * 0.2 && y > roomHeight * 0.83 && y < roomHeight * 0.97){ // 메인룸 돌아가기
            room_number = 1;
            room.setAttribute('src', 'images/room3-1.png');
            return_img.style.display = 'none';
            fireextinguisher_bg.style.display = 'none';
            fire.style.display = 'none';
            door3_2.style.display = 'none';
            water.style.display = 'none';
            smoke.style.display = 'none';

            if(door3_1_open){
                if(smartphone_get==false){
                    smartphone.style.display = 'block';
                }
                
            }
            else{
                door3_1.style.display = 'block';    
                
            }

            if(fire_off){
                light_water.style.display = 'block';
            }
            
        }
        else if(x < roomWidth * 0.95 && x > roomWidth * 0.75 && y > roomHeight * 0.25 && y < roomHeight * 0.6){ // 그림 클릭
            room_number = 5;
            room.setAttribute('src', 'images/room3-5.png');
            return_img.style.display = 'blcok';
            fireextinguisher_bg.style.display = 'none';
            fire.style.display = 'none';
            door3_2.style.display = 'none';
            water.style.display = 'none';
            smoke.style.display = 'none';

            if(cleaning_info == false){
                paint_info.style.display = 'block';
            }

        }
    }

    else if(room_number === 3){ // 게이트
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room3-1.png');
            return_img.style.display = 'none';
            key.style.display = 'none';
            room_number = 1;

            if(door3_1_open){
                if(smartphone_get == false){
                    smartphone.style.display = 'block';
                }
            }
            else{
                door3_1.style.display = 'block';    
                
            }

            if(fire_off){
                light_water.style.display = 'block';
            }
        }

        else if(x < roomWidth * 0.99 && x > roomWidth * 0.80 && y > roomHeight * 0.18 && y < roomHeight * 0.3){ //모바일 태그 클릭
            if(itemSelectName === 'smartphone'){
                item_reset();
                room_number = 4;
                room.setAttribute('src', 'images/room3-4.png');
                return_img.style.display = 'block';
                key.style.display = 'none';

                if(password_matching){
                    app2.style.display = 'block';
                    app_number = 2;
                }
                else{
                    app1.style.display = 'block';
                    app_number = 1;
                }
            }
        }
    }

    else if(room_number === 4){ // 스마트폰
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8 && moving === false){ // 게이트 돌아가기
            room_number = 3;
            room.setAttribute('src', 'images/room3-3.png');
            return_img.style.display = 'block';
            app1.style.display = 'none';
            app2.style.display = 'none';
            app3.style.display = 'none';
            app4.style.display = 'none';
            app5.style.display = 'none';
            pass3_1.style.display = 'none';
            pass3_2.style.display = 'none';
            pass3_3.style.display = 'none';
            user_passward = [];
            river_reset();

            if(key_get == false){
                key.style.display = 'block';
            }
        }
        if(password_matching == false){
            if(x < roomWidth * 0.37 && x > roomWidth * 0.19 && y > roomHeight * 0.29 && y < roomHeight * 0.42){
                user_passward.push('1');
            }
            else if(x < roomWidth * 0.60 && x > roomWidth * 0.42 && y > roomHeight * 0.29 && y < roomHeight * 0.42){
                user_passward.push('2');
            }
            else if(x < roomWidth * 0.81 && x > roomWidth * 0.64 && y > roomHeight * 0.29 && y < roomHeight * 0.42){
                user_passward.push('3');
            }
            if(x < roomWidth * 0.37 && x > roomWidth * 0.19 && y > roomHeight * 0.45 && y < roomHeight * 0.58){
                user_passward.push('4');
            }
            else if(x < roomWidth * 0.60 && x > roomWidth * 0.42 && y > roomHeight * 0.45 && y < roomHeight * 0.58){
                user_passward.push('5');
            }
            else if(x < roomWidth * 0.81 && x > roomWidth * 0.64 && y > roomHeight * 0.45 && y < roomHeight * 0.58){
                user_passward.push('6');
            }
            else if(x < roomWidth * 0.37 && x > roomWidth * 0.19 && y > roomHeight * 0.61 && y < roomHeight * 0.74){
                user_passward.push('7');
            }
            else if(x < roomWidth * 0.60 && x > roomWidth * 0.42 && y > roomHeight * 0.61 && y < roomHeight * 0.74){
                user_passward.push('8');
            }
            else if(x < roomWidth * 0.81 && x > roomWidth * 0.64 && y > roomHeight * 0.61 && y < roomHeight * 0.74){
                user_passward.push('9');
            }
            else if(x < roomWidth * 0.60 && x > roomWidth * 0.42 && y > roomHeight * 0.77 && y < roomHeight * 0.90){
                user_passward.push('0');
            }

            if(user_passward.length == 1){pass3_1.style.display = 'block';}
            else if(user_passward.length == 2){pass3_2.style.display = 'block';}
            else if(user_passward.length == 3){pass3_3.style.display = 'block';}
            else if(user_passward.length == 4){
                if(JSON.stringify(user_passward) === JSON.stringify(correct_passward)){
                    app1.style.display = 'none';
                    app2.style.display = 'block';
                    app_number = 2;
                    password_matching = true;
                    user_passward = [];
                }
                else{
                    user_passward = [];
                }
                pass3_1.style.display = 'none';
                pass3_2.style.display = 'none';
                pass3_3.style.display = 'none';
            }
        }
        else{
            if(app_number == 2){ // 배경화면일때
                if(x < roomWidth * 0.84 && x > roomWidth * 0.69 && y > roomHeight * 0.79 && y < roomHeight * 0.91){ // 카카오톡 클릭
                    app2.style.display = 'none';
                    app3.style.display = 'block';
                    app_number = 3;
                }
                else if(x < roomWidth * 0.34 && x > roomWidth * 0.20 && y > roomHeight * 0.08 && y < roomHeight * 0.20){ // 에스원 클릭
                    app2.style.display = 'none';
                    app4.style.display = 'block';
                    app_number = 4;
                }
            }
            else if(app_number == 3){ // 카톡화면일때
                if(x < roomWidth * 0.24 && x > roomWidth * 0.1 && y > roomHeight * 0.06 && y < roomHeight * 0.18){ // 돌아가기 클릭
                    app3.style.display = 'none';
                    app2.style.display = 'block';
                    app_number = 2;
                }
            }
            else if(app_number == 4){ // 에스원 화면 일때
                if(x < roomWidth * 0.88 && x > roomWidth * 0.77 && y > roomHeight * 0.06 && y < roomHeight * 0.16){ // 돌아가기 클릭
                    app4.style.display = 'none';
                    app2.style.display = 'block';
                    app_number = 2;
                }
                else if(x < roomWidth * 0.67 && x > roomWidth * 0.33 && y > roomHeight * 0.58 && y < roomHeight * 0.72){ // 활성화 하기 클릭
                    app4.style.display = 'none';
                    app5.style.display = 'block';
                    app_number = 5;
                    boat.style.display = 'block';
                    wolf.style.display = 'block';
                    sheep.style.display = 'block';
                    cabbage.style.display = 'block';
                }
            }
            else if(app_number == 5){ // 강건너기 화면 일때
                if(x < roomWidth * 0.88 && x > roomWidth * 0.77 && y > roomHeight * 0.06 && y < roomHeight * 0.16){ // 돌아가기 클릭
                    app5.style.display = 'none';
                    app4.style.display = 'block';
                    app_number = 4;
                    boat.style.display = 'none';
                    wolf.style.display = 'none';
                    sheep.style.display = 'none';
                    cabbage.style.display = 'none';
                }
            }
            
            
        }
    }

    else if(room_number === 5){ // 그림 화면
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 화장실 앞으로 돌아가기
            room_number = 2;
            room.setAttribute('src', 'images/room3-2.png');
            return_img.style.display = 'block';
            door3_1.style.display = 'none';
            light_water.style.display = 'none';
            paint_info.style.display = 'none';

            if(door3_2_open){
                door3_2.style.display = 'none';
                if(fire_off){
                    fire.style.display = 'none';
                    water.style.display = 'block';
                }
                else{
                    fire.style.display = 'block';
                    smoke.style.display = 'block';
                }
            }
            else{
                door3_2.style.display = 'block';
                smoke.style.display = 'block';
            }
            if(fireextinguisher_get == false){
                fireextinguisher_bg.style.display = 'block';
            }


        }


    }
});


//---------------------------------------- 아이템 사용 or 획득----------------------------------------------
// 소화기 발견
fireextinguisher_bg.addEventListener('click', function(event) {
    fireextinguisher_bg.style.display = 'none';
    fireextinguisher_get = true;
    item_get('fireextinguisher');
    item_reset();
});
// key 발견
key.addEventListener('click', function(event) {
    key.style.display = 'none';
    key_get = true;
    item_get('key');
    item_reset();
});
// 소화기 사용
fire.addEventListener('click', function(event) {
    if(itemSelectName === 'fireextinguisher'){
        fire.style.display = 'none';
        smoke.style.display = 'none';
        water.style.display = 'block';
        fire_off = true;
        item_used('fireextinguisher');
        item_reset();
    }
});
// key 사용
door3_2.addEventListener('click', function(event) {
    if(itemSelectName === 'key'){
        door3_2_open = true;
        door3_2.style.display = 'none';
        fire.style.display = 'block';
        item_used('key');
        item_reset();
    }
});
// 스마트폰 발견
smartphone.addEventListener('click', function(event) {
    smartphone.style.display = 'none';
    smartphone_get = true;
    item_get('smartphone');
    item_reset();
});
// 청소도구 사용
paint_info.addEventListener('click', function(event) {
    if(itemSelectName === 'cleaning'){
        cleaning_info = true;
        paint_info.style.display = 'none';
        item_used('cleaning');
        item_reset();
    }
});



//---------------------------------------- 강건너기 퀴즈----------------------------------------------
// 보트 클릭
boat.addEventListener('click', function(event) {
    console.log('보트 클릭');
    if(moving == false){
        moving = true;
        if(boat_position === 'left'){
            boat.style.left = "70%";
            boat.style.transition = "all 1s 0s"; 
            boat_position = 'right';
            setTimeout(() => {moving = false;}, 1000); river_check();
        }
        else{
            boat.style.left = "45%";
            boat.style.transition = "all 1s 0s"; 
            boat_position = 'left';
            setTimeout(() => {moving = false;}, 1000); river_check();
        }
    }
});
// 늑대 클릭
wolf.addEventListener('click', function(event) {
    console.log('늑대 클릭');
    if(moving == false){
        if(boat_position === wolf_position){
            moving = true;
            if(boat_position === 'left'){
                wolf.style.transition = "all 0.5s 0s"; 
                wolf.style.left = "40%";
                wolf.style.top = "45%";
                setTimeout(() => {
                    wolf.style.left = "65%";
                    wolf.style.transition = "all 1s 0s"; 
                    boat.style.left = "70%";
                    boat.style.transition = "all 1s 0s"; 
                }, 500);
                setTimeout(() => {
                    wolf.style.transition = "all 0.5s 0s"; 
                    wolf.style.left = "78%";
                    wolf.style.top = "28%";
                    moving = false;
                    river_check();
                }, 1500);
                boat_position = 'right';
                wolf_position = 'right';
                left_count--;
                right_count++;
                
            }
            else{
                wolf.style.transition = "all 0.5s 0s"; 
                wolf.style.left = "65%";
                wolf.style.top = "45%";
                setTimeout(() => {
                    wolf.style.left = "40%";
                    wolf.style.transition = "all 1s 0s"; 
                    boat.style.left = "45%";
                    boat.style.transition = "all 1s 0s"; 
                }, 500);
                setTimeout(() => {
                    wolf.style.transition = "all 0.5s 0s"; 
                    wolf.style.left = "22%";
                    wolf.style.top = "28%";
                    moving = false;
                    river_check();
                }, 1500);
                boat_position = 'left';
                wolf_position = 'left';
                left_count++;
                right_count--;
            }
        }
    }
    
    

});
// 양 클릭
sheep.addEventListener('click', function(event) {
    console.log('양 클릭');
    if(moving == false){
        if(boat_position === sheep_position){
            moving = true;
            if(boat_position === 'left'){
                sheep.style.transition = "all 0.5s 0s"; 
                sheep.style.left = "40%";
                sheep.style.top = "45%";
                setTimeout(() => {
                    sheep.style.left = "65%";
                    sheep.style.transition = "all 1s 0s"; 
                    boat.style.left = "70%";
                    boat.style.transition = "all 1s 0s"; 
                }, 500);
                setTimeout(() => {
                    sheep.style.transition = "all 0.5s 0s"; 
                    sheep.style.left = "79%";
                    sheep.style.top = "35.7%";
                    moving = false;
                    river_check();
                }, 1500);
                boat_position = 'right';
                sheep_position = 'right';
                left_count--;
                right_count++;
            }
            else{
                sheep.style.transition = "all 0.5s 0s"; 
                sheep.style.left = "65%";
                sheep.style.top = "45%";
                setTimeout(() => {
                    sheep.style.left = "40%";
                    sheep.style.transition = "all 1s 0s"; 
                    boat.style.left = "45%";
                    boat.style.transition = "all 1s 0s"; 
                }, 500);
                setTimeout(() => {
                    sheep.style.transition = "all 0.5s 0s"; 
                    sheep.style.left = "22%";
                    sheep.style.top = "35.7%";
                    moving = false;
                    river_check();
                }, 1500);
                boat_position = 'left';
                sheep_position = 'left';
                left_count++;
                right_count--;
            }
        }
    }
});
// 양배추 클릭
cabbage.addEventListener('click', function(event) {
    console.log('양배추 클릭');
    if(moving == false){
        if(boat_position === cabbage_position){
            moving = true;
            if(boat_position === 'left'){
                cabbage.style.transition = "all 0.5s 0s"; 
                cabbage.style.left = "40%";
                cabbage.style.top = "45%";
                setTimeout(() => {
                    cabbage.style.left = "65%";
                    cabbage.style.transition = "all 1s 0s"; 
                    boat.style.left = "70%";
                    boat.style.transition = "all 1s 0s"; 
                }, 500);
                setTimeout(() => {
                    cabbage.style.transition = "all 0.5s 0s"; 
                    cabbage.style.left = "80%";
                    cabbage.style.top = "43%";
                    moving = false;
                    river_check();
                }, 1500);
                boat_position = 'right';
                cabbage_position = 'right';
                left_count--;
                right_count++;
            }
            else{
                cabbage.style.transition = "all 0.5s 0s"; 
                cabbage.style.left = "65%";
                cabbage.style.top = "45%";
                setTimeout(() => {
                    cabbage.style.left = "40%";
                    cabbage.style.transition = "all 1s 0s"; 
                    boat.style.left = "45%";
                    boat.style.transition = "all 1s 0s"; 
                }, 500);
                setTimeout(() => {
                    cabbage.style.transition = "all 0.5s 0s"; 
                    cabbage.style.left = "20%";
                    cabbage.style.top = "43%";
                    moving = false;
                    river_check();
                }, 1500);
                boat_position = 'left';
                cabbage_position = 'left';
                left_count++;
                right_count--;
            }
        }
    }
});

function river_check(){
    if(boat_position === 'right' && left_count == 2){
        if(sheep_position === 'left'){
            console.log('fail');
            fail_app.style.display = 'block';
            moving = true;
            setTimeout(() => {
                fail_app.style.display = 'none';
                app5.style.display = 'none';
                app4.style.display = 'block';
                app_number = 4;
                moving = false;
                river_reset();
            }, 1500);
            
        }
    }
    else if(boat_position === 'left' && right_count == 2){
        if(sheep_position === 'right'){
            console.log('fail');
            fail_app.style.display = 'block';
            moving = true;
            setTimeout(() => {
                fail_app.style.display = 'none';
                app5.style.display = 'none';
                app4.style.display = 'block';
                app_number = 4;
                moving = false;
                river_reset();
            }, 1500);
        }
    }
    else if(right_count == 3){
        console.log('success');
        check_green.style.display = 'block';
        success_app.style.display = 'block';
        return_img.style.display = 'none';
        clear = true;
        item_used('smartphone');
        setTimeout(() => {
            masking.style.display = 'block';
            masking.style.animation = "masking_off 4s 1";
            bottom_img.setAttribute('src', 'images/bottom_success.png');
            hint_icon.style.display = 'none';
        }, 1500);
        setTimeout(() => {

            check_green.style.display = 'none';
            success_app.style.display = 'none';
            boat.style.display = 'none';
            wolf.style.display = 'none';
            sheep.style.display = 'none';
            cabbage.style.display = 'none';
            app5.style.display = 'none';
            room.setAttribute('src', 'images/ending3.gif');
        }, 5500);

        setTimeout(() => {
            masking.style.display = 'none';
            finish.style.display = 'block';
            gotomain.style.display='block';
            finish.style.animation = "masking_off 4s 1";
            gotomain.style.animation = "masking_off 4s 1"; 
        }, 22000);
    }
}


function river_reset(){
    moving = false;
    boat_position = 'left';
    wolf_position = 'left';
    sheep_position = 'left';
    cabbage_position = 'left';
    left_count = 3;
    right_count = 0;

    boat.style.display = 'none';
    wolf.style.display = 'none';
    sheep.style.display = 'none';
    cabbage.style.display = 'none';

    boat.style.left = "45%";
    wolf.style.left = "22%";
    wolf.style.top = "28%";
    sheep.style.left = "22%";
    sheep.style.top = "35.7%";
    cabbage.style.left = "20%";
    cabbage.style.top = "43%";
}




// 힌트 보기
hint_icon.addEventListener('click', function(event) {
    bottom_img.setAttribute('src', 'images/hint_7.png');
});


gotomain.addEventListener('click', function(event) {
    gotomain.style.display = 'none';
    location.replace('https://gubaeki.github.io/Project_04/index3.html');
});


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
            if(itemName=='fireextinguisher'){
                item[i].setAttribute('src', 'images/fireextinguisher_item.png');
            }
            else if(itemName=='key'){
                item[i].setAttribute('src', 'images/key3_item.png');
            }
            else if(itemName=='smartphone'){
                item[i].setAttribute('src', 'images/smartphone_item.png');
            }
            else if(itemName=='cleaning'){
                item[i].setAttribute('src', 'images/cleaning_item.png');
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