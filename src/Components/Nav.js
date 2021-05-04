import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#B10DC9',
    },
  },
});




export const Nav = (props) => {


return(
<div>
<ThemeProvider theme={theme}>  
<Button variant="outlined" color="secondary" id="walletButton" onClick={props.button}>
  {props.connected ? (
    
    String(props.wallet).substring(0, 6) +
    "..." +
    String(props.wallet).substring(38)
  ) : (
    <span>Connect Wallet</span>
  )}
</Button>
</ThemeProvider>
 
</div>
)
}