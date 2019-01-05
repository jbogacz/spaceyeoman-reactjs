// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'

// IMPORT PROJECT REFERENCES
import spaceLand from '../../ethereum/spaceLand';

export default class EditModal extends Component {

    state = {
        landId: this.props.landId,
        landName: '',
        description: '',
        modalOpen: false
    };

    updateToContract = async () => {
        console.log('SPACE_YEOMAN::','Update data for landId:', this.state.landId);
        let accounts = await web3.eth.getAccounts();
        spaceLand.setDetails(
            this.state.landId,
            this.state.landName,
            this.state.description,
            { from: accounts[0] }
        )
    }

    retrieveFromContract() {
        console.log('SPACE_YEOMAN::','Retrieve data for landId:', this.state.landId);
        spaceLand.getDetails(this.state.landId)
            .then((result) => {
                this.setState({
                    landName: result[1],
                    description: result[2]
                });
            });

    }

    handleOpen = () => {
        this.retrieveFromContract();
        this.setState({ modalOpen: true });
    }

    render() {
        return (
            <Modal 
                size='tiny' 
                centered={false}
                trigger={<Button onClick={this.handleOpen} basic color='blue'>Edit</Button>}
                onClose={this.handleClose}
                open={this.state.modalOpen}
            >
                <Modal.Header>Customize your land</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Land name</label>
                            <input 
                                placeholder='Land name' 
                                value={this.state.landName} 
                                onChange={event => 
                                    this.setState({ landName: event.target.value })
                                }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input 
                                placeholder='Description' 
                                value={this.state.description}
                                onChange={event => 
                                    this.setState({ description: event.target.value })
                                }/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.handleClose}>Cancel</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Update' onClick={this.updateToContract}/>
                </Modal.Actions>
            </Modal>
        )
    }

    handleClose = () => this.setState({ modalOpen: false })
}