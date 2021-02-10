import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {deleteTerm} from "../../requests";
import {message} from "antd";

export default class DeleteTerm extends Component {
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
        const deleteTermData = await deleteTerm(this.props.recordID);
        this.setState({ loading: false, visible: false });
        if (deleteTermData.success) {
          window.location.reload(true);
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
              title="Delete Term"
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
