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

        return api ('friends.get',{v:5.68,fields:'first_name, last_name, photo_100'})
    })
    .then(data=>{
        const templateElement = document.querySelector('#user-template');
        const source = templateElement.innerHTML,
            templateFn = Handlebars.compile(source),
            template = templateFn({list: data.items});

        results.innerHTML = template;
    })
    .catch(function (e) {
        alert('Ошибка:' + e.message);

    });

