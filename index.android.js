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

import App from './app.js'

export default class AnimateTest extends Component {
  render() {
    return (
        <View><App /></View>
    );
  }
}


AppRegistry.registerComponent('AnimateTest', () => AnimateTest);
