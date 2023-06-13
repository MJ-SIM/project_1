// 모달 팝업창 요소들을 가져옴
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var cards = document.getElementsByClassName("recommend-img-card");

// 첫 번째 카드를 클릭했을 때 첫 번째 모달 팝업창을 보여줌
cards[0].addEventListener("click", function() {
  modal1.style.display = "block";
});

// 두 번째 카드를 클릭했을 때 두 번째 모달 팝업창을 보여줌
cards[1].addEventListener("click", function() {
  modal2.style.display = "block";
});

// 첫 번째 모달 팝업창의 닫기 버튼을 클릭했을 때 모달을 닫음
span1.addEventListener("click", function() {
  modal1.style.display = "none";
});

// 두 번째 모달 팝업창의 닫기 버튼을 클릭했을 때 모달을 닫음
span2.addEventListener("click", function() {
  modal2.style.display = "none";
});

// 모달 외부를 클릭했을 때 첫 번째 모달을 닫음
window.addEventListener("click", function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
});

// 모달 외부를 클릭했을 때 두 번째 모달을 닫음
window.addEventListener("click", function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
});
