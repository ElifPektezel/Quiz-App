
let questions = [
    {
        numb: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ],
        userAnswer: null,
    },
    {
        numb: 2,
        question: "console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());",
        answer: "banana",
        options: [
            "bananaa",
            "baaa",
            "banana",
            "ananas"
        ],
        userAnswer: null,
    },
    {
        numb: 3,
        question: "console.log(3 > 2 > 1);",
        answer: "true",
        options: [
            "true",
            "false"
        ],
        userAnswer: null,
    },
    {
        numb: 4,
        question: "console.log(0.1 + 0.2 == 0.3);",
        answer: "false",
        options: [
            "true",
            "false"
        ],
        userAnswer: null,
    }
];

if (localStorage.getItem('questions')) {
    questions = JSON.parse(localStorage.getItem('questions'));
}

