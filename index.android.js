/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app/App';
export default class Lab2 extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Lab2', () => Lab2);
