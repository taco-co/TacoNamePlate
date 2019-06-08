/** @jsx React.DOM */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './fonts/roboto/index.less';

var webFrame = require('electron').webFrame;
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

let head = document.getElementsByTagName('head')[0];

var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
head.appendChild(meta);

meta = document.createElement('meta');
meta.name = "mobile-web-app-capable";
meta.content = "yes";
head.appendChild(meta);

meta = null;
head = null;

ReactDOM.render(
    React.createElement(App, {}, null),
    document.getElementById('app')
);
