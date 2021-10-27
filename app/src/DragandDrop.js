import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = [
    {
      "id": "0",
      "content": "Rollins Gibson"
    },
    {
      "id": "1",
      "content": "Hobbs Riggs"
    },
    {
      "id": "2",
      "content": "Myrna Emerson"
    },
    {
      "id": "3",
      "content": "Serrano Burton"
    },
    {
      "id": "4",
      "content": "Kitty Jensen"
    }
]

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default class DragandDrop extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: getItems
        };
    }

    onDragEnd = result => {
        console.log(result);
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    };
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(droppableProvided) => (
                        <ul
                            class="dragWrapper"
                            ref={droppableProvided.innerRef}
                        >
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(draggableProvided) => (
                                        <li
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                        >
                                            {item.content}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
