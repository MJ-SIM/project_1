const $answerTableContainer = document.querySelector("#answerTableContainer");

// 화면에 답변 그려주는 함수
const printAnswer =(answer)=>{
    answer = answer.replace(/\([^)]*\)/g, ''); 
    // 괄호와 그 안의 내용을 제거
    const li = document.createElement("li");
    li.classList.add("answer");
    li.innerText = answer;
    
    // 답변을 테이블 형태로 출력
    const mealData = answer.split("\n");
    $answerTableContainer.innerHTML = ""; // 테이블 컨테이너 초기화
    
    if (mealData.length > 1) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    
    // 테이블 헤더 생성
    const headerRow = document.createElement("tr");
    const dateHeader = document.createElement("th");
    // const mealTypeHeader = document.createElement("th");
    // const menuHeader = document.createElement("th");
    
    dateHeader.textContent = "메뉴";
    // mealTypeHeader.textContent = "식사";
    // menuHeader.textContent = "메뉴";
    
    headerRow.appendChild(dateHeader);
    // headerRow.appendChild(mealTypeHeader);
    // headerRow.appendChild(menuHeader);
    thead.appendChild(headerRow);
    
    // 테이블 내용 생성
    for (let i = 1; i < mealData.length; i++) {
        const rowData = mealData[i].split(",");
        const row = document.createElement("tr");
    
        for (let j = 0; j < rowData.length; j++) {
        const cell = document.createElement("td");
        cell.textContent = rowData[j].trim();
        row.appendChild(cell);
        }
    tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    $answerTableContainer.appendChild(table);
    }
};

//로딩중 화면 함수
function LoadingWithMask() {
// 화면의 높이와 너비를 구합니다.
    const maskHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
    );
    const maskWidth = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
    );

    // 화면에 출력할 마스크를 설정해줍니다.
    const mask = document.createElement('div');
    mask.id = 'mask';
    mask.style.position = 'absolute';
    mask.style.zIndex = '9000';
    mask.style.backgroundColor = '#000000';
    mask.style.display = 'none';
    mask.style.left = '0';
    mask.style.top = '0';

    const loadingImg = document.createElement('div');
    loadingImg.id = 'loadingImg';
    loadingImg.innerHTML =
    "<img src='gif/LoadingImg.gif' style='position: relative; display: block; margin: 0px auto;'/>";

    const loadingTxt = document.createElement('div');loadingTxt.id = 'loadingTxt';
    loadingTxt.innerHTML='입력하신 정보로 식단을 작성중 입니다';
    loadingTxt.style.color = 'gray'
    loadingTxt.style.fontSize = '20px'
    loadingTxt.style.textAlign = 'center'

// 화면에 레이어 추가
document.body.appendChild(mask);
document.body.appendChild(loadingImg);
document.body.appendChild(loadingTxt);

// 마스크의 높이와 너비를 화면에 맞춰 전체 화면을 채웁니다.
mask.style.width = maskWidth + 'px';
mask.style.height = maskHeight + 'px';
mask.style.opacity = '0.3';

// 마스크 표시(고민중)
// mask.style.display = 'block';

// 로딩중 이미지 표시
loadingImg.style.display = 'block';
loadingTxt.style.display = 'block';
};

//로딩종료 함수
function closeLoadingWithMask() {
    const mask = document.getElementById('mask');
    const loadingImg = document.getElementById('loadingImg');
    const loadingTxt = document.getElementById('loadingTxt');
    if (mask && loadingImg && loadingTxt) {
        mask.style.display = 'none';
        loadingImg.style.display = 'none';
        loadingTxt.style.display = 'none';
        mask.parentNode.removeChild(mask);
        loadingImg.parentNode.removeChild(loadingImg);
        loadingTxt.parentNode.removeChild(loadingTxt);
    }
};

export{printAnswer, LoadingWithMask, closeLoadingWithMask }