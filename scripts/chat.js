
class Chat {
    constructor(username, room){
        this.username = username;
        this.room = room;
        this.chat = db.collection('chat');
        this.unsubscrybe;
    }

    async addChat(message){
        const current_time = new Date();
        const data = {
            message: message, 
            username: this.username, 
            room: this.room, 
            created_at: firebase.firestore.Timestamp.fromDate(current_time)
        }
        const response = await this.chat.add(data)
        console.log(response)
    }

    getChats(callback){
         this.unsubscrybe = this.chat
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type === 'added'){
                    //update ui
                    callback(change.doc.data())
                }
            })
        })
    }
    updateUsername(username){
        this.username = username;
        console.log('username was changed to ' + this.username)
        localStorage.setItem('username', username);
    }

    updateRoom(room){
        this.room = room;
        this.unsubscrybe();
        console.log('room was change to ' + this.room)
    }
}

// const fresh = new Chat('emeka', 'gaming');
// fresh.getChats((data) => {
//     console.log(data)
// })

// setTimeout(() => {
//     fresh.updateUsername('lynda');
//     fresh.updateRoom('general');
//     fresh.getChats((data) => {
//         console.log(data)
//     })
//     fresh.addChat('Welcome to this new chat boys')
// }, 3000);