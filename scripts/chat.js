
class Chat {
    constructor(username, room){
        this.username = username;
        this.room = room;
        this.chat = db.collection('chat')
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
        this.chat
        .where('room', '==', 'general')
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
}

const fresh = new Chat('emeka', 'gaming');
fresh.getChats((data) => {
    console.log(data)
})
fresh.addChat('Welcome to this eloquent room guys')