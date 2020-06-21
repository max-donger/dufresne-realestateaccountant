// Start the connection
const { ConnectionBuilder } = require("electron-cgi");

let connection = new ConnectionBuilder()
  .connectTo("dotnet", "run", "--project", "../rackham-realestatecrawler")
  .build();

function connectionStatusHandler() {
  console.log('Connection status handler is on');
  var checkFunda = setInterval(checkConnectionStatus, 5000);
}

function checkConnectionStatus() {
  response = 0;
  connection.send("connection-status", "Funda", (err, response) => {
    if (err) {
      console.log(err);
      connectionStatusIsOk(0);
      return;
    }
    connectionStatusIsOk(response);
  });
}

function connectionStatusIsOk(value) {
  connIcon = document.getElementById('crawlerConnectionStatusIcon');
  connTooltip = document.getElementById('crawlerConnectionStatusTooltip');
  if (value === 1) {
    connTooltip.title='Connected';
    connIcon.style.stroke='lightgreen';
    connIcon.style.fill='lightgreen';
  }
  else if (value === 2) {
    connTooltip.title='Disconnected';
    connIcon.style.stroke='red';
    connIcon.style.fill='red';
  }
  else {
    connTooltip.title='Unknown';
    connIcon.style.stroke='grey';
    connIcon.style.fill='grey';
  }
}

// Request the latest crawl
function getLatestCrawl() {
  connection.on('show-posts', posts => {
  console.clear();    
  if (posts.length === 0){
      console.log('No results...');
  }
  posts.forEach(post => {
      // Log it  
      console.log(`${post.title} ${post.upvoteCount} (${post.url})\n`);

      // Declare the fields
      title = document.getElementById('i_version');
      upvoteCount = document.getElementById('i_date');
      url = document.getElementById('i_platform');
    
      // Set the value
    posts.forEach(function(post) {
      title.value = post.title;
      upvoteCount.value = post.upvoteCount;
      url.value = post.url;
    });
      
    // Update the fields
    title = $('#i_version').val();
    upvoteCount = $('#i_date').val();
    url = $('#i_platform').val();

    $('#o_version').text(title);            
    $('#o_date').text(upvoteCount);
    $('#o_platform').text(url);
    
  });
});

connection.onDisconnect = () => {
  console.log("Dufresne: Connection closed.");
  connectionStatusIsOk(false);
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
