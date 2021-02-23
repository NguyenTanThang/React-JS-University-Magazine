import { Modal, Button, message } from 'antd';
import React, { Component } from 'react';
import {deleteFacultyAssignment} from "../../requests";

export default class DeleteFacultyAssignment extends Component {
    state = {
        loading: false,
        visible: false,
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = async () => {
        this.setState({ loading: true });
        const deleteFacultyAssignmentData = await deleteFacultyAssignment(this.props.recordID);
        this.setState({ loading: false, visible: false });
        if (deleteFacultyAssignmentData.success) {
          this.props.deleteFacultyAssignment(this.props.recordID);
        } else {
          message.error("Something gone wrong when trying to delete the record");
        }
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      render() {
        const { visible, loading } = this.state;
        return (
          <>
            <button className="btn btn-danger" onClick={this.showModal}>
            <span className="material-icons">
            delete_forever
          </span>
            </button>
            <Modal
              visible={visible}
              title="Delete Faculty Assignment"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="danger" loading={loading} onClick={this.handleOk}>
                  Delete
                </Button>,
              ]}
            >
              <p>Are you sure? Once deleted the record can never be recovered.</p>
            </Modal>
          </>
        );
      }
}
