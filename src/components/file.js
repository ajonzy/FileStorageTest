import React, { Component } from 'react'

export default class FileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: ""
        }

        this.handleDownload = this.handleDownload.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/file/get/${this.props.file_id}`, { method: "GET" })
        .then(response => response.blob())
        .then(data => {
            const file = new File([data], this.props.name, { type: this.props.type })
            this.setState({ file: file })
        })
        .catch(error => console.log(error))
    }

    handleDownload() {
        const url = window.URL.createObjectURL(this.state.file);
        const download = document.createElement("a")
        download.download = this.state.file.name
        download.href = url
        document.body.appendChild(download)
        download.click()
        download.remove()
        window.URL.revokeObjectURL(url)
      }

    handleDelete() {
        fetch(`http://127.0.0.1:5000/file/delete/${this.props.file_id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    render() {
        if (this.state.file) {
            return (
                <div>
                    {this.state.file.name}
                    <button onClick={this.handleDownload}>Download</button>
                    <button onClick={this.handleDelete}>Delete</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}