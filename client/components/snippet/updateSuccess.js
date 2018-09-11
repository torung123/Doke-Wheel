import React, { Component } from 'react';

class updateSuccess extends Component {
    render() {
        return (
            <div className="success__alert">{ this.props.messageUpdate }</div>
        );
    }
}

export default updateSuccess;