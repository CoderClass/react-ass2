import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class FilterPage extends Component {
  static navigationOptions = {
    title: 'Filter',
    headerLeft:<Button
                    title="Cancel"
                    onPress={() => {
                      const { goBack } = navigation;
                      goBack();
                  }}/>,
    headerRight:<Button
                    title="SearchS"
                    onPress={() => {
                      const { goBack } = navigation;
                      goBack();
                  }}/>
  }
  render() {
    return (
      <Text>FilterPage</Text>

    );
  }
}