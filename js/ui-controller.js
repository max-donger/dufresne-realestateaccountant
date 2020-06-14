/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function applicatieDropDown() {
  document.getElementById("applicatieDropdown").classList.toggle("show");
  
  let dropdown = $('#applicatieDropdown');

  dropdown.empty();
  
  dropdown.prop('selectedIndex', 0);
  
  const url = './output/notes/list.json';
  
  // Populate dropdown with list of provinces
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      dropdown.append($('<a onclick="selectVersion()"></a>').text(entry.name));
    })
  })
}

function versieDropDown() {
  document.getElementById("versieDropdown").classList.toggle("show");
  
  let dropdown = $('#versieDropdown');

  dropdown.empty();
  
  dropdown.prop('selectedIndex', 0);
  
  const url = './output/notes/list.json';
  
  // Populate dropdown with list of provinces
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      dropdown.append($('<a onclick="selectVersion()"></a>').text(entry.name));
    })
  })
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.versie')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function selectVersion() {
  document.getElementById("versieDropDown").innerHTML = $(event.target).text();

  const fs = require('fs');

  let rawdata = fs.readFileSync('./output/notes/list-full.json');
  let data = JSON.parse(rawdata);

  version = document.getElementById('i_version');
  date = document.getElementById('i_date');
  platform = document.getElementById('i_platform');
  isNew = document.getElementById('i_isNew');

data.release.forEach(function(v) {
  version.value = v.version;
  date.value = v.date;
  platform.value = v.platform;
  isNew.checked = v.isNew;
});
  
  preview();
}

function preview() {
    version = $('#i_version').val();
    date = $('#i_date').val();
    platform = $('#i_platform').val();

    $('#o_version').text(version);            
    $('#o_date').text(date);
    $('#o_platform').text(platform);
};

// Side menu
function toggleSideMenu(){
  var sidemenu = document.getElementById('side-menu');
  var sidemenuButton = document.getElementById('side-menu-button');
  var main = document.getElementById('main');
  var sidemenuX = document.getElementById('side-menu-dashboard');
  var sidemenuY = document.getElementById('side-menu-notes');
  var sidemenuZ = document.getElementById('side-menu-support');
  var delayInMilliseconds = 500;

  if (sidemenu.style.width === '90px') {
    sidemenu.style.width='210px';
    main.style.marginLeft='210px';
    sidemenuButton.style.paddingRight = '25px';
    sidemenuButton.style.paddingLeft = '25px';
    setTimeout(function() {
      sidemenuX.style.display = 'inline';
      sidemenuY.style.display = 'inline';
      sidemenuZ.style.display = 'inline';
    }, delayInMilliseconds);
  } else {
    sidemenu.style.width='90px';
    main.style.marginLeft='90px';
    sidemenuButton.style.paddingRight = '35px';
    sidemenuButton.style.paddingLeft = '35px';
    sidemenuX.style.display = 'none';
    sidemenuY.style.display = 'none';
    sidemenuZ.style.display = 'none';
  }
}