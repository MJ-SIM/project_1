import{apiPost} from "./api.js"
import{printAnswer, LoadingWithMask, closeLoadingWithMask } from "./func.js"

window.onload = function(){

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
}
