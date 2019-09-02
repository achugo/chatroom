class chatUI{
    constructor(chatList){
        this.chatList = chatList;
    }
    
    clear(){
        this.chatList.innerHTML = ""
    }
        
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(), 
            { addSuffix: true }
        )
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;

        this.chatList.innerHTML += html
    }
}