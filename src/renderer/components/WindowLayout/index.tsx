import React from 'react';

// Components
import { TouchApp } from '@material-ui/icons';

// Styles
import './styles.less';

const remote = require('electron').remote;

interface Props {
    canNavigateBack?: boolean;
    canNavigateForward?: boolean;
    onNavigateBack?: Function;
    onNavigateForward?: Function;
}

interface State {
    isMaximized: boolean;
}

export default class WindowLayout extends React.Component<Props, State> {
    private appWindow = remote.getCurrentWindow();

    constructor(props) {
        super(props);

        this.state = {
            isMaximized: this.appWindow.isMaximized()
        };
    }

    componentWillMount() {
        this.appWindow.on("maximize", this.checkMaximized);
        this.appWindow.on('unmaximize', this.checkMaximized);

        setImmediate(() => {
            this.checkMaximized();
        });
    }

    componentWillUnmount() {

    }
    
    onBackClick = (event) => {
        if (this.props.onNavigateBack != null)
            this.props.onNavigateBack();
    }

    onMinimizeClick = (event) => {
        this.appWindow.minimize();
    }

    onMaximizeClick = (event) => {
        this.appWindow.maximize();
        this.checkMaximized();
    }

    onRestoreClick = (event) => {
        this.appWindow.unmaximize();
        this.checkMaximized();
    }

    onCloseClick = (event) => {
        this.appWindow.close();
    }

    checkMaximized() {
        this.setState({
            isMaximized: this.appWindow.isMaximized()
        });
    }

    render() {
        const isMaximized = this.state.isMaximized;

        return (
            <div className="windowLayout">
                <header id="titlebar">
                    <div id="dragRegion">
                        {this.props.canNavigateBack &&
                            <div id="navControls">
                                <div className="button" id="backButton" onClick={this.onBackClick}>
                                    <span>&#xE72B;</span>
                                </div>
                            </div>
                        }
                        
                        <div id="windowTitle">
                            <span>Taco Taco</span>
                        </div>
                        <div id="windowControls">
                            <div className="button" id="minButton" onClick={this.onMinimizeClick}>
                                <span>&#xE921;</span>
                            </div>

                            {(isMaximized ?
                                <div className="button" id="restoreButton" onClick={this.onRestoreClick}>
                                    <span>&#xE923;</span>
                                </div>
                            :
                                <div className="button" id="maxButton" onClick={this.onMaximizeClick}>
                                    <span>&#xE922;</span>
                                </div>
                            )}

                            <div className="button" id="closeButton" onClick={this.onCloseClick}>
                                <span>&#xE8BB;</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div id="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
