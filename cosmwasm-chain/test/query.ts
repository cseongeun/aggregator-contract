import { LCDClient, LocalTerra } from '@terra-money/terra.js';
import { queryContract } from '../libs/helper';

export const queryCW20TokenInfo = (
  terra: LocalTerra | LCDClient,
  multicall: string,
  tokenAddress: string,
) => {
  return queryContract(terra, multicall, {
    get_cw20_token_info: { token_address: tokenAddress },
  });
};

export const queryCW20TokenInfos = (
  terra: LocalTerra | LCDClient,
  multicall: string,
  tokenAddresses: string[],
) => {
  return queryContract(terra, multicall, {
    get_cw20_token_infos: { token_addresses: tokenAddresses },
  });
};

export const queryCW20TokenBalance = (
  terra: LocalTerra | LCDClient,
  multicall: string,
  address: string,
  tokenAddress: string,
) => {
  return queryContract(terra, multicall, {
    get_cw20_token_balance: { address: address, token_address: tokenAddress },
  });
};

export const queryCW20TokenBalances = (
  terra: LocalTerra | LCDClient,
  multicall: string,
  address: string,
  tokenAddresses: string[],
) => {
  return queryContract(terra, multicall, {
    get_cw20_token_balances: { address: address, token_addresses: tokenAddresses },
  });
};
