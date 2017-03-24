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
  PanResponder,
  Dimensions
} from 'react-native';

export default class App extends Component {
  constructor(){
      super()
      this.state = {
          pan: new Animated.ValueXY(),
          dropZoneValues : null,   // 拖拽禁止区域
          circleZoneValues : null   //圆形区域
      };
      this._posX = 0;
      this._posY = 0;
      this._panResponder = {};
      this._setDropZoneValues = this.setDropZoneValues.bind(this);
      this._circleZoneValues = this.circleZoneValues.bind(this);
  }
  componentDidMount(){
      this._posX = this.state.pan.x._value;
      this._posY = this.state.pan.y._value;

      this._panResponder = PanResponder.create({
       //https://reactnative.cn/docs/0.42/panresponder.html#content
       //onMoveShouldSetPanResponderCapture : () =>true,  //移动时开始捕获
       onStartShouldSetPanResponder: () => true,  //开始时就进行捕获

       onPanResponderMove:(e,gesture) =>{
         console.log('move');
         this.state.pan.setValue({
             x : this._posX + gesture.dx,
             y : this._posY + gesture.dy
         });
       },
       onPanResponderGrant : (e,gesture) => {  //开始手势操作
           console.log('start');
       },
       onPanResponderRelease: (e,gesture) => {
           console.log('end');

           /**
            dx,dy 本次 偏移量
            moveX,moveY 当前鼠标位置
           **/
           this._posX = this.state.pan.x._value;
           this._posY = this.state.pan.y._value;

           if(this.isDropZone(gesture)){
                this._posX = 0;
                this._posY = 0;
                Animated.spring(this.state.pan,{
                   toValue : {x:0,y:0}
                }).start()
           }
       }
     });
  }
  isDropZone(gesture){
      var dz = this.state.dropZoneValues;
      var cz = this.state.circleZoneValues;
    //   console.log(cz);
      /**
        x,y 表示相对于 初始位置 偏移量 一共是多少
      **/

      //cz 的 初始位置 Window.height/2 - RADIUS
      //dz 的 区域 dz.y ~ dz.y + height
      //圆形一接触就弹回
      //return (Window.height/2 - RADIUS) + cz.y + 2*RADIUS  > dz.y && (Window.height/2 - RADIUS) + cz.y < (dz.y + dz.height);
      //圆形大于一半接触才弹回
      return (Window.height/2 - RADIUS) + cz.y + RADIUS  > dz.y && (Window.height/2 - RADIUS) + cz.y + RADIUS < (dz.y + dz.height);

  }
  circleZoneValues(event){
      this.setState({
          circleZoneValues : event.nativeEvent.layout
      })
  }
  setDropZoneValues(event){
      console.log(event.nativeEvent,'nativeEvent');
      this.setState({
          dropZoneValues : event.nativeEvent.layout
      })
  }
  render() {
      var handlers = this._panResponder ? this._panResponder.panHandlers : null;
      return (
        <View style={styles.container}>
            <View style={styles.dragArea} onLayout={this._setDropZoneValues}>
                <Text style={styles.text}>禁区</Text>
            </View>
            <Text style={styles.title}>手势操作运动实例</Text>
            <View style={styles.dragContainer}>
                <Animated.View {...handlers} onLayout={this._circleZoneValues}
                    style={[styles.circle,this.state.pan.getLayout()]}>
                    <Text style={styles.text}> view块 </Text>
                </Animated.View>
            </View>
        </View>
    );
  }
}

const RADIUS = 40;
let Window = Dimensions.get('window');

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    dragArea : {
        height : 100,
        backgroundColor : 'red',
        marginTop : 100
    },
    dragContainer : {
        position : 'absolute',
        top : Window.height/2 - RADIUS,
        left : Window.width/2 - RADIUS,
    },
    circle : {
        width : RADIUS*2,
        height : RADIUS*2,
        borderRadius : RADIUS,
        backgroundColor : '#1ABC9C'
    },
    text : {
        marginTop : 28,
        marginLeft : 5,
        marginRight : 5,
        color : '#fff',
        textAlign : 'center'
    },
    title : {
        paddingTop : 20,
        fontSize : 14,
        color : 'black',
        marginBottom : 15,
        textAlign : 'center'
    }
});
