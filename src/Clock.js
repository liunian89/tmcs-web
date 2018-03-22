import React, {Component} from "react";

class Clock extends Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Clock;