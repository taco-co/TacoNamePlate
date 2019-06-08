import React from "react";

// Styles
import "./styles.less";
import WindowLayout from "../WindowLayout";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { TextField, FormControl } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';

var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')

declare var __static;

interface Props {
}

interface State {
    comPorts: any[],
    selectedComPort: string;
    comMenuOpen: boolean;
    isConnected: boolean;
    displayText: string;
}

var port;

export default class HomeScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            comPorts: [],
            comMenuOpen: false,
            selectedComPort: '',
            isConnected: false,
            displayText: ''
        };
    }

    getConnectedArduino() {
        var comPortsList = [];

        SerialPort.list(function(err, ports) {
            ports.forEach(function(port) {
                comPortsList.push(port.comName);
            });
        });

        this.setState({
            comPorts: comPortsList
        })
    }

    componentWillMount() {
        setTimeout(() => {
            this.getConnectedArduino();
        }, 10);
    }

    componentWillUnmount() {

    }

    handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setTimeout(() => {
            this.setState({
                selectedComPort: event.target.value as string
            });
        }, 10);
    }

    handleDisplayChange = (event) => {
        const { target: { name, value } } = event;

        setTimeout(() => {
            this.setState({
                displayText: value as string
            })
        }, 10);
    };

    menuitems() {
        var i = 1;
        return this.state.comPorts.map((dt, i) => {
            return (
                <MenuItem className="menu-item"
                key={dt}
                value={dt}
             >{dt}</MenuItem>
            )
        });
    }

    connected = () => {
        console.log("Connected to arduino!");

        setTimeout(() => {
            this.setState({
                isConnected: true
            });
        }, 10);
    }

    connect = () => {
        port = new SerialPort(this.state.selectedComPort, {baudRate: 9600});

        port.on('open', this.connected);

        const parser = new Readline()
        port.pipe(parser)

        parser.on('data', line => console.log(`> ${line}`))
    }

    send = () => {
        port.write(this.state.displayText);
    }

    renderConnectButton() {
        if(this.state.selectedComPort !== "")
        {
            return(
                <div className="connect-button">
                    <Button variant="contained" size="small" onClick={this.connect}>Connect to Arduino</Button>
                </div>
            );
        }
        else
        {
            return (<div></div>);
        }
    }

    renderArduinoWriter() {
        if(this.state.isConnected == true)
        {
            return(
                <div>
                <div className="arduino-write">
                    <TextField label="Display Text" onChange={this.handleDisplayChange} value={this.state.displayText}/>
                </div>
                <div className="arduino-write">
                    <Button variant="contained" size="small" onClick={this.send}>Send to Arduino</Button>
                </div>
                </div>
            );
        }
        else
        {
            return(<div></div>);
        }
    }

    render() {
        return (
            <WindowLayout>
                <form className="content" autoComplete="off">
                <FormControl className="form-control">
                <InputLabel htmlFor="com-port">Select a COM port</InputLabel>
                <Select
                    value={this.state.selectedComPort}
                    onChange={this.handleChange}
                    fullWidth = {true}
                    inputProps={{
                        name: 'Select a COM port',
                        id: 'com-port',
                    }}
                    >
                    <MenuItem className="menu-item" value="">
                        <em>None</em>
                    </MenuItem>
                   
                    {this.menuitems()}
                </Select>
                </FormControl>
                </form>
                
                <div>
                    {this.renderConnectButton()}
                </div>

                <div>
                    {this.renderArduinoWriter()}
                </div>
            </WindowLayout>
        );
    }
}