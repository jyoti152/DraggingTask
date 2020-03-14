import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({ value }) =>
    <Grid
        item
        xs={3}
    >
        <Slide direction="up" in timeout={1000}>
            <img style={{ height: 150, width: 150 }} src={value}></img>
        </Slide>
    </Grid>
);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div

        >
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </div >
    );
});

class SortableComponent extends Component {
    state = {
        items: [
            "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
            "https://images.unsplash.com/photo-1501686962565-1350ab98237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
            "https://images.unsplash.com/photo-1452767250494-3c864fc60bf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80",
            "https://images.unsplash.com/photo-1571229721124-b883163bd33c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=332&q=80"

        ]
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
        alert("Move the image?")
    };
    render() {
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <SortableList
                    items={this.state.items}
                    onSortEnd={this.onSortEnd}
                ></SortableList>
            </Grid>
        )
    }
}
export default SortableComponent