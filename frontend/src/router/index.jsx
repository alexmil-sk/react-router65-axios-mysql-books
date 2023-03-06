import {
	Link,
	createBrowserRouter,
} from "react-router-dom";
import Books from '../pages/Books.jsx';
import App from '../App.jsx';
import Add from '../pages/Add.jsx';
import Update from '../pages/Update.jsx';


const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "books",
				element: <Books />
			},
			{
				path: "add",
				element: <Add />
			},
			{
				path: "update/:catId",
				element: <Update />
			},
			{
				path: "*",
				element: (<div><h1>NotFound</h1><Link to="/">Home</Link></div>)
			}
		]
	},
];



export const router = createBrowserRouter(
	routes,
);


