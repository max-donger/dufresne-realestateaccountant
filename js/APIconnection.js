// Start the connection
const { ConnectionBuilder } = require("electron-cgi");

let connection = new ConnectionBuilder()
  .connectTo("dotnet", "run", "--project", "../rackham-realestatecrawler/src")
  .build();

connection.onDisconnect = () => {
  console.log("Dufresne: Connection closed.");
  connectionStatusIsOk(false);
};