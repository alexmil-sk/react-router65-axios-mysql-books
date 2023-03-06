import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Books() {

	const [books, setBooks] = useState([]);

	useEffect(() => {
		const fetchAllBooks = async () => {
			try {
				const { data } = await axios.get('http://localhost:5555/books');
				setBooks(data);
			} catch (e) {
				console.log(e)
			}
		}
		fetchAllBooks();

	}, [books]);

	const removeBook = async(id) => {
		try {
			await axios.delete(`http://localhost:5555/books/${id}`);
		} catch (e) {
			console.log(e)
		}

	}

	return (
		<>
			<div className="Books">
				{books.map(book => (
					<div className="book" key={book.id}>
						{book.cover && <img src={book.cover} alt={book.title} />}
						<h2>{book.title}</h2>
						<p>ID: {book.id }</p>
						<p>{book.description}</p>
						<span>{book.price}</span>
						<button onClick={() => removeBook(book.id)} className="delete">DELETE</button>
						<button className="update">
							<Link to={`/update/${book.id}`} state={{ book: book }}>UPDATE</Link>
						</button>
					</div>
				))}
			</div>
		</>
	)
}
