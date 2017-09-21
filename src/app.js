function api(method,params) {
    return new Promise((resolve , reject) =>{
        VK.api(method,params,data=>{
            if(data.error){
                reject(new Error(data.error.error_msg));
            }else {
                resolve(data.response);

            }
        });
    })

}

const promise = new Promise((resolve, reject) =>{
    VK.init({
        apiId:6191526
        });

    VK.Auth.login(data=>{
        if(data.session){
            resolve(data);
        }else {
            reject(new Error('Не удалось авторизоваться'))
        }
    },8);
});

promise
    .then(()=>{
        return api('users.get',{v: 5.68, name_case:'gen'});
    })
    .then(data =>{
        const [user] = data;
    //    headerInfo.innerText = `${user.first_name} ${user.last_name}`;

        return api ('friends.get',{v:5.68,fields:'first_name, last_name, photo_100 , id'})
    })
    .then(data=>{
        const templateElement = document.querySelector('#user-template');
        const source = templateElement.innerHTML,
            templateFn = Handlebars.compile(source),
            template = templateFn({list: data.items});
        return results.innerHTML = template;

    })
   /* .then(()=>{
        var cols = document.querySelectorAll('.draggable-div');
        [].forEach.call(cols, function(col) {
            col.addEventListener('dragstart', handleDragStart, false);
            col.addEventListener('dragover', handleDragOver, false);
            col.addEventListener('drop', handleDrop, false);
        });
    })
*/
   /*.then(()=>{
    function dragDrop(ev) {
    var data = ev.dataTransfer.getData("Text");
    var enemNode = document.querySelectorAll(' draggable-div');
    var elem = document.querySelector('.draggable-div');

    this.addEventListener('mouseup',function (e) {
    if( e.target !== enemNode ){
    ev.stopPropagation();
    }
    ev.target.appendChild(document.getElementById(data));
    })



    return false;
    }
    })*/


    .catch(function (e) {
        alert('Ошибка:' + e.message);

    });

////////////////////////////////////////
////////////////////////////////////////
////////////draganddrop/////////////////
////////////////////////////////////////
////////////////////////////////////////
function dragStart(ev) {
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target,150,30);
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
    return false;
}
function dragDropBack (ev) {
    var data = ev.dataTransfer.getData("Text");
    var elemResult = document.querySelector('.app__choose_result');

    if(ev.target.classList.contains("app__choose_users")){
        elemResult.appendChild(document.getElementById(data))
            }


    elemResult.appendChild(document.getElementById(data));
    ev.stopPropagation();
    return true;
}
