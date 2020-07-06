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
    console.log(spider.Active);
    console.log(spider);
    // Define
    spiderGrid = document.getElementById('spiderGrid');
    var addRow = document.createDocumentFragment();
    var newRow = document.createElement('div');
    var newColumnKey = document.createElement('div');
    var newColumnName = document.createElement('div');
    var newColumnActive = document.createElement('div');
    var newColumnStatus = document.createElement('div');

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
    newColumnActive.className = 'col-sm-2 d-flex justify-content-center';
    if (spider.active == 0) {
      newColumnActive.innerHTML = "<label class='switch'><input id='spiderActiveSlider' onclick='toggleSpiderActiveState()' type='checkbox' unchecked><span class='slider'></span></label>";
    }
    else  {
      newColumnActive.innerHTML = "<label class='switch'><input id='spiderActiveSlider' onclick='toggleSpiderActiveState()' type='checkbox' checked><span class='slider'></span></label>";
    }

    newColumnStatus.id = 'column4';
    newColumnStatus.className = 'col-sm-2 d-flex justify-content-center';
    newColumnStatus.innerHTML = "<div id='spiderStatusTooltip' class='my-2 my-lg-0' title='Uitgeschakeld'><svg height='30' width='50'><circle id='spiderStatusIcon' cx='25' cy='12' r='10' stroke='grey' stroke-width='3' fill='grey'></circle></svg></div>";

    newRow.appendChild(newColumnKey);
    newRow.appendChild(newColumnName);
    newRow.appendChild(newColumnActive);
    newRow.appendChild(newColumnStatus);

    addRow.appendChild(newRow);
    document.getElementById('spiderGrid').appendChild(addRow);
    spiderCount++
  });

  // Start checking the status for each spider
  startSpiderStatusChecker();
}
 
// Status column

function startSpiderStatusChecker() {
  console.log('Getting spider status...');
  getSpiderHealthState();
  console.log('Spider status checker is now enabled. Interval = 2500');
  setInterval(getSpiderHealthState, 2500);
}

// TODO: Make spider health state dynamic? And Spider A doesn't exist, but the function on the backend doesn't check for that yet
function getSpiderHealthState() {
  response = 0;
  console.log('Checking one spider status...');
  connection.send("get-one-spider-health-state", "Spider A", (err, response) => {
    if (err) {
      console.log(err);
      updateSpiderHealthState(0);
      return;
    }
    updateSpiderHealthState(response);
  });
}

// TODO: Rename to UpdateSpiderStatus or something
function updateSpiderHealthState(value) {
  spiderStatusIcon = document.getElementById('spiderStatusIcon');
  spiderStatusTooltip = document.getElementById('spiderStatusTooltip');
  if (value === 1) {
    spiderStatusTooltip.title='Gezond';
    spiderStatusIcon.style.stroke='lightgreen';
    spiderStatusIcon.style.fill='lightgreen';
  }
  else if (value === 2) {
    spiderStatusTooltip.title='Ongezond';
    spiderStatusIcon.style.stroke='red';
    spiderStatusIcon.style.fill='red';
  }
  else {
    spiderStatusTooltip.title='Uitgeschakeld';
    spiderStatusIcon.style.stroke='grey';
    spiderStatusIcon.style.fill='grey';
  }
}

// Active column

function toggleSpiderActiveState() {
  // TODO: Add logic for enable / disable here
  response = 0;
  console.log('Toggling spider active state...');
  connection.send("toggle-one-spider-active-state", "67b0bf97-e9d4-4195-b372-d172b6777889", (err, response) => {
    if (err) {
      console.log(err);
      updateSpiderActiveState(0);
      return;
    }
    updateSpiderActiveState(response);
  });
}

function updateSpiderActiveState(value) {
  spiderStatusIcon = document.getElementById('spiderActiveSlider');
  if (value === 0) {
    spiderStatusIcon.checked = false;
  }
  else if (value === 1) {
    spiderStatusIcon.checked = true;
  }
}