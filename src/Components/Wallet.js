import { useEffect, useState } from "react";

//BootStrap
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';



//Components
import { connectWallet } from "../util/interact";
import { getAPI } from '../util/getAPI'



const Wallet = (props) => {
    
    //API State Info
    const [apiData, setAPIData] = useState([]);
    console.log("WalletJS:  " + apiData)
    


    //Styles
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

 //Get API info
 useEffect(async () => {
 const walletResponse = await getAPI(props.chain, String(props.wallet));
  setAPIData(walletResponse.newData);
  console.log(apiData)
 
    })
  


    function CustomImage(name, url) {
        let imagename = name 
        let imageurl = url
        if (imagename == "Matic Token") {
         return <img src='https://logos.covalenthq.com/tokens/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png' height='50' /> 
        }
        else if (imageurl == "") {
            return <img 
            style={{
                borderRadius: "50%",
                width: 50,
                height: 50,
                background: "red",
                display: "block"
              }}
            src='https://rlv.zcache.ca/question_mark_classic_round_sticker-rc057742187e944779b84e5056ae3d426_0ugmp_8byvr_540.jpg' />
           }
        else if (imagename == "PRISM Token") {
            return <img src='https://www.prismnetwork.io/images/logo-prism-network.png' height='50' />
        }
        else if (imagename == "Uniswap V2") {
            return <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqtYzDdBeCyYDkXAn03x0XqxUuVd847cjaeXezJHejedEUua8XtoM6XXGZVJYqQlVF60&usqp=CAU' height='50' />
        }
        else {
          return <img src= {url} height='50' />
        }
  }


  const secondaryColor = {
    color: '#51c4d3'
 }
  return (
<div> 
<h3 align="left"
        >
              
     {props.chainName}
     
     </h3>

     <div className="list">
      <ThemeProvider theme={theme}>
      <List component="nav" aria-label="main mailbox folders">
    
    
      {apiData.map((row) => (
          <div>
          <ListItem >
          <ListItemIcon>
          {CustomImage(row.contract_name, row.logo_url)}
          </ListItemIcon> 
          <ListItemText secondaryTypographyProps={{ style: secondaryColor }} 
          primary={row.contract_ticker_symbol + "   -   " + row.contract_name}  
          secondary={(parseInt(row.balance) / Math.pow(10, row.contract_decimals)).toFixed(4)}
         />
       
         
          </ListItem>
          
          </div>
      ))}
     
      </List>
      
    </ThemeProvider>
    </div>
    </div>


   
  )
        }

      export default Wallet;