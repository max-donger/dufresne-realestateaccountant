// Request the latest crawl
function getAllSpiders() {
  console.log("Getting all spiders...");
  connection.send("get-all-spiders", (err, response) => {
    if (err) {
      console.log(err);
      return;
    }
    getAllSpidersReturn(response);
  })
}

function getAllSpidersReturn(spiders) {
  // Start counting from 1
  spiderCount = 1

  if (spiders == null){
    // TODO: Hier nog een foutmelding tonen aan de gebruiker?
    console.log('Geen spiders gevonden...');
  }
  
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
  
function connectionStatusHandler() {
  console.log('Connection status handler is on');
  var checkFunda = setInterval(checkConnectionStatus, 5000);
}

function checkConnectionStatus() {
  response = 0;
  connection.send("get-spider-status", "Spider A", (err, response) => {
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
    // TODO: kan dit niet .stroke .fill
    connTooltip.title='Unknown';
    connIcon.style.stroke='grey';
    connIcon.style.fill='grey';
  }
}