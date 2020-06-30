import React, { Component } from 'react'
import WebSocket from 'websocket'
import '../../Style.css'
export default class Chat extends Component {
    constructor() {
      super()
      this.state = {
        messages: [],
      }
    }

  componentDidMount() {
    const socket = io.connect('http://localhost:3000')
    socket.onmessage = function(event) {
      const incomingMessages = event.data;
    }

    const onClick = () => {
        const name= document.getElementById('name')
        const message= document.getElementById('textField')

        const messages=this.state.messages.slice();
        const newMessage = {name: name.value, message:message.value};
        messages.push(newMessage);
        this.setState({messages});
        socket.emit('message', newMessage);

        message.value = "";
    }

    const submitButton = document.getElementById('submit');
    submitButton.onclick = onClick;

    socket.on('messageBraodcast', (newMessage) => {
        const messages = this.state.messages.slice();
        messages.push(newMessage)
        console.log('message ', messages)
      this.setState({messages})
    })
  }
  componentDidUpdate(){
      console.log(this.state)
  }
  render() {
    const messages = [];
    
    for(let i =0 ; i < this.state.messages.length; i++ ) {
      const message = this.state.messages[i]
        messages.push(
            <div  key={i}>
             name:{message.name} 
              <br/>
             {message.message}
            </div>
            )
        }
        // this.setState({messages: incomingMessages})
        return (
            <div  style={{height:'200px'}}>
                <div className='chat'>
                    <div className='indivMessage'>
                    {messages}
                    </div>
                </div>
              <div className='chatInput'>
              <input type="text" id="name" placeholder="name"/><br/>
                  {/* <label for="message">Message:</label>
                  <input type="text" id="message" name="message"/> */}
                  <input type="text" id="textField" placeholder="type message"/><br/>
                  <button id='submit'>Send</button>
              </div>
          </div>
        )
    }
}
