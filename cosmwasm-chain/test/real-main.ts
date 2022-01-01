import * as path from 'path';
import { LocalTerra } from '@terra-money/terra.js';
import { storeCode, instantiateContract } from '../libs/helper';
import { deployCW20, mintCW20 } from '../libs/cw20';
import {
  queryCW20TokenBalance,
  queryCW20TokenBalances,
  queryCW20TokenInfo,
  queryCW20TokenInfos,
} from './query';
import { LCDClient } from '@terra-money/terra.js';

const terra = new LCDClient({
  URL: 'https://broken-snowy-flower.terra-mainnet.quiknode.pro/b577acdfb79450f9a9d416363cd2cb96213bbe1d/',
  chainID: 'columbus-5',
});

const multicall = 'terra1ksk3xx6rcalxu4ur8cde38w52t6uhrugxj637v';

const tokens = [
  // 'terra1fy4yf7n076wqmcfhsfh543xu35024lw2wlcxq7',
  // 'terra1fy4yf7n076wqmcfhsfh543xu35024lw2wlcxq7',
  // 'terra1fy4yf7n076wqmcfhsfh543xu35024lw2wlcxq7',
  // 'terra1fy4yf7n076wqmcfhsfh543xu35024lw2wlcxq7',
  // 'terra1fy4yf7n076wqmcfhsfh543xu35024lw2wlcxq7',
  // 'terra1f9h22l730vxxj5jmrakuwh3neuhdynwy42ezvv',
  // 'terra1fx98eqk0q9fta4pkex3ye786cckcx8y65qwu9k',
  // 'terra1f887h6wqygswcp4arjjak6mpdhwlrv6nj8y9wt',
  // 'terra1f85kt39ar3tkscq6w8ylxv2t9qh4ktzayw35ta',
  // 'terra1f85kt39ar3tkscq6w8ylxv2t9qh4ktzayw35ta',
  // 'terra1f8m2ylcpzfeg3675yk7htw90d72jltgk4mkr9t',
  // 'terra1ffute26m0e5uq3wmzys3452dge62m99u0xz30u',
  // 'terra1ft9qff9fgumdca5qluxu3e8fh8xc7d4hfek8s2',
  // 'terra1fdg5u7nttkcw2v4sepgzlwsznfffn8pnml35pu',
  // 'terra1fd2f52tmq59mc093nrawdaey5mzgjnwyu7hwqz',
  // 'terra1fd0gy7f5dcgmvdl95mt3z9fh8se48gf0wxs68k',
  // 'terra1f0us6p9axmzacwq2fn7sm5ke8k302tx7hg7s49',
  // 'terra1f3gyvkfwy6lvst5c63gx7alp6547clceaamyyp',
  // 'terra1f3nc4md37vcy9l89qte2p5tej42pr8rzch8mfe',
  // 'terra1fj06x3hq2xum56htlrdeame70knzl765cq4txr',
  // 'terra1fkwfm2w8kffl3ged3zulknz849rnfdxnwjgdnk',
  // 'terra1fcq75y4ezhsws0vudna3cddk20d3k0eg9nznyh',
  // 'terra1fc38stp3xzjh5q8u0nrlk4n0gagxrnen35rsq8',
  // 'terra1f77l2dprlhg2h47uvhzp2zhkdrkcy8fse90xkk',
  'terra12qr3vqxznkjtyrgyrhluh8zlcy82cxv2l92rgh',
  // 'terra12qxyx2l90c37kylw4jqe8t40ppnrnu8wqmx940',
  // 'terra12qeh8p79q6jrnlmw09hvtytv9e99yl2077cmgz',
  // 'terra12zzantsa5trfm0ssrgsnhvlram502ats35qtc3',
  // 'terra12yvwzt5ayh396hgmyd0rwnamgg4g3mxrdgg7c6',
  // 'terra129796y06jrejsk9hjmvhkhat92mxt76k6qpyfw',
];

(async () => {
  const rr = await queryCW20TokenInfo(
    terra,
    multicall,
    'terra12qr3vqxznkjtyrgyrhluh8zlcy82cxv2l92rgh',
  );
  console.log(rr);
  // const result = await queryCW20TokenInfos(terra, multicall, tokens);
  // console.log(result);
})();
