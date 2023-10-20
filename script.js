const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.querySelector(".next-btn"); 

const questions = [
    {
        question: "console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());", 
        answers: [
            { text: "bananaa", correct: false }, 
            { text: "baaa", correct: true }, 
            { text: "banana", correct: false }, 
            { text: "ananas", correct: false } 
        ]
    },
    {
        question: "console.log(3 > 2 > 1);", 
        answers: [
            { text: "true", correct: true }, 
            { text: "false", correct: false }, 
           
        ]
    },
    {
        question: "console.log(0.1 + 0.2 == 0.3);", 
        answers: [
            { text: "true", correct: false },
            { text: "false", correct: true } 
        ]
    }
];

let currentQuestionIndex = 0; // Şu anki sorunun dizinini sakla
let score = 0; // Skoru sakla


 // Quiz'e başla işlemi
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML = "Next"; 
    showQuestion();
}


// Soruyu görüntüleme işlemi
function showQuestion() {
    resetState(); // Mevcut durumu sıfırla
    let currentQuestion = questions[currentQuestionIndex]; // Şu anki soruyu al
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Soru metnini güncelle

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text; // Cevap metnini butona ekle
        button.classList.add("btn"); 
        answerButtons.appendChild(button); 
        if (answer.correct) {
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer); // Butona tıklanma olayını dinle
    });
}

// Mevcut durumu sıfırlama işlemi
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Tüm cevap butonlarını temizle
    }
}


// Cevap seçildiğinde işlemi
function selectAnswer(e) {
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.correct === "true"; // Seçilen butonun doğru olup olmadığını kontrol et
    if (isCorrect) {
        selectedBtn.classList.add("correct"); 
        score++; // Skoru artır
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    nextButton.style.display = "inline-block"; 
}

// Skoru görüntüleme işlemi
function showScore() {
    resetState(); // Mevcut durumu sıfırla
    questionElement.innerHTML = `Score: ${score} / ${questions.length}`; // Scoru göster
    nextButton.innerHTML = "Again"; 
    nextButton.style.display = "inline-block"; 
}

// "Next" butonuna tıklanınca işlemi yönlendiren işlev
function handleNextButton() {
    currentQuestionIndex++; // Bir sonraki soruya geç
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Bir sonraki soruyu göster
    } else {
        showScore(); 
    }
}

// "Sonraki" butonuna tıklanınca işlevi başlat
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); // "Next" butonuna tıklanınca işlevi çağır
    } else {
        startQuiz(); 
    }
});

startQuiz(); 
