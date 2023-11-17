
document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.querySelector(".start-btn button");
    const infoBox = document.querySelector(".info-box");
    const exitBtn = infoBox.querySelector(".buttons .quit");
    const continueBtn = infoBox.querySelector(".buttons .restart");
    const quizBox = document.querySelector(".quiz-box");
    const optionList = document.querySelector(".option-list");
    const timeCount = quizBox.querySelector(".timer .timer-sec");
    const timeLine = quizBox.querySelector(".timer .timer-line");
    const signupBtn = document.querySelector(".signupBtn");
    const loginBtn = document.querySelector(".loginBtn");
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const hideMenuBtn = navbarMenu.querySelector(".close-btn");
    const showPopupBtn = document.querySelector(".login-btn");
    const formPopup = document.querySelector(".form-popup");
    const hidePopupBtn = formPopup.querySelector(".close-btn");
    const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");


    // Show mobile menu
    hamburgerBtn.addEventListener("click", () => {
        navbarMenu.classList.toggle("show-menu");
    });

    // Hide mobile menu
    hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

    // Show login popup
    showPopupBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
    });

    // Hide login popup
    hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

    // Show or hide signup form
    signupLoginLink.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
        });
    });


    let users = JSON.parse(localStorage.getItem('users')) || {};
    let quizState = JSON.parse(localStorage.getItem('quizState')) || {};

    // "Signup" butonu tıklandığında
    signupBtn.addEventListener("click", signup);

    function signup() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            // Kullanıcıyı kaydet
            users[username] = password;
            alert('Üye kaydınız başarıyla oluşturuldu!');
            // Kullanıcılar localStorage'a kaydedildiğindeki zamanı sakla
            localStorage.setItem('usersTimestamp', new Date().getTime());
            // Local Storage'da kullanıcıları güncelle
            localStorage.setItem('users', JSON.stringify(users));
            //kullanıcı kaydı tutulur
            localStorage.setItem('signupEvent', JSON.stringify({ timestamp: new Date().getTime(), user: username }));
        } else {
            alert('Kullanıcı adı ve şifre boş bırakılamaz!');
        }
    }

    // "Login" butonu tıklandığında
    loginBtn.addEventListener("click", login);

    function login() {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;
        const name = document.getElementById('name').value;
        // Kullanıcı doğrulama
        if (users[loginUsername] === loginPassword) {
            alert('Giriş başarılı! Hoş geldiniz, ' + loginUsername + '!');
            localStorage.setItem('usersTimestamp', new Date().getTime());
            document.querySelector('.hamburger-btn').innerText = 'Hoş geldiniz, ' + name + '!';
            document.querySelector('.login-btn').innerHTML = '<i class="fa fa-sign-out"></i>';
            quizState = { quizActive: true };
            document.body.classList.remove("show-popup");
            // kullanıcı girişi tutulur
            localStorage.setItem('loginEvent', JSON.stringify({ timestamp: new Date().getTime(), user: loginUsername }));
        } else {
            alert('Kullanıcı adı veya şifre hatalı!');
        }
    }
    // Sayfa yenilendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
    const usersTimestamp = parseInt(localStorage.getItem('usersTimestamp')) || 0;
    const currentTime = new Date().getTime();
    // Eğer kullanıcılar bir saat önce veya daha önce kaydedildiyse, localStorage'ı sıfırla
    if (currentTime - usersTimestamp > 3600000) {
        localStorage.removeItem('users');
        localStorage.removeItem('usersTimestamp');
    }


    // "Start Quiz" butonu tıklandığında
    startBtn.onclick = () => {
        if (isLoggedIn()) {

            infoBox.classList.add("activeInfo");
            localStorage.setItem('startQuizEvent', JSON.stringify({ timestamp: new Date().getTime() }));
        } else {

            alert("Giriş yapınız!");
        }
    }

    function isLoggedIn() {
        // localStorage'dan kullanıcı bilgisini al
        const userData = localStorage.getItem('users');

        // Kullanıcı bilgisi kontrol et
        if (userData) {
            const users = JSON.parse(userData);
            if (Object.keys(users).length > 0) {
                return true;
            }
        }
        return false;
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
        location.reload(); //Oyunu başlattığında result-box'ta div.result tekrarlanmasın diye ekledim yanlış yol olabilir.
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
            localStorage.setItem('nextQuestionEvent', JSON.stringify({ timestamp: new Date().getTime(), questionIndex: queCount }));

        }
        else {
            showResultBox();
            localStorage.setItem('quizCompleteEvent', JSON.stringify({ timestamp: new Date().getTime(), score: score }));
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
            console.log("Doğru");
        } else {
            answer.classList.add("incorrect");
            questions[queCount].userAnswer = userAns;
            console.log("Yanlış");
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
            questionNumber.textContent = + (i + 1) + '.';

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

            userAnswer.textContent = questions[i].userAnswer;

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
        location.reload();

    });


    // 15sn sayaç kontrol fonk.
    function startTimer(time) {
        let myModal = document.getElementById('myModal');

        function resetAlertBox() {
            myModal.style.right = '-300px'; // Kapat
            clearTimeout(timeout);
        }

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
            // 10 saniyenin altına düşünce alert göster


            if (time < 10) {
                myModal.style.display = 'block';
                timeout = setTimeout(function () {
                    resetAlertBox();
                }, 5000);// 5000 5sn sonra alert kutusunu kapatır.
            }

            let closeBtn = document.getElementsByClassName('close')[0];
            closeBtn.onclick = function () {
                resetAlertBox();
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

    localStorage.setItem('DOMContentLoadedEvent', JSON.stringify({ timestamp: new Date().getTime() }));
});
