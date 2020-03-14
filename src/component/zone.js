import React, { useCallback, Component } from 'react'
import { useDropzone } from 'react-dropzone'
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

class imgArray extends Component {

    state = {
        list: [
            { name: "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg", status: "p" },
            { name: "https://images.unsplash.com/photo-1501686962565-1350ab98237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80", status: "c" },
            { name: "https://images.unsplash.com/photo-1452767250494-3c864fc60bf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80", status: "p" },
            { name: "https://images.unsplash.com/photo-1571229721124-b883163bd33c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=332&q=80", status: "c" }
        ]
    }
    handleDragStart = (e, name) => {
        e.dataTransfer.setData("id", name)

    }
    handleDragOver = (e) => {
        e.preventDefault()

    }
    handleOnDrop = (e, status) => {
        let id = e.dataTransfer.getData("id")
        let list = this.state.list.filter((task) => {
            if (task.name === id) {
                task.status = status
            }
            return task
        })
        this.setState({ list: list })

        alert("drag")
    }
    render() {
        let obj = {
            p: [],
            c: []
        }
        this.state.list.forEach(task => {
            obj[task.status].push(
                <div draggable
                    className="draggable"
                    onDragStart={(e) => { this.handleDragStart(e, task.name) }}
                >
                     <Slide direction="up" in timeout={1000}>
                    
                    <img style={{ height: 100, width: 100 }} src={task.name}></img>
                    </Slide>
                </div>
            )
        })
        return (
            
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="flex-start"
                className="container">
                      

                <Grid
                    item
                    onDragOver={(e) => this.handleDragOver(e)}
                    onDrop={(e) => this.handleOnDrop(e, "p")}
                    className="pending-container"
                >

                    {obj.p}
                </Grid >
                <Grid
                    item
                    className="compleated-container"
                    onDragOver={(e) => this.handleDragOver(e)}
                    onDrop={(e) => this.handleOnDrop(e, "c")}>
                    {obj.c}
                </Grid>
            </Grid>
          
        )
    }

}
export default imgArray
