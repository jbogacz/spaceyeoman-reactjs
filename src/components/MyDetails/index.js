import React, { Component } from 'react';
import { Button, Segment, Card, Icon } from 'semantic-ui-react';
import web3 from '../../ethereum/web3'
import spaceLand from '../../ethereum/spaceLand';

// IMPORT PROJECT REFERENCES
import EditModal from './edit_modal'

// COMPONENT
class MyDetails extends Component {

    state = {
        account: '',
        landIds: []
    };

    componentDidMount() {
        web3.eth.getAccounts()
            .then(accounts => {
                this.setState({ account: accounts[0] })
                return accounts[0]; 
            })
            .then(account => {
                return spaceLand.ownedLands({ from: account });
            })
            .then(bigNumberArray => {
                let ownedLands = bigNumberArray.map((id) => {
                    return id.toNumber();
                });
                this.setState({ landIds: ownedLands });
            });
    }

    render() {
        return (
            <div>
                <Segment>
                    <Card.Group itemsPerRow={4}>
                        {this.state.landIds.map(landId => {
                            return this.renderLandCard(landId);
                        })}
                    </Card.Group>
                </Segment>
            </div>
        );
    }

    renderLandCard(landId) {
        return (
            <Card key={landId}>
                <Card.Content>
                    <Icon name='home' className='right floated'></Icon>
                    <Card.Header>ID: {landId}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                            Details
                        </Button>
                        <EditModal landId={landId} />
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export { MyDetails };