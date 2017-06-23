import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import LoginPage from './page/LoginPage';
import HomePage from './page/HomePage';
import FilterPage from './page/FilterPage';


import {StackNavigator} from 'react-navigation'

const Navigator = StackNavigator({
    // LoginPage:{
    //   screen: LoginPage
    // },
    HomePage: {
        screen: HomePage

    },
    FilterPage: {
        screen: FilterPage
    }
})

export default class Lab2 extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}