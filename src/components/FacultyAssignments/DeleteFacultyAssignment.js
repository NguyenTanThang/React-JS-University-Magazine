import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {deleteFacultyAssignment} from "../../requests"

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
        await deleteFacultyAssignment(this.props.recordID);
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          window.location.reload(true);
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      render() {
        const { visible, loading } = this.state;
        return (
          <>
            <button className="btn btn-danger" onClick={this.showModal}>
                <i className="fas fa-trash" aria-hidden="true"></i>
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
