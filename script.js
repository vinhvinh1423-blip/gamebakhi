/* =========================
   NGÂN HÀNG CÂU HỎI
========================= */

const questionBank = [

    {
        question:
            "Không gian mạng là môi trường được tạo ra nhờ yếu tố nào?",

        image: "images/q1.jpg",

        answers: [
            "Sách và báo giấy",
            "Các mạng máy tính",
            "Tivi và radio",
            "Điện thoại bàn"
        ],

        correct: 1
    },


    {
        question:
            "Đâu là một hình thức giao tiếp trong không gian mạng?",

        image: "images/q2.jpg",

        answers: [
            "Gọi video trực tuyến",
            "Viết thư tay",
            "Gặp mặt trực tiếp",
            "Nói chuyện ngoài sân trường"
        ],

        correct: 0
    },


    {
        question:
            "Một ưu điểm của giao tiếp trong không gian mạng là gì?",

        image: "images/q3.jpg",

        answers: [
            "Luôn gặp sự cố kỹ thuật",
            "Không thể giao tiếp với người ở xa",
            "Tiết kiệm thời gian và chi phí",
            "Dễ gây hiểu lầm hơn"
        ],

        correct: 2
    },


    {
        question:
            "Khi giao tiếp trên mạng, chúng ta nên sử dụng ngôn ngữ như thế nào?",

        image: "images/q4.jpg",

        answers: [
            "Lịch sự và tôn trọng",
            "Chửi người khác",
            "Dùng lời xúc phạm",
            "Cố tình gây tranh cãi"
        ],

        correct: 0
    },


    {
        question:
            "Thông tin cá nhân trên mạng cần được xử lý như thế nào?",

        image: "images/q5.jpg",

        answers: [
            "Công khai tất cả",
            "Chia sẻ cho người lạ",
            "Bảo vệ cẩn thận",
            "Đăng ở mọi nơi"
        ],

        correct: 2
    },


    {
        question:
            "Khi nhận được một thông tin chưa kiểm chứng, bạn nên làm gì?",

        image: "images/q6.jpg",

        answers: [
            "Chia sẻ ngay",
            "Kiểm tra nguồn tin",
            "Gửi cho tất cả bạn bè",
            "Tin ngay lập tức"
        ],

        correct: 1
    },


    {
        question:
            "Khi không đồng ý với ý kiến của người khác trên mạng, nên làm gì?",

        image: "images/q7.jpg",

        answers: [
            "Xúc phạm họ",
            "Bình luận khiếm nhã",
            "Tôn trọng và trao đổi lịch sự",
            "Gây tranh cãi"
        ],

        correct: 2
    },


    {
        question:
            "Một nguy cơ của giao tiếp trực tuyến là gì?",

        image: "images/q8.jpg",

        answers: [
            "Có thể dễ hiểu lầm",
            "Luôn tiết kiệm tiền",
            "Luôn chính xác",
            "Không bao giờ xảy ra vấn đề"
        ],

        correct: 0
    },


    {
        question:
            "Khi thấy người khác gặp khó khăn trên mạng, chúng ta nên làm gì?",

        image: "images/q9.jpg",

        answers: [
            "Chế giễu",
            "Bỏ mặc",
            "Hỗ trợ phù hợp",
            "Chia sẻ thông tin riêng tư"
        ],

        correct: 2
    },


    {
        question:
            "Hành vi nào thể hiện ứng xử văn minh trên mạng?",

        image: "images/q10.jpg",

        answers: [
            "Lan truyền tin giả",
            "Tôn trọng người khác",
            "Xúc phạm người khác",
            "Đăng thông tin riêng tư"
        ],

        correct: 1
    }

];



/* =========================
   BIẾN GAME
========================= */

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;

let soundOn = true;



/* =========================
   BẮT ĐẦU GAME
========================= */

function startGame() {

    score = 0;

    currentQuestion = 0;

    answered = false;


    // Lấy 10 câu và đảo ngẫu nhiên

    questions = [...questionBank]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);


    document
        .getElementById("startScreen")
        .classList.add("hidden");


    document
        .getElementById("resultScreen")
        .classList.add("hidden");


    document
        .getElementById("gameScreen")
        .classList.remove("hidden");


    document
        .getElementById("score")
        .textContent = score;


    showQuestion();
}



/* =========================
   HIỂN THỊ CÂU HỎI
========================= */

function showQuestion() {

    answered = false;


    const q = questions[currentQuestion];


    document
        .getElementById("questionNumber")
        .textContent = currentQuestion + 1;


    document
        .getElementById("questionText")
        .textContent = q.question;


    document
        .getElementById("message")
        .textContent = "";


    // ẢNH CÂU HỎI

    const image =
        document.getElementById("questionImage");


    image.src = q.image;

    image.style.display = "block";


    image.onerror = function () {

        image.style.display = "none";

    };


    // Đảo đáp án

    let answers = q.answers.map(
        (text, index) => ({
            text: text,
            correct: index === q.correct
        })
    );


    answers.sort(
        () => Math.random() - 0.5
    );


    for (let i = 0; i < 4; i++) {

        const button =
            document.querySelectorAll(
                ".answers button"
            )[i];


        button.classList.remove(
            "correct",
            "wrong",
            "disabled"
        );


        button.disabled = false;


        button.querySelector("span")
            .textContent =
            answers[i].text;


        button.dataset.correct =
            answers[i].correct;

    }


    updateLadder();

}



/* =========================
   TRẢ LỜI
========================= */

function chooseAnswer(index) {

    if (answered) return;

    answered = true;


    const buttons =
        document.querySelectorAll(
            ".answers button"
        );


    const selected =
        buttons[index];


    const correct =
        selected.dataset.correct === "true";


    if (correct) {

        score += 10;


        selected.classList.add(
            "correct"
        );


        document
            .getElementById("message")
            .textContent =
            "✅ Chính xác! +10 BÁ KHÍ";


        playSound("correctSound");

    }

    else {

        score -= 10;


        selected.classList.add(
            "wrong"
        );


        // Hiện đáp án đúng

        buttons.forEach(button => {

            if (
                button.dataset.correct === "true"
            ) {

                button.classList.add(
                    "correct"
                );

            }

        });


        document
            .getElementById("message")
            .textContent =
            "❌ Sai rồi! -10 BÁ KHÍ";


        playSound("wrongSound");

    }


    document
        .getElementById("score")
        .textContent = score;


    buttons.forEach(button => {

        button.disabled = true;

    });


    setTimeout(nextQuestion, 1200);

}



/* =========================
   CÂU TIẾP
========================= */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >= questions.length
    ) {

        endGame();

        return;

    }


    showQuestion();

}



/* =========================
   BỎ QUA
========================= */

function skipQuestion() {

    if (answered) return;


    playSound("clickSound");


    nextQuestion();

}



/* =========================
   50:50
========================= */

function fiftyFifty() {

    if (answered) return;


    const buttons =
        document.querySelectorAll(
            ".answers button"
        );


    let wrongButtons = [];


    buttons.forEach(button => {

        if (
            button.dataset.correct !== "true"
        ) {

            wrongButtons.push(button);

        }

    });


    wrongButtons
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .forEach(button => {

            button.classList.add(
                "disabled"
            );

            button.disabled = true;

        });


    document
        .getElementById("fiftyBtn")
        .disabled = true;


    playSound("clickSound");

}



/* =========================
   GỢI Ý
========================= */

function hint() {

    if (answered) return;


    const q = questions[currentQuestion];


    const correctAnswer =
        q.answers[q.correct];


    document
        .getElementById("message")
        .textContent =
        "💡 Gợi ý: Đáp án đúng liên quan đến \""
        + correctAnswer
        + "\"";


    document
        .getElementById("hintBtn")
        .disabled = true;


    playSound("clickSound");

}



/* =========================
   THANG BÁ KHÍ
========================= */

function updateLadder() {

    const level =
        currentQuestion + 1;


    document
        .querySelectorAll(".ladder div")
        .forEach(item => {

            item.classList.remove(
                "active"
            );


            if (
                Number(
                    item.dataset.level
                ) === level
            ) {

                item.classList.add(
                    "active"
                );

            }

        });

}



/* =========================
   KẾT THÚC
========================= */

function endGame() {

    document
        .getElementById("gameScreen")
        .classList.add("hidden");


    document
        .getElementById("resultScreen")
        .classList.remove("hidden");


    document
        .getElementById("finalScore")
        .textContent = score;

}



/* =========================
   ÂM THANH
========================= */

function playSound(id) {

    if (!soundOn) return;


    const sound =
        document.getElementById(id);


    if (!sound) return;


    sound.currentTime = 0;

    sound.play().catch(() => {});

}



/* =========================
   BẬT / TẮT ÂM THANH
========================= */

function toggleSound() {

    soundOn = !soundOn;

}