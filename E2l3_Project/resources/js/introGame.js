// 메뉴에서 class 넣고 빼서 움직이기
const navBarLinks = document.querySelectorAll(".nav-link");

navBarLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    navBarLinks.forEach((navLink) => navLink.classList.remove("active")); // 다른 링크에서 'active' 클래스 제거
    link.classList.add("active"); // 클릭된 링크에 'active' 클래스 추가
  });
});

// 게임 종류 버튼 눌러서 게임 이동
const gameNames = document.querySelectorAll(".gameName");
//gameName을 가진 li(버튼)들을 다 가져왔어
const gameImgs = document.querySelectorAll(".gameImg");
//gameImg 를 가진 div 들 가져옴

gameNames.forEach((gameName, index) => {
  gameName.addEventListener("click", function (e) {
    e.preventDefault();
    gameNames.forEach((gameName) => gameName.classList.remove("active1"));
    gameName.classList.add("active1");
    gameImgs.forEach((img, imgIndex) => {
      if (index === imgIndex) {
        if (img.style.display === "none") {
          img.style.display = "block";
        } else {
          img.style.display = "block";
        }
      } else {
        img.style.display = "none";
      }
    });
  });
});

// 게임하기 버튼

const gameBtn1 = document.getElementById("Btn1");
const gameBtn2 = document.getElementById("Btn2");
const gameBtn3 = document.getElementById("Btn3");

gameBtn1.addEventListener("click", function () {
  location.href = "../game/game_sandwich.html";
});
gameBtn2.addEventListener("click", function () {
  location.href = "3_1_game1.html";
});
gameBtn3.addEventListener("click", function () {
  location.href = "../game/game_changecloth.html";
});

// 동영상 플레이
const playBtns = document.querySelectorAll(".button");
playBtns.forEach((el, idx) => {
  el.addEventListener("click", function () {
    const parentDiv = el.parentElement;
    if (parentDiv.style.transform === "scale(1.5, 1.5)") {
      parentDiv.style.transform = "scale(1, 1)";
    } else {
      parentDiv.style.transform = "scale(1.5, 1.5)";
      setTimeout(() => {
        parentDiv.style.transform = "scale(1, 1)";
      }, 500); // 2초 뒤에 원래 크기로 되돌아감
    }
  });
});
