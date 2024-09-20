import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo();

const db = client.db("myapp");
const messagesCollection = db.collection("messages");

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await messagesCollection.find({}).toArray();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { content } = req.body;
    const result = await messagesCollection.insertOne({ content, createdAt: new Date() });
    res.status(201).json({ id: result.insertedId, content });
  } catch (error) {
    res.status(500).json({ error: "Error creating message" });
  }
});

app.get('/api/messages/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const message = await messagesCollection.findOne({ _id: id });
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ error: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching message" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});