import React from 'react';
import './App.css';
import AddFurniture from './AddFurniture'
import SearchFurniture from './SearchFurniture'
import DeleteFurniture from './DeleteFurniture';
import UpdateFurniture from './UpdateFurniture';
import { call, get, signout } from "./service/ApiService"
import {
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Tab,
  Tabs,
  Box,
  colors
} from "@material-ui/core";
import FurnitureRow from './FurnitureRow';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [ ],
      loading: true,
      value: 0,
    };
    this.data = [ ]
  }

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
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
    var furnitureItems = (
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

    var navigationBar = (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">가구 쇼핑몰</Typography>
            </Grid>
            <Tabs value={this.state.value} onChange={this.handleChange} >
                <Tab label="추가" {...this.a11yProps(0)} />
                <Tab label="검색" {...this.a11yProps(1)} />
                <Tab label="수정" {...this.a11yProps(2)} />
                <Tab label="삭제" {...this.a11yProps(4)} />
              </Tabs>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    var funitureListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddFurniture add={this.add} value={this.state.value} index={0} />
          <SearchFurniture search={this.search} print={this.componentDidMount}  value={this.state.value} index={1}/>
          <UpdateFurniture update={this.update} search={this.search}  value={this.state.value} index={2}/>
          <DeleteFurniture delete={this.delete} search={this.search} print={this.componentDidMount}  value={this.state.value} index={3}/>
          <div className="FurnitureList" align="center">{furnitureItems}</div>
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
