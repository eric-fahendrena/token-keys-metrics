var _mintAddr = '';
var _circSupply = 0;
var _symbol = '';

/**
 * Get circulating supply
 * 
 * @returns {Number}
 */
const getCircSupply = async () => {
  try {
    const url = `https://api.solana.fm/v1/tokens/${_mintAddr}/supply`;
    const response = await fetch(url);
    const data = await response.json();

    return data.circulatingSupply;
  } catch (err) {
    console.error('Error:', err);
  }
}

/**
 * Get price
 * 
 * @returns {Number|null}
 */
const getPrice = async () => {
  try {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${_symbol}&tsyms=usd`;
    const response = await fetch(url);
    const data = await response.json();

    return data.USD ? data.USD : null;
  } catch (err) {
    console.error('Error:', err);
  }
}

/**
 * Get solscan token key metrics
 * 
 * @param {String} mintAddr 
 * @returns {Object}
 */
export const getSolscanTKM = async (mintAddr) => {
  _mintAddr = mintAddr;
  _circSupply = await getCircSupply();

  try {
    const url = `https://api.solana.fm/v1/tokens/${_mintAddr}`;
    const response = await fetch(url);
    const data = await response.json();

    _symbol = data.tokenList.symbol;
    
    const price = await getPrice();

    const solTKM = {
      tokenName: data.tokenList.name,
      symbol: _symbol,
      price: price,
      marketCap: price * _circSupply,
      circulatingSupply: _circSupply,
    }

    return solTKM;
  } catch (err) {
    console.log('Error:', err);
  }
}
