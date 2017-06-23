import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions
} from 'react-native';

import ListMovie from '../ListMovie.js';

export default class HomePage extends Component {
    static navigationOptions = {
    title: 'Home',
    headerRight:() => {
        return (
            <Button
            onPress={()=>{this.props.navigation.navigate('Setting')}}></Button>
        );
    }
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return (
       <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
                <View style={{flex:1}}>
                    <Button
                        title='Filter'
                        color='red'
                        onPress={()=>{}}
                    />
                </View>
                <View style={{flex:3, marginLeft:10}}>
                    <TextInput
                        style={{backgroundColor:'white', borderColor: 'gray', borderWidth: 1}}
                        onChangeText={text => this.searchTextChange(text)}
                        placeholder='search'
                        placeholderTextColor='gray'
                        
                    />
                </View>
            </View>

            <View style={{flex: 9, flexDirection: 'column'}}>
                <ListMovie 
                    style={{backgroundColor:'orange'}}    
                    itemClickHandler={this.itemClickHandler}
                    ref={(view) => {this.listMovie = view;}}
                />
            </View>
        </View>
    //   <View stype={{flexDirection: 'column', flex:1}}>
    //     <View stype={{flexDirection: 'row',justifyContent: 'space-between'}}>
    //         <View stype={{width:120, height: 40, backgroundColor: 'powderblue'}}>
    //             <Button
    //                 title='Filter'
    //                 color='red'
    //                 onPress={()=>{}}
    //             />
    //         </View>
    //         <View stype={{width:120, height: 40, backgroundColor: 'red'}}>
    //             <TextInput
    //                 style={{backgroundColor:'white'}}
    //                 onChangeText={text => this.searchTextChange(text)}
    //                 placeholder='search'
    //                 placeholderTextColor='gray'
    //                 inlineImagePadding={20}
    //             />
    //         </View>
    //     </View>
    //     <ListMovie style={{backgroundColor:'orange'}}
    //         itemClickHandler={this.itemClickHandler}
    //         ref={(view) => {this.listMovie = view;} }
    //     />
    //   </View>
    );
  }

  itemClickHandler(itemData){
    console.log("SinglePage itemClickHandler:"+this.props.itemClickHandler);
    this.props.itemClickHandler(itemData);
  }

  searchTextChange(text)
  {
    if(this.listMovie)
    {
      this.listMovie.searchTextChange(text);
    }
  }
}