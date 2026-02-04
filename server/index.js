import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/questions", async(req, res) => {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10`);
        const data = await response.json();
        console.log("Fetched data for:", data);
        res.json(data);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});