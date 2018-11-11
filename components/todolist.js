import React from 'react';
import Todo from './todo';
import App from '/Users/jayeni13/Documents/TodoList/App'
import {Platform, StyleSheet, View, TextInput,ScrollView} from 'react-native';
import * as firebase from 'firebase'
import { Item, ListItem,Textarea,Form,Header,Left, Body, Right,Button, Icon, Title,Text,Container, Footer, FooterTab, Content} from 'native-base';
class Todolist  extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            userInput : '',
            notes: [],
            nextId: 0,
            readvalue : '',
            create : false,
            edit : false,
            read: false,
            editId: null,
            updateval: '',
            firstTime: true,
            n: this.props.usid
         
            
            
            
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChangeText= this.handleChangeText.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleRead = this.handleRead.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }
  
     componentDidMount(){
      
    
        

        this.setState({
            notes: this.props.dbl
         
            });
        }
     handleDelete(Deleteid){
        console.log(Deleteid);
        console.log(this.state.n);
      firebase.database().ref(this.state.n).child(Deleteid).remove()
       let Tnotes  = this.state.notes;
       Tnotes = Tnotes.filter(c => c.id !== Deleteid)
       this.setState({
        notes: Tnotes
        
        });

       
       
     }
     async handleCancel(){
        console.log("canceled");
        this.setState({
            updateval: '',
            userInput : '',
            edit : false,
            editId : null,
            create : false,
            read : false
            

            });
      }
   
     handleChange(evt){
 
         console.log("changed");
         this.setState({
             userInput: evt
         }

         )

     }
     handleChangeText(){

        let Tnotes  = this.state.notes;
        var note1 = Tnotes.filter(c => c.id === this.state.editId)
        note1[0].value = this.state.userInput
        Tnotes = Tnotes.filter(c => c.id !== this.state.editId)
        
        firebase.database().ref(this.props.usid).child(this.state.editId).update({
            value:this.state.userInput
         })
         note1
        Tnotes.push(note1[0]);
        Tnotes.sort((a, b) => a.id > b.id);
        
         this.setState({
             notes: Tnotes,
             edit : false,
             editId : null,
             updateval: '',
            userInput : ''
             
             });

    }
     handleCreate(){

        console.log("Create");
        this.setState({
            create : !this.state.create,
            userInput : ''

        })
     }
     handleEdit(evt){

        console.log("edit");
        this.setState({
            userInput: evt
        }

        )
     }
     handleUpdate(temp){
       
        console.log(temp);
         this.setState({
            updateval: temp.value,
            editId: temp.id,
            edit: true,
            read: false,
           
            
             });
      }
      handleRead(temp){
       
        this.setState({
           readvalue: temp,
           editId: temp.id,
           read: true
            });
     }
     handleLogout(){
       
        this.setState({
           notes: []
            });
            this.props.signout();
     }
      
      
     
     handleSumbit(input){
         if(input!=''){
         var temp = this.state.notes;
         var tnum = this.state.nextId;
         if(this.state.firstTime == true && temp.length > 0){
            tnum = this.props.max;
         
            firebase.database().ref(this.props.usid).child(tnum).set({
                id: tnum,
                value:input,
                updateval: '',
                userInput : ''
             })
         }
         else{
         firebase.database().ref(this.props.usid).child(tnum).set({
            id: tnum,
            value:input
         })
        }
         temp.push({id: tnum,value:input});
         this.setState({
            notes: temp,
            nextId: ++tnum,
            firstTime:false,
            create: !this.state.create
          

        })
    
       
    }
     }

    render() {
        var task= <Container>
                    <Header>
                        <Left>
                     <Button transparent  onPress= {()=>this.handleCancel()}>
                        <Icon name='ios-arrow-back' />
                        <Text>Back</Text>
                    </Button>
                        </Left>
                        <Body>
                  <Text>Add Task</Text>
                    </Body>
                      <Right/>
                    </Header>
                          <Form>
                             <Textarea style={{ marginBottom:10}} rowSpan={5} bordered onChangeText={(e)=>this.handleChange(e)} 
                             placeholder="Enter Task" defaultValue = {this.state.updateval} value = {this.props.userInput}/>
                             </Form>
                   
                 
                             <Button   style={{ alignSelf: 'center'}} onPress= {()=>this.handleSumbit(this.state.userInput)}>
                                 <Text> Submit</Text>
                             </Button>
                  </Container>;

       var menu=<Container  style={styles.container}>
          <Header>
          <Left>
            <Button Primary transparent  onPress= {()=>this.handleLogout()}>
              <Icon name='ios-arrow-back' />
             
              <Text>Logout</Text>
         
            </Button>
          </Left>
          <Body>
          <Text>TodoList</Text>
          </Body>
          <Right/>
          </Header>
          <Content>
                    {this.state.notes.map((note) => (<Todo key={note.id} id={note.id} value={note.value} 
                    onDelete={this.handleDelete} onUpdate={this.handleUpdate} onRead={this.handleRead}/>))}
           </Content>
         
           <Button onPress={() => this.handleCreate()}style={styles.addbutton} active>
          <Icon active name="add" style={{ color: 'white' }} />
        </Button>
          
                </Container>;
        var createTask= <Container >
             <Header>
          <Left>
            <Button transparent  onPress= {()=>this.handleCancel()}>
              <Icon name='ios-arrow-back' />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
          <Text>Update</Text>
          </Body>
          <Right/>
          </Header>
                            
                             <Textarea style={{ marginBottom:10}}rowSpan={5} bordered onChangeText={(e)=>this.handleEdit(e)} 
                             type="Enter Task" defaultValue = {this.state.updateval} value = {this.props.userInput}/>
                             
                             <Button style={{ alignSelf: 'center'}} onPress= {()=>this.handleChangeText(this.state.userInput)}>
                                 
                                 <Text style ={ styles.buttonText}>Update</Text>

                             </Button>
                      
                             
                       
                     </Container>;
         var readTask= <Container>
              <Header>
          <Left>
            <Button transparent  onPress= {()=>this.handleCancel()}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
          <Text>Task</Text>
          </Body>
          <Right/>
          </Header>
                            <Text style={{height:50,textAlign: 'center'}}>
                                {this.state.readvalue.value}
                            </Text>
                             <Content>
                             <Button Primary style={{ alignSelf: 'center'}} onPress= {()=>this.handleUpdate(this.state.readvalue)}>
                                 <Text style ={ styles.buttonText}>Update</Text>
                             </Button>
                                
                                </Content>
                              </Container>;
    
        
        return ( <Container style={{flex:1}}>
    
         
         
       
            {this.state.edit ? createTask : 
                (this.state.create ? task : 
                    (this.state.read ? readTask :menu))  }
        </Container> );
     


    }
    
}
const styles = StyleSheet.create({
    container: {
       
        marginBottom:100
    },
    welcome: {
        alignItems: 'center',
 
    },  bottomView:{
        flex:.2,
      
        position: 'absolute',
        bottom: 0
      },
    addbutton: {
        alignSelf: 'flex-end', 
        position: 'absolute', 
        elevation: 4, 
        height: 70, 
        width: 70, 
        bottom: 0, 
        borderWidth: 1,
       borderRadius: 35,
        color: '#00bfff', 
        justifyContent: 'center'
    },
    input: {
        textAlign: 'center',
        height: 50
     
      },
      buttonText:{
        color: 'white'
      }

  });


        
 
export default Todolist;