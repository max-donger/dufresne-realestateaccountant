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
    newRow.className = 'row d-flex justify-content-center';
    newColumnKey.id = 'column1';
    newColumnKey.className = 'col-sm-4 d-flex justify-content-center';
    newColumnKey.innerHTML = spider.key;

    newColumnName.id = 'column2';
    newColumnName.className = 'col-sm-4 d-flex justify-content-center';
    newColumnName.innerHTML = spider.name;

    newColumnActive.id = 'column3';
    newColumnActive.className = 'col-sm-4 d-flex justify-content-center';
    newColumnActive.innerHTML = "<div id='spiderStatusTooltip' class='my-2 my-lg-0' title='Uitgeschakeld'><svg height='30' width='50'><circle id='spiderStatusIcon' cx='25' cy='12' r='10' stroke='grey' stroke-width='3' fill='grey'></circle></svg></div>";

    newRow.appendChild(newColumnKey);
    newRow.appendChild(newColumnName);
    newRow.appendChild(newColumnActive);

    addRow.appendChild(newRow);
    document.getElementById('spiderGrid').appendChild(addRow);
    spiderCount++
  });

  // Start checking the status for each spider
  startSpiderStatusChecker();
}
  
function startSpiderStatusChecker() {
  console.log('Getting spider status...');
  getSpiderStatus();
  console.log('Spider status checker is now enabled. Interval = 2500');
  setInterval(getSpiderStatus, 2500);
}

function getSpiderStatus() {
  response = 0;
  console.log('Checking one spider status...');
  connection.send("get-one-spider-status", "Spider A", (err, response) => {
    if (err) {
      console.log(err);
      spiderStatusIsOk(0);
      return;
    }
    spiderStatusIsOk(response);
  });
}

function spiderStatusIsOk(value) {
  spiderStatusIcon = document.getElementById('spiderStatusIcon');
  spiderStatusTooltip = document.getElementById('spiderStatusTooltip');
  if (value === 1) {
    spiderStatusTooltip.title='Actief';
    spiderStatusIcon.style.stroke='lightgreen';
    spiderStatusIcon.style.fill='lightgreen';
  }
  else if (value === 2) {
    spiderStatusTooltip.title='Niet actief';
    spiderStatusIcon.style.stroke='red';
    spiderStatusIcon.style.fill='red';
  }
  else {
    spiderStatusTooltip.title='Uitgeschakeld';
    spiderStatusIcon.style.stroke='grey';
    spiderStatusIcon.style.fill='grey';
  }
}