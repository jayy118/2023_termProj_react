import React from 'react';

class FurnitureRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item };
        this.delete = props.delete;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item)
    }

    render() {
        const item = this.state.item;
        return (
                <tr>
                    <td style={{ border: "1px solid" }}>{item.id}</td>
                    <td style={{ border: "1px solid" }}>{item.title}</td>
                    <td style={{ border: "1px solid" }}>{item.type}</td>
                    <td style={{ border: "1px solid" }}>{item.brand}</td>
                    <td style={{ border: "1px solid" }}>JaeHyunLee</td>
                    <td style={{ border: "1px solid" }}>
                        <button onClick={this.deleteEventHandler}>delete</button>
                    </td>
                </tr>
            
        );
    }
}

export default FurnitureRow;