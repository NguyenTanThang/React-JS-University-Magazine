import React, { Component } from 'react';
import {
    ChatRoom,
    ChatSidebar
} from "../components/Chat";
import {
    getAllMessageRoomsByUserID,
    getAllMessagesByRoomID
} from "../requests";

class ChatPage extends Component {

    state = {
        messageRooms: [],
        currentIndex: 0,
        messagesList: []
    }

    changeCurrentIndex = (currentIndex) => {
        this.setState({
            currentIndex
        })
    }

    addNewMessage = (message) => {
        let {messagesList, currentIndex} = this.state;
        for (let i = 0; i < messagesList.length; i++) {
            if (i === currentIndex) {
                let messagesItem = messagesList[i];
                messagesItem = [...messagesItem, message];
                messagesList.splice(currentIndex, 1, messagesItem);
            }
        }
        this.setState({
            messagesList 
        }, () => {
            console.log(this.state)
        })
    }

    async componentDidMount() {
        let messageRooms = [];
        let messagesList = [];
        const messageRoomData = await getAllMessageRoomsByUserID("600fdd5ee23ff52318455076");
        messageRooms = messageRoomData.data;
        for (let i = 0; i < messageRooms.length; i++) {
            const messageRoom = messageRooms[i];
            const messagesData = await getAllMessagesByRoomID(messageRoom._id);
            messagesList.push(messagesData.data)
        }
        this.setState({
            messageRooms,
            messagesList
        }, () => {
            console.log(this.state)
        })
    }

    renderChatRooms = () => {
        const {messageRooms, currentIndex, messagesList} = this.state;
        const {addNewMessage} = this;
        return messageRooms.map((messageRoom, index) => {
            if (index === currentIndex) {
                return (
                    <ChatRoom key={messageRoom._id} messageRoom={messageRoom} messages={messagesList[index]} addNewMessage={addNewMessage}/>
                )
            }
            return (<></>)
        })  
    }

    render() {
        const {changeCurrentIndex, renderChatRooms} = this;
        const {messageRooms, currentIndex} = this.state;

        console.log(messageRooms)

        return (
            <div className="chat-page">
                <ChatSidebar messageRooms={messageRooms} changeCurrentIndex={changeCurrentIndex} currentIndex={currentIndex}/>
                <div className="chat__room">
                    {renderChatRooms()}
                </div>
            </div>
        )
    }
}

export default ChatPage;
