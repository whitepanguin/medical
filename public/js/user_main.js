//  로그인 / 로그아웃 / 회원가입
 function login() {
    window.location.href = "/login";
  }
  function logout() {
    alert("로그아웃되었습니다.");
    window.location.href = "/login";
  }
  function signup() {
    window.location.href = "/signup";
  }

// DOM 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("component-qr-container");
  const userInfo = "https://yourx.kr/user/12345";

  // QR 코드 생성
  QRCode.toCanvas(
    document.createElement("canvas"),
    userInfo + "?t=" + Date.now(),
    { width: 240 },
    function (error, canvas) {
      if (error) {
        console.error("QR 생성 오류:", error);
      } else {
        container.appendChild(canvas);
      }
    }
  );

  // 카운트다운 텍스트 생성
  const timerDisplay = document.createElement("div");
  timerDisplay.style.marginTop = "10px";
  timerDisplay.style.fontSize = "14px";
  timerDisplay.style.color = "#555";
  timerDisplay.style.fontWeight = "500";
  timerDisplay.style.display = "none"; // 초기에는 숨김
  container.appendChild(timerDisplay);

  let timeoutId = null;
  let intervalId = null;

  // 클릭 시 블러 해제 및 타이머 시작
  container.addEventListener("click", () => {
    if (!container.classList.contains("active")) {
      container.classList.add("active");
      let remaining = 40;
      timerDisplay.textContent = `남은 시간: ${remaining}초`;
      timerDisplay.style.display = "block";

      // 1초마다 시간 감소
      intervalId = setInterval(() => {
        remaining -= 1;
        timerDisplay.textContent = `남은 시간: ${remaining}초`;

        if (remaining <= 0) {
          clearInterval(intervalId);
          container.classList.remove("active");
          timerDisplay.style.display = "none";
        }
      }, 1000);

      // 백업용: 60초 후 자동 블러 처리 (이중 안전장치)
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        container.classList.remove("active");
        timerDisplay.style.display = "none";
      }, 40000);
    }
  });
});
