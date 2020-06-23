// Side menu
function toggleSideMenu(){
  var sidemenu = document.getElementById('side-menu');
  var sidemenuButton = document.getElementById('side-menu-button');
  var sidemenuButtonSVG = document.getElementById('side-menu-button-svg');
  var main = document.getElementById('main');
  var sidemenuX = document.getElementById('side-menu-dashboard');
  var sidemenuY = document.getElementById('side-menu-estateagencies');
  var sidemenuZ = document.getElementById('side-menu-support');
  var delayInMilliseconds = 500;

  if (sidemenu.style.width === '90px') {
    sidemenu.style.width='210px';
    main.style.marginLeft='210px';
    sidemenuButton.style.paddingRight = '25px';
    sidemenuButton.style.paddingLeft = '25px';
    sidemenuButtonSVG.style.transform = 'rotate(0deg)';
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
    sidemenuButtonSVG.style.transform = 'rotate(180deg)';
    sidemenuX.style.display = 'none';
    sidemenuY.style.display = 'none';
    sidemenuZ.style.display = 'none';
  }
  
}
