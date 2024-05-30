
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");



start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}


exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //oculto 
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);

}

/* let timeValue = 15; */
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;



const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");
const quest_count = document.querySelector("footer .total_que");


restart_quiz.onclick=() => {
    window.location.reload();
}

quit_quiz.onclick = () => {
    window.location.href = "../WebPrincipal/index.html";
}

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);


        next_btn.classList.remove("show");
    } else {

        showResult();
    }
}


function showQuetions(i) {
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + questions[i].numb + ". " + questions[i].question + '</span>';

    let option_tag = '<div class="option"><span>' + questions[i].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[i].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[i].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[i].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");


    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fa-solid fas fa-times"></i></div>';


function optionSelected(answer) {

    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if (userAns == correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("respusta correcta");
        console.log("acertadas = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("error");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);

            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span>¡Muy Bien! Has consegido <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span>Se podría mejorar <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;

    }else if (userScore ==0) {
        let scoreTag = '<span>¡Vaya!<p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }else {
        let scoreTag = '<span>Upss... solo has acertado  <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}


function queCounter(i) {

    let totalQueCounTag = '<span><p>' + i + '</p> of <p>' + questions.length + '</p> Questions</span>';
    quest_count.innerHTML = totalQueCounTag;
}