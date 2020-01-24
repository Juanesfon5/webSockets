const socket = io();

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value +" is typing" )
})

btn.addEventListener('click', () => {
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    })
});

socket.on('chat:message', data =>{
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}<strong>: ${data.message}
    <p>`
})

socket.on('chat:typing', data => {
    actions.innerHTML = `<p><em>${data}<em><p>`
})