import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";
// import NewPost from "./NewPost/NewPost";
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost"); // dynamic import syntax/lazy loading
});


class Blog extends Component {
  state = {
    auth: true
  };
  
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              {/*unique my-active class can be implemented for active link */}
              {/*inline activeStyle can be implemented */}
              {/*<li><Link to="/new-post">New Post</Link></li> // absolute path*/}
              {/*<li><Link to={props.match.url + "/new"}>New Post</Link></li> // relative path*/}
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post", // absolute path
                    // pathname: this.props.match.url + "/new-post",
                    // relative path appended to the current path [page url]
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
        <Switch>
          {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
          <Route path="/posts" component={Posts} />
          {/*<Route render={() => <h1>Not found</h1>} /> or create 404 page*/}  TODO create 404 page
          <Redirect from="/" to="/posts" />{" "}
          {/* Redirect can only use 'from' property inside a Switch statement */}
          {/*<Route path="/" component={Posts} /> // alternate route for Posts component */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
