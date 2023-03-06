import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Add() {

	const navigate = useNavigate();

	const [book, setBook] = useState({
		title: "",
		desc: "",
		price: 0,
		cover: 'https://sp-ace.ru/files/281/281a7c359365840c6bc4a1d0cc27e21f.png'
	});

	const handleChange = (e) => {
		setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5555/books", book);
			navigate('/books');
		} catch (err) {
			console.log(err);
		}
	}

	return (

		<div className="Add">
			<h2>Add New Book</h2>
			<form>
				<input type="text" name="title" onChange={handleChange} placeholder="title" />
				<input type="text" name="desc" onChange={handleChange} placeholder="description" />
				<input type="number" name="price" min="1" onChange={handleChange} placeholder="price" />
				<input type="text" name="cover" onChange={handleChange} placeholder="cover" />
			</form>
			<button onClick={handleClick} >Create</button>
		</div>
	)
}
