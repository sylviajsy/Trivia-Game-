import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/questions", async(req, res) => {
    const query = req.query;

    const params = new URLSearchParams({
        amount:`${query.amount}`,
        category:`${query.category}`,
        difficulty:`${query.difficulty}`,
        type:`${query.type}`
    })

    try {
        const response = await fetch(`https://opentdb.com/api.php?${params}`);
        const data = await response.json();
        console.log("Fetched data for:", data);
        res.json(data);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.post("/api/results", (req, res) => {
    const { questions, userAnswers } = req.body;
    
    let score = 0;
    questions.forEach((item,index) => {
      if(userAnswers[index] == item.correct_answer){
        score ++;
      }
    })

    const isWinner = score >= (questions.length / 2);

    res.json({
        score: score,
        result: isWinner,
        message: isWinner ? "You Win! 🎉" : "You Lost! 💀"
    });
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});