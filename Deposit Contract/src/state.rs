use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Decimal, Uint128};
use cw_storage_plus::Item;


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct StakerInfo {
    //How much the person has staked
    pub staked_amount: Uint128,
    //If we want to track how much interest this person has accrued
    pub interest_amount: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema, Default)]
pub struct State {
    //How much is the total staked
    pub staked: Uint128,
    //How much total interset has gone to beneficiary
    pub interest: Uint128,
    //How much incentives are held by the contract
    pub incentives: Uint128,
    //How much tribute has been distributed
    pub tribute: Uint128,
}

//REWARDS STRUCTURE; Vector or array of structs?
