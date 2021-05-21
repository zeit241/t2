document.getElementById("preloader").visible = true;
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("preloader").visible = false;

  function hello() {
    document.getElementById("username").innerText = localStorage.getItem(
      "UserData"
    );
  }

  function removecol() {
    if (document.getElementById("col").classList.contains("remove-col")) {
      document.getElementById("main-col").classList.remove("col-lg-11");
      document.getElementById("main-col").classList.add("col-lg-10");
      document.getElementById("col").classList.remove("remove-col");
      document.getElementById("list").style.display = "block";
      document.getElementById("icon-list").style.display = "none";
      document.getElementById("arrow-bar").src = "././media/arrow-bar-left.svg";
    } else {
      document.getElementById("main-col").classList.remove("col-lg-10");
      document.getElementById("main-col").classList.add("col-lg-11");
      document.getElementById("col").classList.add("remove-col");
      document.getElementById("list").style.display = "none";
      document.getElementById("icon-list").style.display = "block";
      document.getElementById("arrow-bar").src =
        "././media/arrow-bar-right.svg";
    }
  }

  function resize() {
    if (window.innerWidth <= 1665) {
      Array.from(document.getElementsByClassName("list-item")).forEach(e => {
        e.style.width = "180px";
      });
    } else {
      Array.from(document.getElementsByClassName("list-item")).forEach(e => {
        e.style.width = "250px";
      });
    }
  }

  function arrow() {
    requestAnimationFrame(arrow);
    if (
      document
      .getElementById("dropdownMenuButton")
      .classList.contains("show") == true
    ) {
      document.getElementById("arrow").classList.add("arrow-rev");
    }
    if (
      document
      .getElementById("dropdownMenuButton")
      .classList.contains("show") == false
    ) {
      document.getElementById("arrow").classList.remove("arrow-rev");
    }
  }
  function notificationsClose(){
    document.querySelectorAll('.notification-close').forEach(e=>e.addEventListener('click', function(event){
      e.parentNode.style.display='none'
      let array = document.localStorage.getItem('notification'),
      array2 = document.localStorage.getItem('notificationExeption')
      array2.push(e.parentNode.id)
    }))
  }
  function notifications() {
    document.querySelector('#notification').addEventListener('mouseenter', () => {
      document.querySelector('#notification-dropdown').style.display = 'block'
      document.querySelector('#notification-icon').src = './media/bell_hover.svg'
    })
    document.querySelector('#notification-dropdown').addEventListener('mouseleave', () => {
      document.querySelector('#notification-dropdown').style.display = 'none'
      document.querySelector('#notification-icon').src = './media/bell.svg'
    })
    document.querySelector('#notification-group').addEventListener('mouseenter', () => {
      document.querySelector('#notification-dropdown').style.display = 'block'
    })
   
  }
  document.querySelector('#volume').addEventListener('click', function(){
    if(document.querySelector('#volume').classList.contains('on')){
      document.querySelector('#volume').src = './media/volume-mute.svg'
      document.querySelector('#volume').classList.remove('on')
      document.querySelector('#volume').classList.add('off')
    }else{
      document.querySelector('#volume').src = './media/volume-up.svg'
      document.querySelector('#volume').classList.remove('off')
      document.querySelector('#volume').classList.add('on')
    }
  })
  function notify() {
    const audio = new Audio(); 
    audio.src = './media/music/notification.wav';
    audio.volume = 0.2;
    audio.play();
  }
  function notificationDate(){
    
  }
  function crateNotification(data){
    //if(new Date(+new Date - data.date).())
    let string = `
      <div class="new-notification" id="${data.counter}">
        <div class="notification-icon">
          <img src="${data.icon}" alt="notification-icon">
        </div>
        <div class="notification-body">
          <div class="notification-text">
            ${data.text}
          </div>
          <div class="notification-time">
            ${data.date}
          </div>
        </div>
        <div class="notification-close">
          <img src="./media/x.svg" alt="close">
        </div>
      </div>
    `
    $('#notification-main').append(string)
  }
  function editBell(counter){
    document.querySelector("p").style.setProperty('--notification-counter', counter)
  }
  // document.querySelector('#volume').addEventListener('click', function(){
  //   notify()
  // })
  //Start functions
  document.getElementById("remove-col").addEventListener("click", removecol);
  window.onresize = resize;
  var socket = io();
  socket.on('notification', function(msg) {
    crateNotification(msg)
    notify()
    notificationsClose()
  })
 
  arrow();
  notifications()
  if (localStorage.getItem("UserData")) {
    hello();
  } else {
    location.replace('/logout')
  }
});