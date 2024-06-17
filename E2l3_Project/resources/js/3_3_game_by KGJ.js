// 게임 1번 스크립트

const groundOne = document.querySelector(".ground-one");

const vegetables = [
  {
    src: "resources/img/그림1.png",
    className: "carrot",
    left: "20px",
    width: "30px",
  },
  {
    src: "resources/img/그림3.png",
    className: "spring-onion",
    left: "80px",
    width: "130px",
  },
  {
    src: "resources/img/그림1.png",
    className: "carrot",
    left: "240px",
    width: "30px",
  },
  {
    src: "resources/img/그림3.png",
    className: "spring-onion",
    left: "300px",
    width: "130px",
  },
  {
    src: "resources/img/그림1.png",
    className: "carrot",
    left: "460px",
    width: "30px",
  },
  {
    src: "resources/img/그림3.png",
    className: "spring-onion",
    left: "520px",
    width: "130px",
  },
  {
    src: "resources/img/그림1.png",
    className: "carrot",
    left: "870px",
    width: "30px",
  },
  {
    src: "resources/img/그림3.png",
    className: "spring-onion",
    left: "900px",
    width: "130px",
  },
];

vegetables.forEach((vege) => {
  const img = document.createElement("img");
  img.src = vege.src;
  img.className = `vege ${vege.className}`;
  img.style.position = "absolute";
  img.style.left = vege.left;
  img.style.width = vege.width;
  groundOne.appendChild(img);
});

// 게임 2번 스크립트
const groundTwo = document.querySelector(".ground-two");
const vegetables2 = [
  {
    src: "resources/img/무1-removebg-preview.png",
    className: "radish",
    left: "20px",
    width: "40px",
  },
  {
    src: "resources/img/무1-removebg-preview.png",
    className: "radish",
    left: "130px",
    width: "40px",
  },
  {
    src: "resources/img/양파1-removebg-preview.png",
    className: "onion",
    left: "240px",
    width: "60px",
  },
  {
    src: "resources/img/무1-removebg-preview.png",
    className: "radish",
    left: "380px",
    width: "40px",
  },
  {
    src: "resources/img/무1-removebg-preview.png",
    className: "radish",
    left: "500px",
    width: "40px",
  },
  {
    src: "resources/img/양파1-removebg-preview.png",
    className: "onion",
    left: "600px",
    width: "60px",
  },
  {
    src: "resources/img/무1-removebg-preview.png",
    className: "radish",
    left: "820px",
    width: "40px",
  },
];
vegetables2.forEach((el) => {
  const img = document.createElement("img");
  img.src = el.src;
  img.className = `vege2 ${el.className}`;
  img.style.position = "absolute";
  img.style.left = el.left;
  img.style.width = el.width;
  groundTwo.appendChild(img);
});

// 게임 3번 스크립트
const groundThree = document.querySelector(".ground-three");
const vegetable3 = [
  {
    src: "resources/img/그림1.png",
    className: "carrot",
    left: "20px",
    width: "30px",
  },
  {
    src: "resources/img/그림3.png",
    className: "spring-onion",
    left: "80px",
    width: "130px",
  },
  {
    src: "resources/img/양파1-removebg-preview.png",
    className: "onion",
    left: "240px",
    width: "60px",
  },
  {
    src: "resources/img/그림1.png",
    className: "carrot",
    left: "370px",
    width: "30px",
  },
  {
    src: "resources/img/그림3.png",
    className: "spring-onion",
    left: "430px",
    width: "130px",
  },
  {
    src: "resources/img/양파1-removebg-preview.png",
    className: "onion",
    left: "590px",
    width: "60px",
  },
];
vegetable3.forEach((el) => {
  const img = document.createElement("img");
  img.src = el.src;
  img.className = `vege3 ${el.className}`;
  img.style.position = "absolute";
  img.style.left = el.left;
  img.style.width = el.width;
  groundThree.appendChild(img);
});

// 야채 고르기 칸
const vegetablesImg = [
  { src: "resources/img/그림1.png", width: "30px", className: "carrot" },
  { src: "resources/img/그림3.png", width: "130px", className: "spring-onion" },
  {
    src: "resources/img/양파1-removebg-preview.png",
    width: "60px",
    className: "onion",
  },
  {
    src: "resources/img/무1-removebg-preview.png",
    width: "40px",
    className: "radish",
  },
  { src: "resources/img/그림1.png", width: "30px", className: "carrot" },
  { src: "resources/img/그림3.png", width: "130px", className: "spring-onion" },
  {
    src: "resources/img/양파1-removebg-preview.png",
    width: "60px",
    className: "onion",
  },
];

const gameImgs = document.querySelector(".gameImgs");

vegetablesImg.forEach((el, index) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = el.src;
  img.style.width = el.width;
  img.className = `vegetablesImgs ${el.className}`;
  img.draggable = true;
  img.id = `vege-${index}`;
  div.appendChild(img);
  gameImgs.appendChild(div);

  // 드래그 이벤트 설정
  img.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text", e.target.id);
  });
});
const holes = document.querySelectorAll(".game1-holes");

holes.forEach((hole) => {
  hole.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  hole.addEventListener("drop", function (e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    // 해당 hole에 드롭된 이미지가 carrot 또는 spring-onion 클래스를 가지고 있을 경우 처리
    if (draggedElement.classList.contains("carrot") && hole.id === "hole1") {
      draggedElement.classList.add("dropped", "carrot");
      hole.appendChild(draggedElement);
      resetHoleStyle(hole);
    } else if (
      draggedElement.classList.contains("spring-onion") &&
      hole.id === "hole2"
    ) {
      draggedElement.classList.add("dropped", "spring-onion");
      hole.appendChild(draggedElement);
      resetHoleStyle(hole);
    } else {
      alert("잘못된 선택입니다.");
    }
  });
});

const dragImgs = document.querySelectorAll(".vegetablesImgs");
const game2Hole1 = document.getElementById("game2-hole1");
const game2Hole2 = document.getElementById("game2-hole2");

// 드래그 가능한 이미지에 드래그 이벤트 설정
dragImgs.forEach((img) => {
  img.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text", e.target.id);
  });
});

// game2-hole1에 대한 드래그 오버 및 드롭 이벤트 설정
game2Hole1.addEventListener("dragover", function (e) {
  e.preventDefault();
});

game2Hole1.addEventListener("drop", function (e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);

  // 드롭된 이미지가 radish 클래스를 가지고 있을 경우 처리
  if (draggedElement.classList.contains("radish")) {
    draggedElement.classList.add("dropped", "radish");
    game2Hole1.appendChild(draggedElement);
    resetHoleStyle(game2Hole1); // hole의 스타일 초기화 함수 호출
  } else {
    alert("잘못된 선택입니다.");
  }
});

// game2-hole2에 대한 드래그 오버 및 드롭 이벤트 설정
game2Hole2.addEventListener("dragover", function (e) {
  e.preventDefault();
});

game2Hole2.addEventListener("drop", function (e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);

  // 드롭된 이미지가 onion 클래스를 가지고 있을 경우 처리
  if (draggedElement.classList.contains("onion")) {
    draggedElement.classList.add("dropped", "onion");
    game2Hole2.appendChild(draggedElement);
    resetHoleStyle(game2Hole2); // hole의 스타일 초기화 함수 호출
  } else {
    alert("잘못된 선택입니다.");
  }
});

// hole의 스타일 초기화 함수
function resetHoleStyle(hole) {
  hole.style.backgroundColor = "transparent";
  hole.style.borderRadius = "0";
  hole.style.width = "auto";
  hole.style.height = "auto";
}

const game3hole1 = document.querySelector("#game3-hole1");
const game3hole2 = document.querySelector("#game3-hole2");
const game3hole3 = document.querySelector("#game3-hole3");
// 드래그 시작
dragImgs.forEach((img) => {
  img.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text", e.target.id);
  });
});
// game3hole1 시작
game3hole1.addEventListener("dragover", function (e) {
  e.preventDefault();
});
game3hole1.addEventListener("drop", function (e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const dgEl = document.getElementById(data);

  if (dgEl.classList.contains("carrot")) {
    dgEl.classList.add("dropped", "carrot");
    game3hole1.appendChild(dgEl);
    resetHoleStyle(game3hole1);
  } else {
    alert("잘못된 선택입니다.");
  }
});

game3hole2.addEventListener("dragover", function (e) {
  e.preventDefault();
});
game3hole2.addEventListener("drop", function (e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const dgEl = document.getElementById(data);

  if (dgEl.classList.contains("spring-onion")) {
    dgEl.classList.add("dropped", "spring-onion");
    game3hole2.appendChild(dgEl);
    resetHoleStyle(game3hole2);
  } else {
    alert("잘못된 선택입니다.");
  }
});

game3hole3.addEventListener("dragover", function (e) {
  e.preventDefault();
});
game3hole3.addEventListener("drop", function (e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const dgEl = document.getElementById(data);

  if (dgEl.classList.contains("onion")) {
    dgEl.classList.add("dropped", "onions");
    game3hole3.appendChild(dgEl);
    resetHoleStyle(game3hole3);
  } else {
    alert("잘못된 선택입니다.");
  }
});
