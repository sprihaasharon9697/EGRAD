// ================= REGISTER =================
function saveUser() {
    const name = document.getElementById("regName").value.trim();
    const sic = document.getElementById("regSic").value.trim().toUpperCase();
    const pass = document.getElementById("regPass").value.trim();

    if (!name || !sic || !pass) {
        alert("Please fill all fields!");
        return;
    }

    localStorage.setItem('savedUser', name);
    localStorage.setItem('savedSic', sic);
    localStorage.setItem('savedPass', pass);

    alert("Registered Successfully!");
    window.location.href = "login.html";
}


// ================= LOGIN =================
function checkLogin() {
    const sic = document.getElementById("lSic").value.trim().toUpperCase();
    const pass = document.getElementById("lPass").value.trim();

    if (!sic || !pass) {
        alert("Enter all details!");
        return;
    }

    if (sic === localStorage.getItem('savedSic') &&
        pass === localStorage.getItem('savedPass')) {

        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}


// ================= LOGOUT =================
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}


// ================= START EXAM =================
function startExam() {
    const subject = document.getElementById("subject").value;

    if (!subject) {
        alert("Select subject!");
        return;
    }

    localStorage.setItem("examSubject", subject);
    window.location.href = "exam.html";
}


// ================= QUESTION BANK =================
const questionBank = {

    "OS": [
        {q:"What is OS?", a:"Software", b:"Hardware", c:"Network", d:"Device", ans:"A"},
        {q:"Which is OS?", a:"Windows", b:"CPU", c:"Mouse", d:"Printer", ans:"A"},
        {q:"Scheduler belongs to?", a:"OS", b:"DBMS", c:"TOC", d:"CPU", ans:"A"},
        {q:"Process means?", a:"Program in execution", b:"File", c:"Memory", d:"CPU", ans:"A"},
        {q:"Deadlock is?", a:"Blocking", b:"Speed", c:"Error", d:"Output", ans:"A"},
        {q:"RAM belongs to?", a:"Memory", b:"OS", c:"Input", d:"Output", ans:"A"},
        {q:"Kernel is?", a:"Core of OS", b:"App", c:"File", d:"Program", ans:"A"},
        {q:"Paging is?", a:"Memory mgmt", b:"Input", c:"Output", d:"CPU", ans:"A"},
        {q:"Which is not OS?", a:"Linux", b:"Windows", c:"Oracle", d:"Mac", ans:"C"},
        {q:"OS manages?", a:"Resources", b:"Games", c:"Videos", d:"Apps only", ans:"A"}
    ],

    "DBMS": [
        {q:"DBMS stands for?", a:"Data Base", b:"Database Management System", c:"Data Block", d:"Data Machine", ans:"B"},
        {q:"Primary key?", a:"Unique", b:"Duplicate", c:"Null", d:"Optional", ans:"A"},
        {q:"SQL is?", a:"Language", b:"OS", c:"Tool", d:"App", ans:"A"},
        {q:"DELETE does?", a:"Remove rows", b:"Add", c:"Update", d:"Select", ans:"A"},
        {q:"Normalization?", a:"Reduce redundancy", b:"Increase data", c:"Delete data", d:"Sort", ans:"A"},
        {q:"Table means?", a:"Relation", b:"File", c:"Key", d:"Index", ans:"A"},
        {q:"Foreign key?", a:"Link tables", b:"Delete", c:"Primary", d:"Unique", ans:"A"},
        {q:"Join is?", a:"Combine tables", b:"Delete", c:"Sort", d:"Insert", ans:"A"},
        {q:"ACID means?", a:"Transaction property", b:"Key", c:"Index", d:"Table", ans:"A"},
        {q:"Index used for?", a:"Fast access", b:"Delete", c:"Insert", d:"Update", ans:"A"}
    ],

    "TOC": [
        {q:"TOC deals with?", a:"Automata", b:"Hardware", c:"AI", d:"DB", ans:"A"},
        {q:"DFA stands for?", a:"Deterministic FA", b:"Data FA", c:"Dual FA", d:"None", ans:"A"},
        {q:"NFA means?", a:"Non-deterministic", b:"New FA", c:"Next FA", d:"None", ans:"A"},
        {q:"Regular language?", a:"Recognized by FA", b:"CPU", c:"OS", d:"DB", ans:"A"},
        {q:"Grammar used in?", a:"Languages", b:"Hardware", c:"CPU", d:"RAM", ans:"A"},
        {q:"Pushdown automata?", a:"Stack", b:"Queue", c:"CPU", d:"RAM", ans:"A"},
        {q:"Turing machine?", a:"Powerful model", b:"Weak", c:"None", d:"OS", ans:"A"},
        {q:"Alphabet means?", a:"Symbols", b:"Numbers", c:"Words", d:"Data", ans:"A"},
        {q:"Language is?", a:"Set of strings", b:"File", c:"DB", d:"OS", ans:"A"},
        {q:"Closure property?", a:"Operation on languages", b:"File", c:"CPU", d:"RAM", ans:"A"}
    ]
};


// ================= PAGE LOAD =================
document.addEventListener("DOMContentLoaded", function () {

    // Dashboard greet
    const greet = document.getElementById("userGreet");
    if (greet) {
        greet.innerText = "Welcome, " + localStorage.getItem("savedUser");
    }

    // Subject title
    const subjectTitle = document.getElementById("subjectTitle");
    const subject = localStorage.getItem("examSubject");

    if (subjectTitle && subject) {
        subjectTitle.innerText = subject + " Exam";
    }

    // Load questions
    const qDiv = document.getElementById("questions");

    if (qDiv && subject && questionBank[subject]) {

        let html = "";

        questionBank[subject].forEach((q, i) => {
            html += `
            <div class="q-block">

                <div class="q-header">
                    <b>Q${i+1}. ${q.q}</b>
                    <span>1 MARK</span>
                </div>

                <label><input type="radio" name="q${i}" value="A"> A. ${q.a}</label>
                <label><input type="radio" name="q${i}" value="B"> B. ${q.b}</label>
                <label><input type="radio" name="q${i}" value="C"> C. ${q.c}</label>
                <label><input type="radio" name="q${i}" value="D"> D. ${q.d}</label>

            </div>
            `;
        });

        qDiv.innerHTML = html;
    }

    // Result page
    const scoreEl = document.getElementById("score");
    const gradeEl = document.getElementById("grade");

    if (scoreEl && gradeEl) {
        scoreEl.innerText = localStorage.getItem("score") || 0;
        gradeEl.innerText = localStorage.getItem("grade") || "-";
    }
});


// ================= SUBMIT =================
function submitExam() {

    const subject = localStorage.getItem("examSubject");
    const questions = questionBank[subject];

    let score = 0;

    questions.forEach((q, i) => {
        const ans = document.querySelector(`input[name="q${i}"]:checked`);
        if (ans && ans.value === q.ans) score++;
    });

    let grade;
    if (score === 5) grade = "A";
    else if (score >= 6 && score <= 8) grade = "B";
    else if (score >= 9) grade = "E";
    else grade = "Fail";

    localStorage.setItem("score", score);
    localStorage.setItem("grade", grade);

    window.location.href = "result.html";
}


// ================= HOME =================
function goHome() {
    localStorage.clear();
    window.location.href = "index.html";
}