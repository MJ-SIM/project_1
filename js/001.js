window.onload = function() {
    const $form = document.querySelector("form");
    const $daysInput = document.querySelector("#days");
    const $mealTypeSelect = document.querySelector("#mealType");
    const $mealTypeSelect2 = document.querySelector("#mealType2");
    const $kcalInput = document.querySelector("#kcal");
    const $signInput = document.querySelector('#sign')
    const $answerTableContainer = document.querySelector("#answerTableContainer");

    // openAI API
    let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

    // 사용자의 질문
    let question;

    //질문, 답변 저장
    let data = [
    {
    "role": "system",
    "content": "assistant는 식단표 작성 전문가이다.",
    }, {
    "role": "user",
    "content": "다이어트를 위한 3일치 아침 식단을 1000~1500kcal 범위에서 작성해줘"
    }, {
    "role": "assistant",
    "content": "다음과 같은 형식으로 답변을 줘. 형식 : [1DAY,['종류', '수량']*n,칼로리 합계], [2DAY,['종류', '수량']*n,칼로리 합계],[3DAY,['종류', '수량']*n,총 칼로리 합계]. 내가 질문을 하면 아래처럼 답변을 주어야 할거야. [1DAY,'현미밥 1공기','계란후라이 2개','된장국 1공기','사과 1/2개',총400kcal], [2DAY,'팬케이크 2장', '베이컨 2장', '스크램블에그 200g',총 580kcal],[3DAY,'시리얼 1보울','우유 200ml','오렌지 1개',총 380kcal] "
    }
    // ,{
    // "role": "user",
    // "content": "n일치 식단작성을 해줘"
    // }, {
    // "role": "assistant",
    // "content": "n>1일때 각각의 하루치 식단 작성 맨위에는 nDAY라고 붙여서 n일중 몇일차인지 알 수 있도록 해줘. 예를들면 user가 5일치 식단작성이라고 입력하면 너는 1일차[...] 2일차[...], 3일차[...], 4일차[...], 5일차[...] 이런식으로 user들이 알아보기 쉽도록 답변해줘."
    // }
    // ,{
    // "role": "user",
    // "content": "식단작성 해줘"
    // }, {
    // "role": "assistant",
    // "content": "'식단'키워드가 들어오면 설명은 빼고 식단만 작성해줘"
    // }
    
    ];

    data.push({
        "role": "user",
        "content": "daysInput"
    })

    data.push({
        "role": "user",
        "content": "mealTypeSelect"
    })
    data.push({
        "role": "user",
        "content": "mealTypeSelect2"
    })
    data.push({
        "role": "user",
        "content": "kcalInput"
    })
    data.push({
        "role": "user",
        "content": "mealTypeSelect"
    })
    data.push({
        "role": "user",
        "content": "signInput"
    })

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
answer = answer.replace(/\([^)]*\)/g, ''); 
// 괄호와 그 안의 내용을 제거
let li = document.createElement("li");
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
    var maskHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
    );
    var maskWidth = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
    );

    // 화면에 출력할 마스크를 설정해줍니다.
    var mask = document.createElement('div');
    mask.id = 'mask';
    mask.style.position = 'absolute';
    mask.style.zIndex = '9000';
    mask.style.backgroundColor = '#000000';
    mask.style.display = 'none';
    mask.style.left = '0';
    mask.style.top = '0';

    var loadingImg = document.createElement('div');
    loadingImg.id = 'loadingImg';
    loadingImg.innerHTML =
    "<img src='img/LoadingImg.gif' style='position: relative; display: block; margin: 0px auto;'/>";

    var loadingTxt = document.createElement('div');loadingTxt.id = 'loadingTxt';
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
}

//로딩종료 함수
function closeLoadingWithMask() {
    var mask = document.getElementById('mask');
    var loadingImg = document.getElementById('loadingImg');
    var loadingTxt = document.getElementById('loadingTxt');
    if (mask && loadingImg && loadingTxt) {
        mask.style.display = 'none';
        loadingImg.style.display = 'none';
        loadingTxt.style.display = 'none';
        mask.parentNode.removeChild(mask);
        loadingImg.parentNode.removeChild(loadingImg);
        loadingTxt.parentNode.removeChild(loadingTxt);
    }
    }

// api 요청보내는 함수
    const apiPost = async (data) => {
    LoadingWithMask();
    const result = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => res.json())
        .then((res) => {
        closeLoadingWithMask()
        printAnswer(res.choices[0].message.content);
        })
        .catch((err) => {
        console.log(err);
        });
    };

    // submit
    $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const days = $daysInput.value;
    const kcal = $kcalInput.value;
    const sign = $signInput.value;
    const mealType = $mealTypeSelect.value;
    const mealType2 = $mealTypeSelect2.value;
    if (days && mealType && mealType2 && kcal ) {
        $daysInput.value = null;
        $kcalInput.value = null;
        $signInput.value = null;
        $mealTypeSelect.value = "";
        $mealTypeSelect2.value = "";
        question = ` ${mealType2}를 위한 ${days}일치  ${mealType} 식단을 ${kcal}kcal 범위에서 짜줘, 특이사항은 ${sign}이 있어, 내가 원하는 형태는 설명이 없고, 레시피가 아닌 식단으로만 구성된 형태야`;
        data.push({ role: "user", content: question });
        apiPost(data)
    }
    });
};