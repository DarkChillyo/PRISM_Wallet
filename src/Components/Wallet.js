import { useEffect, useState } from "react";

//BootStrap
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Components
import { connectWallet } from "../util/interact";
import { getAPI } from '../util/getAPI'



const Wallet = (props) => {
    
    //API State Info
    const [apiData, setAPIData] = useState([]);
    console.log("WalletJS:  " + apiData)
    


    //Styles
    const useStyles = makeStyles({
        table: {
          minWidth: 300,
          maxWidth: 600,
        },
      }); 
  
    const classes = useStyles();  

 //Get API info
 useEffect(async () => {
 const walletResponse = await getAPI(props.chain, String(props.wallet));
  setAPIData(walletResponse.newData);
  console.log(apiData)
 
    })
  


const CustomImage =(name, url) => {
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
    else {
      return <img src= {url} height='50' />
    }
  }


  
  return (
<div> 
    <TableContainer component={Paper}
    style={{
        backgroundColor: "black",
        color: "#B10DC9"}}>
        <h3
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            
          }}>{props.chainName}</h3>
      <Table className={classes.table} size="medium" aria-label="a dense table" >
        <TableHead>
          <TableRow >
           <TableCell
           style={{
            backgroundColor: "black",
            color: "#B10DC9"}}
            >Logo</TableCell>
            <TableCell
            style={{
                backgroundColor: "black",
                color: "#B10DC9"}}
                >Name</TableCell>
            <TableCell
            style={{
                backgroundColor: "black",
                color: "#B10DC9"}}
                 align="right">Symbol</TableCell>
            <TableCell 
            style={{
                backgroundColor: "black",
                color: "#B10DC9"}}
                align="right">Balance</TableCell>
              
            
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((row) => (
            <TableRow key={row.contract_name} >
            <TableCell align="right"
            style={{
                backgroundColor: "black",
                color: "red"}}
                 component="th" scope="row">
            {CustomImage(row.contract_name, row.logo_url)}   
                </TableCell>  
              <TableCell
              style={{
                backgroundColor: "black",
                color: "#B10DC9"}}
                 component="th" scope="row">
                {row.contract_name}
              </TableCell>
              <TableCell 
              style={{
                backgroundColor: "black",
                color: "#B10DC9"}}
                align="right">{row.contract_ticker_symbol}</TableCell>
              
              <TableCell
              style={{
                backgroundColor: "black",
                color: "#B10DC9"}}
                 align="right"><div>{(parseInt(row.balance) / Math.pow(10, row.contract_decimals)).toFixed(4)}</div> </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
        }

      export default Wallet;