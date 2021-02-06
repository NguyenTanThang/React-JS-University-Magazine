import React, { Component } from 'react';
import ChatPlugin from "./ChatPlugin";

export default class ChatRoom extends Component {
    render() {
        const {messageRoom, messages, addNewMessage} = this.props;

        return (
            <ChatPlugin messages={messages} messageRoom={messageRoom} addNewMessage={addNewMessage}/>
        )
    }
}
