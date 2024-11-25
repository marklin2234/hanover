import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getJson } from 'serpapi'

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    const prompt = query;

    const ai_result = await model.generateContent(prompt);
    const search_result = await getJson({
      engine: "google",
      api_key: process.env.SERP_API_KEY,
      q: query,
      location: "Toronto, Ontario",
    });

    const ai_response = ai_result.response.text();
    const search_response = search_result["organic_results"]

    console.log(ai_response);
    console.log(search_response);
    res.send({ ai_response, search_response });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
