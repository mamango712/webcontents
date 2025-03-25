const gallery = document.getElementById("gallery"); // ID가 'gallery'인 요소를 선택하여 gallery 변수에 할당합니다.

window.onmousemove = e => { // window 객체에 마우스 이동 이벤트 핸들러를 설정합니다.
  const mouseX = e.clientX, // 마우스의 X 좌표를 가져와 mouseX 변수에 할당합니다.
        mouseY = e.clientY; // 마우스의 Y 좌표를 가져와 mouseY 변수에 할당합니다.
  
  const xDecimal = mouseX / window.innerWidth, // 마우스 X 좌표를 윈도우 너비로 나누어 xDecimal 변수에 할당합니다.
        yDecimal = mouseY / window.innerHeight; // 마우스 Y 좌표를 윈도우 높이로 나누어 yDecimal 변수에 할당합니다.
  
  const maxX = gallery.offsetWidth - window.innerWidth, // gallery의 너비에서 윈도우 너비를 뺀 값을 maxX 변수에 할당합니다.
        maxY = gallery.offsetHeight - window.innerHeight; // gallery의 높이에서 윈도우 높이를 뺀 값을 maxY 변수에 할당합니다.
  
  const panX = maxX * xDecimal * -1, // xDecimal과 maxX를 곱하고 -1을 곱하여 panX 변수에 할당합니다.
        panY = maxY * yDecimal * -1; // yDecimal과 maxY를 곱하고 -1을 곱하여 panY 변수에 할당합니다.
  
  gallery.animate({ // gallery 요소를 애니메이션합니다.
    transform: `translate(${panX}px, ${panY}px)` // gallery를 panX와 panY만큼 이동시킵니다.
  }, {
    duration: 4000, // 애니메이션 지속 시간을 4000ms(4초)로 설정합니다.
    fill: "forwards", // 애니메이션이 끝난 후에도 마지막 상태를 유지합니다.
    easing: "ease" // 애니메이션을 'ease' 이징 함수로 적용합니다.
  })
}