document.getElementById("preloader").visible = true
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("preloader").visible = false

  // Запрет на перетаскивание картинок и ссылок
  $("img, a").on("dragstart", function (event) {
    event.preventDefault()
  })

  // Создание карточек с аккаунтами
  function createCards() {

  }

  // Выделяет главный чекбокс, если выделены все
  function allcheckboxes() {
    let array = document.querySelectorAll('.acc-checkbox'),
      counter = 0
    array.forEach(e => {
      if (e.checked == true) counter++
    })
    if (array.length == counter) document.getElementById('main-checkbox').checked = true
  }

  // Скрывает все чекбоксы, если не выделено ни одного
  function checkboxcount() {
    let counter = 0
    document.querySelectorAll('.acc-checkbox').forEach(e => {
      if (e.checked == true) counter++
    })
    if (counter == 0) document.querySelectorAll('.acc-item-checkbox').forEach(el => {
      el.style.display = 'none'
    })
  }

  // Создает уведомления
  function CreateToast(type, title, text) {
    let id = Math.floor(Math.random() * (99999 - 1) + 1).toString(36),
      timer = 0,
      img, color
    switch (type) {
      case 0: // Код ошибки
        color = '#dc3545'
        img = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-patch-exclamation-fill popup-icon mr-1" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>`
        break
      case 1: // Код при успешном выполнении
        color = '#198754'
        img = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-patch-exclamation-fill popup-icon mr-1" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
              </svg>`
        break
      case 2: // Код предупреждения
        color = '#ffc107'
        img = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-patch-exclamation-fill popup-icon mr-1" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>`
        break
    }
    // Код уведомления 
    let str = `
    <div id="${id}" class="toast mt-2" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
      <div class="toast-header">
        <div class="first-part-popup">
          <img src="" alt="" class="popup-icon">
          <strong class="mr-auto">${title}</strong>
        </div>
        <div class="second-part-popup" id='${id}-timer'>
          <small class="text-muted mr-2">только что</small>
          <button type="button" id='${id}-close'  class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div class="toast-body">
        ${text}
      </div>
  </div>`
    // Добавление и показ уведомления
    $("#popup").append(str)
    $(`#${id}`).toast('show')

    // Таймер на уведомлении
    let intervalId = setInterval(() => {
      timer++
      document.getElementById(`${id}-timer`).children[0].textContent = timer + ' сек. назад'
    }, 1000)

    // Функции для закрытия уведомления
    document.getElementById(`${id}-close`).addEventListener('click', removeListener)

    function removeListener() {
      $(`#${id}`).hide()
    }
    setTimeout(() => {
      document.getElementById(`${id}-close`).removeEventListener('click', removeListener)
      clearInterval(intervalId)
      $(`#${id}`).remove()
    }, 5000)
  }

  // Функция для копирования
  function Copy(text, obj) {
    let input = document.createElement("input")
    input.value = text
    document.body.appendChild(input)
    input.select()
    try {
      document.execCommand("copy")
      CreateToast(1, obj.header, obj.body)
    } catch (err) {
      CreateToast(0, 'Ошибка', 'Что-то пошло не так.')
    }
    document.body.removeChild(input)
  }

  // Копирование логина и пароля
  Array.from(document.querySelectorAll('#user_password')).concat(Array.from(document.querySelectorAll('#user_login'))).forEach(e => {
    e.addEventListener("dblclick", function (event) {
      obj = {
        header: 'Успешно',
        body: 'Данные успешно скопированны!'
      }
      Copy(event.target.parentElement.children[0].textContent.substr(7) + ":" + event.target.parentElement.children[2].textContent.substr(10), obj)
    })
  })

  // Копирование имени и фамилии
  document.querySelectorAll('#user_name').forEach(e => {
    e.addEventListener("dblclick", function (event) {
      obj = {
        header: 'Успешно',
        body: 'Имя успешно скопированно!'
      }
      Copy(event.target.textContent, obj)
    })
  })

  // Копирование имени и фамилии
  document.querySelectorAll('#user_id').forEach(e => {
    e.addEventListener("dblclick", function (event) {
      obj = {
        header: 'Успешно',
        body: 'ID успешно скопирован!'
      }
      Copy(`https://vk.com/${event.target.textContent.substr(3).trim()}/`, obj)
    })
  })

  // Копирование токена
  document.querySelectorAll('.acc-item-token').forEach(e => {
    e.addEventListener("dblclick", function (event) {
      obj = {
        header: 'Успешно',
        body: 'Токен успешно скопирован!'
      }
      Copy(event.target.value.trim(), obj)

      //Убирает выделение input
      if (document.selection && document.selection.empty) {
        document.selection.empty()
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges()
      }
    })
  })

  // При клике на главный чекбокс выделяются все
  document.getElementById('main-checkbox').addEventListener('click', function () {
    if (document.getElementById('main-checkbox').checked == true) {
      Array.from(document.getElementsByClassName('acc-item-checkbox')).forEach(e => {
        e.style.display = 'flex'
        e.children[0].checked = true
      })
    } else {
      Array.from(document.getElementsByClassName('acc-item-checkbox')).forEach(e => {
        e.style.display = 'none'
        e.children[0].checked = false
      })
    }
  })

  //Checkbox logic 
  document.querySelectorAll('.acc-checkbox').forEach(e => {
    e.addEventListener('click', function (event) {
      if (document.getElementById('main-checkbox').checked == true) document.getElementById('main-checkbox').checked = false
      if (e.checked == false) checkboxcount()
      allcheckboxes()
    })
  })
  document.querySelectorAll('.acc-item').forEach(e => {
    e.addEventListener('dblclick', function (event) {
      if (event.target.classList.contains('acc-item')) {
        if (event.target.children[0].children[0].checked == true) {
          event.target.children[0].style.display = 'flex'
          event.target.children[0].children[0].checked = false
          document.querySelectorAll('.acc-item-checkbox').forEach(el => {
            el.style.display = 'none'
          })
          allcheckboxes()
        } else {
          document.querySelectorAll('.acc-item-checkbox').forEach(el => {
            el.style.display = 'block'
          })
          event.target.children[0].style.display = 'flex'
          event.target.children[0].children[0].checked = true
          allcheckboxes()
        }
      }
    })
  })

  //Infinite page
  window.onscroll = function infinitePage() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 300) {
      createCards()
    }
  }

  // document.getElementById('filter-sex').addEventListener('click', function () {
  //   if (document.getElementById('filter-sex').children[0].value == 'remove')  document.getElementById('filter-sex').children[0].remove()
  // })

  document.getElementById('funnel-full').addEventListener('click', function () {
    if (document.getElementById('funnel').classList.contains('funnel-mini')) {
      document.getElementById('funnel').classList.remove('funnel-mini')
      document.getElementById('filter').style.display = 'flex'
    } else {
      document.getElementById('funnel').classList.add('funnel-mini')
      document.getElementById('filter').style.display = 'none'
    }
  })
  document.getElementById('download-btn').addEventListener('click', function(){
    let ids = []
    document.querySelectorAll('.acc-checkbox').forEach(e=>{
      if(e.checked == true) ids.push(e.parentNode.parentNode.children[3].children[0].textContent.substr(7))
    })
    // $.post("https://" + location.host + "/getData", function(data) {

    // })
  
    console.log(ids)
    $.post("http://localhost:5000/download",  { data: ids},  function(data) {
      location.replace('/download')
    })
  })
})