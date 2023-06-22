import React from 'react';

class AddFurniture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: {title: "", type: "", userId:"", brand: ""} };
        this.add = props.add;
    }

    onTitleInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onTypeInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.type = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onBrandInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.brand = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onuserIdInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.userId = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    onButtonClick = () => {
        this.add(this.state.item);
        this.setState({ item: {title: "", type: "", userId:"", brand: ""}});
    }

    enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            this.onButtonClick();
        }
    }

    render() {
        return (
            <div style={{margin: "20px", paddingTop: "20px", paddingBottom: "20px", border: "1px solid"}} hidden={this.props.value !== this.props.index}>
                <div style={{ marginBottom: "10px"}}>
                    <p style={{display: "inline", marginRight: "10px"}}>title: </p>
                    <input
                        id='title'
                        type='text'
                        onChange={this.onTitleInputChange}
                        value={this.state.item.title} 
                    />
                </div>
                <div style={{ marginBottom: "10px"}}>
                    <p style={{display: "inline", marginRight: "10px"}}>type: </p>
                    <input
                        id='type'
                        type='text'
                        onChange={this.onTypeInputChange}
                        value={this.state.item.type} 
                    />
                </div>
                <div style={{ marginBottom: "10px"}}>
                    <p style={{display: "inline", marginRight: "10px"}}>brand: </p>
                    <input
                        id='brand'
                        type='text'
                        onChange={this.onBrandInputChange}
                        value={this.state.item.brand} 
                    />
                </div>
                <div>
                    <p style={{display: "inline", marginRight: "10px"}}>userId: </p>
                    <input
                        id='userId'
                        type='text'
                        onChange={this.onuserIdInputChange}
                        value={this.state.item.userId} 
                    />
                    <button style={{marginLeft: '20px', backgroundColor: 'greenyellow', border: "none"}} onClick={this.onButtonClick}> 제품 추가 </button>
                </div>
            </div>
        )    
    }
}


export default AddFurniture;