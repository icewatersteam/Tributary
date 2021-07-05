const Token = artifacts.require("Token");

contract("Token test", async accounts => {
  

  it("should auction a steam correctly", async () => {
    let instance = await Token.deployed();

    let transfer_amount = 20000;
    let bid_price = 5000;
    let ask_price = 3000;
    let bid_amount = 1;
    let ask_amount = 1;
    
    await instance.transfer(accounts[1], transfer_amount, { from: accounts[0] });
    await instance.steamBid(bid_price, bid_amount, { from: accounts[1] });
    await instance.steamAsk(ask_price, ask_amount, { from: accounts[0] });

    let steamBalance = await instance.balanceOfSteam(accounts[1]);

    assert.equal(bid_amount, steamBalance.toNumber(),'steam did not get transfered');

  });
  
 //  it("should set a steam bid and ask correctly", async () => {
 //    let instance = await Token.deployed();

 //    let transfer_amount = 20000;
 //    let price = 3000;
 //    let amount = 1;
    
 //    await  instance.transfer(accounts[1], transfer_amount, { from: accounts[0] });
 //    instance.steamBid(price, amount, { from: accounts[0] });
 //    instance.steamAsk(price, amount, { from: accounts[1] });

 //    let steam_bid_price = await instance.steamBidPrice.call(accounts[0]);
 //    let steam_bid_amount = await instance.steamBidAmount.call(accounts[0]);

 //    assert.equal(price, steam_bid_price.toNumber(),'price did not get set correctly');
 //    assert.equal(amount, steam_bid_amount.toNumber(),'amount did not get set');

 //    let steam_ask_price = await instance.steamAskPrice.call(accounts[1]);
 //    let steam_ask_amount = await instance.steamAskAmount.call(accounts[1]);

 //    assert.equal(price, steam_ask_price.toNumber(),'price did not get set correctly');
 //    assert.equal(amount, steam_ask_amount.toNumber(),'amount did not get set');
 //  });

 //  it("should set an ice bid and ask correctly", async () => {
 //    let instance = await Token.deployed();

 //    let transfer_amount = 20000;
 //    let price = 3000;
 //    let amount = 1;
    
 //    await  instance.transfer(accounts[1], transfer_amount, { from: accounts[0] });
 //    instance.iceBid(price, amount, { from: accounts[0] });
 //    instance.iceAsk(price, amount, { from: accounts[1] });

 //    let ice_bid_price = await instance.iceBidPrice.call(accounts[0]);
 //    let ice_bid_amount = await instance.iceBidAmount.call(accounts[0]);

 //    assert.equal(price, ice_bid_price.toNumber(),'price did not get set correctly');
 //    assert.equal(amount, ice_bid_amount.toNumber(),'amount did not get set');

 //    let ice_ask_price = await instance.iceAskPrice.call(accounts[1]);
 //    let ice_ask_amount = await instance.iceAskAmount.call(accounts[1]);

 //    assert.equal(price, ice_ask_price.toNumber(),'price did not get set correctly');
 //    assert.equal(amount, ice_ask_amount.toNumber(),'amount did not get set');
 //  });


 //  it("should get the current transaction index", async () => {
 //    let instance = await Token.deployed();
    
 //    let index = await instance.currentIceTransactionIndex();
 //    let amount = instance.iceAmountForTransaction(index);

    

 //  });

 // it("should send 20000 coin correctly to second account", async () => {
 //    // Get initial balances of first and second account.
 //    let account_one = accounts[0];
 //    let account_two = accounts[1];

 //    let amount = 20000;

 //    let instance = await Token.deployed();

 //    ('test');

 //    let balance = await instance.balanceOfWater.call(account_one);
 //    let account_one_starting_balance = balance.toNumber();

 //    balance = await instance.balanceOfWater.call(account_two);
 //    let account_two_starting_balance = balance.toNumber();
 //    await instance.transfer(account_two, amount, { from: account_one });

 //    balance = await instance.balanceOfWater.call(account_one);
 //    let account_one_ending_balance = balance.toNumber();

 //    balance = await instance.balanceOfWater.call(account_two);
 //    let account_two_ending_balance = balance.toNumber();

 //    assert.equal(
 //      account_one_ending_balance,
 //      account_one_starting_balance - amount,
 //      "Amount wasn't correctly taken from the sender"
 //    );
 //    assert.equal(
 //      account_two_ending_balance,
 //      account_two_starting_balance + amount,
 //      "Amount wasn't correctly sent to the receiver"
 //    );
 //  });

 // it("should put 1000000 Token in the first account", async () => {
 //    let instance = await Token.deployed();
 //    let balance = await instance.balanceOfWater.call(accounts[0]);
 //    assert.equal(balance.valueOf(), 1000000);
 //  });


});
