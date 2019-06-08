import React 	from 'react';

const {ipcRenderer} = require('electron');

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './app.less';
import ScreenManager from './components/ScreenManager';
import { EventManager } from './utils/EventManager';
import { AppScreens } from './types/AppScreens';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff',
			contrastText: '#fff',
		},
		secondary: {
			main: '#616161',
			contrastText: '#232323',
		},
		text: {
			primary: "#fff",
			secondary: "#000"
		},
	},
	overrides: {
		MuiButton: {
			root: {
				fontSize: "1.6rem",
			},
			label: {
				textTransform: "none",
			},
			flatPrimary: {},
			flatSecondary: {},
			raised: {},
			raisedPrimary: {},
			raisedSecondary: {},
			sizeSmall: {
				fontSize: "1.0rem",
			},
			sizeLarge: {
				fontSize: "1.9rem",
			},
		},
		MuiInput: {
			input: {
				height: "2.1em",
				padding: "7px 7px",
				backgroundColor: "rgba(255, 255, 255, 0.164)",
				borderRadius: "2px",
				boxSizing: "border-box",
				transition: "background-color ease-out 260ms",
				color: "rgb(245, 245, 245)",

				"&:focus": {
					backgroundColor: "rgb(238, 238, 238)",
					color: "rgb(32, 32, 32)"
				}
			},
			inputType: {
				height: "2.1em",
				padding: "7px 7px",
				backgroundColor: "rgba(255, 255, 255, 0.164)",
				borderRadius: "2px",
				boxSizing: "border-box",
				transition: "background-color ease-out 260ms",
				color: "rgb(245, 245, 245)",

				"&:focus": {
					backgroundColor: "rgb(238, 238, 238)",
					color: "rgb(32, 32, 32)"
				}
			},
		},
		MuiInputLabel: {
			root: {
				padding: "1px 7px 0 7px",
				color: "rgb(245, 245, 245)"
			},
		},
		MuiFormControlLabel: {
			label: {
				fontSize: 18
			},
		},
		MuiCheckbox: {
			root: {
				color: "#ffa129"
			}
		},
		MuiSelect: {
			select: {
				height: "2.1em",
				padding: "7px 7px 7px 7px",
				backgroundColor: "rgba(255, 255, 255, 0.164)",
				borderRadius: "2px",
				boxSizing: "border-box",
				transition: "background-color ease-out 260ms",
				color: "rgb(245, 245, 245)",

				"&:focus": {
					backgroundColor: "rgba(255, 255, 255, 0.164)",
					color: "rgb(245, 245, 245)"
				}
			}
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		h3: {
			fontWeight: 500
		},
		h4: {
			fontWeight: 500
		},
	},
});

interface State {
	
}

// Application wrapper, which is the parent of all components in the main screen. Handles kiosk
// splash screen and POS screen switch, as well as any parent logic from either screens. Any
// database or app startup logic should go here.
export default class App extends React.Component<{}, State> {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		setTimeout(async () => {
			// Navigate to the home screen.
			await EventManager.dispatchAsync("navigate", {
				screen: AppScreens.Home
			});
		}, 400);
	}

	componentWillUnmount() {
		
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<ScreenManager />
			</MuiThemeProvider>
		)
	}
}
