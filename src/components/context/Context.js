import React, { Component } from 'react'

const GeneralContex = React.createContext();

export class GeneralProvider extends Component {

    state = {
        test: 'iam test'
    }

    render() {
        return (
            <GeneralContex.Provider value={this.state}>
                {this.props.children}
            </GeneralContex.Provider>
        )
    }
}

const GeneralConsumer = GeneralContex.Consumer;

export default GeneralConsumer;