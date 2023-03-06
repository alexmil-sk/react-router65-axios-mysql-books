import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import CustomLink from "./components/UI/CustomLink.jsx";

function App() {

	const {pathname} = useLocation();

	return (
		<div className="App">
			<header className="header">
				<NavLink
					className={({isActive}) => isActive ? 'my-active' : ''}
					to="/">Home
				</NavLink>
				<CustomLink to="/books">Books Catalog</CustomLink>
					<NavLink to="/add">Add new book</NavLink>
			</header>
			<main className="main">
				<h1>{pathname === "/books" ? "Books Catalog" : "Books Shop" }</h1>
				
				<Outlet />
			</main>
			<footer className="footer">2023</footer>
		</div>
	)
}

export default App
