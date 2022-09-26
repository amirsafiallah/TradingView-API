const TradingView = require('../main');

const client = new TradingView.Client(); // Creates a websocket client

const listen = (symbolName, timeframe, onCandle) => {
  const chart = new client.Session.Chart(); // Init a Chart session

  chart.setMarket(symbolName, { // Set the market
    timeframe,
  });

  chart.onCandlesUpdate((candlesUpdate) => {
    onCandle(symbolName, timeframe, candlesUpdate);
  });
};

const main = async () => {
  listen('BINANCE:BTCUSDT', '1', console.log);
  listen('BINANCE:BTCUSDT', '15', console.log);
  listen('BINANCE:BTCUSDT', '1D', console.log);

  listen('BINANCE:ETHUSDT', '1', console.log);
  listen('BINANCE:ETHUSDT', '15', console.log);
  listen('BINANCE:ETHUSDT', '1D', console.log);
};

main().catch(console.log).catch(console.error);
