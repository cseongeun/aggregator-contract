import * as path from 'path';
import { storeCode, instantiateContract } from './libs/helper';
import { LCDClient } from '@terra-money/terra.js';
import * as fs from 'fs';
import 'dotenv/config';
import { MnemonicKey } from '@terra-money/terra.js';

const terra = new LCDClient({
  URL: 'https://broken-snowy-flower.terra-mainnet.quiknode.pro/b577acdfb79450f9a9d416363cd2cb96213bbe1d/',
  chainID: 'columbus-5',
});

const mk = new MnemonicKey({
  mnemonic: process.env.MNEMONIC,
});

const deployer = terra.wallet(mk);

const deployMultiCall = async () => {
  const multicallCodeId = await storeCode(
    terra,
    deployer,
    path.resolve(__dirname, '../artifacts/multicall.wasm'),
  );

  return instantiateContract(terra, deployer, deployer, multicallCodeId);
};

(async () => {
  try {
    const multicall = await deployMultiCall();
    console.log(multicall);
    fs.writeFileSync(`../deployments/terra/${new Date().toString()}`, multicall);
  } catch (e) {
    console.log(e);
  }
})();
