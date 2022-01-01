use crate::cw20_multi_query::{
    query_batch_cw20_token_balance, query_batch_cw20_token_info, query_cw20_token_balance,
    query_cw20_token_info, query_native_with_cw20_token_balances,
};
use crate::msg::{InstantiateMsg, QueryMsg};
// use crate::static_multi_query::query_static_aggregate;
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
    match _msg {
        QueryMsg::GetCw20TokenInfo { token_address } => {
            to_binary(&query_cw20_token_info(_deps, token_address)?)
        }
        QueryMsg::GetCw20TokenInfos { token_addresses } => {
            to_binary(&query_batch_cw20_token_info(_deps, token_addresses)?)
        }
        QueryMsg::GetCw20TokenBalance {
            address,
            token_address,
        } => to_binary(&query_cw20_token_balance(_deps, address, token_address)?),
        QueryMsg::GetCw20TokenBalances {
            address,
            token_addresses,
        } => to_binary(&query_batch_cw20_token_balance(
            _deps,
            address,
            token_addresses,
        )?),
        QueryMsg::GetNativeWithCw20TokenBalances {
            address,
            token_addresses,
        } => to_binary(&query_native_with_cw20_token_balances(
            _deps,
            address,
            token_addresses,
        )?),
        // QueryMsg::StaticAggregate { raw_request } => {
        //     to_binary(&query_static_aggregate(_deps, raw_request)?)
        // }
    }
}
