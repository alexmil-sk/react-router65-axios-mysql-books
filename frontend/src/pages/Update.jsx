import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Update() {

	const { catId } = useParams();
	const navigate = useNavigate();

	const { book } = useLocation().state;


	const [id, setId] = useState(book.id);
	const [title, setTitle] = useState(book.title);
	const [description, setDesc] = useState(book.description);
	const [price, setPrice] = useState(book.price);
	const [cover, setCover] = useState(book.cover);

	const handleClickUpdate = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:5555/books/${catId}`, { id,title, description, price, cover });
			navigate("/books");
		} catch (e) {
			console.log(e)
		}
	}

	const handleChangeId = (e) => {
		setId(e.target.value);
	}
	const handleChangeTitle = (e) => {
		setTitle(e.target.value);
	}
	const handleChangeDesc = (e) => {
		setDesc(e.target.value);
	}
	const handleChangePrice = (e) => {
		setPrice(e.target.value);
	}
	const handleChangeCover = (e) => {
		setCover(e.target.value);
	}

	return (
		<div className="Update">
			<h1>Update Book ID: {catId}</h1>
			<form>
				<input type="number" name="id" id="id" onChange={handleChangeId} defaultValue={id} />
				<input
					type="text"
					name="title"
					id="title"
					onChange={handleChangeTitle}
					defaultValue={title}
				/>
				<input type="text" name="desc" id="desc" onChange={handleChangeDesc} defaultValue={description} />
				<input type="number" name="price" id="price" onChange={handleChangePrice} defaultValue={price} />
				<input type="text" name="cover" id="cover" onChange={handleChangeCover} defaultValue={cover} />
			</form>
			<button onClick={handleClickUpdate}>Update</button>
			<Link to="/books"><h3>to Books Catalog</h3></Link>
		</div>
	)
}
