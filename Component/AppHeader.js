import React , {Component} from 'react';
import {View, Text} from 'react-native';
import {colors, Header} from 'react-native-elements';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default class AppHeader extends Component{
    render(){
        return(
            <SafeAreaProvider>
               <Header
                  centerComponent={{text:'ProcastUp' , style:{fontSize:30, fontFamily:'serif', fontWeight:'bold' ,color:'#02119F'}}}
                  backgroundColor="#fff"
                />  
            </SafeAreaProvider>
        
        );
    }
}