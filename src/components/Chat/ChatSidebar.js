import React, { Component } from 'react';
import {Input} from "reactstrap";
import shortid from "shortid"

class ChatSidebar extends Component {

    renderSidebarChatRoom = () => {
        const {messageRooms, currentIndex, changeCurrentIndex} = this.props;
        
        return messageRooms.map((messageRoom, index) => {
            let isSender = false;
            const activeClass = currentIndex === index ? "active" : "";
            if (messageRoom.sender._id == "600fdd5ee23ff52318455076"){
                isSender = true;
            }

            if (isSender) {
                return (
                    <li key={shortid()} className={`chat-room-item ${activeClass}`} onClick={() => changeCurrentIndex(index)}>
                        <p>
                            {messageRoom.receiver.username}
                            <br/>
                            {messageRoom.receiver.email}
                        </p>
                    </li>
                )
            }
            
            return (
                <li key={shortid()} className={`chat-room-item ${activeClass}`} onClick={() => changeCurrentIndex(index)}>
                    <p>
                        {messageRoom.sender.username}
                        <br/>
                        {messageRoom.sender.email}
                    </p>
                </li>
            )
        })
    }

    render() {
        const {renderSidebarChatRoom} = this;

        return (
            <div className="chat_side-bar">
                <div className="chat-side-bar__search-container">
                    <Input id="name" name="name" placeholder="Search" />
                </div>
                <div className="chat-side-bar__list-container">
                    <ul>
                        {renderSidebarChatRoom()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ChatSidebar;
