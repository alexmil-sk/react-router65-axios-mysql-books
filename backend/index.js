import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import {
	readCatalog,
	deleteItem
} from './utils/dbActions.js';
import dbConnect from './utils/dbConnection.js';


const AXIOS_PORT = process.env.AXIOS_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.json('Its backend');
});

app.get("/books", (req, res) => {
	const q = "SELECT * FROM books";

	dbConnect.query(q, (error, data) => {
		if (error) return res.json(error);
		return res.json(data);
	});
});


app.put("/books/:id", (req, res) => {
	const q = "UPDATE books SET `id` = ?, `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";
	const values = [
		req.body.id,
		req.body.title,
		req.body.description,
		req.body.price,
		req.body.cover,
	];
	const bookId = req.params.id;

	dbConnect.query(q, [...values, bookId], (error, info) => {
		if (error) return res.json(error);
		return res.json("Book has been updated successfully");
	})
});

app.get("/books/:id", (req, res) => {
	const q = "SELECT * FROM books WHERE id = ?";
	const id = req.params.id;

	dbConnect.query(q, [id], (error, data) => {
		if (error) return res.json(error);
		console.log(data);
		return res.json(data);
	})
});

app.post("/books", (req, res) => {

	const q = "INSERT INTO books (`id`, `title`, `description`, `price`, `cover`) VALUES (?)";
	const values = [
		req.body.id,
		req.body.title,
		req.body.description,
		req.body.price,
		req.body.cover,
	];

	dbConnect.query(q, [values], (error, info) => {
		if (error) return res.json(error);
		return res.json("Book has been created successfully!");
	})
});

app.delete("/books/:id", (req, res) => {
	const q = "DELETE FROM books WHERE id = ?";
	const bookId = req.params.id

	dbConnect.query(q, [bookId], (error, info) => {
		if (error) return res.json(error);
		return res.json("Book has been deleted successfully!");
	})
});


app.listen(AXIOS_PORT, () => {
	console.log(`Express has been started on port: ${AXIOS_PORT}`);
});