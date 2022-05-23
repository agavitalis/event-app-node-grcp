const PROTO_PATH = "../events.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

const EventService = grpc.loadPackageDefinition(packageDefinition).EventService;
const client = new EventService(
	"127.0.0.1:3000",
	grpc.credentials.createInsecure()
);

module.exports = client;
