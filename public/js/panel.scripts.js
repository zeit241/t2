document.getElementById("preloader").visible = true
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("preloader").visible = false

  /*======================================================================
    ==============================| ДРУГОЕ |==============================
    ======================================================================*/
  function accauntsCounter() {
    /*
    TODO:
    - Получить инфромацию о колличестве аккаунтов 

    */
    let count = document.querySelectorAll('.acc-item').length
    document.getElementById('accaunts-counter').innerText = `Показано ${count} из 30 записей`
  }
  document.getElementById('totop').addEventListener('click', function () {
    document.getElementById('topAnchor').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
  // Запрет на перетаскивание картинок и ссылок
  $("img, a").on("dragstart", function (event) {
    event.preventDefault()
  })
  if (document.body.clientHeight > window.screen.availHeight) {
    document.getElementById('col').style.height = document.getElementById('col').clientHeight + 56 + 'px'
  }


  // let widthCol = document.body.clientWidth
  // $( window ).resize(function() {
  //   if(widthCol!==document.body.clientWidth){
  //     document.querySelectorAll('.list-item').forEach(e=>{
  //       console.log((document.body.clientWidth - widthCol))
  //     //  e.style.width = e.clientWidth - 
  //     })
  //     widthCol = document.body.clientWidth
  //   }
  // })

  window.onscroll = function toTopCheck() {
    if (window.pageYOffset >= 200) {
      document.getElementById('totop').style.display = 'block'
    } else {
      document.getElementById('totop').style.display = 'none'
    }
    // if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 300) {
    //   createCards()
    // }
  }
  //Подргузка данных при скролле
  // window.onscroll = function infinitePage() {
  //   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 300) {
  //     createCards()
  //   }
  // }

  //Сохранение действий на странице
  function SaveData(id) {
    let array = localStorage.getItem('Data')
    array.push(id)
  }

  function CreateName() {
    let name
    let str = ["Полина", "Марта", "Ева", "Варвара", "Алексей", "Анна", "Кира", "Екатерина", "Сергей", "Вероника", "Михаил", "Маргарита", "Александр", "Алиса", "Фёдор", "Виктория", "Александра", "Артём", "Илья", "Николай", "Ксения", "Анастасия", "Тимур", "Елизавета", "Ангелина", "Дмитрий", "Платон", "Артемий", "Ясмина", "Давид", "Лев", "Аиша", "Тимофей", "Надежда", "Мария", "Альфия", "Милана", "Юлия", "Владислав", "Антон", "Ирина", "Матвей", "Алисия", "Пелагея", "Амина", "Валерия", "Нина", "Макар", "Марк", "Виктор", "София", "Игорь", "Евгений", "Кирилл", "Владимир", "Эмилия", "Константин", "Елена", "Амелия", "Али", "Степан", "Мирон", "Родион", "Леонид", "Захар", "Олег", "Пётр", "Диана", "Борис", "Мирослава", "Арина", "Никита", "Григорий", "Ярослав", "Адам", "Даниил", "Наталья", "Ульяна", "Максим", "Аврора", "Николь", "Дарья", "Татьяна", "Евгения", "Амира", "Тигран", "Софья", "Иван", "Андрей", "Арсений", "Георгий", "Мирослав", "Мира", "Мия", "Арсен", "Денис", "Глеб", "Павел", "Марьям", "Вера"]
    let str2 = ["Молчанова", "Анисимова", "Жуков", "Волошин", "Розанов", "Трофимов", "Козлова", "Кузнецов", "Гуляев", "Наумова", "Тихомирова", "Демидов", "Иванова", "Анисимов", "Румянцев", "Кравцова", "Ситникова", "Фомичева", "Ильина", "Егоров", "Шестакова", "Александров", "Субботин", "Щербакова", "Прокофьев", "Шапошникова", "Дружинин", "Меркулова", "Куликова", "Грекова", "Иванов", "Романов", "Петрова", "Власова", "Морозова", "Павлова", "Егорова", "Максимова", "Дорофеева", "Терентьев", "Прокофьева", "Федотова", "Самсонова", "Коновалов", "Рыжов", "Зайцев", "Левин", "Логинов", "Соколова", "Смирнов", "Зайцева", "Федотова", "Новикова", "Гусева", "Белоусов", "Гаврилова", "Агеева", "Назарова", "Боброва", "Симонова", "Еремина", "Свешникова", "Родионова", "Соколова", "Тарасов", "Григорьева", "Воронков", "Шувалова", "Романова", "Чижова", "Медведев", "Безрукова", "Кузнецов", "Зорина", "Никулин", "Шестакова", "Ульянов", "Овчинникова", "Кириллова", "Щербакова", "Фирсова", "Власов", "Федосеев", "Новиков", "Денисов", "Осипова", "Нефедов", "Самсонова", "Корчагина", "Тихонова", "Поздняков", "Васильева", "Ильина", "Рябов", "Захаров", "Михайлов", "Киселева", "Гусев", "Гончарова"]
    name = str[Math.floor(Math.random() * (str.length + 1 - 0) + 0)] + ' ' + str2[Math.floor(Math.random() * (str2.length + 1 - 0) + 0)]
    return name
  }

  function getPhoto() {
    return fetch('https://picsum.photos/200').then(e => photo = e.url)
  }
  // Создание карточек с аккаунтами
  async function createCards() {
    for (let i = 0; i < 30; i++) {
      let login = '7',
        password = '',
        token = '',
        id = 'id',
        friends = '',
        followers,
        idMB = i,
        checkDate = '26.02.2021',
        AddDate = '26.02.2021',
        valid,
        fa2,color,color2
      for (let h = 0; h <= 6; h++) {
        id += Math.floor(Math.random() * (10 - 1) + 1)
      }
      password += Math.random().toString(36).substr(2)
      for (let x = 0; x < 10; x++) {
        token += Math.random().toString(36).substr(2)
      }
      for (let j = 0; j <= 9; j++) {
        login += Math.floor(Math.random() * (10 - 1) + 1)
      }
      valid = Math.floor(Math.random() * (2 - 0) + 0)
      fa2 = Math.floor(Math.random() * (2 - 0) + 0)
      token = token.substr(0, 85)
      friends = Math.floor(Math.random() * (10000 - 0) + 0)
      followers = Math.floor(Math.random() * (10000 - 0) + 0)

      if (fa2 == 1) {
        fa2 = 'Да'
        color2 = '#dc3545'
      } else {
        fa2 = 'Нет'
        color2 = '#28a745'
      }
      if (valid == 1) {
        valid = 'Да'
        color = '#28a745'
      } else {
        valid = 'Нет'
        color = '#dc3545'
      }

      let string = `
      <tr class ="acc-item">
        <th scope="row">
          <div  class="acc-item-checkbox">
            <input class="form-check-input acc-checkbox" type="checkbox" id="${idMB}">
          </div>
        </th>
        <td>
          <div class="acc-item-avatar">
            <img src="${await getPhoto()}" alt="Аватар" />
          </div>
        </td>
        <td>
        <div class="acc-item-name">
            <span id="user_name">${CreateName()}</span><br />
            <span id="user_id">ID: ${id}</span>
          </div>
        </td>
        <td>
        <div class="acc-item-data">
            <span id="user_login">Логин: ${login}</span><br />
            <span id="user_password">Пароль: ${password}</span>
          </div>
        </td> 
        <td>
        <div class="acc-item-token">
            <input type="text" disabled value="${token}">
          </div>
        </td> 
        <td>
        <div class="acc-item-friends">
            <span id="user_friends">${friends}</span>
          </div>
        </td> 
        <td>
        <div class="acc-item-followers">
        <span id="user_followers">${followers}</span>
      </div>
        </td>
        <td>
        <div class="acc-item-valid">
            <span id="user_valid">Валидный: <span style="color: ${color}">${valid}</span></span><br />
            <span id="user_2fa">2FA: <span style="color: ${color2}">${fa2}</span></span>
          </div>
        </td>
        <td>
        <div class="acc-item-validdate">
            <span id="user_validdate">Проверен: ${checkDate}</span><br />
            <span id="user_addtime">Добавлен: ${AddDate}</span>
          </div>
        </td>
        <td>
        <div class="acc-item-more">
        <div class="acc-item-more-btn" id="acc-item-more-btn">
          <img src="./media/three-dots.svg" class="more-btn">
        </div>
        </div>
        </td>
        </tr>
      `
      $('#accs').append(string)
      accauntsCounter()
    }

  }
 createCards()
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
      <div class="first-part-popup mr-3">
        ${img}
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

  /*=====================================================================================
  ==============================| ФУНКЦИИ ДЛЯ КОПИРОВАНИЯ |==============================
  =======================================================================================*/
  // Функция для копирования
  function Copy(text, obj) {
    let input = document.createElement("textarea")
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
      Copy(event.target.parentElement.children[0].textContent.substr(7) + ":" + event.target.parentElement.children[2].textContent.substr(10), {
        header: 'Успешно',
        body: 'Данные успешно скопированны!'
      })
    })
  })
  // Копирование имени и фамилии
  document.querySelectorAll('#user_name').forEach(e => {
    e.addEventListener("dblclick", function (event) {
      Copy(event.target.textContent, {
        header: 'Успешно',
        body: 'Имя успешно скопированно!'
      })
    })
  })
  // Копирование ID
  document.querySelectorAll('#user_id').forEach(e => {
    e.addEventListener("dblclick", function (event) {
      Copy(`https://vk.com/${event.target.textContent.substr(3).trim()}/`, {
        header: 'Успешно',
        body: 'ID успешно скопирован!'
      })
    })
  })
  // Копирование токена
  document.querySelectorAll('.acc-item-token').forEach(e => {
    e.addEventListener("dblclick", function (event) {
      Copy(event.target.value.trim(), {
        header: 'Успешно',
        body: 'Токен успешно скопирован!'
      })
      //Убирает выделение input
      if (document.selection && document.selection.empty) {
        document.selection.empty()
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges()
      }
    })
  })

  /*=============================================================
  ==============================| ЧЕКБОКСЫ |=====================
  ===============================================================*/

  // Выделяет главный чекбокс, если выделены все
  function allcheckboxes() {
    let array = document.querySelectorAll('.acc-checkbox'),
      counter = 0
    array.forEach(e => {
      if (e.checked == true) counter++
    })
    if (array.length == counter) {
      document.getElementById('main-checkbox').checked = true
    } else if (array.length > counter) {
      document.getElementById('main-checkbox').checked = false
    }
  }
  // Скрывает все чекбоксы, если не выделено ни одного
  function checkboxcount() {
    let counter = 0
    document.querySelectorAll('.acc-checkbox').forEach(e => {
      if (e.checked == true) counter++
    })
    if (counter >= 1) {
      document.getElementById('multicopy-btn').disabled = false
    }
    if (counter == 0) {
      document.querySelectorAll('.acc-item-checkbox').forEach(el => {
        el.style.display = 'none'
      })
      document.getElementById('multicopy-btn').disabled = true
    }

  }
  // При клике на главный чекбокс выделяются все
  document.getElementById('main-checkbox').addEventListener('click', function () {
    if (document.getElementById('main-checkbox').checked == true) {
      document.getElementById('multicopy-btn').disabled = false
      Array.from(document.getElementsByClassName('acc-item-checkbox')).forEach(e => {
        e.style.display = 'flex'
        e.children[0].checked = true
      })
    } else {
      document.getElementById('multicopy-btn').disabled = true
      Array.from(document.getElementsByClassName('acc-item-checkbox')).forEach(e => {
        e.style.display = 'none'
        e.children[0].checked = false
      })
    }
  })
  //Checkbox logic 
  document.querySelectorAll('.acc-checkbox').forEach(e => {
    e.addEventListener('click', function (event) {
      if (document.getElementById('main-checkbox').checked == true)
        document.getElementById('main-checkbox').checked = false
      if (e.checked == false) checkboxcount()
      allcheckboxes()
    })
  })
  document.querySelectorAll('.acc-item').forEach(e => {
    e.addEventListener('dblclick', function (event) {
      if (event.target.classList.contains('acc-item')) {
        if (event.target.children[0].children[0].checked == true) {
          document.getElementById('main-checkbox').checked == false
          document.getElementById('multicopy-btn').disabled = true
          event.target.children[0].children[0].checked = false
          checkboxcount()
          allcheckboxes()
        } else {
          document.getElementById('multicopy-btn').disabled = false
          document.querySelectorAll('.acc-item-checkbox').forEach(el => {
            el.style.display = 'block'
          })
          event.target.children[0].children[0].checked = true
          allcheckboxes()
          checkboxcount()
        }
      }
    })
  })

  /*===============================================================================
  ==============================| КНОПКИ НА СТРНИЦЕ |==============================
  =================================================================================*/
  //Скрытие\показ фильтров
  document.getElementById('funnel-full').addEventListener('click', function () {
    if (document.getElementById('funnel').classList.contains('funnel-mini')) {
      document.getElementById('funnel').classList.remove('funnel-mini')
      document.getElementById('filter').style.display = 'flex'
    } else {
      document.getElementById('funnel').classList.add('funnel-mini')
      document.getElementById('filter').style.display = 'none'
    }
  })
  //Скачивание файлов
  document.getElementById('download-btn').addEventListener('click', function () {
    let ids = []
    document.querySelectorAll('.acc-checkbox').forEach(e => {
      if (e.checked == true)
        ids.push(e.parentNode.parentNode.children[3].children[0].textContent.substr(7) + ':' + e.parentNode.parentNode.children[3].children[2].textContent.substr(10))
    })
    $.post("https://" + location.host + "/download", {
      data: ids
    }, function (data) {
      location.replace('/download')
    })
  })
  //Копирование данных
  document.getElementById('multicopy-btn').addEventListener('click', function () {
    let str = ''
    document.querySelectorAll('.acc-checkbox').forEach(e => {
      if (e.checked == true)
        str += e.parentNode.parentNode.children[3].children[0].textContent.substr(7) + ':' + e.parentNode.parentNode.children[3].children[2].textContent.substr(10) + '\n'
    })
    Copy(str, {
      header: 'Успешно',
      body: 'Данные успешно скопированы!'
    })
  })

})