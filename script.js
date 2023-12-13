const welcomeContainer = document.getElementById('welcome-container');
const quizContainer = document.getElementById('quiz-container');
const quizSection = document.querySelector('.quiz-section');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resultSectionInner = document.querySelector('.result-section-inner');
const quizData = [
    {
        question: 'What is the capital of New Zealand?',
        type: 'text',
        correct: 'Wellington'
    },
    {
        question: 'Which planets are known as the gas giants?',
        type: 'checkbox',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correct: ['Jupiter', 'Saturn', 'Uranus', 'Neptune']
    },
    {
        question: 'What is the largest mammal?',
        type: 'text',
        correct: 'Blue Whale'
    }
];

let currentQuestion = 0;
let score = 0;

const loadQuestion = () => {
    const currentQuizData = quizData[currentQuestion];
    const quiestionWrap = document.createElement('p');
    const quiestionNum = document.createElement('span');
    const quiestionTxt = document.createElement('span');

    quiestionWrap.classList.add('question-wrap');
    quiestionNum.classList.add('question-num');
    quiestionTxt.classList.add('question-txt');

    quiestionNum.innerText = String(currentQuestion + 1);
    quiestionTxt.innerText = currentQuizData.question;
    quiestionWrap.appendChild(quiestionNum);
    quiestionWrap.appendChild(quiestionTxt);
    questionContainer.appendChild(quiestionWrap);
    optionsContainer.innerHTML = '';

    if (currentQuizData.type === 'text') {
        console.log('hello');
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = 'text-input';
        optionsContainer.appendChild(inputElement);
    } else if (currentQuizData.type === 'checkbox') {
        currentQuizData.options.forEach(option => {
            console.log(option);
            const checkboxElement = document.createElement('input');
            checkboxElement.type = 'checkbox';
            checkboxElement.value = option;
            checkboxElement.id = option.toLowerCase();
            const labelElement = document.createElement('label');
            labelElement.htmlFor = option.toLowerCase();
            labelElement.innerText = option;
            optionsContainer.appendChild(checkboxElement);
            optionsContainer.appendChild(labelElement);
        });
    }
};

const startQuiz = () => {
    welcomeContainer.style.display = 'none';
    quizSection.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
};

startBtn.addEventListener('click', startQuiz);


const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const nextBtn = document.getElementById('next-btn');

const nextQuestion = () => {
    checkAnswer();
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else if (currentQuestion === quizData.length) {
        console.log(currentQuestion);
        console.log(quizData.length);
        showResult();
    }
};
nextBtn.addEventListener("click", nextQuestion);

function checkAnswer() {
    const currentQuizData = quizData[currentQuestion];
    console.log(currentQuizData);

    if (currentQuizData.type === 'text') {
        const userInput = (document.getElementById('text-input')).value.trim().toLowerCase();
        console.log(userInput);
        if (userInput === currentQuizData.correct.toLowerCase()) {
            score++;
        }
    } else if (currentQuizData.type === 'checkbox') {
        const userSelections = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
        console.log(userSelections);
        if (arraysEqual(userSelections, currentQuizData.correct)) {
            score++;
        }
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultSectionInner.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
    restartBtn.style.display = 'block';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    welcomeContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
    restartBtn.style.display = 'none';
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}