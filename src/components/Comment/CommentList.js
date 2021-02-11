import React, { Component } from 'react'
import { Comment, Tooltip, List, message } from 'antd';
import {parseDateMoment} from "../../utils";
import {createComment} from "../../requests";
import AddComment from "./AddComment";
import {authenticationService} from "../../_services";

class CommentList extends Component {

    state = {
        commentsData: []
    }

    componentDidMount() {
        const {comments} = this.props;
        
        let commentsData = comments.map(comment => {
            return {
                //actions: [],
                author: comment.user.username,
                avatar: '',
                content: (
                <p>
                    {comment.content}
                </p>
                ),
                datetime: (
                <Tooltip title={parseDateMoment(comment.created_date)}>
                    <span>
                        {parseDateMoment(comment.created_date)}
                    </span>
                </Tooltip>
                ),
            }
        })

        this.setState({
            commentsData
        })
    }

    addComment = async (content) => {
        try {
            const currentUser = authenticationService.currentUserValue;
            const {contributionID} = this.props;

            const createCommentData = await createComment({
                content, contribution: contributionID, user: currentUser._id
            });

            if (createCommentData.success) {
                const comment = createCommentData.data;

                message.success(createCommentData.message);

                let commentsData = [
                    ...this.state.commentsData,
                    {
                        //actions: [],
                        author: comment.user.username,
                        avatar: '',
                        content: (
                        <p>
                            {comment.content}
                        </p>
                        ),
                        datetime: (
                        <Tooltip title={parseDateMoment(comment.created_date)}>
                            <span>
                                {parseDateMoment(comment.created_date)}
                            </span>
                        </Tooltip>
                        ),
                    }
                ]

                return this.setState({
                    commentsData
                })
            }

            message.error(createCommentData.message);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {commentsData} = this.state;
        const {addComment} = this;

        return (
            <div>
                <AddComment addComment={addComment}/>
                <List
                className="comment-list"
                header={`${commentsData.length} comments`}
                itemLayout="horizontal"
                dataSource={commentsData}
                renderItem={comment => (
                    <li>
                        <Comment
                        author={comment.author}
                        content={comment.content}
                        datetime={comment.datetime}
                        avatar={comment.avatar}
                        />
                    </li>
                    )}
                />
            </div>
        )
    }
}

export default CommentList;