const images = document.getElementsByClassName("image"); // "image" 클래스를 가진 모든 요소를 선택하여 images 변수에 저장합니다.

let globalIndex = 0, // globalIndex 변수는 이미지의 순서를 추적합니다.
    last = { x: 0, y: 0 }; // last 변수는 마지막 마우스 위치를 저장합니다.

const activate = (image, x, y) => { // activate 함수는 이미지를 활성화하고 위치를 설정합니다.
  image.style.left = `${x}px`; // 이미지의 왼쪽 위치를 x 좌표로 설정합니다.
  image.style.top = `${y}px`; // 이미지의 위쪽 위치를 y 좌표로 설정합니다.
  image.style.zIndex = globalIndex; // 이미지의 z-index를 설정하여 순서를 조정합니다.

  image.dataset.status = "active"; // 이미지의 데이터 속성 status를 "active"로 설정합니다.

  last = { x, y }; // 마지막 위치를 현재 x, y 좌표로 업데이트합니다.
}

const distanceFromLast = (x, y) => { // distanceFromLast 함수는 현재 위치와 마지막 위치 사이의 거리를 계산합니다.
  return Math.hypot(x - last.x, y - last.y); // 피타고라스 정리를 사용하여 두 점 사이의 거리를 반환합니다.
}

const handleOnMove = e => { // handleOnMove 함수는 마우스 이동 이벤트를 처리합니다.
  if (distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 20)) { // 현재 위치와 마지막 위치 사이의 거리가 화면 너비의 1/20보다 큰지 확인합니다.
    const lead = images[globalIndex % images.length], // 현재 인덱스에 해당하는 이미지를 lead 변수에 저장합니다.
          tail = images[(globalIndex - 5) % images.length]; // 현재 인덱스에서 5 이전의 이미지를 tail 변수에 저장합니다.

    activate(lead, e.clientX, e.clientY); // lead 이미지를 현재 마우스 위치로 활성화합니다.

    if (tail) tail.dataset.status = "inactive"; // tail 이미지가 존재하면, 해당 이미지의 데이터 속성 status를 "inactive"로 설정합니다.
    
    globalIndex++; // globalIndex를 증가시켜 다음 이미지를 가리키도록 합니다.
  }
}

window.onmousemove = e => handleOnMove(e); // 마우스가 이동할 때 handleOnMove 함수를 호출합니다.

window.ontouchmove = e => handleOnMove(e.touches[0]); // 터치 이동 이벤트가 발생할 때 handleOnMove 함수를 호출합니다.
