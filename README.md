# Token Keys Metrics

This is an API that allows to get important token details for Tron, Ethereum and Solana.

## How to run it locally ?

To run this API locally, you can run the following command to start :
```bash
# clone the repo
git clone https://github.com/eric-fahendrena/token-keys-metrics.git
cd token-keys-metrics

# then install deps and run the server
npm install
npm start
```

## API Endpoints

- ### Tron : `GET - /tron/:contract_address`
  
  #### Expected Response
  ```json
    {
      "tokenName": "{Token Name}",
      "symbol": "{Symbol}",
      "desc": "{Description}",
      "price": "{price}",
      "holders": "{Holders count}",
      "marketCap": "{Market Cap}",
      "circulatingSupply": "{Circulating Supply}",
      "holdersAbove0_1Percent": "{Total holders holding >= 0.1%}",
      "top100Percentage": "{Top 100 holders holding percentage}"
    }
  ```

- ### Ethereum : `GET - /ether/:contract_address`
  #### Expected Response
  ```json
    {
      "tokenName": "{Token Name}",
      "symbol": "{Symbol}",
      "desc": "{Description}",
      "price": "{price}",
      "holders": "{Holders count}",
      "marketCap": "{Market Cap}",
      "circulatingSupply": "{Circulating Supply}",
      "holdersAbove0_1Percent": "{Total holders holding >= 0.1%}",
      "top100Percentage": "{Top 100 holders holding percentage}"
    }
  ```

- ### Solana : `GET - /sol/:mint_address`
  ### Expected Response
  ```json
    {
      "tokenName": "{Token Name}",
      "symbol": "{Symbol}",
      "price": "{price}",
      "marketCap": "{Market Cap}",
      "circulatingSupply": "{Circulating Supply}"
    }
  ```

  _**Note** : The restrictions with solana will be available soon._

## License

MIT License
