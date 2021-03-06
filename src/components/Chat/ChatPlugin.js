import React, { Component } from 'react';
import ChatBox from 'react-chat-plugin';
import {addMessage} from "../../requests";
import {authenticationService} from "../../_services";
 
export default class ChatPlugin extends Component {

    state = {
        messages: "",
      };

      async componentDidMount() {
          let dataMessages = this.props.messages;

          if (!dataMessages) {
              return;
          } 
          else {
            dataMessages = dataMessages.map(dataMessage => {
                const {author, content, created_date} = dataMessage;
                const {_id, username} = author;
    
                return ({
                  author: {
                    username: username,
                    id: _id,
                    //avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
                  },
                  text: content,
                  type: 'text',
                  timestamp: +new Date(created_date),
                })
              })
    
              this.setState({
                messages: dataMessages
              })
          }
      }
       
      handleOnSendMessage = async (message) => {
        try {
          const {messageRoom, addNewMessage} = this.props;
          const data = await addMessage(messageRoom._id, authenticationService.currentUserValue._id, message);

          console.log("addMessageData");
          console.log(data);

          if (data.success) {
            const newMessage = data.data;
            addNewMessage(newMessage);
            this.setState({
              messages: this.state.messages.concat({
                author: {
                  username: authenticationService.currentUserValue.username,
                  id: authenticationService.currentUserValue._id,
                  //avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
                },
                text: message,
                timestamp: +Date.now(),
                type: 'text',
              }),
            });
          } else {
            alert("Oh something was wrong when trying send your messages");
          }
        } catch (error) {
          console.log(error)
        }
      };

    render() {
        const {messages} = this.state;

        if (!messages) {
          return (<>
              <p>Loading...</p>
            </>)
        }

        return (
            <div className="chat-box">
                <ChatBox
                    messages={messages}
                    userId={authenticationService.currentUserValue._id}
                    onSendMessage={this.handleOnSendMessage}
                    width={'100%'}
                    height={'100%'}
                />
            </div>
        )
    }
}
