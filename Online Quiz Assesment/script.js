const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Use `sqlite3` if using SQLite

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if needed
    password: 'root', // Your DB password
    database: 'online_assessment'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Routes

// Teacher page to add questions
app.post('/save-test', (req, res) => {
    const questions = JSON.parse(req.body.questions);
    questions.forEach((question) => {
        const query = `
            INSERT INTO Questions (question, option1, option2, option3, option4, correct) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [question.question, question.options[0], question.options[1], question.options[2], question.options[3], question.correct], (err) => {
            if (err) throw err;
        });
    });
    res.send('Test saved successfully');
});

// Student page to fetch questions and take the test
app.get('/get-questions', (req, res) => {
    const query = 'SELECT * FROM Questions';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Submit student results
app.post('/submit-test', (req, res) => {
    const studentName = req.body.name;
    const studentAnswers = JSON.parse(req.body.answers);
    
    const query = 'SELECT id, correct FROM Questions';
    db.query(query, (err, questions) => {
        if (err) throw err;

        let score = 0;
        questions.forEach((q, index) => {
            if (studentAnswers[index] == q.correct) {
                score++;
            }
        });

        const resultQuery = 'INSERT INTO Results (student_name, score) VALUES (?, ?)';
        db.query(resultQuery, [studentName, score], (err) => {
            if (err) throw err;
            res.json({ score });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
