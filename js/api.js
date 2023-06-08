import { printAnswer, LoadingWithMask, closeLoadingWithMask } from "./function.js";
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

export {apiPost};