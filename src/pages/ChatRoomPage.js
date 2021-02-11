import React, { Component } from 'react';
import {
    createMessageRoom,
    getAllMessageRoomBySenderAndReceiver
} from "../requests";
import {
    message
} from "antd"

class ChatRoomPage extends Component {

    async componentDidMount() {
        const {senderID, receiverID} = this.props.match.params;

        const getAllMessageRoomBySenderAndReceiverData = await getAllMessageRoomBySenderAndReceiver(senderID, receiverID);

        if (getAllMessageRoomBySenderAndReceiverData.data) {
            return this.props.history.push("/chat");
        }

        const createMessageRoomData =  await createMessageRoom(senderID, receiverID);

        if (createMessageRoomData.success) {
            return this.props.history.push("/chat");
        }

        message.error("Something went wrong while trying to create a message room");
        setTimeout(() => {
            return this.props.history.push("/");
        }, 1500)
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default ChatRoomPage;
