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
          anim : [1,2,3].map(()=> new Animated.Value(0))
      }
  }
  componentDidMount(){
      var timing = Animated.timing;
      Animated.sequence([   // sequence 接受一系列运动数组依次执行
          Animated.stagger(200,this.state.anim.map(item=>{  // stagger 每隔 ms 执行数组中的运动
              return  timing(item,{toValue: 1});
          }).concat(this.state.anim.map(item=>{
              return timing(item,{toValue : 0});
          }))),
          Animated.delay(1000),
          timing(this.state.anim[0],{toValue: 1}),
          timing(this.state.anim[1],{toValue: -1}),
          timing(this.state.anim[2],{toValue: 0.5}),
          Animated.delay(1000),
          Animated.parallel(this.state.anim.map(item => {  // parallel 同时执行数组中的运动
              return timing(item,{toValue: 0})
          }))
      ]).start();

    // Animated.sequence([
    //     timing(this.state.anim[0],{toValue:1,duration:1000,easing:Easing.linear}),
    //     timing(this.state.anim[1],{toValue:1,duration:1000,easing:Easing.back(10)}),
    //     timing(this.state.anim[2],{toValue:1,duration:1000,easing:Easing.bounce})
    // ]).start();
  }
  render() {
    var views = this.state.anim.map((value,i) => {
        return (
            <Animated.View key={i} style={[styles.view,styles['bg'+i],{
                transform : [{
                    translateX : value.interpolate({
                        inputRange : [0,1],
                        outputRange : [0,100]
                    })
                }]
            }]}>
                <Text style={[styles.text]}>这是第 {i+1} 个 view</Text>
            </Animated.View>
        )
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>一系列运动实例</Text>
            {views}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    view : {
        padding : 5,
        margin : 5,
    },
    text : {
        fontSize : 14,
        color : 'black',
        marginBottom : 15
    },
    bg0 : {
        backgroundColor : 'green'
    },
    bg1 : {
        backgroundColor : 'red'
    },
    bg2 : {
        backgroundColor : 'blue'
    }
});
