import { printAnswer, LoadingWithMask, closeLoadingWithMask } from "./func.js";

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

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

export {apiPost, url};