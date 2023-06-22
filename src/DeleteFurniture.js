import React from 'react';
import { get } from "./service/ApiService"

class DeleteFurniture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: {title: "", type: "", userId:"", brand: ""} };
        this.delete = props.delete;
        this.serach = props.search;
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
        const thisItem = this.state.item;
        get("/item", "GET", this.state.item.title).then((response) => {
            const data = response.data['0'];
            thisItem.title = data['title'];
            thisItem.type = data['type'];
            thisItem.brand = data['brand'];
            thisItem.userId = data['userId'];
            this.setState({ item: thisItem });
            console.log(thisItem);
            this.delete(data);
            }
        );
        
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
                    <button style={{marginLeft: '20px', backgroundColor: 'greenyellow', border: "none"}} onClick={this.onButtonClick}> 제품 삭제 </button>
                </div>
            </div>
        )    
    }
}


export default DeleteFurniture;