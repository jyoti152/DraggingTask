import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';


class Box extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid
                item
                md={3}
            
                draggable={this.props.draggable}
                onDragStart={this.props.onDragStart({ id: this.props.box.id })}
                onDragOver={this.props.onDragOver({ id: this.props.box.id })}
                onDrop={this.props.onDrop({ id: this.props.box.id })}
            >
                <Slide  direction="up" in timeout={1000}>
                <img className="content" src={this.props.box.name}></img>
                </Slide>
             </Grid>

        );
    }
}

class BoxesGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: [
                { id: 1, name: "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg" },
                { id: 2, name: "https://images.unsplash.com/photo-1501686962565-1350ab98237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" },
                { id: 3, name: "https://images.unsplash.com/photo-1452767250494-3c864fc60bf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80" },
                { id: 4, name: "https://images.unsplash.com/photo-1571229721124-b883163bd33c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=332&q=80" },

            ]
        };
    }

    swapBoxes = (fromBox, toBox) => {
        let boxes = this.state.boxes.slice();
        let fromIndex = -1;
        let toIndex = -1;

        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].id === fromBox.id) {
                fromIndex = i;
            }
            if (boxes[i].id === toBox.id) {
                toIndex = i;
            }
        }

        if (fromIndex != -1 && toIndex != -1) {
            let { fromId, ...fromRest } = boxes[fromIndex];
            let { toId, ...toRest } = boxes[toIndex];
            boxes[fromIndex] = { id: fromBox.id, ...toRest };
            boxes[toIndex] = { id: toBox.id, ...fromRest };

            this.setState({ boxes: boxes });
        }
    };

    handleDragStart = data => event => {
        let fromBox = JSON.stringify({ id: data.id });
        event.dataTransfer.setData("dragContent", fromBox);
    };

    handleDragOver = data => event => {
        event.preventDefault(); // Necessary. Allows us to drop.
        return false;
    };

    handleDrop = data => event => {
        event.preventDefault();

        let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
        let toBox = { id: data.id };

        this.swapBoxes(fromBox, toBox);
        alert("Replace?")
        return false;
    };

    makeBoxes = () => {
        return this.state.boxes.map(box => (
            <Box
                box={box}
                key={box.id}
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            />
        ));
    };

    render() {
        return <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            style={{marginTop:'5%',marginLeft:"5%" }}
        >{this.makeBoxes()}
        </Grid>;
    }
}

export default BoxesGroup