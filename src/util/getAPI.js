

export const getAPI = async (chainId, accounts) => {
  
  console.log("util:  " + chainId)
  console.log("util:  " + accounts)

  let response = await fetch(`https://api.covalenthq.com/v1/${chainId}/address/${accounts}/balances_v2/`);
  let data = await response.json();
  //if (props.filter == 'true') {
  console.log("util:  " + data.data.items.filter(item => item.balance >0));
  let newData = data.data.items.filter(item => item.balance >0)
  console.log("util:  " + newData)
  const obj =
    {
      newData
    }
    return obj

}