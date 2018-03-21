import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function formatDate(date) {
    return date.toLocaleDateString();
}

function Comment(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar"
                     src={props.author.avatarUrl}
                     alt={props.author.name}
                />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

function App1() {
    return (
        <div>
            <Welcome name="nian"/>
            <Welcome name="yuxin"/>
            <Comment date={comment.date} text={comment.text} author={comment.author}/>
        </div>
    );
}

const comment = {
    date: new Date(),
    text: 'this is my little kitty',
    author: {
        name: 'Nasi',
        avatarUrl: 'http://placekitten.com/g/64/64'
    }
}

// const element = <Welcome name="Sara" />;
ReactDOM.render(
    <App1/>,
    document.getElementById('root')
);