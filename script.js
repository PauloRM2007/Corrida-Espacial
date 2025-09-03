// Fundo estrelado em canvas
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStars();
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Animação de entrada dos eventos da linha do tempo
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(el => {
  observer.observe(el);
});

// estrutura de perguntas
const quizQuestions = [
  { 
    question: "O Sputnik 1 foi o primeiro satélite artificial enviado ao espaço em 1957?", 
    options: ["Sim", "Não"], 
    answer: 0 
  },
  { 
    question: "A cadela Laika foi o primeiro ser vivo a orbitar a Terra?", 
    options: ["Sim", "Não"], 
    answer: 0 
  },
  { 
    question: "Yuri Gagarin foi o primeiro humano a viajar ao espaço?", 
    options: ["Sim", "Não"], 
    answer: 0 
  },
  { 
    question: "John Glenn foi o primeiro humano no espaço?", 
    options: ["Sim", "Não"], 
    answer: 1 
  },
  { 
    question: "Alexei Leonov realizou a primeira atividade extraveicular em 1965?", 
    options: ["Sim", "Não"], 
    answer: 0 
  },
  { 
    question: "Neil Armstrong pisou na Lua na missão Apollo 11 em 1969?", 
    options: ["Sim", "Não"], 
    answer: 0 
  },
  {
    question: "Em que ano a primeira estação espacial operacional, Salyut 1, foi lançada?",
    options: ["1969", "1971", "1973", "1975"],
    answer: 1
  },
  {
    question: "Qual foi o primeiro laboratório orbital dos EUA?",
    options: ["Skylab", "Mir", "Salyut 1", "Apollo 11"],
    answer: 0
  },
  {
    question: "Em que missão ocorreu o primeiro acoplamento americano-soviético?",
    options: ["Apollo–Soyuz", "Apollo 11", "Gemini Agena", "Soyuz 4"],
    answer: 0
  },
  {
    question: "Mir entrou em órbita em que ano?",
    options: ["1984", "1986", "1988", "1990"],
    answer: 1
  },
  { 
    question: "A Apollo–Soyuz ocorreu em 1975?", 
    options: ["Sim", "Não"], 
    answer: 0 
  },
  { 
    question: "A missão Mercury-Atlas 6 colocou Yuri Gagarin em órbita?", 
    options: ["Sim", "Não"], 
    answer: 1 
  },
  {
    question: "Quem foi o primeiro humano a orbitar a Terra?",
    options: ["Laika", "Yuri Gagarin", "John Glenn", "Alexei Leonov"],
    answer: 1
  },
  {
    question: "Qual foi o primeiro país a enviar um ser humano ao espaço?",
    options: ["EUA", "China", "URSS", "França"],
    answer: 2
  },
  { 
    question: "A Corrida Espacial terminou formalmente em 1991 com o fim da Guerra Fria?", 
    options: ["Sim", "Não"], 
    answer: 0 
  }
];

// referências a elementos
const openQuizBtn  = document.getElementById('open-quiz');
const quizModal    = document.getElementById('quiz-modal');
const closeQuizBtn = document.getElementById('close-quiz');
const quizContainer= document.getElementById('quiz-container');

let currentQuestion = 0;
let score = 0;

// abrir modal
openQuizBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  quizModal.style.display = 'flex';
  showQuestion();
});

// fechar modal
closeQuizBtn.addEventListener('click', () => {
  quizModal.style.display = 'none';
});

function showQuestion() {
  const q = quizQuestions[currentQuestion];
  quizContainer.innerHTML = `
    <h2>${q.question}</h2>
    <ul class="quiz-options">
      ${q.options.map((opt,i) => `<li data-index="${i}">${opt}</li>`).join('')}
    </ul>
    <button id="next-question">Próxima</button>
  `;
  document.querySelectorAll('.quiz-options li').forEach(li =>
    li.addEventListener('click', selectAnswer)
  );
  document.getElementById('next-question').style.display = 'none';
}

function selectAnswer(e) {
  const li = e.currentTarget;
  const selectedIndex = +li.dataset.index;
  const correctIndex = quizQuestions[currentQuestion].answer;

  // desabilita novos cliques
  document.querySelectorAll('.quiz-options li')
    .forEach(item => item.style.pointerEvents = 'none');

  if (selectedIndex === correctIndex) {
    li.classList.add('correct');
    score++;
  } else {
    li.classList.add('wrong');
    // marca a opção certa
    document.querySelector(`.quiz-options li[data-index="${correctIndex}"]`)
      .classList.add('correct');
  }

  document.getElementById('next-question').style.display = 'block';
  document.getElementById('next-question')
    .addEventListener('click', nextQuestion);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.innerHTML = `
    <h2>Quiz concluído!</h2>
    <p>Sua pontuação: ${score} / ${quizQuestions.length}</p>
    <button id="close-result">Fechar</button>
  `;
  document.getElementById('close-result')
    .addEventListener('click', () => quizModal.style.display = 'none');
}