const PROTO_PATH = "./events.proto";

let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

let eventsProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();
const events = [
	{
		id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
		name: "Vitalis's Birthday Party",
		description: "Vitalis 27th Birthday in Paris",
		location: "Paris France",
		duration: "All Day",
		lucky_number: 27,
		status: "Pending"
	},
];

server.addService(eventsProto.EventService.service, {

	getAllEvents: (_, callback) => {
		callback(null, { events });
	},

	getEvent: (call, callback) => {
		let event = events.find(n => n.id == call.request.id);

		if (event) {
			callback(null, event);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Event Not found"
			});
		}
	},

	createEvent: (call, callback) => {
		let event = call.request;

		event.id = uuidv4();
		events.push(event);
		callback(null, event);
	},

	updateEvent: (call, callback) => {
		let existingEvent = events.find(n => n.id == call.request.id);

		if (existingEvent) {
			existingEvent.name = call.request.name;
			existingEvent.description = call.request.description;
			existingEvent.location = call.request.location;
			existingEvent.duration = call.request.duration;
			existingEvent.lucky_number = call.request.lucky_number;
			existingEvent.status = call.request.status;
			callback(null, existingEvent);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Event Not found"
			});
		}
	},

	deleteEvent: (call, callback) => {
		let existingEventIndex = events.findIndex(
			n => n.id == call.request.id
		);

		if (existingEventIndex != -1) {
			events.splice(existingEventIndex, 1);
			callback(null, {});
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Event Not found"
			});
		}
	}
});

server.bind("127.0.0.1:3000", grpc.ServerCredentials.createInsecure());
console.log("Server listening at http://127.0.0.1:3000");
server.start();
