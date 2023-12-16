import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const welcomeContainer = document.getElementById('welcome-container');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.querySelector('#restart-btn');
const resultSectionInner = document.querySelector('#result-section-inner');
const prevBtn = document.querySelector('#prev-btn');
const quizSection = document.querySelector('#quiz-section');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const nextBtn = document.getElementById('next-btn');
const checkBtn = document.querySelector('#check-btn');

let quizData = [];
const fetchPizzas = async () => {
    try {
        const response = await axios.get('https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/quiz.json');
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

const fetchData = async () => {
    const data = await fetchPizzas();
    quizData = data;
};

fetchData();


let currentQuestion = 0;
let score = 0;

const questionWrap = document.createElement('p');
const questionNum = document.createElement('span');
const questionTxt = document.createElement('span');

questionWrap.classList.add('question-wrap');
questionNum.classList.add('question-num');
questionTxt.classList.add('question-txt');

questionWrap.appendChild(questionNum);
questionWrap.appendChild(questionTxt);
questionContainer.appendChild(questionWrap);
const loadQuestion = () => {
    const currentQuizData = quizData[currentQuestion];

    questionNum.innerText = String(currentQuestion + 1);
    questionTxt.innerText = quizData[currentQuestion].question;
    optionsContainer.innerHTML = '';

    if (currentQuizData.type === 'text') {
        const inputElement = document.createElement('input');
        inputElement.classList.add('input');
        inputElement.type = 'text';
        inputElement.id = 'text-input';
        optionsContainer.appendChild(inputElement);
    } else if (currentQuizData.type === 'checkbox') {
        const array = currentQuizData.options.replace(/'/g, '"');
        const resultArray = JSON.parse(array);

        console.log(currentQuizData.options);
        resultArray.forEach(option => {
            const labelElement = document.createElement('label');

            labelElement.htmlFor = option.toLowerCase();
            labelElement.innerText = option;
            labelElement.classList.add('custom-checkbox');

            const checkboxElement = document.createElement('input');
            checkboxElement.type = 'checkbox';
            checkboxElement.value = option;
            checkboxElement.id = option.toLowerCase();
            checkboxElement.classList.add('checkbox');

            const span = document.createElement('span');
            span.classList.add('checkmark');

            labelElement.appendChild(checkboxElement);
            labelElement.appendChild(span);
            optionsContainer.appendChild(labelElement);
        });
    }

    currentQuestion === 0 ? prevBtn.style.display = 'none' : prevBtn.style.display = 'block';
    currentQuestion === quizData.length - 1 ? nextBtn.style.display = 'none' : nextBtn.style.display = 'block';
    currentQuestion === quizData.length - 1 ? checkBtn.style.display = 'block' : checkBtn.style.display = 'none';
};
const arraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const checkAnswer = () => {
    const currentQuizData = quizData[currentQuestion];

    if (currentQuizData.type === 'text') {
        const userInput = (document.getElementById('text-input')).value.trim().toLowerCase();
        if (userInput === currentQuizData.correct.toLowerCase()) {
            score++;
        }
    } else if (currentQuizData.type === 'checkbox') {
        const userSelections = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
        const array = currentQuizData.correct.replace(/'/g, '"');
        const resultArray = JSON.parse(array);

        if (arraysEqual(userSelections, resultArray)) {
            score++;
        }
    }
};

const startQuiz = () => {
    welcomeContainer.style.display = 'none';
    quizSection.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
};

startBtn.addEventListener('click', startQuiz);

const nextQuestion = () => {
    checkAnswer();
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else if (currentQuestion === quizData.length) {
        showResult();
    }
};
nextBtn.addEventListener("click", nextQuestion);

const showResult = () => {
    checkAnswer();
    quizSection.style.display = 'none';
    resultContainer.style.display = 'block';
    resultSectionInner.innerHTML =
        `<h2 class="titles">Your Score: ${score}/${quizData.length}! ${score === 2 || score === 3 ? 'Perfect!' : 'Try again!'}</h2>`;
};

checkBtn.addEventListener('click', showResult);
const restartQuiz = ()=>  {
    currentQuestion = 0;
    score = 0;
    welcomeContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    quizSection.style.display = 'none';
    loadQuestion();
};

restartBtn.addEventListener('click', restartQuiz);

const prevPage = () => {
    currentQuestion--;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else if (currentQuestion === quizData.length) {
        showResult();
    }
};

prevBtn.addEventListener('click', prevPage);