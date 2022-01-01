use crate::msg::{
    BatchCW20TokenBalanceResponse, BatchCW20TokenInfoResponse,
    BatchNativeWithCW20TokenBalanceResponse, CW20TokenBalanceResponse, CW20TokenInfoResponse,
    CustomBalanceResponse, CustomTokenInfoResponse,
};
use cosmwasm_std::{Addr, AllBalanceResponse, BankQuery, Deps, QueryRequest, StdResult, Uint128};
use cw20::{BalanceResponse, Cw20QueryMsg, TokenInfoResponse};

pub fn query_cw20_token_info(_deps: Deps, _address: Addr) -> StdResult<CW20TokenInfoResponse> {
    let info: TokenInfoResponse = if let Ok(r) = _deps
        .querier
        .query_wasm_smart(_address.to_string(), &Cw20QueryMsg::TokenInfo {})
    {
        r
    } else {
        TokenInfoResponse {
            name: String::from("Unknown"),
            symbol: String::from("Unknown"),
            decimals: 0u8,
            total_supply: Uint128::zero(),
        }
    };

    Ok(CW20TokenInfoResponse { result: info })
}

pub fn query_batch_cw20_token_info(
    _deps: Deps,
    _token_addresses: Vec<Addr>,
) -> StdResult<BatchCW20TokenInfoResponse> {
    let mut res: Vec<CustomTokenInfoResponse> = vec![];

    for token_addr in &_token_addresses {
        let info: CustomTokenInfoResponse = if let Ok(r) = _deps
            .querier
            .query_wasm_smart(token_addr.to_string(), &Cw20QueryMsg::TokenInfo {})
        {
            // todo: 바로 넣을 경우, 에러
            let _r: TokenInfoResponse = r;
            CustomTokenInfoResponse {
                address: token_addr.to_string(),
                name: _r.name,
                symbol: _r.symbol,
                decimals: _r.decimals,
                total_supply: _r.total_supply,
            }
        } else {
            CustomTokenInfoResponse {
                address: token_addr.to_string(),
                name: String::from("Unknown"),
                symbol: String::from("Unknown"),
                decimals: 0u8,
                total_supply: Uint128::zero(),
            }
        };
        res.push(info);
    }

    Ok(BatchCW20TokenInfoResponse { result: res })
}

pub fn query_cw20_token_balance(
    _deps: Deps,
    _address: Addr,
    _token_address: Addr,
) -> StdResult<CW20TokenBalanceResponse> {
    let bal: BalanceResponse = if let Ok(r) = _deps.querier.query_wasm_smart(
        _token_address.to_string(),
        &Cw20QueryMsg::Balance {
            address: _address.to_string(),
        },
    ) {
        r
    } else {
        BalanceResponse {
            balance: Uint128::zero(),
        }
    };

    Ok(CW20TokenBalanceResponse {
        result: bal.balance.to_string(),
    })
}

pub fn query_batch_cw20_token_balance(
    _deps: Deps,
    _address: Addr,
    _token_addresses: Vec<Addr>,
) -> StdResult<BatchCW20TokenBalanceResponse> {
    let mut res: Vec<String> = vec![];

    for token_addr in &_token_addresses {
        let bal: BalanceResponse = if let Ok(r) = _deps.querier.query_wasm_smart(
            token_addr.to_string(),
            &Cw20QueryMsg::Balance {
                address: _address.to_string().clone(),
            },
        ) {
            r
        } else {
            BalanceResponse {
                balance: Uint128::zero(),
            }
        };

        res.push(bal.balance.to_string())
    }

    Ok(BatchCW20TokenBalanceResponse { result: res })
}

pub fn query_native_with_cw20_token_balances(
    _deps: Deps,
    _address: Addr,
    _token_addresses: Vec<Addr>,
) -> StdResult<BatchNativeWithCW20TokenBalanceResponse> {
    let mut res: Vec<CustomBalanceResponse> = vec![];
    // native
    let native_bal: AllBalanceResponse =
        _deps
            .querier
            .query(&QueryRequest::Bank(BankQuery::AllBalances {
                address: _address.to_string(),
            }))?;

    for native_result in native_bal.amount {
        res.push(CustomBalanceResponse {
            contract_address: native_result.denom,
            amount: native_result.amount.to_string(),
        })
    }

    // cw20
    for token_addr in &_token_addresses {
        let cw20_bal: BalanceResponse = if let Ok(r) = _deps.querier.query_wasm_smart(
            token_addr.to_string(),
            &Cw20QueryMsg::Balance {
                address: _address.to_string().clone(),
            },
        ) {
            r
        } else {
            BalanceResponse {
                balance: Uint128::zero(),
            }
        };

        res.push(CustomBalanceResponse {
            contract_address: token_addr.to_string(),
            amount: cw20_bal.balance.to_string(),
        })
    }

    Ok(BatchNativeWithCW20TokenBalanceResponse { result: res })
}
