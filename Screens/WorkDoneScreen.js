import React , {Component} from 'react';
import {View,Text} from 'react-native';
import MyHeader from '../Component/MyHeader';

export default class WorkDoneScreen extends Component{
    render(){
        return(

            <View>
                <MyHeader title="Work Done"/>
            </View>
        )
    }

}