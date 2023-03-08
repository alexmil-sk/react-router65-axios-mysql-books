import dbConnect from './dbConnection.js';


const readCatalog = (req, res) => {
	const q = "SELECT * FROM books";
	dbConnect.query(q, (error, data) => {
		if (error) return res.json(error);
		return res.json(data);
	});
};

const updateBook = (req, res) => {
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
};

const getBook = (req, res) => {
	const q = "SELECT * FROM books WHERE id = ?";
	const id = req.params.id;

	dbConnect.query(q, [id], (error, data) => {
		if (error) return res.json(error);
		console.log(data);
		return res.json(data);
	})
};

const addBook = (req, res) => {

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
};

const deleteBook = (req, res) => {
	const q = "DELETE FROM books WHERE id = ?";
	const bookId = req.params.id

	dbConnect.query(q, [bookId], (error, info) => {
		if (error) return res.json(error);
		return res.json("Book has been deleted successfully!");
	})
}

export {
	readCatalog, updateBook, getBook, addBook, deleteBook
};