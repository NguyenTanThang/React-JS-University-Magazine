import { Modal, Button, message } from 'antd';
import React, { Component } from 'react';
import {deleteContribution} from "../../requests"

export default class DeleteContribution extends Component {
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
        const deleteContributionData = await deleteContribution(this.props.recordID);
        this.setState({ loading: false, visible: false });
        if (deleteContributionData.success) {
          this.props.deleteContribution(this.props.recordID);
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
              title="Delete Contribution"
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
