// Sample order data
const orders = [
    { type: 'Buy', price: 10.7, timestamp: '1:32 pm', quantity: 550},
    { type: 'Sell', price: 10.5, timestamp: '1:32 pm', quantity: 180},
    { type: 'Sell', price: 10.5, timestamp: '12:06 pm', quantity: 0},
    { type: 'Buy', price: 10.5, timestamp: '12:32 pm', quantity: 370},
    { type: 'Buy', price: 10.6, timestamp: '1:32 pm', quantity: 550},
    { type: 'Sell', price: 20.5, timestamp: '12:06 pm', quantity: 180},
    { type: 'Sell', price: 21.5, timestamp: '1:06 pm', quantity: 0},
    { type: 'Buy', price: 10.5, timestamp: '1:32 pm', quantity: 370}
  ];
  
  
  
  function getCurrentTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} pm`; // Assuming it's always in the afternoon
  }
  
   // Get the current date
   const currentDate = new Date();
  
  // Function to sort orders based on Price-Time-Quantity priority
  function sortOrders(orders) {
    const buyOrders = orders.filter(order => order.type === 'Buy');
    const sellOrders = orders.filter(order => order.type === 'Sell');
  
    buyOrders.sort((a, b) => {
      if (a.price !== b.price) return b.price - a.price;
      if (a.timestamp !== b.timestamp){
      // Assuming timestamp is in 'hh:mm am/pm' format
      const timeA = new Date(currentDate.toDateString() + ' ' + a.timestamp);
      const timeB = new Date(currentDate.toDateString() + ' ' + b.timestamp);
      return timeA - timeB;
    }
      return b.quantity - a.quantity;
    });
  
    sellOrders.sort((a, b) => {
      if (a.price !== b.price) return b.price - a.price;
      if (a.timestamp !== b.timestamp){
      // Assuming timestamp is in 'hh:mm am/pm' format
      const timeA = new Date(currentDate.toDateString() + ' ' + a.timestamp);
      const timeB = new Date(currentDate.toDateString() + ' ' + b.timestamp);
      return timeA - timeB;
    }
      return b.quantity - a.quantity;
    });
  
    return { buyOrders, sellOrders };
  }
  
  // Function to match and update orders
  function matchOrdersAndSaveToDatabase(buyOrders, sellOrders) {
    const matchingOrders = [];
  
    for (const buyOrder of buyOrders) {
      for (const sellOrder of sellOrders) {
        if (buyOrder.price === sellOrder.price) {
          const tradeQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);
  
          if (tradeQuantity > 0) {
            const tradeRecord = {
              price: buyOrder.price,
              timestamp: getCurrentTimestamp(),
              quantity: tradeQuantity,
              buyer: 'User', // Replace with actual user ID
              seller: 'Client', // Replace with actual client ID
            };
  
            // mysql setup to store data in database
            const mysql = require('mysql2');
  
            //database connection settings
            const db = mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: 'Reshma@123',
              database: 'tutorial',
            });
            // Connect to the database
            db.connect((err) => {
              if (err) {
                console.error('Error connecting to the database:', err);
                return;
              }
              console.log('Connected to the database');
            });
            db.query(`
              CREATE TABLE IF NOT EXISTS trades (
                id INT AUTO_INCREMENT PRIMARY KEY,
                price DECIMAL(10, 2) NOT NULL,
                timestamp VARCHAR(20) NOT NULL,
                quantity INT NOT NULL,
                buyer VARCHAR(100) NOT NULL,
                seller VARCHAR(100) NOT NULL
              )
            `, (err, result) => {
              if (err) {
                console.error('Error creating the "trades" table:', err);
              } else {
                console.log('Table "trades" created or already exists');
              }
            });
            // Insert the trade record into the database
            const sql = 'INSERT INTO trades (price, timestamp, quantity, buyer, seller) VALUES (?, ?, ?, ?, ?)';
            const values = [
              tradeRecord.price,
              tradeRecord.timestamp,
              tradeRecord.quantity,
              tradeRecord.buyer,
              tradeRecord.seller,
            ];
  
            db.query(sql, values, (err, result) => {
              if (err) {
                console.error('Error inserting trade record into the database:', err);
              } else {
                console.log('Trade record inserted into the database:', result);
              }
            });
  
            matchingOrders.push(tradeRecord);
  
            // Update order quantities
            buyOrder.quantity -= tradeQuantity;
            sellOrder.quantity -= tradeQuantity;
          }
        }
      }
    }  
      // Filter out orders with quantity '0'
      const updatedBuyOrders = buyOrders.filter((order) => order.quantity > 0);
      const updatedSellOrders = sellOrders.filter((order) => order.quantity > 0);
    console.log('Buy Orders:', updatedBuyOrders);
    console.log('Sell Orders:', updatedSellOrders);
    console.log('Matched Orders:', matchingOrders);
  
    // Store the trade record in the database or another data structure
    for (const order of matchingOrders) {
      console.log(
        'Traded Order:',
        `Traded, Rs. ${order.price}/-, ${order.timestamp}, ${order.quantity}, Buyer: ${order.buyer}, Seller: ${order.seller}`
      );
    }
  }
  
  
    const { buyOrders, sellOrders } = sortOrders(orders);
    matchOrdersAndSaveToDatabase(buyOrders, sellOrders );
  
  //run every minute to update the entries after trading  and updates made by user.
  // setInterval(() => {
  //   const { buyOrders, sellOrders } = sortOrders(orders);
  //   matchOrders(buyOrders, sellOrders );
  //   console.log('--------------------------------------------------------------');
  // }, 60000); // Run every minute
  
  