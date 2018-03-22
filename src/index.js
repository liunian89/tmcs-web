import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './Clock';

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function formatDate(date) {
    return date.toLocaleDateString();
}

function Avatar(props) {
    return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name}
        />);
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo author={props.author}/>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

function UserInfo(props) {
    return (<div className="UserInfo">
        <Avatar user={props.author}/>
        <div className="UserInfo-name">
            {props.author.name}
        </div>
    </div>);
}

function App() {
    return (
        <div>
            <Clock/>
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

function tick() {
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);