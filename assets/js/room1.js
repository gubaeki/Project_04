var room = document.getElementById('room_container');
var roomRect = room.getBoundingClientRect();
var roomWidth = roomRect.width;
var roomHeight = roomRect.height;

var room_number = 1;

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
            console.log("소변기 구석");
            room.setAttribute('src', 'images/room1-1.png');
            room_number = 2;
        }
    
        if(x < roomWidth * 0.83 && x > roomWidth * 0.7 && y < roomHeight * 0.5){ // 우측상단 2사로 클릭
            console.log("2사로");
            room_number = 3;
            
        }
    }

    else if(room_number === 2){ // 소변기 구석룸 일때
        if(x < roomWidth * 0.2 && y > roomHeight * 0.3 && y < roomHeight * 0.7){ // 우측상단 소변기쪽 클릭
            console.log("메인룸");
            room.setAttribute('src', 'images/room1.png');
            room_number = 1;
        }
    }
    

});