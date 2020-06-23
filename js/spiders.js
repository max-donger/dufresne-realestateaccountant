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
  // Start counting from 1
  spiderCount = 1

  if (spiders == null){
    // TODO: Hier nog een foutmelding tonen aan de gebruiker?
    console.log('Geen resultaten...');
  }
  
  // TODO: This is set outside the forEach so it doesn't get reset, but maybe I can put it in the forEach?
  
  spiders.forEach(spider => {
    // Define
    spiderGrid = document.getElementById('spiderGrid');
    var addRow = document.createDocumentFragment();
    var newRow = document.createElement('div');
    var newColumnKey = document.createElement('div');
    var newColumnName = document.createElement('div');
    var newColumnActive = document.createElement('div');

    // Set
    newRow.id = 'spider'+spiderCount;
    newRow.className = 'row';
    newColumnKey.id = 'column1';
    newColumnKey.className = 'col-sm';
    newColumnKey.innerHTML = spider.key;

    newColumnName.id = 'column2';
    newColumnName.className = 'col-sm';
    newColumnName.innerHTML = spider.name;

    newColumnActive.id = 'column3';
    newColumnActive.className = 'col-sm';
    newColumnActive.innerHTML = "placeholder";

    newRow.appendChild(newColumnKey);
    newRow.appendChild(newColumnName);
    newRow.appendChild(newColumnActive);

    addRow.appendChild(newRow);
    document.getElementById('spiderGrid').appendChild(addRow);
    spiderCount++
  });
}
  
  connection.onDisconnect = () => {
    console.log("Dufresne: Connectie verbroken.");
    connectionStatusIsOk(false);
  };
}