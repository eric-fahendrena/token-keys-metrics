import express from 'express';
import cors from 'cors';
import { getTronscanTKM } from './tronscan.mjs';
import { getSolscanTKM } from './solscan.mjs';
import { getEtherscanTKM } from './etherscan.mjs';

const app = express();
const port = 5000;

app.use(cors());

/**
 * tron token key metrics
 */
app.get('/tron/:addr', async (req, res) => {
  const addr = req.params.addr;
  const trcTKM = await getTronscanTKM(addr);
  
  res.json(trcTKM);
});

app.get('/sol/:addr', async (req, res) => {
  const addr = req.params.addr;
  const slcTKM = await getSolscanTKM(addr);
  
  res.json(slcTKM);
});

app.get('/ether/:addr', async (req, res) => {
  const addr = req.params.addr;
  const ethTKM = await getEtherscanTKM(addr);

  res.json(ethTKM);
});

// running server

app.listen(port, () => {
  console.log('Server running on port', port);
});
