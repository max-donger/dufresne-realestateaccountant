// Connect to the APIGateway
const { ConnectionBuilder } = require("electron-cgi");

let connection = new ConnectionBuilder()
  .connectTo("dotnet", "run", "--project", "../rackham-realestatecrawler/src")
  .build();

// Log the connection close
connection.onDisconnect = () => {
  console.log("Dufresne: Connection closed.");
  connectionStatusIsOk(false);
};