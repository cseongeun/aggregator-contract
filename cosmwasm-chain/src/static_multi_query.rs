// use crate::msg::{CustomRawRequest, CustomRawResponse};
// use cosmwasm_std::{
//     from_binary, to_binary, to_vec, Addr, AllBalanceResponse, BankQuery, Binary, ContractResult,
//     CosmosMsg, Deps, Empty, HumanAddr, QueryRequest, StdError, StdResult, SystemResult, Uint128,
//     WasmMsg, WasmQuery,
// };
// use schemars::JsonSchema;
// use serde::de::DeserializeOwned;
// use serde::Serialize;
// use std::any::Any;
// use std::fmt;
// use std::option::Option;
// use std::result::Result;

// pub fn query_static_aggregate<T: DeserializeOwned>(
//     deps: Deps,
//     addr: Addr,
//     msg: Binary,
// ) -> StdResult<T> {
//     let raw = get_raw_request(addr, msg)?;

//     match deps.querier.raw_query(&raw) {
//         SystemResult::Err(system_err) => Err(StdError::generic_err(format!(
//             "Querier system error: {}",
//             system_err
//         ))),
//         SystemResult::Ok(ContractResult::Err(contract_err)) => Err(StdError::generic_err(format!(
//             "Querier contract error: {}",
//             contract_err
//         ))),
//         SystemResult::Ok(ContractResult::Ok(value)) => from_binary(&value),
//     }
// }

// pub fn query_static_aggregate(deps: Deps, addr: Addr, msg: Binary) -> StdResult<Binary> {
//     let raw = get_raw_request(addr, msg)?;

//     match deps.querier.raw_query(&raw) {
//         SystemResult::Err(system_err) => Err(StdError::generic_err(format!(
//             "Querier system error: {}",
//             system_err
//         ))),
//         SystemResult::Ok(ContractResult::Err(contract_err)) => Err(StdError::generic_err(format!(
//             "Querier contract error: {}",
//             contract_err
//         ))),
//         SystemResult::Ok(ContractResult::Ok(value)) => Ok(value),
//     }
// // }

// pub fn query_static_aggregate<T>(_deps: Deps, _raw_request: CustomRawRequest) -> StdResult<Binary> {
//     let raw = get_raw_request(_raw_request.contract_address, _raw_request.msg)?;

//     match _deps.querier.raw_query(&raw) {
//         SystemResult::Err(system_err) => Err(StdError::generic_err(format!(
//             "Querier system error: {}",
//             system_err
//         ))),
//         SystemResult::Ok(ContractResult::Err(contract_err)) => Err(StdError::generic_err(format!(
//             "Querier contract error: {}",
//             contract_err
//         ))),
//         SystemResult::Ok(ContractResult::Ok(value)) => Ok(value),
//     }
// }

// fn get_raw_request(_contract_address: Addr, _msg: Binary) -> StdResult<Vec<u8>> {
//     let request: QueryRequest<Empty> = WasmQuery::Smart {
//         contract_addr: _contract_address.to_string(),
//         msg: _msg,
//     }
//     .into();

//     let raw = to_vec(&request).map_err(|serialize_err| {
//         StdError::generic_err(format!("Serializing QueryRequest: {}", serialize_err))
//     });
//     raw
// }
