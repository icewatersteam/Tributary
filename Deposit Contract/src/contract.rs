use cosmwasm_std::{
    attr, coin, to_binary, Addr, BankMsg, Binary, Decimal, Deps, DepsMut, DistributionMsg, Env,
    MessageInfo, QuerierWrapper, Response, StakingMsg, StdError, StdResult, Uint128, WasmMsg,
};  //NEEDS TO BE UPDATED TO WHAT WE ARE ACTUALLY USING

//ADD OTHER CW20 AND TOKEN DEPENDENCIES

use crate::state::{InvestmentInfo, Supply, CLAIMS, INVESTMENT, TOTAL_SUPPLY}; //NEEDS TO BE UPDATED TO MATCH STATE

pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {  //WE MAY WANT TO CUSTOMIZE THE INPUT/OUTPUT OF THIS FUNCTION

/*INITIALIZE
-SET ADDRESSES FOR
--STAKING TOKEN
--YIELDING CONTRACT
--BENEFICIARY
-TOTAL STAKED AMOUNT TO ZERO
-TOTAL INTEREST EARNED TO ZERO
-TOTAL TRIBUTE TO ZERO
-RECEIVE BENEFICIARY INCENTIVES AND REWARDS(TOKENS/SHARES/WHATEVER) TO HOLD FOR DISTRIBUTION TO STAKERS
-RECEIVE BENEFICIARY INDICATION OF REWARDS STRUCTURE
-UPDATE TOTAL AMOUNT OF INCENTIVES
-UPDATE MILESTONES AND REWARDS PER MILESTONES
(The model being used is one in which people get tokens (called incentives) when they contribute.
The shares are only distributed as rewards once milestones are met.
We could modify the code to only provide a redemption token when there is a deposit and to provide incentives/rewards as interst accrues.)
*/                                                                                                             

}

//Receive a message and act upon it
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> { //WE MAY WANT TO CUSTOMIZE THE INPUT/OUTPUT OF THIS FUNCTION
    match msg {
        ExecuteMsg::Contribute {} => contribute(deps, env, info),
        ExecuteMsg::Exchange { amount } => exchange(deps, env, info, amount),
        ExecuteMsg::Redeem {} => redeem(deps, env, info),  //OTHERS?
        }
}

//Function to receive staking token, deposit with yielding contract, and provide incentives and redemption token
pub fn contribute(deps: DepsMut, env: Env, info: MessageInfo) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//CHECK CONTRIBUTOR CAN CONTRIBUTE AND NO OTHER ERRORS
//CHECK HAVE SUFFICIENT INCENTIVES TO DISTRIBUTE
//CALL DEPOSIT
//CALL INCENTIVIZE
}

//Function to deposit staked amount with yielding contract
fn deposit(deps: DepsMut, env: Env, info: MessageInfo) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//GET STATE INFORMATION
//UPDATE TOTAL STAKED
//UPDATE INDIVIDUAL AMOUNT STAKED
//SEND STAKED TOKEN TO YIELDING CONTRACT
}

//Function to provide incentives and redemption token
fn incentivize (deps: DepsMut, env: Env, info: MessageInfo) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//GET STATE INFORMATION
//UPDATE TOTAL INCENTIVES
//UPDATE TOTAL TRIBUTE
//SEND INCENTIVES AND TRIBUTE TO STAKER
}

//Function to withdraw some amount of staked tokens
pub fn exchange(
    mut deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//CHECK THAT THE CONTRIBUTOR IS ABLE TO WITHDRAW (NOT MORE THAN CONTRIBUTED, HAS PROVIDED NECESSARY AMOUNT OF INCENTIVES AND TRIBUTE)
//GET STATE INFORMATION
//UPDATE TOTAL INCENTIVES
//UPDATE TOTAL TRIBUTE (BURN)
//CALL REDEEM TO DO ONE FINAL PUSH OF INTEREST TO BENEFICIARY AND RETURN OF INCENTIVES TO STAKER
//CALL REFUND
}

//Function to actually retrieve the token and push it back to the staker
fn refund(mut deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//GET STATE INFORMATION
//UPDATE TOTAL STAKED
//UPDATE INDIVIDUAL AMOUNT STAKED
//PULL REQUESTED AMOUNT FROM YIELDING CONTRACT
//SEND REQUESTED AMOUNT BACK TO STAKER
}

//Function to take interest from the yielding contract, send it to the beneficiary, and provide rewards to staker
pub fn redeem(deps: DepsMut, env: Env, info: MessageInfo) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//GET STATE INFORMATION
//CALL YIELDING CONTRACT FUNCTION TO UPDATE BALANCE WITH ACCRUED INTEREST
//COMPUTE DIFFERENCE BETWEEN TOTAL STAKED AND YIELDING CONTRACT BALANCE
//UPDATE TOTAL INTEREST EARNED
//CALL BENEFIT WITH DIFFERENCE
//CALL REWARD WITH TOTAL INTEREST EARNED
}

//Function to actually retrieve the interest and send it to the beneficiary
fn benefit(mut deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//RETRIEVE DIFFERENCE FROM YIELDING CONTRACT
//SEND RETRIEVED AMOUNT TO BENEFICIARY
}

//Function to compute rewards and actually send to the staker
fn reward(mut deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> Result<Response, ContractError> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//DETERMINE WHETHER TOTAL INTEREST EARNED MEETS REWARD MILESTONE
//IF SO, ITERATE THROUGH STAKER LIST AND PUSH REWARDS TO EACH STAKER
}

pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Deposit { address } => to_binary(query_deposit(deps, address)?)
        QueryMsg::TotalStaked {} => to_binary(&query_total_staked(deps)?),
        QueryMsg::TotalInterest {} => to_binary(&query_total_interest(deps)?)
    }
}

pub fn query_deposit(deps: Deps, address: Addr) -> StdResult<Binary> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//RETRIVE BALANCE FOR ADDRESS
//RETURN THE BALANCE
}


pub fn query_total_staked(deps: Deps) -> StdResult<Binary> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//RETRIVE TOTAL STAKED
//RETURN THE TOTAL STAKED
}

pub fn query_total_interest(deps: Deps) -> StdResult<Binary> {
//NOTE: WILL NEED TO UPDATE FUNCTION INPUT/OUTPUT
//RETRIVE TOTAL INTEREST
//RETURN THE TOTAL INTEREST
}
