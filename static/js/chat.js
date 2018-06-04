
//otocini alanindaki mesaji text_box sakla
var text_box = '<div class="card-panel right" style="width: 75%; position: relative">' +
        '<div style="position: absolute; top: 0; left:3px; font-weight: bolder" class="title">{sender}</div>' +
        '{message}' +
        '</div>';
//bunu uyarladim, her yeni mesaj icin scroll ediyor.
function scrolltoend() {
    $('#board').stop().animate({
        scrollTop: $('#board')[0].scrollHeight
    }, 800);
}
//gonderen + alici + mesaj seklinde
//gonderici / mesaj seklinde olustur gorunumu
function send(sender, receiver, message) {
    $.post('/api/messages', '{"sender": "'+ sender +'", "receiver": "'+ receiver +'","message": "'+ message +'" }', function (data) {
        console.log(data);
        var box = text_box.replace('{sender}', "You");
        box = box.replace('{message}', message);
        $('#board').append(box);
        scrolltoend();
    })
}
//GET ile alma islemi
function receive() {
    $.get('/api/messages/'+ sender_id + '/' + receiver_id, function (data) {
        console.log(data);
        if (data.length !== 0)
        {
            for(var i=0;i<data.length;i++) {
                console.log(data[i]);
                var box = text_box.replace('{sender}', data[i].sender);
                box = box.replace('{message}', data[i].message);
                box = box.replace('right', 'left blue lighten-5');
                $('#board').append(box);
                scrolltoend();
            }
        }
    })
}

//Ajax ile verilere erisme ve viewlari belirleme
//gonderici id ve alici id global variable erismek icin
//Mesajlari islemek icin text_box degiskenimizi kullandik
//1 saniye arayla yeni mesaj var mi diye bakiyoruz.
function register(username, password) {
    $.post('/api/users', '{"username": "'+ username +'", "password": "'+ password +'"}',
        function (data) {
        console.log(data);
        window.location = '/';
        }).fail(function (response) {
            $('#id_username').addClass('invalid');
        })
}