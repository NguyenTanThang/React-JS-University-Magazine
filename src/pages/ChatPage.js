import React, { Component } from 'react';
import {
    ChatRoom,
    ChatSidebar
} from "../components/Chat";
import {
    Navbar
} from "../components/Partial";
import {
    getAllMessageRoomsByUserID,
    getAllMessagesByRoomID
} from "../requests";
import {
    authenticationService
} from "../_services";
import {
    Spin
} from "antd";

class ChatPage extends Component {

    state = {
        messageRooms: [],
        currentIndex: 0,
        messagesList: [],
        loading: true
    }

    changeCurrentIndex = (currentIndex) => {
        this.setState({
            currentIndex
        })
    }

    addNewMessage = (message) => {
        console.log("message");
        console.log(message);
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
        const messageRoomData = await getAllMessageRoomsByUserID(authenticationService.currentUserValue._id);
        messageRooms = messageRoomData.data;
        for (let i = 0; i < messageRooms.length; i++) {
            const messageRoom = messageRooms[i];
            const messagesData = await getAllMessagesByRoomID(messageRoom._id);
            messagesList.push(messagesData.data)
        }
        this.setState({
            messageRooms,
            messagesList,
            loading: false
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
        const {messageRooms, currentIndex, loading} = this.state;

        if (loading) {
            return (
                <>
                    <Navbar/>
                    <main>
                        <div className="chat-page loading">
                            <Spin tip="Loading...">
                            </Spin>
                        </div>
                    </main>
                </>
                
            );
        }

        return (
            <>
                <Navbar/>
                <main>
                    <div className="chat-page">
                        <ChatSidebar messageRooms={messageRooms} changeCurrentIndex={changeCurrentIndex} currentIndex={currentIndex}/>
                        <div className="chat__room">
                            {renderChatRooms()}
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default ChatPage;
