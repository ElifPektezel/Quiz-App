
document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.querySelector(".start-btn button");
    const infoBox = document.querySelector(".info-box");
    const exitBtn = infoBox.querySelector(".buttons .quit");
    const continueBtn = infoBox.querySelector(".buttons .restart");
    const quizBox = document.querySelector(".quiz-box");
    const optionList = document.querySelector(".option-list");
    const timeCount = quizBox.querySelector(".timer .timer-sec");
    const timeLine = quizBox.querySelector(".timer .timer-line");

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

    const cancel = document.querySelector(".cancel");
    cancel.onclick = () => {
        location.reload();
       
    }

    let queCount = 0;
    let counter;
    let counterLine;
    let timeValue = 15;
    let widthValue = 0;
    let score = 0;

    const nextBtn = document.querySelector(".next-btn");
    const resultBox = document.querySelector(".result-box");
    const replayBtn = document.querySelector(".replay-btn");
    const quitBtn = document.querySelector(".quit-btn");


    replayBtn.onclick = () => {
        queCount = 0; // Oyunu baştan başlat
        infoBox.classList.remove("activeInfo");
        quizBox.classList.add("activeQuiz");
        resultBox.classList.remove("activeResult");
        showQuestions(0);
        startTimer(14);
        startTimerLine(0);
        location.reload();
    }

    quitBtn.onclick = () => {
        location.reload();
        localStorage.clear();
    }

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
            questions[queCount].userAnswer = userAns;
            console.log("Cevap Doğru");
        } else {
            answer.classList.add("incorrect");
            questions[queCount].userAnswer = userAns;
            console.log("Cevap Yanlış");
        }
        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add("disabled");
        }
        nextBtn.style.display = "block";
    }

    let trueIcon = '<td><div class="true-icn"><i class="fa-solid fa-check"></i></div></td>';
let falseIcon = '<td><div class="false-icn"><i class="fa-solid fa-x"></i></div></td>';

    function showResultBox() {
        infoBox.classList.remove("activeInfo");
        quizBox.classList.remove("activeQuiz");
        resultBox.classList.add("activeResult");
        const scoreText = resultBox.querySelector(".score-text");
        if (score > 3) {
            let scoreTag = ' <span>Congrast!<p>' + score + '</p> of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else if (score > 1) {
            let scoreTag = ' <span>Nice :)<p>' + score + '</p> of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else {
            let scoreTag = ' <span>sorry, bad<p>' + score + '</p> of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        } 

        for (let i = 0; i < questions.length; i++) {
            const result = document.createElement('div');
            result.classList.add('result');
        
            const questionNumber = document.createElement('div');
            questionNumber.classList.add('question-number');
            questionNumber.textContent =  + (i + 1) + '.';
        
            const userAnswer = document.createElement('div');
            userAnswer.classList.add('user-answer');
        
            const icon = document.createElement('div');
            icon.classList.add('icon');
            icon.classList.add('align-right'); 
        
            if (questions[i].userAnswer === questions[i].answer) {
                icon.innerHTML = trueIcon;
            } else {
                icon.innerHTML = falseIcon;
            }
        
            userAnswer.textContent =  questions[i].userAnswer;
        
            result.appendChild(questionNumber);
            result.appendChild(userAnswer);
            result.appendChild(icon);
        
            resultBox.appendChild(result);
        }
        
        
        
    }

    // add-que elements
    const addQuestionForm = document.getElementById('addQuestionForm');
    const questionInput = document.getElementById('questionInput');
    const option1Input = document.getElementById('option1Input');
    const option2Input = document.getElementById('option2Input');
    const option3Input = document.getElementById('option3Input');
    const option4Input = document.getElementById('option4Input');
    const answerInput = document.getElementById('answerInput');

    // "Add" butonuna tıklandıpında gerçekleşenler
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', function () {
        addQuestionForm.style.display = 'block';
        resultBox.classList.remove("activeResult");
        startBtn.style.display = "none";
    });

    // Form gönderildiğinde yeni soruyu al ve işle
    addQuestionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        queCount = 0; //quizi baştan başlatır
        infoBox.classList.remove("activeInfo");
        quizBox.classList.add("activeQuiz");
        resultBox.classList.remove("activeResult");
        addQuestionForm.style.display = 'none';
        showQuestions(0);
        startTimer(14);
        startTimerLine(0);
        // Kullanıcının girdiği bilgileri çek
        const newQuestion = {
            numb: questions.length + 1,
            question: questionInput.value,
            options: [
                option1Input.value,
                option2Input.value,
                option3Input.value,
                option4Input.value
            ],
            answer: answerInput.value
        };

        // Yeni soruyu mevcut soru dizinine ekle
        questions.push(newQuestion);
        localStorage.setItem('questions', JSON.stringify(questions));

        // Kullanıcının girdiği alanları temizle
        questionInput.value = '';
        option1Input.value = '';
        option2Input.value = '';
        option3Input.value = '';
        option4Input.value = '';
        answerInput.value = '';
        console.log('Yeni soru eklendi:', newQuestion);

    });


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
        const bottomQuesCounter = document.querySelector(".total-que"); 
        let totalQuesCountTag = '<span><p>' + (index + 1) + '</p> of <p>' + questions.length + '</p> Questions</span>';
        bottomQuesCounter.innerHTML = totalQuesCountTag;
    }
    showQuestions(0);
    queCounter(0);


});
