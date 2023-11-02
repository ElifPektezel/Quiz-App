
document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.querySelector(".start-btn button");
    const infoBox = document.querySelector(".info-box");
    const exitBtn = infoBox.querySelector(".buttons .quit");
    const continueBtn = infoBox.querySelector(".buttons .restart");
    const quizBox = document.querySelector(".quiz-box");
    const optionList = document.querySelector(".option-list");
    const timeCount = quizBox.querySelector(".timer .timer-sec");
    const timeLine = quizBox.querySelector(".timer .timer-line")

    // "Start Quiz" butonu tıklandığında
    startBtn.onclick = () => {
        infoBox.classList.add("activeInfo");
    }

    // "Exit Quiz" butonu tıklandığında
    exitBtn.onclick = () => {
        infoBox.classList.remove("activeInfo");
    }

    // "Continue" butonu tıklandığında
    continueBtn.onclick = () => {
        infoBox.classList.remove("activeInfo");
        quizBox.classList.add("activeQuiz");
        showQuestions(0);
        startTimer(14);
        startTimerLine(0);
    }

    let queCount = 0;
    let counter;
    let counterLine;
    let timeValue = 15;
    let widthValue = 0;
    let score = 0;

    const nextBtn = document.querySelector(".next-btn");
    const resultBox = document.querySelector(".result-box");
    
    // "Next" butonu tıklandığında
    nextBtn.onclick = () => {
        if (queCount < questions.length - 1) {
            queCount++;
            queCounter(queCount);
            showQuestions(queCount);
            clearInterval(counter);
            startTimer(timeValue);
            clearInterval(counterLine);
            startTimerLine(widthValue);
            nextBtn.style.display = "none";
        }
        else {
            console.log("Sorular tamamlandı.");
            showResultBox();
        }
    }
    // Soru ve cevapları göster.
    function showQuestions(index) {
        const queText = document.querySelector(".que-text");
        let queTag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
        let optionTag = '';
        let options = questions[index].options;
        queText.innerHTML = queTag;

        for (let i = 0; i < options.length; i++) {
            optionTag += `<div class="option"><span>${options[i]}</span></div>`;
        }
        optionList.innerHTML = optionTag;

        // User Options Selected
        const option = optionList.querySelectorAll(".option");
        for (let i = 0; i < option.length; i++) {
            option[i].addEventListener("click", function () {
                optionSelected(this);
            });
        }
    }


    //let tickIcon = ' <div class="icon tick"><i class="fa-solid fa-check"></i></div>';
    //let crossIcon = ' <div class="icon cross"><i class="fa-solid fa-x"></i></div>';

    // Seçilen optionu kontrol et class ekle
    function optionSelected(answer) {
        clearInterval(counter);
        clearInterval(counterLine);
        let userAns = answer.textContent;
        let correctAns = questions[queCount].answer;
        let allOptions = optionList.children.length;
        if (userAns === correctAns) {
            score += 1;
            answer.classList.add("correct");
            console.log("Cevap Doğru");
        } else {
            answer.classList.add("incorrect");
            console.log("Cevap Yanlış");
        }
        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add("disabled");
        }
        nextBtn.style.display = "block";
    }

    function showResultBox() {
        infoBox.classList.remove("activeInfo");
        quizBox.classList.remove("activeQuiz");
        resultBox.classList.add("activeResult");
        const scoreText = resultBox.querySelector(".score-text");
        if (score > 3) {
            let scoreTag = ' <span>Congrast!<p>' + score + '</p> uot of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else if (score > 1) {
            let scoreTag = ' <span>Nice :)<p>' + score + '</p> uot of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else {
            let scoreTag = ' <span>sorry, bad<p>' + score + '</p> uot of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
    }

    // 15sn sayaç kontrol fonk.
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time < 10 ? "0" + time : time;
        time--;

        if (time <= 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time <= 0) {
            clearInterval(counter);
            timeCount.textContent = "0";
            let allOptions = optionList.children.length;
            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.style.display = "block";
            nextBtn.click(); // Otomatik olarak sonraki soruya geç
        }
    }
}


    // Sayaç kontrol çizgisi
    function startTimerLine(time) {
        counterLine = setInterval(timer, 29);
        function timer() {
            time += 1;
            timeLine.style.width = time + "px";
            if (time > 549) {
                clearInterval(counterLine);
            }
        }
    }

    // 2 of 5 questions
    function queCounter(index) {
        const bottomQuesCounter = document.querySelector(".total-que"); // Eğer quizBox'un global bir değişken olduğu biliniyorsa, quizBox kullanılabilir
        let totalQuesCountTag = '<span><p>' + (index + 1) + '</p> of <p>' + questions.length + '</p> Questions</span>';
        bottomQuesCounter.innerHTML = totalQuesCountTag;
    }
    showQuestions(0);
    queCounter(0);


});
