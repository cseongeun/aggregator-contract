import * as path from 'path';
import { LocalTerra } from '@terra-money/terra.js';
import { storeCode, instantiateContract, queryContract, toAscii } from '../libs/helper';
import { deployCW20, mintCW20 } from '../libs/cw20';
import { queryCW20TokenBalances, queryCW20TokenInfos } from './query';

const terra = new LocalTerra();
const deployer = terra.wallets.test1;

const deployMultiCall = async () => {
  const multicallCodeId = await storeCode(
    terra,
    deployer,
    path.resolve(__dirname, '../../artifacts/multicall.wasm'),
  );

  return instantiateContract(terra, deployer, deployer, multicallCodeId);
};

(async () => {
  try {
    const multicall = await deployMultiCall();

    const cw20 = await deployCW20(terra, deployer, 'TTTT', 'TTT');
    await mintCW20(terra, deployer, cw20);

    const cw20_2 = await deployCW20(terra, deployer, 'ABC', 'ABC');
    await mintCW20(terra, deployer, cw20_2);

    console.log('start');

    const resCW20TokenInfos = await queryCW20TokenInfos(terra, multicall, [cw20, cw20_2]);
    console.log(resCW20TokenInfos);

    const resCW20TokenBalances = await queryCW20TokenBalances(
      terra,
      multicall,
      deployer.key.accAddress,
      [cw20, cw20_2],
    );
    console.log(resCW20TokenBalances);
  } catch (e) {
    console.log(e);
  }
})();
