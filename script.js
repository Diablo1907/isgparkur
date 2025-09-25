// Geçerli sicil numaraları (gerçek projelerde veritabanında saklanır)
const validSicilNumbers = ["12345", "98765", "11111"];

// Yeni HTML elemanlarını seçme
const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const sicilNoInput = document.getElementById('sicil-no');
const errorMessage = document.getElementById('error-message');
const quizContainer = document.querySelector('.quiz-container');

// İSG soru bankası
const questions = [
    {
        question: "Bir yangın anında ilk yapılması gereken nedir?",
        options: ["Asansörü kullanmak", "Yangın söndürme tüpü bulmak", "Acil çıkışa yönelmek", "Panik yapmak"],
        correctAnswer: "Acil çıkışa yönelmek"
    },
    {
        question: "Ergonomi ne anlama gelir?",
        options: ["İşin insana uyumu", "İş verimliliği", "Zaman yönetimi", "Ekip çalışması"],
        correctAnswer: "İşin insana uyumu"
    },
    {
        question: "Kişisel koruyucu donanım (KKD) kullanımı neden önemlidir?",
        options: ["Sadece zorunlu olduğu için", "İş kazalarını önlemek için", "İşvereni mutlu etmek için", "Daha iyi görünmek için"],
        correctAnswer: "İş kazalarını önlemek için"
    },
    {
        question: "İş yerinde acil çıkış levhaları hangi renkte olmalıdır?",
        options: ["Kırmızı", "Sarı", "Yeşil", "Mavi"],
        correctAnswer: "Yeşil"
    },
    {
        question: "Yüksekte çalışmalarda en temel güvenlik önlemi nedir?",
        options: ["Dizlik takmak", "İş eldiveni kullanmak", "Emniyet kemeri takmak", "Kask takmak"],
        correctAnswer: "Emniyet kemeri takmak"
    },
    {
        question: "Deneme?",
        options: ["Dizlik takmak", "İş eldiveni kullanmak", "Emniyet kemeri takmak", "Kask takmak"],
        correctAnswer: "Emniyet kemeri takmak"
    }
];

// HTML elemanlarını seçme
const quizDiv = document.getElementById('quiz');
const resultDiv = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreText = document.getElementById('score-text');

let currentQuestionIndex = 0;
let score = 0;

// Oyunun başlatılması
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultDiv.style.display = 'none';
    quizDiv.style.display = 'flex';
    nextBtn.style.display = 'block';
    nextBtn.textContent = 'Sonraki Soru';
    showQuestion();
}

// Soruyu gösterme
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = ''; // Önceki şıkları temizle

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        optionsContainer.appendChild(button);

        button.addEventListener('click', () => {
            selectOption(option, currentQuestion.correctAnswer);
        });
    });
}

// Şık seçildiğinde
function selectOption(selectedOption, correctAnswer) {
    const optionButtons = document.querySelectorAll('.option-btn');
    let isCorrect = selectedOption === correctAnswer;

    optionButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('wrong');
        }
        button.disabled = true; // Tüm butonları devre dışı bırak
    });

    if (isCorrect) {
        score++;
    }

    nextBtn.style.display = 'block';
}

// Sonraki soruya geçiş
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextBtn.style.display = 'none';
    } else {
        endQuiz();
    }
});

// Oyunu bitirme
function endQuiz() {
    quizDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    scoreText.textContent = `Skorunuz: ${score} / ${questions.length}`;
}

// Tekrar oynama butonu
restartBtn.addEventListener('click', () => {
    startQuiz();
});

// Oyunu başlat
// Giriş formunu dinle
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

    const sicilNo = sicilNoInput.value;

    if (validSicilNumbers.includes(sicilNo)) {
        // Giriş başarılı, giriş ekranını gizle ve oyunu başlat
        loginContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        startQuiz();
    } else {
        // Hatalı giriş, hata mesajını göster
        errorMessage.textContent = 'Hatalı sicil numarası. Lütfen tekrar deneyin.';
    }
});