import React , {Component} from 'react';
import {View,
Text,
StyleSheet, 
FlatList, 
TextInput, 
TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../Component/MyHeader';
import firebase from 'firebase';
import db from '../config';
import SwipeableTaskList from '../Component/SwipeableTaskList';

export default class TaskScreen extends Component{
    constructor(){
        super();
        this.state={
             userId: firebase.auth().currentUser.email,
            taskList:[],
            task:''
        }
        this.taskRef = null
    }

    
  addTasks = async (task) => {
     var userId = this.state.userId;
  
     db.collection("tasks").add({
       "user_id": userId,
       'task':this.state.task,
   
      
     });

     this.setState({
     task:''
    })

   
}

  getTaskList = () => {
     this.taskRef = db
       .collection("tasks")
       .onSnapshot((snapshot) => {
         var taskList = snapshot.docs.map((doc) => doc.data());
         this.setState({
           taskList:taskList,
         });
       });
   };

   componentDidMount() {
     this.getTaskList();
   }

   componentWillUnmount() {
   this.taskRef();
   }

  
   keyExtractor = (item, index) => index.toString();

// //   render Item
  renderItem = ({ item, i }) => {
     return (
       <ListItem
         key={i}
         title={item.task}       
         titleStyle={{ color: "black", fontWeight: "bold" , fontSize:20 }}
         bottomDivider
     />
    );
  };
//   //   render Item


    render(){
        return(
    
            <View style={{flex:0.9,justifyContent:"center", alignContent:'center'}} >
               <MyHeader title="My Tasks"/>
            {this.state.taskList.length===0
            ?(
                <View>

                    <Text>Please add your tasks for today</Text>
                </View>
            )
            :(
              <SwipeableTaskList tasks={this.state.taskList}/>

                
            )
            }

            
                <TextInput placeholder="What should you do today to reach your goals?"
                    style={styles.input}
                    onChangeText={(text)=>{this.setState({task:text})}}
                            value={this.state.task}
                    />
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{this.addTasks(this.state.taskList)}}
                    >
                        <Text style={{color:'cyan'}}>Submit</Text>
                    </TouchableOpacity>
                    
            </View>
    
        )
    }
}
const styles = StyleSheet.create({
    input:{width:'60%',
    height:'10%',
    borderWidth:2,
    alignSelf:'center',
    borderRadius:60,
    margin:30
    
    },
    button:{
        height:50,
        width:'10%',
        padding:10,
        justifyContent:'center',
        backgroundColor:'#002365',
        borderWidth:2,
        borderRadius:50,
        borderColor:'#59FFFF',
        shadowOffset:{width:2,height:5} ,   
           shadowOpacity:4,
           shadowRadius:20,
          },
        margin:40  
})