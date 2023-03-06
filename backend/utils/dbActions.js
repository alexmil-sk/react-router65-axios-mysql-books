import dbConnect from './dbConnection.js';

const readCatalog = () => {
	new Promise((resolve, reject) => 
		dbConnect.getConnection((err, connection) => {
			if (err) return reject(err);
			connection.query(
				"SELECT * FROM books",
				(err, results) => {
					if (err) return reject(err);
					resolve(results);
				}
			)
			connection.release();
		})
	);
}

const deleteItem = (id) => {
	newPromise((resolve, reject) => {
		dbConnect.getConnection((err, connection) => {
			if (err) return reject(err);
			connection.query(
				`DELETE FROM books WHERE id = ${id}`,
				(err, result) => {
					if (err) return reject(err)
					console.log("Element has been deleted successfully!");
					resolve(result);
				}
			)
			connection.release();
		})
	})
}

export {
	readCatalog, deleteItem
}