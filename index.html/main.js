// 다크/화이트 모드 토글 및 저장
document.addEventListener("DOMContentLoaded", function () {
  const THEME_KEY = "theme";
  const body = document.body;

  // 토글 버튼이 없으면 자동으로 추가 (원하는 위치에 직접 넣어도 됨)
  let toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.id = "theme-toggle";
    toggleBtn.innerText = "🌙 다크모드";
    toggleBtn.style.position = "fixed";
    toggleBtn.style.top = "18px";
    toggleBtn.style.right = "24px";
    toggleBtn.style.zIndex = "1000";
    toggleBtn.style.background = "#a0855b";
    toggleBtn.style.color = "#fff";
    toggleBtn.style.border = "none";
    toggleBtn.style.borderRadius = "7px";
    toggleBtn.style.fontSize = "1.08rem";
    toggleBtn.style.padding = "0.5rem 1.1rem";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.boxShadow = "0 2px 8px rgba(160,133,91,0.07)";
    document.body.appendChild(toggleBtn);
  }

  // 테마 적용 함수
  function setTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      toggleBtn.innerText = "☀️ 라이트모드";
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      toggleBtn.innerText = "🌙 다크모드";
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  // 초기 테마 설정
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(systemPrefersDark ? "dark" : "light");
  }

  // 토글 버튼 클릭 이벤트
  toggleBtn.addEventListener("click", function () {
    const isDark = body.classList.contains("dark-theme");
    setTheme(isDark ? "light" : "dark");
  });
});
