import {
	createPool
} from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.MYSQL_PORT;
const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;


const dbConnect = createPool({
	host: HOST,
	port: PORT,
	user: USER,
	password: PASSWORD,
	database: DATABASE
});

const CREATE_BOOKS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS books (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	title TEXT,
	description TEXT,
	cover TEXT,
	price INTEGER	)`;


dbConnect.getConnection((err, connection) => {
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
});

export default dbConnect;

