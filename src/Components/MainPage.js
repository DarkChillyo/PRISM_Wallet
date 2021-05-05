import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from "react";
import { connectWallet } from "../util/interact";
import { Nav } from './Nav'
import Wallet from './Wallet'
import Button from '@material-ui/core/Button'
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';


//Theme
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


//Material-UI Styles
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const MainPage = () => {
   
//Web3 State Info
   const [isConnected, setConnectedStatus] = useState(false);
   const [walletAddress, setWallet] = useState("");
   const [status, setStatus] = useState("");

//Chain State Info
   const [chainState, setChainState] = useState(true);
   console.log("toggle: " + chainState)
  

//Check Metamask

useEffect(async () => {
   if (window.ethereum) {
     try {
       const accounts = await window.ethereum.request({ method: "eth_accounts" })
       if (accounts.length) {
         setConnectedStatus(true);
         setWallet(accounts[0]);
       } else {
         setConnectedStatus(false);
         setStatus("🦊 Connect to Metamask using the top right button.");
       }
     } catch {
       setConnectedStatus(false);
       setStatus(
         "🦊 Connect to Metamask using the top right button. " +
           walletAddress
       );
     }
   }
 });
   
   

   const connectWalletPressed = async () => {
   const walletResponse = await connectWallet();
   setConnectedStatus(walletResponse.connectedStatus);
   setStatus(walletResponse.status);
   if (isConnected) {
     setWallet(walletAddress);
   }} 

   const classes = useStyles();
   
   const whichChainNumber = () => {
    if (chainState == true) {
      return "1"
    }
       else {
      return "137"
       }
    }

    const whichChainName = () => {
        if (chainState == true) {
          return "Ethereum"
        }
           else {
          return "Matic"
           }
        }

   
   return (
    
        
    <div className={classes.root}>
    
    <Grid container>
        <Grid item xs={6} justify="flex-start">
    <ThemeProvider theme={theme}> 
    <Button variant="outlined" color="secondary" id="walletButton" onClick={() => setChainState(!chainState)}>{whichChainName()}</Button>
    </ThemeProvider>
    </Grid>
    
    <Grid item xs={6} justify="flex-end">
    <Nav button ={connectWalletPressed} wallet={walletAddress} connected={isConnected} />
    </Grid>
   
    </Grid>

    <Grid container justify="flex-center" >
        <Grid item xs={6} sm={6} >
            <Wallet wallet = {walletAddress} chain={whichChainNumber()} chainName={whichChainName()} />
        </Grid>
        
    </Grid>

</div>



         
          
   
      
     )
   }

   export default MainPage;
