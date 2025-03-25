// HTML 요소 선택 및 상수 정의
const pictures = document.querySelectorAll('.Picture'); // 모든 Picture 클래스를 가진 요소를 선택하여 pictures 변수에 저장
var previousTouch = undefined; // 이전 터치 이벤트를 추적하기 위한 변수 초기화

// 함수 정의
function updateElementPosition(element, event) {
  var movementX, movementY;

  // 이동량 계산
  if (event.type === 'touchmove') { // 터치 이벤트인 경우
    const touch = event.touches[0];
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0; // 이동한 X 좌표
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0; // 이동한 Y 좌표
    previousTouch = touch; // 현재 터치 이벤트를 이전 터치로 설정
  } else { // 마우스 이벤트인 경우
    movementX = event.movementX; // 마우스의 X 이동량
    movementY = event.movementY; // 마우스의 Y 이동량
  }
  
  // 요소의 새로운 위치 계산
  const elementY = parseInt(element.style.top || 0) + movementY; // 요소의 Y 좌표
  const elementX = parseInt(element.style.left || 0) + movementX; // 요소의 X 좌표

  // 요소의 위치 업데이트
  element.style.top = elementY + "px"; // 요소의 Y 좌표 업데이트
  element.style.left = elementX + "px"; // 요소의 X 좌표 업데이트
}

function startDrag(element, event) {
  // 드래그 작업 시작
  const updateFunction = (event) => updateElementPosition(element, event); // 요소의 위치를 업데이트하는 함수
  const stopFunction = () => stopDrag({update: updateFunction, stop: stopFunction}); // 드래그 작업을 중지하는 함수
  document.addEventListener("mousemove", updateFunction); // 마우스 이동 이벤트에 대한 이벤트 리스너 등록
  document.addEventListener("touchmove", updateFunction); // 터치 이동 이벤트에 대한 이벤트 리스너 등록
  document.addEventListener("mouseup", stopFunction); // 마우스 버튼 놓음 이벤트에 대한 이벤트 리스너 등록
  document.addEventListener("touchend", stopFunction); // 터치 종료 이벤트에 대한 이벤트 리스너 등록
}

function stopDrag(functions) {
  previousTouch = undefined; // 이전 터치 초기화
  document.removeEventListener("mousemove", functions.update); // 마우스 이동 이벤트 리스너 제거
  document.removeEventListener("touchmove", functions.update); // 터치 이동 이벤트 리스너 제거
  document.removeEventListener("mouseup", functions.stop); // 마우스 버튼 놓음 이벤트 리스너 제거
  document.removeEventListener("touchend", functions.stop); // 터치 종료 이벤트 리스너 제거
}

// 이벤트 핸들러 등록
pictures.forEach(picture => {
  const range = 100; // 무작위 위치 설정 범위
  const randomX = Math.random() * (range * 2) - range; // 무작위 X 좌표
  const randomY = Math.random() * (range * 2) - range; // 무작위 Y 좌표
  const randomRotate = Math.random() * (range / 2) - range / 4; // 무작위 회전 각도
  const startFunction = (event) => startDrag(picture, event); // 드래그 시작 함수
  picture.style.top = `${randomY}px`; // 요소의 Y 좌표 설정
  picture.style.left = `${randomX}px`; // 요소의 X 좌표 설정
  picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`; // 요소의 회전 설정
  picture.addEventListener("mousedown", startFunction); // 마우스 클릭 이벤트에 대한 이벤트 리스너 등록
  picture.addEventListener("touchstart", startFunction); // 터치 시작 이벤트에 대한 이벤트 리스너 등록
});

//리스너 : 이벤트가 발생할 때까지 기다린 후 이벤트에 응답하는 JavaScript의 함수