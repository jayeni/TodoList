import React from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import {Item,ListItem, Content} from 'native-base';
import Swipeout from 'react-native-swipeout';
class Todo extends React.Component{
constructor(props){
  super(props);
    this.state = { 
        value: this.props.value,
        id: this.props.id
       
     }
    }
     
    render() { 
      var trash = [{
       
        onPress: ()=>this.props.onDelete(this.props.id),
          text:'Delete',
          type:'delete'}
          , {
          onPress: ()=>this.props.onUpdate({id: this.props.id,value:this.props.value}),
          text:'Update',
          type:'primary'
          }/*,{
        onPress : ()=>this.props.onRead({id: this.props.id,value:this.props.value}),
        text:'View',
        type:'secondary'
    }*/
      ]
     
      
        return ( 
            <Content style={styles.container}>
            
 <Swipeout right={trash} backgroundColor = {"#ffffff"} >
                 <Text  onPress={()=>this.props.onRead({id: this.props.id,value:this.props.value})}  style={styles.welcome}>
               {this.props.value}
             
               </Text>
              
               </Swipeout>
            
               
            </Content>
         );
    }
}
const styles = StyleSheet.create({
    container: {
      position: 'relative',
      padding: 1,

      borderBottomWidth: 1,
      borderBottomColor: "#ededed"

    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
 
export default Todo;