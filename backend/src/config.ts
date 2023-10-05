export default {
	server: {
		port: process.env.BACKEND_PORT ?? 3001,
	},
	database: {
		connection: process.env.DB_CONNECTION || "sqlite",
		sqlite: {
			filename: process.env.DB_FILENAME || "database.db",
		},
	},
};
