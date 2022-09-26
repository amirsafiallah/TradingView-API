const TradingView = require('../main');

const client = new TradingView.Client(); // Creates a websocket client
const chart = new client.Session.Chart(); // Init a Chart session

const loadWholeChartHistory = (symbolName, timeframe) => {
  chart.setMarket(symbolName, { // Set the market
    timeframe,
  });

  let fetchMoreInterval = null;

  chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
    fetchMoreInterval = setInterval(() => {
      chart.fetchMore(1000);
    }, 2_000);
  });

  return new Promise((resolve, reject) => {
    const onFinally = () => {
      if (fetchMoreInterval) {
        clearInterval(fetchMoreInterval);
      }
    };

    const onDone = () => {
      onFinally();
      resolve(chart.periods);
    };

    const onError = (err) => {
      reject(err);
    };

    chart.onError((...err) => { // Listen for errors (can avoid crash)
      onError(...err);
    });

    chart.onSeriesCompleted(({ data_completed: dataCompleted }) => {
      if (dataCompleted === 'end' || dataCompleted === 'limit') {
        onDone();
      }
    });
  });
};

const main = async () => {
  const data = await loadWholeChartHistory('BINANCE:BTCUSDT', '1');
  console.log(data);
};

main().catch(console.log).catch(console.error);
