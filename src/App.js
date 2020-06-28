import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.state = {
      box: [{name: "", location:"column_1"}],
      draggableAreas: [{ id: 1, status: "column_1"}, { id: 2, status: "column_2"}, {id: 3, statu: "column_3"}, {id: 4, status: "column_4"}]
    }
  }

  handleDragStart = (e,name) => {
    e.dataTransfer.setData("Box", name)
  }

  handleDragOver = e => {
    e.preventDefault()
  }

  handleOnDrop = (e,location) => {
    const id = e.dataTransfer.getData("Box")
    const box = this.state.box.filter((item)=> {
      if(item.name === id) {
        item.location = location
      }
      return item
    })

    this.setState({
      list: box
    })
  }

  render() {
    let obj = { column_1: [], column_2: [], column_3: [], column_4: []}
    let areasToDrop = []

    this.state.box.forEach(box=> {
      obj[box.location].push (
        <div draggable className="Box" onDragStart={(event) => this.handleDragStart(event, box.name)} key={box.name}>{box.name}</div>
      )
    });

    this.state.draggableAreas.forEach(area => {
          areasToDrop.push (
          <div className="draggableArea"
            key={area.id}
            onDragOver={(event)=> this.handleDragOver(event)}
            onDrop={(event) => this.handleOnDrop(event, area.status)}>
            {obj[area.status]}
            </div>
          )
    })

    return (
      <div className="App">
        {areasToDrop}
      </div>
    );
  }
}

export default App;
