var _circSupply = 0;
var _decimals = 0;
var _bestHolders;

/**
 * Get circulating supply
 * 
 * @param {String} contractAddr 
 * @returns 
 */
const getCircSupply = async (contractAddr) => {
  try {
    const url = `https://apilist.tronscanapi.com/api/token_trc20/totalSupply?address=${contractAddr}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error:', err);
  }
}

/**
 * Get best holders
 * 
 * @param {String} contractAddr 
 * @returns 
 */
const getBestHolders = async (contractAddr) => {
  try {
    const url = `https://apilist.tronscanapi.com/api/token_trc20/holders?start=0&limit=100&contract_address=${contractAddr}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const holders = data.trc20_tokens;
    let addrSup01 = 0;
    let top100Perc = 0;
    
    data.trc20_tokens.forEach((holder, index) => {
      const balanceFloat = holder.balance / Math.pow(10, _decimals);
      const holdingPerc = (balanceFloat / _circSupply) * 100;

      if (index >= 100 && holdingPerc < 0.1) {
        return;
      }

      if (index < 100) {
        top100Perc += holdingPerc;
      }

      if (holdingPerc >= 0.1) {
        addrSup01++;
      }

    });

    return { top100Percentage: top100Perc, holdersAbove0_1Percent: addrSup01 };
  } catch (err) {
    console.log('Error:', err);
  }
}

/**
 * Get tronscan TKM
 * 
 * @param {String} contractAddr 
 * @returns 
 */
export const getTronscanTKM = async (contractAddr) => {
  _circSupply = await getCircSupply(contractAddr);
  _bestHolders = await getBestHolders(contractAddr);
  
  try {
    const url = `https://apilist.tronscanapi.com/api/token_trc20?contract=${contractAddr}`;
    const response = await fetch(url);
    const data = await response.json();

    _decimals = data.trc20_tokens[0].decimals;

    const tokenPrice = data.trc20_tokens[0].market_info.priceInUsd;
    const mktCap = tokenPrice * _circSupply;


    const trcTKM = {
      tokenName: data.trc20_tokens[0].name,
      symbol: data.trc20_tokens[0].symbol,
      desc: data.trc20_tokens[0].token_desc,
      price: tokenPrice,
      holders: data.trc20_tokens[0].holders_count,
      marketCap: mktCap,
      circulatingSupply: _circSupply,
      holdersAbove0_1Percent: _bestHolders.holdersAbove0_1Percent,
      top100Percentage: _bestHolders.top100Percentage,
    }
    return trcTKM;
  } catch (err) {
    console.error('Error:', err);
  }
}
