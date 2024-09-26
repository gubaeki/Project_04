//이미지 관련선언
var room = document.getElementById('room_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;
var return_img = document.getElementById('return_img');
var hammer_bg = document.getElementById('hammer_bg');
var memo_bg = document.getElementById('memo_bg');

//item 관련선언
var item = [,,,,];
item[1] = document.getElementById('item_1');
item[2] = document.getElementById('item_2');
item[3] = document.getElementById('item_3');
item[4] = document.getElementById('item_4');

var ItemFillNum = 0;
var itemFillName = [,,,,];
var itemSelectNum = 0;
var itemSelectName;



//기타 변수
var room_number = 1;
var hammer_get = false;

document.addEventListener('click', function(event) {

    /*
    if (message.style.display === 'block') {
        return; // 메시지가 이미 표시되고 있을 때는 클릭 이벤트를 무시
    }*/

    //터치좌표 입력 시 clientX 대신 pageX 사용(clientX는 현재보이는 화면 좌측 상단이 무조건 0, pageX는 문서의 좌측 상단이 0이고 스크롤이 생겨도 화면 좌측상단은 0이 아님)
    var x = event.pageX;
    var y = event.pageY;

    

    if(room_number === 1){ // 메인룸 일때
        if(x > roomWidth * 0.85 && y < roomHeight * 0.4){ // 우측상단 소변기쪽 클릭
            room.setAttribute('src', 'images/room1-1.png');
            return_img.style.display = 'block';
            room_number = 2;
            if(hammer_get == false){
                hammer_bg.style.display = 'block';
            }
            
        }
    
        if(x > roomWidth * 0.5 && x < roomWidth * 0.67 && y < roomHeight * 0.5){ // 중앙 1사로 클릭
            console.log("1사로");
            room.setAttribute('src', 'images/room1-2.png');
            return_img.style.display = 'block';
            room_number = 3;
        }

        if(x < roomWidth * 0.83 && x > roomWidth * 0.7 && y < roomHeight * 0.4){ // 우측상단 2사로 클릭
            console.log("2사로");
            room.setAttribute('src', 'images/room1-3.png');
            return_img.style.display = 'block';
            room_number = 4;
        }
    }

    else if(room_number === 2){ // 소변기 구석룸 일때
        if(x < roomWidth * 0.2 && y > roomHeight * 0.83 && y < roomHeight * 0.97){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            hammer_bg.style.display = 'none';
            room_number = 1;
        }

    }

    else if(room_number === 3){ // 1사로 일때
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            room_number = 1;
        }
        if(x < roomWidth * 0.78 && x > roomWidth * 0.67 && y > roomHeight * 0.35 && y < roomHeight * 0.45){ // 균열 클릭
            if(itemSelectNum != 0){
                if(itemSelectName === 'hammer'){
                    room.setAttribute('src', 'images/room1-2-1.png');
                    //memo_bg.style.display = 'block';
                    memo_bg.style.display = 'block';
                    var a = 1;
                    var interval = setInterval(function(){
                        memo_bg.style.opacity = a;
                        a = a - 0.1;
                        if(a < 0){clearInterval(interval);};
                    }, 100);
                    itemFillName[itemSelectNum] = "memo";
                    item[itemSelectNum].setAttribute('src', 'images/memo_bg.png');
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
    
    else if(room_number === 4){ // 2사로 일때
        if(x < roomWidth * 0.2 && y > roomHeight * 0.8){ // 메인룸 돌아가기
            room.setAttribute('src', 'images/room1.png');
            return_img.style.display = 'none';
            room_number = 1;
        }
    }

});

// 해머 발견
hammer_bg.addEventListener('click', function(event) {
    hammer_bg.style.display = 'none';
    hammer_get = true;

    if(ItemFillNum === 0){
        item[1].setAttribute('src', 'images/hammer_item.png');
        ItemFillNum++;
        itemFillName[ItemFillNum] = "hammer";
        
    }
    else if(ItemFillNum === 1){
        item[2].setAttribute('src', 'images/hammer_item.png');
        ItemFillNum++;
        itemFillName[ItemFillNum] = "hammer";
        
    }
    else if(ItemFillNum === 2){
        item[3].setAttribute('src', 'images/hammer_item.png');
        ItemFillNum++;
        itemFillName[ItemFillNum] = "hammer";
        
    }
    else if(ItemFillNum === 3){
        item[4].setAttribute('src', 'images/hammer_item.png');
        ItemFillNum++;
        itemFillName[ItemFillNum] = "hammer";
    }
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