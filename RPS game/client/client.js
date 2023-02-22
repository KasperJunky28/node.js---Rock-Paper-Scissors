const writeEvent = (text) =>{
    const parent = document.querySelector('#events');
    const li = document.createElement('li')
    li.innerHTML = text;
    parent.appendChild(li);
}
const onFormSubmitted = (e) =>{
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = " ";
    sock.emit('message',text);
    autoscroll();
}
const addButtonListeners = () =>{
    ['rock','paper','scissors'].forEach((id) =>{
        const button = document.getElementById(id);
        button.addEventListener('click',()=> {
            sock.emit('turn',id);
        })
    })
}

writeEvent('Welcome to Rock, Paper, Scissors');

const sock = io();
sock.on('message',writeEvent);

document
    .querySelector('#chat_form')
    .addEventListener('submit',onFormSubmitted);

addButtonListeners();

const autoscroll = () => {
    const $messages = document.querySelector('#chat')

    const $newMessage = $messages.lastElementChild;
    const newMessageNargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeigh = $newMessage.offsetHeight + newMessageNargin;
    const visibleHeight = $messages.offsetHeight;
    const containerHeight = $messages.scrollHeight;
    const scrollOffset = $messages.scrollTop + visibleHeight;
    if (containerHeight - newMessageHeigh <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }  
};