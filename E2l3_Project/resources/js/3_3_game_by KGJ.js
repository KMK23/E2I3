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
  { src: "resources/img/그림1.png", width: "30px" },
  { src: "resources/img/그림3.png", width: "130px" },
  { src: "resources/img/양파1-removebg-preview.png", width: "60px" },
  { src: "resources/img/무1-removebg-preview.png", width: "40px" },
  { src: "resources/img/그림1.png", width: "30px" },
  { src: "resources/img/그림3.png", width: "130px" },
  { src: "resources/img/양파1-removebg-preview.png", width: "60px" },
];
const gameImgs = document.querySelector(".gameImgs");
vegetablesImg.forEach((el, index) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = el.src;
  img.style.width = el.width;
  img.className = "vegetablesImgs";
  img.draggable = true;
  img.id = `vege-${index}`;
  div.appendChild(img);
  gameImgs.appendChild(div);
});
const dragImgs = document.querySelectorAll(".vegetablesImgs");
const holes = document.querySelectorAll(".game1-holes");
