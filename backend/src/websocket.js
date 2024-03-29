const socket = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
	io = socket(server);

	io.on('connection', socket => {
		const { latitude, longitude, techs } = socket.handshake.query;

		connections.push({
			id: socket.id,
			coordinates: {
				latitude: Number(latitude),
				longitude: Number(longitude),
			},
			techs: parseStringAsArray(techs),
		});
	});
};

exports.findConnection = (coordinate, techs) => {
	return connections.filter(connection => {
		return calculateDistance(coordinate, connection.coordinates) < 10 
			&& connection.techs.some(item => techs.includes(item))
	});
};

exports.sendMessage = (to, message, data) => {
	to.forEach(connection => {
		io.to(connection.id).emit(message, data);
	});
};