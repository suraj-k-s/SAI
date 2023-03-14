const express = require("express")

require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const { OpenAIApi, Configuration } = require("openai")


const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("views"));

app.listen(PORT,()=>{
    console.log(`SAI is Running on http://localhost:${PORT}/`);
})



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);


app.post("/", async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).send({error:'prompt is required'})
    }
    else
    {
        try {
            await openai.createCompletion({
                model:'text-davinci-003',
                prompt:prompt,
                temperature:0,
                max_tokens:2000
            }).then((response)=>{
                res.send({
                    data:response.data.choices[0].text
                })
            })
        } catch (error) {
            res.status(500).send({error});
        }
    }
});