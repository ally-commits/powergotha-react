import {createMuiTheme} from '@material-ui/core/styles'

export const theme = createMuiTheme({
  overrides: { 
    MuiButton: { 
      root : { 
        textTransform: 'capitalize',
        fontWeight: "400", 
        padding: '6px 14px', 
      },
      text: {  
        textTransform: 'capitalize',
      },
    },
  },
  palette: {
    primary: {
      main: "#2743FD",
    },
    secondary: {
      main: "#00acc1",
    },
  },
}); 