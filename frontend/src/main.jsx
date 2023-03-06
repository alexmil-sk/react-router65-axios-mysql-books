import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import App from './App';
import './index.css';
import './style.scss';
import {router} from './router';

ReactDOM.createRoot(document.getElementById('root'))
	.render(
		<React.StrictMode>
			<RouterProvider
				router={router}
				fallbackElement={<h3>Loading ...</h3>}
			>
				<App />
			</RouterProvider>
		</React.StrictMode>,
	)
