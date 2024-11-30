
app.post('/api/validate-api', async (req, res) => {
  try {
    const accounts = await validateKuCoinAPI();
    res.status(200).json({ success: true, accounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to start the Hummingbot in paper trade mode
app.post('/api/bot/start', (req, res) => {
  const { botConfig } = req.body; // Configuration like exchange, trading pair, etc.
  
  // Assuming that botConfig is valid and passed from the frontend
  console.log('Bot Config:', botConfig);

  // Start the Hummingbot using system commands
  exec('hummingbot start', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ success: false, message: 'Error starting bot' });
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    res.status(200).json({ success: true, message: 'Bot started successfully!' });
  });
});

// Route to stop the Hummingbot
app.post('/api/bot/stop', (req, res) => {
  exec('pkill -f hummingbot', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ success: false, message: 'Error stopping bot' });
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    res.status(200).json({ success: true, message: 'Bot stopped successfully!' });
  });
});
