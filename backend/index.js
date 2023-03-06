import express from 'express';
import {createPool} from 'mysql2';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.MYSQL_PORT;
const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;

const app = express();

const db = createPool({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE
});

app.use(express.json());
app.use(cors());

const CREATE_BOOKS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS books (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	title TEXT,
	description TEXT,
	cover TEXT,
	price INTEGER	)`;


db.getConnection((err, connection) => {
		if (!err) {
			console.log('Connected to the MySQL DB with CONNECTION_ID: ' + connection.threadId)
			connection.query(CREATE_BOOKS_TABLE_SQL, (err) => {
				if (!err) {
					console.log('Books table has been created')
				} else {
					console.log(err);
				}
			})
			connection.release()
		}
	})


app.get("/", (req, res) => {
	res.json('Its backend');
});

app.get("/books", (req, res) => {
	const q = "SELECT * FROM books";

	db.query(q, (error, data) => {
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

	db.query(q, [...values, bookId], (error, info) => {
		if (error) return res.json(error);
		return res.json("Book has been updated successfully");
	})
});

app.get("/books/:id", (req, res) => {
	const q = "SELECT * FROM books WHERE id = ?";
	const id = req.params.id;

	db.query(q, [id], (error, data) => {
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

	db.query(q, [values], (error, info) => {
		if (error) return res.json(error);
		return res.json("Book has been created successfully!");
	})
});

app.delete("/books/:id", (req, res) => {
	const q = "DELETE FROM books WHERE id = ?";
	const bookId = req.params.id

	db.query(q, [bookId], (error, info) => {
		if (error) return res.json(error);
		return res.json("Book has been deleted successfully!");
	})
});


app.listen(PORT, () => {
	console.log(`Express has been started on port: ${PORT}`);
});