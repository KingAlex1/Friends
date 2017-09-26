function api(method, params) {
    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    })
}
const promise = new Promise((resolve, reject) => {
    VK.init({
        apiId: 6191526
    });
    VK.Auth.login(data => {
        if (data.session) {
            resolve(data);
        } else {
            reject(new Error('Не удалось авторизоваться'))
        }
    }, 8);
});
promise
    .then(() => {
        return api('users.get', {v: 5.68, name_case: 'gen'});
    })
    .then(data => {
        const [user] = data;
        return api('friends.get', {v: 5.68, fields: 'first_name, last_name, photo_100 , id'})
    })
    .then(data => {
        const templateElement = document.querySelector('#user-template');
        const source = templateElement.innerHTML,
            templateFn = Handlebars.compile(source),
            template = templateFn({list: data.items});
        return results.innerHTML = template;
    })
    .then(()=>{

            if (localStorage.storage) {
                document.querySelector(".app__choose").innerHTML = localStorage.storage;

            }


    })
    .catch(function (e) {
        alert('Ошибка:' + e.message);
    });

////////////draganddrop/////////////////


window.addEventListener('load',function () {

    if (localStorage.storage) {
        document.querySelector(".app__choose").innerHTML = localStorage.storage;

    }
});


function dragStart(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target, 150, 30);
    return true;
}
function dragEnter(ev) {
    ev.preventDefault();
    return true;
}
function dragOver(ev) {
    ev.preventDefault();
}
function dragDrop(ev) {
    var data = ev.dataTransfer.getData("Text");
    var elem = document.querySelector('.app__choose_friend-list');
    elem.appendChild(document.getElementById(data));
    ev.stopPropagation();
    var idData = document.getElementById(data);
    var dataDel = idData.querySelector('span');
    dataDel.classList.remove('glyphicon-plus');
    dataDel.classList.add('glyphicon-remove');
    textSecond.value="";
    return false;
}
function dragDropBack(ev) {
    var data = ev.dataTransfer.getData("Text");
    var elemResult = document.querySelector('.app__choose_result');
    if (ev.target.classList.contains("app__choose_users")) {
        elemResult.appendChild(document.getElementById(data));
    }
    elemResult.appendChild(document.getElementById(data));
    ev.stopPropagation();
    var idData = document.getElementById(data);
    var dataDel = idData.querySelector('span');
    dataDel.classList.remove('glyphicon-remove');
    dataDel.classList.add('glyphicon-plus');
    textFirst.value = "" ;
    return true;

}
//// нажимаем на плюсик и переносим в левую часть и наоборот , плюс меняем плюсик на крестик.


document.body.addEventListener("mousedown", function (e) {
    var toRight = document.querySelector('.app__choose_friend-list');
    var toLeft = document.querySelector('.app__choose_result');
    if (1 == e.which) {

        if (e.target.classList.contains('glyphicon-plus')) {
            e.target.classList.remove('glyphicon-plus');
            e.target.classList.add('glyphicon-remove');
            var current = e.target.parentNode.parentNode;
            toRight.appendChild(current);


        } else if (e.target.classList.contains('glyphicon-remove')) {
            e.target.classList.remove('glyphicon-remove');
            e.target.classList.add('glyphicon-plus');
            var current = e.target.parentNode.parentNode;
            toLeft.appendChild(current);
        }


    }
});

//////// Выбор Друга из списка  .

var textFirst = document.querySelector('#textFirst');
var textSecond = document.querySelector('#textSecond');


textFirst.addEventListener('click', function () {
    textFirst.value = "";
});

textSecond.addEventListener('click', function () {
    textSecond.value = "";
});

function search(inVal, desk) {
    var look = inVal.value.toLowerCase();
    for (var i = 0; i < desk.length; i++) {
        if (look === desk[i].querySelector(".app__choose_names").innerText.toLowerCase().slice(0, look.length)){
            desk[i].style.display = "flex";
        }
        else if (look === desk[i].querySelector(".app__choose_names").innerText.toLowerCase().split(" ").reverse().join("").slice(0, look.length)){
            desk[i].style.display = "flex";
        }
        else desk[i].style.display = "none"
    }
}

textFirst.addEventListener('input', function () {
    var deskLeft = document.querySelectorAll('#dnd .app__choose_users');
    search(textFirst, deskLeft);
});

textSecond.addEventListener('input', function () {
    var deskRight = document.querySelectorAll('#big .app__choose_users');
    search(textSecond, deskRight);
});
var save = document.querySelector("#button_save");
save.addEventListener("click", function() {

    var storage = document.querySelector(".app__choose").innerHTML;
    localStorage.storage = storage ;
});


