import React from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

const { Component } = React;
const { render } = ReactDOM;
var items = [
    "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
    "https://images.unsplash.com/photo-1501686962565-1350ab98237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
    "https://images.unsplash.com/photo-1452767250494-3c864fc60bf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80",
    "https://images.unsplash.com/photo-1571229721124-b883163bd33c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=332&q=80"

]

class Circle extends Component {

    render() {
        return items.map((image) => {
            console.log(image)
            return (
                <Grid item xs={3} >
                        <Slide direction="up" in timeout={1000}>
                    <img
                        className={'circle'}
                        onMouseDown={this.props.onStart}
                        onTouchStart={this.props.onStart}
                        src={image} />
                        </Slide>
                    {this.props.children}
                </Grid >);
        });
    }
}


class App extends Component {
    constructor(props) {
        super(props);

        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);

        this.circle = null;
        this.distX = 0;
        this.distY = 0;
    }

    onStart(e) {
        e.preventDefault();
        this.circle = e.target;
        let evt = e.type === 'touchstart' ? e.changedTouches[0] : e;
        this.distX = Math.abs(this.circle.offsetLeft - evt.clientX);
        this.distY = Math.abs(this.circle.offsetTop - evt.clientY);
        this.circle.style.pointerEvents = 'none';
    }

    onEnd(e) {
        this.circle.style.pointerEvents = 'initial';
        alert("move")
    }

    onMove(e) {
        if (this.circle) {
            if (this.circle.style.pointerEvents === 'none') {
                let evt = e.type === 'touchmove' ? e.changedTouches[0] : e;
                this.circle.style.left = `${evt.clientX - this.distX}px`;
                this.circle.style.top = `${evt.clientY - this.distY}px`;
            };
        }

    }

    render() {
        return (
            <Grid
                container
                className={'container'}
                onMouseMove={this.onMove}
                onTouchMove={this.onMove}
                onMouseUp={this.onEnd}
                onTouchEnd={this.onEnd}>
                  
                <Circle onStart={this.onStart} />
                
            </Grid>
        );
    }
}

export default App