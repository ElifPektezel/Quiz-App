const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.querySelector(".next-btn");
const addQuestionForm = document.getElementById("add-question-form");
const newQuestionInput = document.getElementById("new-question");
const newAnswerInputs = [
    document.getElementById("new-answer-1"),
    document.getElementById("new-answer-2"),
    document.getElementById("new-answer-3"),
    document.getElementById("new-answer-4")
];
const addNewQuestionBtn = document.getElementById("add-new-question-btn");

const questions = [
    {
        question: "console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());",
        answers: [
            { text: "bananaa", correct: false },
            { text: "baaa", correct: false },
            { text: "banana", correct: true },
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
const showAddQuestionFormBtn = document.getElementById("show-add-question-form-btn");
const addNewQuestionFormBtn = document.getElementById("add-new-question-btn");
const questionContainer = document.getElementById("question-container");
showAddQuestionFormBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    showAddQuestionFormBtn.style.display = "none";
    showAddQuestionForm();
});

addNewQuestionFormBtn.addEventListener("click", () => {
    questionContainer.style.display = "block";
    showAddQuestionFormBtn.style.display = "block";
    addNewQuestion();
});

function showAddQuestionForm() {
    addQuestionForm.style.display = "block";
    
}

function addNewQuestion() {
    const newQuestionText = newQuestionInput.value;
    const newAnswers = newAnswerInputs.map(input => {
        return { text: input.value.trim(), correct: false };
    });

    if (newQuestionText.trim() === "" || newAnswers.some(answer => answer.text === "")) {

        return;
    }

    questions.push({
        question: newQuestionText,
        answers: newAnswers
    });

    resetAddQuestionForm();
    alert("New question added!");
}

function resetAddQuestionForm() {
    newQuestionInput.value = "";
    newAnswerInputs.forEach(input => {
        input.value = "";
    });
    addQuestionForm.style.display = "none";
}

addNewQuestionBtn.addEventListener("click", addNewQuestion);
document.getElementById("show-add-question-form-btn").addEventListener("click", showAddQuestionForm);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    answerButtons.appendChild(editButton);
    
    editButton.addEventListener("click", () => {
        answerButtons.style.display = "none";
        editButton.style.display = "none";
    
        const editForm = document.createElement("form");
        const questionInput = document.createElement("input");
        questionInput.value = currentQuestion.question;
        editForm.appendChild(questionInput);
    
        currentQuestion.answers.forEach((answer, index) => {
            const answerInput = document.createElement("input");
            answerInput.value = answer.text;
            editForm.appendChild(answerInput);
        });
    
        const saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.classList.add("save-btn");
        editForm.appendChild(saveButton);
    
        saveButton.addEventListener("click", (e) => {
            e.preventDefault(); // Form gönderme olayını iptal et
            currentQuestion.question = questionInput.value;
            currentQuestion.answers.forEach((answer, index) => {
                answer.text = editForm.querySelector("input:nth-child(" + (index + 2) + ")").value;
            });
        
            editForm.remove();
            answerButtons.style.display = "block";
            editButton.style.display = "block";
            showQuestion();
        });
    
        answerButtons.parentElement.appendChild(editForm);
    });
    
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
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

function showScore() {
    resetState();
    questionElement.innerHTML = `Score: ${score} / ${questions.length}`;
    nextButton.innerHTML = "Again";
    nextButton.style.display = "inline-block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();