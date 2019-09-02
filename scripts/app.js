//get reference to dom elements
const list = document.querySelector('.chat-list')
const chatMessage = document.querySelector('.new-chat');
const updateName = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const updateRoom = document.querySelector('.chat-rooms')


//Add new message
chatMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatMessage.message.value.trim()
    chat.addChat(message)
        .then(() => chatMessage.reset())
        .catch(err => console.log(err))
})

//update the username
updateName.addEventListener('submit', (event) => {
    event.preventDefault();
    const updatedName = updateName.name.value.trim()
    chat.updateUsername(updatedName)
    updateMsg.textContent = `username change to ${updatedName}`;
    setTimeout(() => {
        updateMsg.textContent = ''
        updateName.reset()
    }, 3000);

})

//update the room 
updateRoom.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){
        chatUi.clear()
        chat.updateRoom(e.target.getAttribute('id'))
        chat.getChats((data) => {
            chatUi.render(data);
            console.log(data)
        })
        
    }
})


const chatUi = new chatUI(list);

const storedUser = localStorage.username ? localStorage.username : 'anonymous';

const chat = new Chat(storedUser, 'gaming');



//renders chat to the ui
chat.getChats((data) => {
    chatUi.render(data);
})