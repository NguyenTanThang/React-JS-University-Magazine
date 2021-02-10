import React, { Component } from 'react';
import {Input} from "reactstrap";
import shortid from "shortid";
import {
    authenticationService
} from "../../_services";  

class ChatSidebar extends Component {

    state = {
        search: ""
    }

    renderSidebarChatRoom = () => {
        const {messageRooms, currentIndex, changeCurrentIndex} = this.props;
        let actualMessageRooms = messageRooms;
        const {search} = this.state;

        actualMessageRooms = actualMessageRooms.filter(messageRoom => {
            let isSender = false;
            if (messageRoom.sender._id == authenticationService.currentUserValue._id){
                isSender = true;
            }

            if (isSender) {
                return messageRoom.receiver.username.toLowerCase().includes(search.toLowerCase());
            } 

            return messageRoom.sender.username.toLowerCase().includes(search.toLowerCase());
        })
        
        return actualMessageRooms.map((messageRoom, index) => {
            let isSender = false;
            const activeClass = currentIndex === index ? "active" : "";
            if (messageRoom.sender._id == authenticationService.currentUserValue._id){
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {search} = this.state;
        const {renderSidebarChatRoom, handleChange} = this;

        return (
            <div className="chat_side-bar">
                <div className="chat-side-bar__search-container">
                    <Input id="search" name="search" placeholder="Search" value={search} onChange={handleChange}/>
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
