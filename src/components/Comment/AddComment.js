import React, {Component} from "react";
import { Comment, Form, Button, Input } from 'antd';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

export default class AddComment extends Component {
    state = {
        submitting: false,
    content: '',
  };

  handleSubmit = async () => {
      try {
          this.setState({
            submitting: true
          })
          const {addComment} = this.props;
          const { content } = this.state;

          const addCommentData = await addComment(content);

          setTimeout(() => {
            this.setState({
                submitting: false,
                content: ""
            })
          }, 2000)
      } catch (error) {
          console.log(error);
      }
  };

  handleChange = e => {
    this.setState({
        content: e.target.value,
    });
  };

  render() {
    const { submitting, content } = this.state;

    return (
      <>
        <Comment
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={content}
            />
          }
        />
      </>
    );
  }
}
