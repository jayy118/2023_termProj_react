import React from 'react';
import './App.css';
import AddFurniture from './AddFurniture'
import SearchFurniture from './SearchFurniture'
import DeleteFurniture from './DeleteFurniture';
import UpdateFurniture from './UpdateFurniture';
import { call, get } from "./service/ApiService"
import { Container} from "@material-ui/core";
import FurnitureRow from './FurnitureRow';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [ ],
      loading: true,
    };
    this.data = [ ]
  }

  add = (item) => {
    call("/item", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  search = (title) => {
    get("/item", "GET", title).then((response) => {
      this.setState({ items: response.data});
    }
    );
  };

  delete = (item) => {
    call("/item", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  update = (item) => {
    call("/item", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  componentDidMount() {
    call("/item/list", "GET", null).then((response) =>
      this.setState({items: response.data})
    );
  }

  render() {
    var furnitureItems = this.state.items.length > 0 && (
      <table style={{ border: "1px solid"}} width={700}>
        <caption>Furniture item table</caption>
        <thead>
          <tr>
            <th style={{ border: "1px solid" }}>id</th>
            <th style={{ border: "1px solid" }}>title</th>
            <th style={{ border: "1px solid" }}>type</th>
            <th style={{ border: "1px solid" }}>brand</th>
            <th style={{ border: "1px solid" }}>userId</th>
            <th style={{ border: "1px solid" }}>삭제 버튼</th>
          </tr>
        </thead>
        <tbody style={{align: 'center'}}>
          {this.state.items.map((item, idx) => (
            <FurnitureRow 
            item={item} 
            key={item.id} 
            delete={this.delete} 
            />
          ))}
        </tbody>
      </table>
    );

    var funitureListPage = (
      <div>
        <Container maxWidth="md">
          <AddFurniture add={this.add} />
          <SearchFurniture search={this.search} print={this.componentDidMount} />
          <UpdateFurniture update={this.update} search={this.search} />
          <DeleteFurniture delete={this.delete} search={this.search} print={this.componentDidMount} />
          <div className="FurnitureList">{furnitureItems}</div>
        </Container>
      </div>
    );

    var content = funitureListPage;
    
if(!this.state.loading) {
  content = funitureListPage;
}

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
