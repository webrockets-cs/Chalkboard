import React, { Component } from 'react';
import Chat from './chat'
import Profile from './profile'
import '../../Style.css'


export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'black', thickness: 3 };
    this.socket = null;
    this.canvas = null;
    this.canvasArray = [];
    this.ctx = null;
    this.fromTop = null;
    this.fromLeft = null;
    this.painting = false;
    this.foreignPath = new Path2D();
    this.localPath = new Path2D();
    this.down = false;

    //bind methods
    this.startPosition = this.startPosition.bind(this);
    this.finishedPosition = this.finishedPosition.bind(this);
    this.draw = this.draw.bind(this);
    this.down2 = this.down2.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.undoButton = this.undoButton.bind(this);
  }

  startPosition(e) {
    this.painting = true;
    this.draw(e);

    const x = (e.clientX - this.fromLeft) / this.canvas.width;
    const y = (e.clientY - this.fromTop) / this.canvas.height;

    this.socket.emit('down', { down: true, x, y });
  }
  finishedPosition() {
    this.painting = false;
    this.ctx.beginPath();
    this.localPath = new Path2D();

    // creating a clone, pushing that into array
    // continue drawing on current canvas
    // const cloneCanvas = this.canvas.cloneNode(true);

    //make an html canvas element
    const newCanvas = document.createElement('canvas');
    //newCanvas.setAttribute('style', 'background')
    newCanvas.style.backgroundColor = 'grey';
    newCanvas.height = window.innerHeight * 0.8;
    newCanvas.width = this.canvas.height * 1.5;
    //make a context for that canvas element
    const context = newCanvas.getContext('2d');
    //write the current canvas to the context
    //context.drawImage(this.canvas, 0, 0,);
    //store the canvas element in the array 

    // this.fromTop = this.canvas.getBoundingClientRect().top;
    // this.fromLeft = this.canvas.getBoundingClientRect().left;

    this.canvasArray.push(newCanvas);
    this.socket.emit('down', { down: false });
  }
  draw(e) {
    console.log("call to draw")
    if (!this.painting) return;
    this.ctx.lineWidth = this.state.color === 'grey' ? 20 : this.state.thickness;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.state.color;
    this.localPath.lineTo(e.clientX - this.fromLeft, e.clientY - this.fromTop);
    this.ctx.stroke(this.localPath);
    this.ctx.beginPath();
    this.localPath.moveTo(e.clientX - this.fromLeft, e.clientY - this.fromTop);
    const x = (e.clientX - this.fromLeft) / this.canvas.width;
    const y = (e.clientY - this.fromTop) / this.canvas.height;

    this.socket.emit('mouse', { x, y, color: this.state.color, thickness: this.state.thickness });
  };

  down2(data) {
    if (!this.down) return;
    this.ctx.lineWidth = data.color === 'grey' ? 20 : data.thickness;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = data.color;
    
    // foreignPath.color = 'blue';
    this.foreignPath.lineTo(data.x * this.canvas.width, data.y * this.canvas.height);
    
    //ctx.lineTo(data.x * canvas.width, data.y * canvas.height);
    this.ctx.stroke(this.foreignPath);
    //ctx.beginPath();
    //ctx.moveTo(data.x * canvas.width, data.y * canvas.height);
    this.foreignPath.moveTo(data.x * this.canvas.width, data.y * this.canvas.height)
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.foreignPath = new Path2D();
  }

  componentDidMount() {
    //initialize properties for the Canvas Class
    this.socket = io.connect('http://localhost:3000');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.height = window.innerHeight * 0.8;
    this.canvas.width = this.canvas.height * 1.5;

    this.fromTop = this.canvas.getBoundingClientRect().top;
    this.fromLeft = this.canvas.getBoundingClientRect().left;

    this.canvas.addEventListener('mousedown', this.startPosition);
    this.canvas.addEventListener('mouseup', this.finishedPosition);
    this.canvas.addEventListener('mousemove', this.draw);


    this.socket.on('down', (data) => {
      this.down = data.down;
      this.foreignPath = new Path2D();
      if(data.down) this.down2(data);
    });
    
    this.socket.on('mouseback', this.down2);
    // const clearButton = document.getElementById('clear');
    this.socket.on('clearBack', this.clearCanvas);
  }
  changeColor(color) {
    this.setState({ ...this.state, color });
  }
  changeThickness(sign) {
    if (sign === '+' && this.state.thickness <= 20)
      this.setState({ ...this.state, thickness: this.state.thickness + 2 });
    if (sign === '-' && this.state.thickness > 1)
      this.setState({ ...this.state, thickness: this.state.thickness - 2 });
  }
  undoButton() {
    console.log('call to undo button')
    console.log(this.canvasArray);
    let wrapper = document.getElementById('canvasElement');
    wrapper.removeChild(wrapper.childNodes[0]);
    this.canvas = this.canvasArray.pop();
    this.canvas.setAttribute('id', 'old canvas');
    this.ctx = this.canvas.getContext('2d')
    wrapper.appendChild(this.canvas);
    console.log(this.canvasArray);
  }

  render() {
    return (
      <div className='canvas-page'>
        <div>
            <div id='canvasElement'>
              <canvas id="canvas" style={{ backgroundColor: 'gray' }} />
            </div>
            <div className='button-div'>
            <button
              id="black"
              onClick={() => {
                this.changeColor('black');
              }}
            >
              black
            </button>
            <button
              id="blue"
              onClick={() => {
                this.changeColor('blue');
              }}
            >
              blue
            </button>
            <button
              id="red"
              onClick={() => {
                this.changeColor('red');
              }}
            >
              red
            </button>
            <button
              id="white"
              onClick={() => {
                this.changeColor('grey');
              }}
            >
              eraser
            </button>
            <button
              onClick={() => {
                this.changeThickness('+');
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                this.changeThickness('-');
              }}
            >
              -
            </button>
            <button id="clear" onClick={() => {
                this.clearCanvas();
                this.socket.emit('clear');
              }}>clear</button>
            <button id="undo" onClick={() => {
                this.undoButton();
              }}>undo</button>
            {/* <button id="redo" onClick={() => {
              }}>redo</button> */}
            </div>
          </div>
        <div >
          <Chat className='chat-box'/>
        </div>
      </div>
    );
  }
}
