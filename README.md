# Event Recorder with gRPC and Node

This app consists of two parts:
- Server: where gRPC serves the remote calls defined in the proto file
- Client: Express/Node web api for CRUD operations.

In order to run this app, issue in separate command line windows:
- Inside the /client folder: `node index`
- Inside the /root folder: `npm start`

Then, go to http://localhost:3000/ and test it out.
