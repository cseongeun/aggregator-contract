use cosmwasm_std::{Addr, Uint128};
use cw20::TokenInfoResponse;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
// use std::any::Any;
// use std::fmt;
// use serde::de::DeserializeOwned;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetCw20TokenInfo {
        token_address: Addr,
    },
    GetCw20TokenInfos {
        token_addresses: Vec<Addr>,
    },
    GetCw20TokenBalance {
        address: Addr,
        token_address: Addr,
    },
    GetCw20TokenBalances {
        address: Addr,
        token_addresses: Vec<Addr>,
    },
    GetNativeWithCw20TokenBalances {
        address: Addr,
        token_addresses: Vec<Addr>,
    },
    // StaticAggregate {
    //     raw_request: CustomRawRequest,
    // },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CW20TokenInfoResponse {
    pub result: TokenInfoResponse,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BatchCW20TokenInfoResponse {
    pub result: Vec<CustomTokenInfoResponse>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CW20TokenBalanceResponse {
    pub result: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BatchCW20TokenBalanceResponse {
    pub result: Vec<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BatchNativeWithCW20TokenBalanceResponse {
    pub result: Vec<CustomBalanceResponse>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CustomTokenInfoResponse {
    pub address: String,
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CustomBalanceResponse {
    pub contract_address: String,
    pub amount: String,
}

// #[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
// pub struct CustomRawRequest {
//     pub contract_address: Addr,
//     pub msg: Binary,
// }

// #[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
// pub struct CustomRawResponse {
//     // pub result: Vec<&dyn Any>,
// }
