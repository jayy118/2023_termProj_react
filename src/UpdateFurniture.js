import React from 'react';
import { get } from "./service/ApiService";

class UpdateFurniture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: {title: "", type: "", userId:"", brand: ""} };
        this.update = props.update;
        this.search = props.search;
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

    onSearchButtonClick = () => {
        const thisItem = this.state.item;
        get("/item", "GET", this.state.item.title).then((response) => {
            const data = response.data['0'];
            thisItem.title = data['title'];
            thisItem.type = data['type'];
            thisItem.brand = data['brand'];
            thisItem.userId = data['userId'];
            thisItem.id = data['id'];
            this.setState({ item: thisItem });
            }
        );
    }

    onButtonClick = () => {
        this.update(this.state.item);

        this.setState({ item: {title: "", type: "", userId:"", brand: ""}});
    }

    render() {
        return (
            <div style={{margin: "20px", paddingTop: "20px", paddingBottom: "20px", border: "1px solid"}} hidden={this.props.value !== this.props.index}>
                <div style={{ marginBottom: "10px"}}>
                    <p style={{display: "inline", marginRight: "10px"}}>title: </p>
                    <input
                        id='title'
                        type='text'
                        fullWidth
                        onChange={this.onTitleInputChange}
                        value={this.state.item.title} 
                    />
                    <button style={{marginLeft: '20px', backgroundColor: 'greenyellow', border: "none"}} onClick={this.onSearchButtonClick}> 제품 검색 </button>
                </div>
                <div style={{ marginBottom: "10px"}}>
                    <p style={{display: "inline", marginRight: "10px"}}>type: </p>
                    <input
                        id='type'
                        type='text'
                        fullWidth
                        onChange={this.onTypeInputChange}
                        value={this.state.item.type} 
                    />
                </div>
                <div style={{ marginBottom: "10px"}}>
                    <p style={{display: "inline", marginRight: "10px"}}>brand: </p>
                    <input
                        id='brand'
                        type='text'
                        fullWidth
                        onChange={this.onBrandInputChange}
                        value={this.state.item.brand} 
                    />
                </div>
                <div>
                    <p style={{display: "inline", marginRight: "10px"}}>userId: </p>
                    <input
                        id='userId'
                        type='text'
                        fullWidth
                        onChange={this.onuserIdInputChange}
                        value={this.state.item.userId} 
                    />
                    <button style={{marginLeft: '20px', backgroundColor: 'greenyellow', border: "none"}} onClick={this.onButtonClick}> 제품 수정 </button>
                </div>
            </div>
        )    
    }
}


export default UpdateFurniture;