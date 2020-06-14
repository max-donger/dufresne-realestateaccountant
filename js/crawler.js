// Start the connection
const { ConnectionBuilder } = require("electron-cgi");

let connection = new ConnectionBuilder()
.connectTo("dotnet", "run", "--project", "../rackham-realestatecrawler")
.build();

// Start the crawl
function startCrawl() {
    connection.on('show-posts', posts => {
      console.clear();    
      if (posts.length === 0){
          console.log('No results...');
      }
      posts.forEach(post => {
          console.log(`${post.title} ${post.upvoteCount}↑ (${post.url})\n`);
      });
    });
  
    connection.onDisconnect = () => {
    console.log("Dufresne: Connection closed.");
    };
  
    subreddit = document.getElementById("fname").value;
    connection.send('select-subreddit', subreddit, () => {
      connection.send('start', null, () => {     
        connection.close();
      });
    });
  }
  
  // Stop the crawl
  function stopCrawl() {
    connection.send('stop');
  }