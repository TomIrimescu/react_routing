import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Tomcat",
    submitted: false // conditional redirect
  };

  componentDidMount() {
    console.log(this.props);
  }

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    axios.post("/posts", data).then(response => {
      console.log(response);
      this.props.history.push("/posts"); // this will enable back button while changing page on stack
      // this.props.history.replace("/posts"); // this will not enable back button
      // this.setState({submitted: true}) // conditional redirect will not enable back button
    });
  };

  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to="/posts" />; // conditional redirect
    }

    return (
      <div className="NewPost">
        {redirect} {/* conditional redirect */}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Tomcat">Tomcat</option>
          <option value="Bobcat">Bobcat</option>
          <option value="Wildcat">Wildcat</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
