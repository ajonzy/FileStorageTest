import React, { Component } from 'react';
import FileComponent from "./file"

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      file: "",
      data: []
    }

    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGetData = this.handleGetData.bind(this)
  }

  handleFileSelect(event) {
    this.setState({ file: event.target.files[0] })
  }

  handleSubmit() {
    const form = new FormData()
    form.append("data", this.state.file)
    form.append("name", this.state.file.name)
    form.append("type", this.state.file.type)
    fetch("http://127.0.0.1:5000/file/add", {
      method: "POST",
      body: form
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  handleGetData() {
    fetch("http://127.0.0.1:5000/filedata/get", {
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ data: data })
    })
    .catch(error => console.log(error))
  }

  renderFiles() {
    const filesContainer = []

    this.state.data.forEach(file => {
      filesContainer.push(
        <FileComponent 
          key={file.file_id} 
          name={file.name} 
          type={file.file_type} 
          file_id={file.file_id} 
        />
      )
    })

    return filesContainer
  }

  render() {
    return (
      <div className='app'>
        <input type="file" onChange={this.handleFileSelect}/>
        <button onClick={this.handleSubmit}>Send</button>
        <button onClick={this.handleGetData}>Get Data</button>
        {this.renderFiles()}
      </div>
    );
  }
}
