// Request the latest crawl
function getAllSpiders() {
    console.log("Getting all spiders...");
    connection.send("get-all-spiders", (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      getAllSpidersReturn(response);
    });

function getAllSpidersReturn(spiders) {
  if (spiders == null){
    console.log('No results...');
  }
  console.log(spiders);
  
  spiders.forEach(spider => {
    // Define
    i = 0
    spiderGrid = document.getElementById('spiderGrid');
    var addRow = document.createDocumentFragment();
    var newRow = document.createElement('div');
    var newColumnKey = document.createElement('div');
    var newColumnName = document.createElement('div');
    var newColumnActive = document.createElement('div');

    // Set
    newRow.id = 'spider'+i;
    newRow.className = 'row';
    newColumnKey.id = 'column'+i;
    newColumnKey.className = 'col-sm';
    newColumnKey.innerHTML = spider.key;

    newColumnName.id = 'column'+(i+1);
    newColumnName.className = 'col-sm';
    newColumnName.innerHTML = spider.name;

    newColumnActive.id = 'column'+(i+2);
    newColumnActive.className = 'col-sm';
    newColumnActive.innerHTML = "placeholder";

    newRow.appendChild(newColumnKey);
    newRow.appendChild(newColumnName);
    newRow.appendChild(newColumnActive);

    addRow.appendChild(newRow);
    document.getElementById('spiderGrid').appendChild(addRow);
    i++
  });
}
  
  connection.onDisconnect = () => {
    console.log("Dufresne: Connection closed.");
    connectionStatusIsOk(false);
  };
}