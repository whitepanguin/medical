// 로그아웃 처리
function logout() {
  alert("로그아웃 되었습니다.");
  window.location.href = "/login.html";
}

// QR 스캔 시뮬레이션 동작!!! 나중에 지우기
function simulateScan() {
  const scannedPatient = {
    name: "김사과",
    phoneSuffix: "1234",
    birth: "1990-05-20",
    timestamp: Date.now(),
  };

  let list = JSON.parse(localStorage.getItem("scannedPatients")) || [];

  // 기존 동일 환자 제거 후 맨 앞에 추가
  list = list.filter(
    (p) => p.name !== scannedPatient.name || p.birth !== scannedPatient.birth
  );
  list.unshift(scannedPatient);

  // 최대 10명까지만 유지
  // if (list.length > 10) list = list.slice(0, 10);

  localStorage.setItem("scannedPatients", JSON.stringify(list));

  // 결과 페이지로 이동
  window.location.href = "./result.html";
}

// 환자 리스트 렌더링 (검색어 필터 포함)
function renderRecentList(filter = "") {
  const list = JSON.parse(localStorage.getItem("scannedPatients")) || [];
  const container = document.getElementById("recent-patient-list");
  container.innerHTML = "";

  list.forEach((p) => {
    const nameMasked = p.name.substring(0, 1) + "@" + p.name.substring(2);
    const keyword = (p.name + p.phoneSuffix).toLowerCase();

    if (!filter || keyword.includes(filter.toLowerCase())) {
      const li = document.createElement("li");
      li.textContent = `${nameMasked} ${p.phoneSuffix}`;
      li.onclick = () => (window.location.href = "./result.html");
      container.appendChild(li);
    }
  });
}

// 검색창 입력에 따라 실시간 필터링
document.getElementById("searchInput").addEventListener("input", (e) => {
  renderRecentList(e.target.value);
});

// 엔터 키 입력 시 첫 번째 검색 결과로 이동
document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const list = JSON.parse(localStorage.getItem("scannedPatients")) || [];
    const filter = e.target.value.toLowerCase();
    const match = list.find((p) =>
      (p.name + p.phoneSuffix).toLowerCase().includes(filter)
    );
    if (match) {
      window.location.href = "./result.html";
    }
  }
});

// 페이지 로드시 목록 렌더링
renderRecentList();
