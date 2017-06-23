import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import ItemRender from './ItemRender.js'
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  list: {
      flexDirection: 'column',
      //flexWrap: 'wrap',
      backgroundColor: 'orange'
  },
  item: {
      margin: 3,
      width: 150,
      height: 150
  },
  separator:{
    width:width,
    height:1,
    backgroundColor:'white'}
});

export default class ListMovie extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      dataProvider:[]
    };
  }

  render() {
    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.itemRender(rowData)}
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
        enableEmptySections={true}
      />
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return (
      <View style={styles.separator}
      key={rowID}/>
    );
  }
  itemRender (rowData){
    return (
      <TouchableHighlight onPress={() => {
          this.itemCLickHandler(rowData);
        }}>
        <ItemRender dataProvider={rowData} />
      </TouchableHighlight>
    );
  }

  itemCLickHandler(rowData)
  {
    console.log("ListMovie itemClickHandler:"+this.props.itemClickHandler);
    this.props.itemClickHandler(rowData);
  }
  componentWillMount(){
    this.fetchToken();
  }

  getMoviesFromApiAsync() {
    return fetch('https://api.github.com/search/repositories?q=topic:react%20native')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            fullListData: responseJson.items,
            dataSource: this.state.dataSource.cloneWithRows(responseJson.items)
          }
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchToken() {
    const params = {
      client_id: 'qDPlyf_EBtljgqKxPALx6Q', // use your own
      client_secret: 'RlFVBx8XonMjZcNnal3e827ooycXR7Pc4JngdpbM6UmdbW61GEfiss22OMRK0p4M', // use your own
      grant_type: 'client_credentials'
    }

    const request = new Request('https://api.yelp.com/oauth2/token', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      }),
      body: `client_id=${params.client_id}&client_secret=${params.client_secret}&grant_type=${params.grant_type}`
    });

    return fetch(request)
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json);
        this.setState(
          {
            token_type:json.token_type,
            access_token: json.access_token
          }
        );
        this.fetchData();
        return json; // Token
      })
  }

fetchData() {

    const request = new Request('https://api.yelp.com/v3/businesses/search?term=delis&location=San%20Francisco', {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        'Authorization': this.state.token_type + ' ' + this.state.access_token
      })
    });

    return fetch(request)
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log("fetchData Done");
        this.setState(
          {
            fullListData: json.businesses,
            dataSource: this.state.dataSource.cloneWithRows(json.businesses)
          }
        )
        return json; // Token
      })
  }

  searchTextChange(text)
  {
    console.log("filter: "+text);
    var arrFilter;
    if(text == null || text.empty)
    {
      arrFilter = this.state.fullListData.slice(0);
    }
    else {
      arrFilter=[];
      var item;
      var title;
      var desc;
      console.log("fullListData:"+this.state.fullListData.length);
      for(i=0; i < this.state.fullListData.length; i++)
      {
        item = this.state.fullListData[i];
        title = item.title.toLowerCase();
        desc = item.overview.toLowerCase();
        if(title.search(text.toLowerCase()) > -1 || desc.search(text.toLowerCase()) > -1){
          console.log("match item:"+i);
          arrFilter.push(item);
        }
      }

    }
    console.log("arrFilter:"+arrFilter.length);
    this.setState(
      {
        dataSource: this.state.dataSource.cloneWithRows(arrFilter)
      }
    )
  }
}
