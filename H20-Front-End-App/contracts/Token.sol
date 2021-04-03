
pragma solidity >=0.6.0 <=0.8.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Decimal.sol";

//Token Contract

contract Token {
    using SafeMath for uint256;
    using Decimal for Decimal.D256;

    string public name = "H2O";
    uint8 public decimals = 18;
    string public symbol = "H2O";
    string public version = "1.0";
    uint256 public lastSupplyChange;

    //address private constant TREASURY_ADDRESS = address(0xA8202bb43C1978Ec1780bfBCfeA56DC032f5cA91);
    uint256 private constant ICE_MELT = 1; //how much water is generated by an ice each day;
    uint256 private constant ICE_MELT_FREQ = 8;//86400 how many seconds between icemelts right now set to one day. 
    uint256 private constant WATER_ICE_RATIO = 4000;
    uint256 private constant TARGET_ICE_PRICE = 4000;
    uint256 private constant MIN_ICE_PRICE = 3000;
    uint256 private constant MAX_ICE_PRICE = 5000;

    uint256 private constant init_water = 1000000;
    uint256 private constant init_ice = 200;
    uint256 private constant init_steam = 100;

    //Structure
    struct Account {
        uint256 ice;
        uint256 steam;
        uint256 water;
        bool existsInArray;
    }

    struct SteamBid {
        uint256 price;
        uint256 amount;
    }

    struct SteamAsk {
        uint256 price;
        uint256 amount;
    }

    struct IceBid {
        uint256 price;
        uint256 amount;
    }

    struct IceAsk {
        uint256 price;
        uint256 amount;
    }

    struct Balance {
        uint256 waterSupply;
        uint256 iceSupply;
        uint256 steamSupply;
    }

    struct Transaction {
        uint256 price;
        uint256 amount;
        uint256 blockNum;
    }

    struct Market {
        Transaction[] steamTransactions;
        Transaction[] iceTransactions;
        mapping(address => IceBid) iceBids;
        mapping(address => IceAsk) iceAsks;
        mapping(address => SteamBid) steamBids;
        mapping(address => SteamAsk) steamAsks;
    }

    struct State {
        bool contraction;
        Balance balance;
        Market market;
        mapping(address => Account) accounts;
        mapping (address => mapping (address => uint256)) allowed;
        address[] accountList;
        uint lastIceMelt;
    }

    State _state;

    //Getters

    // function getTreasuryAddress() public pure returns(address) {
    //     return TREASURY_ADDRESS;
    // }

    function getIceMelt() public pure returns(uint256) {
        return ICE_MELT;
    }

    function getWaterIceRatio() public pure returns(uint256) {
        return WATER_ICE_RATIO;
    }

    function getTargetIcePrice() public pure returns(uint256) {
        return TARGET_ICE_PRICE;
    }

    function getMinIcePrice() public pure returns(uint256) {
        return MIN_ICE_PRICE;
    }

    function getMaxIcePrice() public pure returns(uint256) {
        return MAX_ICE_PRICE;
    }

    /**
     * Global
     */

    function balanceOfIce(address account) public view returns (uint256) {
        return _state.accounts[account].ice;
    }

    function balanceOfWater(address account) public view returns (uint256) {
        return _state.accounts[account].water;
    }

    function balanceOfSteam(address account) public view returns (uint256) {
        return _state.accounts[account].steam;
    }

    function totalIceSupply() public view returns (uint256) {
        return _state.balance.iceSupply;
    }

    function totalWaterSupply() public view returns (uint256) {
        return _state.balance.waterSupply;
    }

    function totalSteamSupply() public view returns (uint256) {
        return _state.balance.steamSupply;
    }

    function iceBidAmount(address account) public view returns (uint256) {
        return _state.market.iceBids[account].amount;
    }

    function iceBidPrice(address account) public view returns (uint256) {
        return _state.market.iceBids[account].price;
    }

    function iceAskAmount(address account) public view returns (uint256) {
        return _state.market.iceAsks[account].amount;
    }

    function iceAskPrice(address account) public view returns (uint256) {
        return _state.market.iceAsks[account].price;
    }

    function steamBidAmount(address account) public view returns (uint256) {
        return _state.market.steamBids[account].amount;
    }

    function steamBidPrice(address account) public view returns (uint256) {
        return _state.market.steamBids[account].price;
    }

    function steamAskAmount(address account) public view returns (uint256) {
        return _state.market.steamAsks[account].amount;
    }

    function steamAskPrice(address account) public view returns (uint256) {
        return _state.market.steamAsks[account].price;
    }

    function currentSteamTransactionIndex() public view returns (uint256) {
        return _state.market.steamTransactions.length - 1;
    }

    function currentIceTransactionIndex() public view returns (uint256) {
        return _state.market.iceTransactions.length - 1;
    }

    function steamAmountForTransaction(uint256 index) public view returns (uint256) {
        return _state.market.steamTransactions[index].amount;
    }

    function steamPriceForTransaction(uint256 index) public view returns (uint256) {
        return _state.market.steamTransactions[index].price;
    }

    function iceAmountForTransaction(uint256 index) public view returns (uint256) {
        return _state.market.iceTransactions[index].amount;
    }

    function icePriceForTransaction(uint256 index) public view returns (uint256) {
        return _state.market.iceTransactions[index].price;
    }

    function blockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function secondsSinceLastIceMelt() public view returns (uint256) {
        return now-_state.lastIceMelt;
    }

    //Setters

    /**
     * Global
     */

    function incrementTotalWaterSupply(uint256 amount) internal {
        _state.balance.waterSupply = _state.balance.waterSupply.add(amount);
    }

    function decrementTotalWaterSupply(uint256 amount) internal {
        _state.balance.waterSupply = _state.balance.waterSupply.sub(amount);
    }

    function incrementTotalIceSupply(uint256 amount) internal {
        _state.balance.iceSupply = _state.balance.iceSupply.add(amount);
    }

    function decrementTotalIceSupply(uint256 amount) internal {
        _state.balance.iceSupply = _state.balance.iceSupply.sub(amount);
    }

    function incrementTotalSteamSupply(uint256 amount) internal {
        _state.balance.steamSupply = _state.balance.steamSupply.add(amount);
    }

    function decrementTotalSteamSupply(uint256 amount) internal {
        _state.balance.steamSupply = _state.balance.steamSupply.sub(amount);
    }

    /**
     * Account
     */

    function incrementBalanceOfWater(address account, uint256 amount) internal {
        _state.accounts[account].water = _state.accounts[account].water.add(amount);
        _state.balance.waterSupply = _state.balance.waterSupply.add(amount);
    }

    function decrementBalanceOfWater(address account, uint256 amount) internal {
        _state.accounts[account].water = _state.accounts[account].water.sub(amount);
        _state.balance.waterSupply = _state.balance.waterSupply.sub(amount);
    }

    function incrementBalanceOfIce(address account, uint256 amount) internal {
        _state.accounts[account].ice = _state.accounts[account].ice.add(amount);
        _state.balance.iceSupply = _state.balance.iceSupply.add(amount);
    }

    function decrementBalanceOfIce(address account, uint256 amount) internal {
        _state.accounts[account].ice = _state.accounts[account].ice.sub(amount);
        _state.balance.iceSupply = _state.balance.iceSupply.sub(amount);
    }

    function incrementBalanceOfSteam(address account, uint256 amount) internal {
        _state.accounts[account].steam = _state.accounts[account].steam.add(amount);
        _state.balance.steamSupply = _state.balance.steamSupply.add(amount);
    }

    function decrementBalanceOfSteam(address account, uint256 amount) internal {
        _state.accounts[account].steam = _state.accounts[account].steam.sub(amount);
        _state.balance.steamSupply = _state.balance.steamSupply.sub(amount);
    }

    /**
     * Bid and Ask
     */
    function setIceBidPrice(address account, uint256 amount) internal {
        _state.market.iceBids[account].price = amount;
    }

    function setIceBidAmount(address account, uint256 amount) internal {
        _state.market.iceBids[account].amount = amount;
    }

    function incrementIceBidAmount(address account, uint256 amount) internal {
        _state.market.iceBids[account].amount = _state.market.iceBids[account].amount.add(amount);
    }

    function decrementIceBidAmount(address account, uint256 amount) internal {
        _state.market.iceBids[account].amount = _state.market.iceBids[account].amount.sub(amount);
    }

    function setIceAskPrice(address account, uint256 amount) internal {
        _state.market.iceAsks[account].price = amount;
    }

    function setIceAskAmount(address account, uint256 amount) internal {
        _state.market.iceAsks[account].amount = amount;
    }

    function incrementIceAskAmount(address account, uint256 amount) internal {
        _state.market.iceAsks[account].amount = _state.market.iceAsks[account].amount.add(amount);
    }

    function decrementIceAskAmount(address account, uint256 amount) internal {
        _state.market.iceAsks[account].amount = _state.market.iceAsks[account].amount.sub(amount);
    }

    function setSteamBidPrice(address account, uint256 amount) internal {
        _state.market.steamBids[account].price = amount;
    }

    function setSteamBidAmount(address account, uint256 amount) internal {
        _state.market.steamBids[account].amount = amount;
    }

    function incrementSteamBidAmount(address account, uint256 amount) internal {
        _state.market.steamBids[account].amount = _state.market.steamBids[account].amount.add(amount);
    }

    function decrementSteamBidAmount(address account, uint256 amount) internal {
        _state.market.steamBids[account].amount = _state.market.steamBids[account].amount.sub(amount);
    }

    function setSteamAskAmount(address account, uint256 amount) internal {
        _state.market.steamAsks[account].amount = amount;
    }

    function setSteamAskPrice(address account, uint256 price) internal {
        _state.market.steamAsks[account].price = price;
    }

    function incrementSteamAskAmount(address account, uint256 amount) internal {
        _state.market.steamAsks[account].amount = _state.market.steamAsks[account].amount.add(amount);
    }

    function decrementSteamAskAmount(address account, uint256 amount) internal {
        _state.market.steamAsks[account].amount = _state.market.steamAsks[account].amount.sub(amount);
    }

    function addSteamTransaction(uint256 price, uint256 amount, uint256 blockNum) internal {
        _state.market.iceTransactions.push(Transaction({
            price: price,
            amount: amount,
            blockNum: blockNum
        }));
    }

    function addIceTransaction(uint256 price, uint256 amount, uint256 blockNum) internal {
        _state.market.iceTransactions.push(Transaction({
            price: price,
            amount: amount,
            blockNum: blockNum
        }));
    }

    //Market functions
    function iceBid(uint256 price, uint256 amount) public returns (bool) {
        setIceBidAmount(msg.sender, amount);
        setIceBidPrice(msg.sender, price);
        addAccount(msg.sender);
        processIceBid(msg.sender);
        return true;
    }

    function iceAsk(uint256 price, uint256 amount) public returns (bool) {
        setIceAskAmount(msg.sender, amount);
        setIceAskPrice(msg.sender, price);
        addAccount(msg.sender);
        processIceAsk(msg.sender);
        return true;
    }

    function steamBid(uint256 price, uint256 amount) public returns (bool) {
        setSteamBidAmount(msg.sender, amount);
        setSteamBidPrice(msg.sender, price);
        addAccount(msg.sender);
        processSteamBid(msg.sender);
        return true;
    }

    function steamAsk(uint256 price, uint256 amount) public returns (bool) {
        setSteamAskAmount(msg.sender, amount);
        setSteamAskPrice(msg.sender, price);
        addAccount(msg.sender);
        processSteamAsk(msg.sender);
        return true;
    }

    function performIceTransaction(address buyer, address seller, uint256 price, uint256 iceAmount) internal returns (bool) {
        uint256 waterAmount = iceAmount*price;
        uint256 buyerWater = _state.accounts[buyer].water;
        uint256 sellerIce = _state.accounts[seller].ice;

        if (buyerWater >= waterAmount && sellerIce >= iceAmount) {
            decrementBalanceOfWater(buyer, waterAmount);
            incrementBalanceOfIce(buyer, iceAmount);

            incrementBalanceOfWater(seller, waterAmount);
            decrementBalanceOfIce(seller, iceAmount);

            addIceTransaction(price, iceAmount, block.number);
            return true;
        }

        return false;
    }

    function performSteamTransaction(address buyer, address seller, uint256 price, uint256 steamAmount) internal returns (bool) {
        uint256 waterAmount = steamAmount*price;
        uint256 buyerWater = _state.accounts[buyer].water;
        uint256 sellerSteam = _state.accounts[seller].steam;

        if (buyerWater >= waterAmount && sellerSteam >= steamAmount) {
            decrementBalanceOfWater(buyer, waterAmount);
            incrementBalanceOfSteam(buyer, steamAmount);

            if (_state.contraction) {
                decrementTotalWaterSupply(waterAmount);
                incrementTotalSteamSupply(steamAmount);
            } else {
                incrementBalanceOfWater(seller, waterAmount);
                decrementBalanceOfSteam(seller, steamAmount);
            }

            addSteamTransaction(price, steamAmount, block.number);
            return true;
        }

        return false;
    }

    function processIceBid(address buyer) internal returns (bool) { //someone wants to buy ice
        uint256 waterAmount = _state.market.iceBids[buyer].amount*_state.market.iceBids[buyer].price;
        uint256 buyerWater = _state.accounts[buyer].water;

        //the buyer needs enough water to buy
        if (buyerWater < waterAmount || _state.market.iceBids[buyer].price <= 0) {
            return false;
        }

        uint256 lowestAskPrice = 0;
        address seller;
        //address treasury = getTreasuryAddress();

        //find the lowest asking price and the associated seller
        for (uint256 i = 0; i < _state.accountList.length; i++) {
            address candidate = _state.accountList[i];
            if (_state.market.iceAsks[candidate].amount != uint(-1) && _state.market.iceAsks[candidate].amount > 0 && _state.accounts[candidate].ice > 0) {
                if (lowestAskPrice == 0 || _state.market.iceAsks[candidate].price < lowestAskPrice) {
                    seller = candidate;
                    lowestAskPrice = _state.market.iceAsks[candidate].price;
                }
            }
        }

        //determine if the seller can satisfy the amount of the bid, and then process the bid accordingly
        if (lowestAskPrice > 0 && lowestAskPrice <= _state.market.iceBids[buyer].price && _state.market.iceBids[buyer].amount > 0) {
            uint256 amountForSale = min( _state.accounts[seller].ice, _state.market.iceAsks[seller].amount);
            uint256 saleAmount = min(_state.market.iceBids[buyer].amount, amountForSale);

            performIceTransaction(buyer, seller, _state.market.iceBids[buyer].price, saleAmount);
            decrementIceAskAmount(seller, saleAmount);
            decrementIceBidAmount(buyer, saleAmount);

            if (_state.market.iceBids[buyer].amount > 0) {
                processIceBid(buyer);
            }
        }

        triggerSupplyChange();
        return true;
    }

    function processIceAsk(address seller) internal returns (bool) { //someone wants to sell ice
        //the seller needs ask > 0 and have enough ice to sell
        if (_state.accounts[seller].ice < _state.market.iceAsks[seller].amount || _state.market.iceAsks[seller].price <= 0) {
            return false;
        }

        uint256 highestBidPrice = 0;
        address buyer;

        //find the highest bid price and the associated buyer
        for (uint256 i = 0; i < _state.accountList.length; i++) {
            address candidate = _state.accountList[i];
            if (_state.market.iceBids[candidate].amount != uint(-1)
                && _state.market.iceBids[candidate].amount > 0
                && _state.market.iceBids[candidate].price > highestBidPrice) {
                buyer = candidate;
                highestBidPrice = _state.market.iceBids[candidate].price;
            }
        }

        //determine if the buyer can satisfy the amount of the ask, and then process the ask accordingly
        if (highestBidPrice > 0 && highestBidPrice >= _state.market.iceAsks[seller].price && _state.market.iceAsks[seller].amount > 0) {
            uint256 amountToBuy = min(_state.market.iceBids[buyer].amount, _state.accounts[buyer].water/_state.market.iceAsks[seller].price);
            uint256 saleAmount = min(_state.market.iceAsks[seller].amount, amountToBuy);

            performIceTransaction(buyer, seller, _state.market.iceAsks[seller].price, saleAmount);
            decrementIceBidAmount(buyer, saleAmount);
            decrementIceAskAmount(seller, saleAmount);

            if (_state.market.iceAsks[seller].amount > 0) {
                processIceAsk(seller);
            }
        }

        triggerSupplyChange();
        return true;
    }

    function processSteamBid(address buyer) internal returns (bool) {//someone is tryig to buy steam
        uint256 waterAmount = _state.market.steamBids[buyer].price*_state.market.steamBids[buyer].price;
        uint256 buyerWater = _state.accounts[buyer].water;

        //the buyer needs enough water to buy
        if (buyerWater < waterAmount || _state.market.steamBids[buyer].price > 0) {
            return false;
        }

        uint256 lowestAskPrice = 0;
        address seller;
        //address treasury = getTreasuryAddress();

        //find the lowest asking price and the associated seller
        for (uint256 i = 0; i < _state.accountList.length; i++) {
            address candidate = _state.accountList[i];
            if (_state.market.steamAsks[candidate].amount != uint(-1)
                && _state.market.steamAsks[candidate].amount > 0
                && _state.accounts[candidate].steam > 0
                && (lowestAskPrice == 0 || _state.market.steamAsks[candidate].price < lowestAskPrice)) {
                seller = candidate;
                lowestAskPrice = _state.market.steamAsks[candidate].price;
            }
        }

        //determine if the seller can satisfy the amount of the bid, and then process the bid accordingly
        if (lowestAskPrice > 0 && lowestAskPrice <= _state.market.steamBids[buyer].price && _state.market.steamBids[buyer].amount > 0) {
            uint256 amountForSale = min( _state.accounts[seller].steam, _state.market.steamAsks[seller].amount);
            uint256 saleAmount = min(_state.market.steamBids[buyer].amount, amountForSale);

            performSteamTransaction(buyer, seller, _state.market.steamBids[buyer].price, saleAmount);
            decrementSteamAskAmount(seller, saleAmount);
            decrementSteamBidAmount(buyer, saleAmount);

            if (_state.market.steamBids[buyer].amount > 0) {
                processSteamBid(buyer);
            }
        }

        return true;
    }

    function processSteamAsk(address seller) internal returns (bool) {//someone is trying to sell steam
        //the seller needs ask > 0 and have enough steam to sell
        if (_state.accounts[seller].steam < _state.market.steamAsks[seller].amount || _state.market.steamAsks[seller].price <=0) {
            return false;
        }

        uint256 highestBidPrice = 0;
        address buyer;

        //find the highest bid price and the associated buyer
        for (uint256 i = 0; i < _state.accountList.length; i++) {
            address candidate = _state.accountList[i];
            if (_state.market.steamBids[candidate].amount != uint(-1)
                && _state.market.steamBids[candidate].amount > 0
                && _state.market.steamBids[candidate].price > highestBidPrice) {
                buyer = candidate;
                highestBidPrice = _state.market.steamBids[candidate].price;
            }
        }

        //determine if the buyer can satisfy the amount of the ask, and then process the ask accordingly
        if (highestBidPrice > 0 && highestBidPrice >= _state.market.steamAsks[seller].price && _state.market.steamAsks[seller].amount > 0) {
            uint256 amountToBuy = min(_state.market.steamBids[buyer].amount, _state.accounts[buyer].water/_state.market.steamAsks[seller].price);
            uint256 saleAmount = min(_state.market.steamAsks[seller].amount, amountToBuy);

            performSteamTransaction(buyer, seller, _state.market.steamAsks[seller].price, saleAmount);
            decrementSteamAskAmount(seller, saleAmount);
            decrementSteamBidAmount(buyer, saleAmount);

            if (_state.market.steamAsks[buyer].amount > 0) {
                processSteamAsk(seller);
            }
        }

        return true;
    }

    function triggerSupplyChange() internal returns(bool) {
        uint256 index = currentIceTransactionIndex();
        uint amount = iceAmountForTransaction(index);
        uint256 currentPrice = rollingIcePrice();
        if (currentPrice > getMaxIcePrice()) {//if ice price is too high, it means not enough inflation: make it rain or snow
            if ((_state.balance.waterSupply/_state.balance.iceSupply) < getWaterIceRatio()) {
                increaseWaterSupply(amount);
            } else {
                increaseIceSupply(amount);
            }

            _state.contraction = false;
            return true;
        }

        if (currentPrice < getMinIcePrice()) {//if ice price is too low, it means too much inflation: boil water
            _state.contraction = true;
            return true;
        }

        lastSupplyChange = blockTimestamp();
        _state.contraction = false;
        return false;
    }

    function increaseWaterSupply(uint totalAmount) internal {
        for (uint256 i = 0; i < _state.accountList.length; i++) {
            address dropAddress = _state.accountList[i];
            uint256 dropAmount = (_state.accounts[dropAddress].steam*totalAmount*getTargetIcePrice())/(_state.balance.steamSupply);
            incrementBalanceOfWater(dropAddress, dropAmount);
            incrementTotalWaterSupply(dropAmount);
        }
    }

    function increaseIceSupply(uint totalAmount) internal {
        for (uint256 i = 0; i < _state.accountList.length; i++) {
            address dropAddress = _state.accountList[i];
            uint256 dropAmount = (_state.accounts[dropAddress].steam*totalAmount)/(_state.balance.steamSupply);
            incrementBalanceOfIce(dropAddress, dropAmount);
            incrementTotalIceSupply(dropAmount);
        }
    }

    function rollingIcePrice() internal returns (uint256) {//currently overly simple...needs updating
        uint256 index = currentIceTransactionIndex();
        return icePriceForTransaction(index);
    }

    function meltIce() public returns (bool){
        if (secondsSinceLastIceMelt() > ICE_MELT_FREQ){
            for (uint256 i = 0; i < _state.accountList.length; i++){
                address dropAddress = _state.accountList[i];
                uint256 dropAmount = _state.accounts[dropAddress].ice*ICE_MELT;
                incrementBalanceOfWater(dropAddress, dropAmount);
                incrementTotalWaterSupply(dropAmount);
            }
            return true;
        }
        return false;

    }

    function addAccount(address account) internal {//add account if it doesn't already exist in the array. 
        if (!_state.accounts[account].existsInArray){
            _state.accountList.push(account);
            _state.accounts[account].existsInArray = true;
        }
    }

    function min(uint256 a, uint256 b) public returns (uint256) {
        if (a < b) {
            return a;
        }
         return b;
    }

    //Basic Token Functions

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    /// @return supply total amount of tokens
    function totalSupply() public view returns (uint256 supply) {
         return _state.balance.waterSupply;
    }

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success) {
        //Default assumes totalSupply can't be over max (2^256 - 1).
        //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
        //Replace the if with this one instead.
        //if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        if (_state.accounts[msg.sender].water >= _value && _value > 0) {
            incrementBalanceOfWater(_to, _value);
            decrementBalanceOfWater(msg.sender, _value);
            emit Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        if (_state.accounts[msg.sender].water >= _value && _state.allowed[_from][msg.sender] >= _value && _value > 0) {
            incrementBalanceOfWater(_to, _value);
            decrementBalanceOfWater(_from, _value);
            _state.allowed[_from][msg.sender] -= _value;
            emit Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    /// @param _owner The address from which the balance will be retrieved
    /// @return balance The balance
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _state.accounts[_owner].water;
    }

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return success Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success) {
        _state.allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return remaining Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
      return _state.allowed[_owner][_spender];
    }

    constructor() public {
        _state.accounts[msg.sender].water = init_water;
        _state.accounts[msg.sender].ice = init_ice;
        _state.accounts[msg.sender].steam = init_steam;

        _state.balance.waterSupply = init_water;
        _state.balance.iceSupply = init_ice;
        _state.balance.steamSupply = init_steam;

        _state.lastIceMelt = now;

        _state.accountList.push(msg.sender);
        _state.accounts[msg.sender].existsInArray = true;
        
        _state.market.iceTransactions.push(Transaction({
            price: TARGET_ICE_PRICE,
            amount: init_ice,
            blockNum: block.number
        }));
        _state.market.steamTransactions.push(Transaction({
            price: init_steam,
            amount: init_steam,
            blockNum: block.number
        }));
    }

    /* Approves and then calls the receiving contract */
    // function approveAndCall(address _spender, uint256 _value, bytes _extraData) public returns (bool success) {
    //     _state.allowed[msg.sender][_spender] = _value;
    //     Approval(msg.sender, _spender, _value);

    //     //if(!_spender.call(bytes4(bytes32(sha3("receiveApproval(address,uint256,address,bytes)"))), msg.sender, _value, this, _extraData)) { throw; }
    //     return true;
    // }
}

