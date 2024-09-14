var _contractAddr = '';
var _circSupply = 0;
var _totalSupply = 0;

/**
 * Get from Ethplorer
 * 
 * @returns {Object}
 */
const getFromEthplorer = async () => {
  try {
    const url = `https://api.ethplorer.io/getTokenInfo/${_contractAddr}?apiKey=freekey`;
    const response = await fetch(url);
    const data = await response.json();

    const results = {
      price: data.price.rate,
      holdersCount: data.holdersCount,
      totalSupply: data.totalSupply,
      availableSupply: data.price.availableSupply,
      marketCap: data.price.marketCapUsd,
      circSupply: data.price.availableSupply
    };

    return results;
  } catch (err) {
    console.log('Error:', err);
  }
}

/**
 * Get best holders record
 * 
 * @returns {Object}
 */
const getBestHolders = async () => {
  try {
    const url = `https://api.ethplorer.io/getTopTokenHolders/${_contractAddr}?apiKey=EK-fNgrq-zkGLhWj-d9SEd&limit=1000`;
    const response = await fetch(url);
    const data = await response.json();

    let above0_1Percent = 0;
    let top100Percentage = 0.0;
    let counter = 0;
    
    const holders = data.holders;
    
    while (true) {
      const balance = holders[counter].balance;
      const percentage = (balance / _totalSupply) * 100;

      if (counter < 100) {
        top100Percentage += percentage;
      }
      
      if (percentage >= 0.1) {
        above0_1Percent++;
      }
      
      if (percentage < 0.1) {
        break;
      }
      
      counter++;
    }

    const bestHolders = {
      holdersAbove0_1Percent: above0_1Percent,
      top100Percentage: top100Percentage.toFixed(4),
    }

    return bestHolders;
  } catch (err) {
    console.error('Error:', err);
  }
}

/**
 * Get Etherscan Token Key Metrics
 * 
 * @param {String} contractAddr 
 * @returns 
 */
export const getEtherscanTKM = async (contractAddr) => {
  _contractAddr = contractAddr;

  try {
    const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${_contractAddr}`;
    const response = await fetch(url);
    const data = await response.json();

    const fromEthplorer = await getFromEthplorer();
    _circSupply = fromEthplorer.circSupply;
    _totalSupply = fromEthplorer.totalSupply;

    const bstHolders = await getBestHolders();

    const price = parseFloat(fromEthplorer.price);
    const bestHolders = await getBestHolders();

    const ethTKM = {
      tokenName: data.name,
      symbol: data.symbol,
      desc: data.description.en,
      price: price,
      holders: fromEthplorer.holdersCount,
      marketCap: fromEthplorer.marketCap,
      circulatingSupply: _circSupply,
      holdersAbove0_1Percent: bstHolders.holdersAbove0_1Percent,
      top100Percentage: bstHolders.top100Percentage + '%',
    }

    return ethTKM;
  } catch (err) {
    console.error('Error:', err);
  }
}