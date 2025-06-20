const quizData = [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What does HTML stand for?",
      options: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Hyperlink Transfer Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answer: "7"
    }
  ];
  
  let currentIndex = 0;
  let score = 0;
  let selectedOption = null;
  let timeLeft = 45;
  let timer;
  
  // DOM Elements
  const questionText = document.getElementById('question-text');
  const choicesBox = document.getElementById('choices');
  const submitBtn = document.getElementById('submit-btn');
  const finalScore = document.getElementById('final-score');
  const timeDisplay = document.getElementById('time');
  
  function startQuiz() {
    showQuestion();
    startTimer();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timer);
        endQuiz("⏰ Time's up!");
      }
    }, 1000);
  }
  
  function showQuestion() {
    selectedOption = null;
    const qData = quizData[currentIndex];
    questionText.textContent = qData.question;
    choicesBox.innerHTML = "";
  
    qData.options.forEach(option => {
      const btn = document.createElement('div');
      btn.classList.add('choice');
      btn.textContent = option;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        selectedOption = option;
      });
      choicesBox.appendChild(btn);
    });
  }
  
  submitBtn.addEventListener('click', () => {
    if (!selectedOption) {
      alert("Please select an answer!");
      return;
    }
  
    const correctAnswer = quizData[currentIndex].answer;
    if (selectedOption === correctAnswer) {
      score++;
    }
  
    currentIndex++;
    if (currentIndex < quizData.length) {
      showQuestion();
    } else {
      clearInterval(timer);
      endQuiz("✅ Quiz Completed!");
    }
  });
  
  function endQuiz(message) {
    document.getElementById('quiz-box').classList.add('hidden');
    finalScore.classList.remove('hidden');
    finalScore.innerHTML = `${message}<br><br>Your Score: ${score} / ${quizData.length}`;
  }
  
  startQuiz();
  