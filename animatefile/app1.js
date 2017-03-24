/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native';

export default class App extends Component {
  constructor(){
      super()
      this.state = {
          commonChange : new Animated.Value(0),
          rotation : new Animated.Value(0),
      }
  }
  componentDidMount(){
      var timing = Animated.timing;
      Animated.parallel(['commonChange','rotation'].map(property=>{
          return timing(this.state[property],{
              toValue : 1,
              duration : 4000,
              easing : Easing.linear
          })
      })).start();
  }
  render() {
    return (
        <Animated.View style={[styles.demo,{
            opacity : this.state.commonChange,
            transform : [{
                rotateZ: this.state.rotation.interpolate({
                    inputRange : [0,1],
                    outputRange : ['0deg','360deg']
                })
            }]
        }]}>
            <Animated.Text style={{
                fontSize : this.state.commonChange.interpolate({
                    inputRange : [0,1],
                    outputRange : [12,25]
                })
            }}>我骑着七彩祥云出现了</Animated.Text>
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    demo: {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: 'white',
    },
    text : {
        fontSize : 30
    }
});
