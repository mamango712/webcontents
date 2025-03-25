// 카드가 회전할 수 있는 최대 각도를 정의합니다.
const angle = 20;

// 사용되지 않는 변수입니다.
// const rotateCard = window;

// 두 값 사이를 선형 보간하는 함수입니다.
const lerp = (start, end, amount) => {
	return (1 - amount) * start + amount * end;
};

// 값을 새로운 범위로 변환하는 함수입니다.
const remap = (value, oldMax, newMax) => {
	const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
	return Math.min(Math.max(newValue, -newMax), newMax);
};

// 문서가 로드되면 실행되는 이벤트 핸들러입니다.
window.addEventListener("DOMContentLoaded", (event) => {
	// 모든 카드 요소를 선택합니다.
	const cards = document.querySelectorAll(".card");
	
	// 각 카드에 대해 이벤트 리스너를 등록합니다.
	cards.forEach((e) => {		
		// 마우스 이동 시 카드의 회전을 처리하는 이벤트 리스너를 등록합니다.
		e.addEventListener("mousemove", (event) => {
			// 카드 요소의 위치와 크기 정보를 가져옵니다.
			const rect = e.getBoundingClientRect();
			// 카드 요소의 중심점 좌표를 계산합니다.
			const centerX = (rect.left + rect.right) / 2;
			const centerY = (rect.top + rect.bottom) / 2;
			// 마우스 위치와 중심점 간의 상대적인 위치를 계산합니다.
			const posX = event.pageX - centerX;
			const posY = event.pageY - centerY;
			// 상대적인 위치를 각도로 변환합니다.
			const x = remap(posX, rect.width / 2, angle);
			const y = remap(posY, rect.height / 2, angle);
			// 변환된 각도를 데이터 속성에 저장합니다.
			e.dataset.rotateX = x;
			e.dataset.rotateY = -y;
		});
		
		// 마우스가 카드에서 벗어났을 때 초기 상태로 되돌리는 이벤트 리스너를 등록합니다.
		e.addEventListener("mouseout", (event) => {
			e.dataset.rotateX = 0;
			e.dataset.rotateY = 0;
		});
	});
	
	// 화면을 업데이트하는 함수입니다.
	const update = () => {
		// 모든 카드에 대해 반복합니다.
		cards.forEach((e) => {
			// 현재 카드의 X 및 Y 회전 값을 가져옵니다.
			let currentX = parseFloat(e.style.getPropertyValue('--rotateY').slice(0, -1));
			let currentY = parseFloat(e.style.getPropertyValue('--rotateX').slice(0, -1));
			// 값이 유효하지 않으면 0으로 설정합니다.
			if (isNaN(currentX)) currentX = 0;
			if (isNaN(currentY)) currentY = 0;
			// 선형 보간을 사용하여 부드러운 회전 효과를 적용합니다.
			const x = lerp(currentX, e.dataset.rotateX, 0.05);
			const y = lerp(currentY, e.dataset.rotateY, 0.05);
			// 회전 값을 CSS 변수에 적용합니다.
			e.style.setProperty("--rotateY", x + "deg");
			e.style.setProperty("--rotateX", y + "deg");
		})
	}
	// 일정 간격마다 화면을 업데이트합니다.
	setInterval(update, 1000/60);
});

// 마우스 클릭 이벤트를 처리하는 함수입니다.
document.querySelector('.card.border-left-behind a').addEventListener('click', function(event) {
	// 클릭 이벤트 발생 시 해당 링크로 이동합니다.
	window.location.href = this.href;
});

