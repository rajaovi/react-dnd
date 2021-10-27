import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './data';
import Column from './Column';

class DrangandDrop extends React.Component { 
  state = initialData;

  onDragEnd = result => {
    // TODO: reorder our column
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default DrangandDrop