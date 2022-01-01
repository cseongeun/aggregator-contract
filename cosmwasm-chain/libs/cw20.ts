import * as path from 'path';
import { LocalTerra, MsgExecuteContract } from '@terra-money/terra.js';
import { sendTransaction, storeCode, instantiateContract } from './helper';
import { LCDClient } from '@terra-money/terra.js';
import { Wallet } from '@terra-money/terra.js';

export const deployCW20 = async (
  terra: LocalTerra | LCDClient,
  signer: Wallet,
  name: string,
  symbol: string,
): Promise<string> => {
  const cw20CodeId = await storeCode(
    terra,
    signer,
    path.resolve(__dirname, './artifacts/cw20.wasm'),
  );

  const tokenResult = await instantiateContract(terra, signer, signer, cw20CodeId, {
    name,
    symbol,
    decimals: 6,
    initial_balances: [],
    mint: {
      minter: signer.key.accAddress,
    },
  });

  return tokenResult;
};

export const mintCW20 = async (
  terra: LocalTerra | LCDClient,
  signer: Wallet,
  cw20: string,
  amount = '1000000',
): Promise<void> => {
  await sendTransaction(terra, signer, [
    new MsgExecuteContract(signer.key.accAddress, cw20, {
      mint: {
        recipient: signer.key.accAddress,
        amount,
      },
    }),
  ]);
};
