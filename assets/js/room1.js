//이미지 관련선언
var room = document.getElementById('room_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;
var return_img = document.getElementById('return_img');
var hammer_bg = document.getElementById('hammer_bg');
var memo_bg_red = document.getElementById('memo_bg_red');
var memo_red = document.getElementById('memo_red');
var towel_min = document.getElementById('towel_min');
var switch_Off = document.getElementById('switch_Off');
var dark2 = document.getElementById('dark2');

//item 관련선언
var item = [,,,,];
item[1] = document.getElementById('item_1');
item[2] = document.getElementById('item_2');
item[3] = document.getElementById('item_3');
item[4] = document.getElementById('item_4');

var ItemFillNum = 0; //채워진 아이템 번호
var itemFillName = [,,,,]; //채워진 아이템 이름
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

document.addEventListener('click', function(event) {

    /*
    if (message.style.display === 'block') {
        return; // 메시지가 이미 표시되고 있을 때는 클릭 이벤트를 무시
    }*/

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
            room.setAttribute('src', 'images/room1-3.png');
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
            hammer_bg.style.display = 'none';
            room_number = 1;
        }

    }

    else if(room_number === 3){ // 1사로
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            room_number = 1;
        }
        if(x < roomWidth * 0.78 && x > roomWidth * 0.67 && y > roomHeight * 0.35 && y < roomHeight * 0.45){ // 균열 클릭
            if(itemSelectNum != 0){
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
                    itemFillName[itemSelectNum] = "memo_red";
                    item[itemSelectNum].setAttribute('src', 'images/memo_bg_red.png');
                    itemSelectNum = 0;
                    itemSelectName = 0;
                    item[1].style.backgroundColor="transparent";
                    item[2].style.backgroundColor="transparent";
                    item[3].style.backgroundColor="transparent";
                    item[4].style.backgroundColor="transparent";
                }
            }
        }
    }
    
    else if(room_number === 4){ // 2사로
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            room_number = 1;
        }
    }

    else if(room_number === 5){ // 좌측면(정문)
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            towel_min.style.display = 'none';
            switch_Off.style.display = 'none';
            room_number = 1;

        }
        if(x > roomWidth * 0.35 && x < roomWidth * 0.53 && y > roomHeight * 0.4 && y < roomHeight * 0.54){ // 수건 클릭
            if(towel_open == false){
                towel_min.style.display = 'block';
                towel_open = true;
            }
            else{
                towel_min.style.display = 'none';
                towel_open = false;
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
    item[1].style.backgroundColor="transparent";
    item[2].style.backgroundColor="transparent";
    item[3].style.backgroundColor="transparent";
    item[4].style.backgroundColor="transparent";
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
    ItemFillNum++;
    itemFillName[ItemFillNum] = itemName;
    if(itemName=='hammer'){
        item[ItemFillNum].setAttribute('src', 'images/hammer_item.png');
    }
}

function memo_check(itemSelectName){ //메모가 열려있는지 확인, 파랑 추가 필요
    if(memo_open){
        memo_red.style.display = 'none';
        memo_open = false;
        item[1].style.backgroundColor="transparent";
        item[2].style.backgroundColor="transparent";
        item[3].style.backgroundColor="transparent";
        item[4].style.backgroundColor="transparent";
    }
    else{
        if(itemSelectName=='memo_red'){
            memo_red.style.display = 'block';
            memo_open = true;
        }
    }
}