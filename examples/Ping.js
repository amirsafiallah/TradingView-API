const TradingView = require('../main');

const main = async () => {
  const client = new TradingView.Client();
  let lastPing = Date.now();
  client.onPing(() => {
    console.log('Last Ping', Date.now() - lastPing);
    lastPing = Date.now();
  });

  client.onPingTimeout(() => {
    console.error('Timeout! Exit...');
    process.exit(1);
  });

  client.onDisconnected(() => {
    console.error('Disconnected! Exit...');
    process.exit(1);
  });
};

main().catch(console.log).catch(console.error);
