document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.quiz-container')) {
        const questions = [
            {
                question: "Como você avalia sua qualidade de sono recentemente?",
                answers: [
                    { text: "Muito boa", score: 3 },
                    { text: "Razoável", score: 2 },
                    { text: "Ruim ou irregular", score: 1 }
                ]
            },
            {
                question: "Com que frequência você tem se sentido ansioso ou nervoso?",
                answers: [
                    { text: "Raramente", score: 3 },
                    { text: "Às vezes", score: 2 },
                    { text: "Frequentemente", score: 1 }
                ]
            },
            {
                question: "Você tem conseguido tempo para atividades de lazer que gosta?",
                answers: [
                    { text: "Sim, regularmente", score: 3 },
                    { text: "Pouco, mas consigo", score: 2 },
                    { text: "Não, quase nunca", score: 1 }
                ]
            }
        ];

        const questionElement = document.getElementById('question');
        const answerButtons = document.getElementById('answer-buttons');
        const quizBox = document.getElementById('quiz-box');
        const resultBox = document.getElementById('result-box');
        const resultTitle = document.getElementById('result-title');
        const resultText = document.getElementById('result-text');
        const restartButton = document.getElementById('restart-quiz');

        let currentQuestionIndex = 0;
        let score = 0;

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            quizBox.classList.remove('d-none');
            resultBox.classList.add('d-none');
            showQuestion();
        }

        function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            questionElement.innerHTML = currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerHTML = answer.text;
                button.classList.add('btn', 'btn-outline-primary');
                button.dataset.score = answer.score;
                button.addEventListener('click', selectAnswer);
                answerButtons.appendChild(button);
            });
        }

        function resetState() {
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            score += parseInt(selectedBtn.dataset.score);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            quizBox.classList.add('d-none');
            resultBox.classList.remove('d-none');

            if (score >= 7) {
                resultTitle.innerText = "Resultado Positivo!";
                resultText.innerHTML = "Parece que você está gerenciando bem seu bem-estar! Continue com os bons hábitos. Explore nossos <a href='recursos.html'>recursos</a> para se inspirar ainda mais.";
            } else if (score >= 4) {
                resultTitle.innerText = "Atenção a Alguns Pontos.";
                resultText.innerHTML = "Há alguns pontos que merecem atenção. Que tal explorar nossas <a href='ferramentas.html'>ferramentas</a>, como o exercício de respiração ou o diário de humor, para ajudar no dia a dia?";
            } else {
                resultTitle.innerText = "É Hora de se Cuidar.";
                resultText.innerHTML = "Parece que este é um momento delicado. Lembre-se de que não há problema em não estar bem. Considere conversar com alguém de confiança ou buscar ajuda profissional. Nossa página de <a href='ajuda.html'>Ajuda Profissional</a> tem contatos úteis.";
            }
        }

        restartButton.addEventListener('click', startQuiz);

        startQuiz();
    }
});