const idinput = document.querySelector(".id-input");
let elSuccessMessage = document.querySelector(".success-message"); // div.success-message.hide
let elFailureMessage = document.querySelector(".failure-message"); // div.failure-message.hide
let elFailureMessageTwo = document.querySelector(".failure-message2"); // div.failure-message2.hide

function idLength(value) {
  return value.length >= 4 && value.length <= 12;
}

function onlyNumberAndEnglish(str) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

idinput.onkeyup = function () {
  // 값을 입력한 경우
  if (idinput.value.length !== 0) {
    // 영어 또는 숫자 외의 값을 입력했을 경우
    if (onlyNumberAndEnglish(idinput.value) === false) {
      elSuccessMessage.classList.add("hide");
      elFailureMessage.classList.add("hide");
      elFailureMessageTwo.classList.remove("hide"); // 영어 또는 숫자만 가능합니다
    }
    // 글자 수가 4~12글자가 아닐 경우
    else if (idLength(idinput.value) === false) {
      elSuccessMessage.classList.add("hide"); // 성공 메시지가 가려져야 함
      elFailureMessage.classList.remove("hide"); // 아이디는 4~12글자이어야 합니다
      elFailureMessageTwo.classList.add("hide"); // 실패 메시지2가 가려져야 함
    }
    //     // 조건을 모두 만족할 경우
    //     else if (idLength(idinput.value) || onlyNumberAndEnglish(idinput.value)) {
    //       elSuccessMessage.classList.remove("hide"); // 사용할 수 있는 아이디입니다
    //       elFailureMessage.classList.add("hide"); // 실패 메시지가 가려져야 함
    //       elFailureMessageTwo.classList.add("hide"); // 실패 메시지2가 가려져야 함
    //     }
    //   }
    //   // 값을 입력하지 않은 경우 (지웠을 때)
    //   // 모든 메시지를 가린다.
    else {
      elSuccessMessage.classList.add("hide");
      elFailureMessage.classList.add("hide");
      elFailureMessageTwo.classList.add("hide");
    }
  }
};
// 비밀번호 정보

let password = document.querySelector("#password");
let password2 = document.querySelector("#password2");

let elMismatchMessage = document.querySelector(".mismatch-message"); // div.mismatch-message.hide
let elStrongPasswordMessage = document.querySelector(".strongPassword-message");

function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
}

function isMatch(password1, password2) {
  return password1 === password2;
}

password.onkeyup = function () {
  // console.log(elInputPassword.value);
  // 값을 입력한 경우
  if (password.value.length !== 0) {
    if (strongPassword(password.value)) {
      elStrongPasswordMessage.classList.add("hide"); // 실패 메시지가 가려져야 함
    } else {
      elStrongPasswordMessage.classList.remove("hide"); // 실패 메시지가 보여야 함
    }
  }
  // 값을 입력하지 않은 경우 (지웠을 때)
  // 모든 메시지를 가린다.
  else {
    elStrongPasswordMessage.classList.add("hide");
  }
};
// 비밀번호 입력란에서 엔터 입력 시 이벤트 핸들링
password.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    // 비밀번호 입력란에서 엔터를 눌렀을 때의 처리를 추가
    // 예: 다음 입력 필드로 포커스를 이동하거나 특정 동작 수행
  }
});

// 비밀번호 확인
password2.onkeyup = function () {
  // console.log(elInputPasswordRetype.value);
  if (password2.value.length !== 0) {
    if (isMatch(password.value, password2.value)) {
      elMismatchMessage.classList.add("hide"); // 실패 메시지가 가려져야 함
    } else {
      elMismatchMessage.classList.remove("hide"); // 실패 메시지가 보여야 함
    }
  } else {
    elMismatchMessage.classList.add("hide"); // 실패 메시지가 가려져야 함
  }
};
// 주소 검색
function findAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      console.log(data);

      let addr = ""; // 주소 변수
      let extraAddr = ""; // 참고항목 변수

      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("sample6_address").value = addr + extraAddr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    },
  }).open();
}

const emailSelect = document.getElementById("emailaddr");
const email2Input = document.getElementById("email2");
emailSelect.addEventListener("change", function () {
  email2Input.value = emailSelect.value;
});
