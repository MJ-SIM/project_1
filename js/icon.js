document.addEventListener("DOMContentLoaded", function() {
  // form 요소 선택
  var form = document.querySelector(".form-chart");

  // form 제출 이벤트 리스너 등록
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    // .answerTableContainer 요소 선택
    var answerTableContainer = document.querySelector(".answerTableContainer");

    // .answerTableContainer 요소를 보이도록 변경
    answerTableContainer.style.display = "block";
  });
});