// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { Grid, GridColumn as Column, Button, Message, Form } from 'semantic-ui-react';
import web3 from '../../ethereum/web3'

// IMPORT PROJECT REFERENCES
import spaceLand from '../../ethereum/spaceLand';

// STATICS
const STATIC_MAXIMUM = 10;
const STATIC_CLICKED_CLASS = 'gridItemClicked';
const STATIC_SINGLE_LAND_PRICE = web3.utils.toWei('0.1', 'ether');

// COMPONENT
class LandPicker extends Component {

    state = {
        lands: [],
        clickedIds: [],
        occupiedIds: [],
        errorMessage: '',
        loading: false
    };

    componentDidMount() {
        this.fillLands();
    }

    fillLands() {
        spaceLand.allLands()
            .then((result) => {
                let landsArray = Array(160).fill({ available: true });
                let occupiedIds = result.map((id) => {
                    return id.toNumber();
                });
                occupiedIds.forEach((occupiedLandId) => {
                    landsArray[occupiedLandId] = { available: false };
                });
                this.setState({
                    lands: landsArray
                })
                console.log('SPACE_YEOMAN::', 'Alredy occupied land ids:', occupiedIds);
            });
    }

    onClickLand(id, target) {
        const classList = target.classList;
        if (classList.contains(STATIC_CLICKED_CLASS)) {
            this.setState(
                prevState => ({ clickedIds: prevState.clickedIds.filter(e => e !== id) }),
                () => { this.logSelectedIds(this.state.clickedIds) }
            );
            target.classList.remove(STATIC_CLICKED_CLASS);
        } else {
            if (this.state.clickedIds.length == STATIC_MAXIMUM) {
                console.log('SPACE_YEOMAN::', 'Maximum clicked lands already reached', STATIC_MAXIMUM);
                return
            }
            this.setState(
                { clickedIds: [...this.state.clickedIds, id] },
                () => { this.logSelectedIds(this.state.clickedIds) }
            );
            target.classList.add(STATIC_CLICKED_CLASS);
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
    
        try {
            await this.validate();
            
            let accounts = await web3.eth.getAccounts();
            let idsToBuy = this.state.clickedIds;
            if (idsToBuy.length == 1) {
                await spaceLand.buy(
                    idsToBuy[0],
                    { value: STATIC_SINGLE_LAND_PRICE, from: accounts[0] });
            } else if (idsToBuy.length > 1) {
                let landsCount = idsToBuy.length;
                await spaceLand.buyMany(
                    idsToBuy, 
                    { value: landsCount * STATIC_SINGLE_LAND_PRICE, from: accounts[0] });
            }
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }

        this.fillLands();
        this.setState({
            loading: false,
            clickedIds: []
        });
    }

    validate = async () => {
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
        if (accounts[0] === undefined) {
            throw { message: 'Please unlock your account first.' }
        }
        if (this.state.clickedIds.length == 0) {
            throw { message: 'Please choose minimum one area to buy.' }
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                
                <Message error header="Oops!" content={this.state.errorMessage} style={{ marginTop: 15}}/>
                
                <div className='landGrid'>
                    <Grid columns={16} padded >
                        {this.state.lands.map((land, idx) =>
                            <Column
                                key={idx}
                                className='gridItem'
                                color={ !land.available ? 'gridItemOccupied' : undefined }
                                onClick={ land.available ? (e) => this.onClickLand(idx, e.target) : undefined }
                            >
                                {idx}
                            </Column>
                        )}
                    </Grid>
                </div>
                
                <div style={{ marginTop: 15}}>
                    <div>
                        <div style={{ float: 'left' }}>
                            <Message error header="Oops!" content={this.state.errorMessage} />
                        </div>
                        <div style={{ float: 'right' }}>
                            <Button secondary>Cancel</Button>
                            <Button primary loading={this.state.loading}>Buy</Button>
                        </div>
                        <div className='clear'/>
                    </div>
                </div>
            </Form>
        );
    }

    logSelectedIds(ids) {
        console.log('SPACE_YEOMAN::','Selected ids:', ids)
    }
}

export { LandPicker };