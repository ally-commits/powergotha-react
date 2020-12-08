import {createMuiTheme} from '@material-ui/core/styles'

export const theme = createMuiTheme({
  overrides: { 
    MuiButton: { 
      root : { 
        textTransform: 'capitalize',
        fontWeight: "400", 
        padding: '8px 18px', 
        color: "white",
        borderRadius: '4px'
      },
      text: {  
        textTransform: 'capitalize',
        color: "white"
      },
    },
  },
  palette: {
    primary: {
      main: "#20BE4D"
    },
    secondary: {
      main: "#00acc1",
    },
  },
}); 