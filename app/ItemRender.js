import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    height:24
  },
  description: {
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
    marginTop: 5,
    height:70
  },
});
export default class ItemRender extends View {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: props.dataProvider
    };
  }
  prefix = 'https://image.tmdb.org/t/p/w342';
  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={{width:width, height:118, flexDirection:'row'}}>
          <Image
            style={{width:75, height:106, marginLeft:10, marginTop:5}}
            source={{uri:this.state.dataProvider.image_url}}>
          </Image>
          <View style={{width:width - 95, height:118, flexDirection:'column', marginLeft:10, marginTop:5}}>
            <Text
              style={styles.title}
              ellipsizeMode='tail'
              numberOfLines={1}>
              {this.state.dataProvider.name}
            </Text>
            <Text
              style={styles.description}
              ellipsizeMode='tail'
              numberOfLines={5}>
              {this.state.dataProvider.rating}
            </Text>
          </View>
      </View>
    )
  }
}
