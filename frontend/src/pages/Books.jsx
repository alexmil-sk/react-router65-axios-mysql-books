import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Books() {

	const [books, setBooks] = useState([]);

	useEffect(() => {
		fetchAllBooks();

	}, []);

	const fetchAllBooks = async () => {
		try {
			const { data } = await axios.get('http://localhost:5555/books');
			setBooks(data);

		} catch (e) {
			console.log(e)
		}
	}

	const removeBook = async (id) => {
		try {
			await axios.delete(`http://localhost:5555/books/${id}`);

			const new_books = [...books]; 
			setBooks(new_books.filter(i => i.id !== id));

		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<div className="Books">
				{
					books.length ?
						(books.map(book => (
							<div className="book" key={book.id}>
								{book.cover && <img src={book.cover} alt={book.title} />}
								<h2>{book.title}</h2>
								<p>ID: {book.id}</p>
								<p>{book.description}</p>
								<span>{book.price}</span>
								<button onClick={() => removeBook(book.id)} className="delete">DELETE</button>
								<button className="update">
									<Link to={`/update/${book.id}`} state={{ book: book }}>UPDATE</Link>
								</button>
							</div>
						)))
						: (<div>
							<h2>"Catalog is empty..."</h2>
							<Link className="add" to="/add">
								<button >
									ADD BOOK
								</button>
							</Link>
						</div>)

				}
			</div>
		</>
	)
}
