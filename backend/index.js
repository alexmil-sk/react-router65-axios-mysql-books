import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import dbConnect from './utils/dbConnection.js';
import {
	readCatalog, updateBook, getBook, addBook, deleteBook
} from "./utils/dbActions.js";


const AXIOS_PORT = process.env.AXIOS_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.json('Its backend');
});


app.get("/books", readCatalog);

app.put("/books/:id", updateBook);

app.get("/books/:id", getBook);

app.post("/books", addBook);

app.delete("/books/:id", deleteBook);


app.listen(AXIOS_PORT, () => {
	console.log(`Express has been started on port: ${AXIOS_PORT}`);
});