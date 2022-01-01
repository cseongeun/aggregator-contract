import * as fs from 'fs';
import * as chalk from 'chalk';
import BN from 'bn.js';
import {
  isTxError,
  Coin,
  LocalTerra,
  Msg,
  MsgInstantiateContract,
  MsgStoreCode,
  Fee,
  Wallet,
  LCDClient,
} from '@terra-money/terra.js';

/**
 * @notice Encode a JSON object to base64 binary
 */
export const toEncodedBinary = (obj: any) => {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
};

/**
 * @notice Send a transaction. Return result if successful, throw error if failed.
 */
export const sendTransaction = async (
  terra: LocalTerra | LCDClient,
  sender: Wallet,
  msgs: Msg[],
  verbose = false,
): Promise<any> => {
  const tx = await sender.createAndSignTx({
    msgs,
  });

  const result = await terra.tx.broadcast(tx);

  // Print the log info
  if (verbose) {
    console.log(chalk.magenta('\nTxHash:'), result.txhash);
    try {
      console.log(chalk.magenta('Raw log:'), JSON.stringify(JSON.parse(result.raw_log), null, 2));
    } catch {
      console.log(chalk.magenta('Failed to parse log! Raw log:'), result.raw_log);
    }
  }

  if (isTxError(result)) {
    throw new Error(
      chalk.red('Transaction failed!') +
        `\n${chalk.yellow('code')}: ${result.code}` +
        `\n${chalk.yellow('codespace')}: ${result.codespace}` +
        `\n${chalk.yellow('raw_log')}: ${result.raw_log}`,
    );
  }

  return result;
};

/**
 * @notice Upload contract code to LocalTerra. Return code ID.
 */
export const storeCode = async (
  terra: LocalTerra | LCDClient,
  deployer: Wallet,
  filepath: string,
) => {
  const code = fs.readFileSync(filepath).toString('base64');
  const result = await sendTransaction(terra, deployer, [
    new MsgStoreCode(deployer.key.accAddress, code),
  ]);
  return parseInt(result.logs[0].eventsByType.store_code.code_id[0]);
};

/**
 * @notice Instantiate a contract from an existing code ID. Return contract address.
 */
export const instantiateContract = async (
  terra: LocalTerra | LCDClient,
  deployer: Wallet,
  admin: Wallet, // leave this emtpy then contract is not migratable
  codeId: number,
  instantiateMsg: any = {},
) => {
  const result = await sendTransaction(terra, deployer, [
    new MsgInstantiateContract(
      deployer.key.accAddress,
      admin.key.accAddress,
      codeId,
      instantiateMsg,
    ),
  ]);

  return extractContractAddress(result.raw_log);
};

/**
 * @notice Return the native token balance of the specified account
 */
export const queryNativeTokenBalance = async (
  terra: LocalTerra | LCDClient,
  account: string,
  denom = 'uusd',
) => {
  const balance = await terra.bank.balance(account);
  const denomBalance = balance[denom]?.amount.toString();
  if (denomBalance) {
    return denomBalance;
  } else {
    return '0';
  }
};

/**
 * @notice Return CW20 token balance of the specified account
 */
export const queryTokenBalance = async (
  terra: LocalTerra | LCDClient,
  account: string,
  contract: string,
) => {
  const balanceResponse = await terra.wasm.contractQuery<{ balance: string }>(contract, {
    balance: { address: account },
  });
  return balanceResponse.balance;
};

/**
 * @notice Given a total amount of UST, find the deviverable amount, after tax, if we
 * transfer this amount.
 * @param amount The total amount
 * @dev Assumes a tax rate of 0.001 and cap of 1000000 uusd.
 * @dev Assumes transferring UST. Transferring LUNA does not incur tax.
 */
export const deductTax = (amount: number) => {
  const DECIMAL_FRACTION = new BN('1000000000000000000');
  const tax = Math.min(
    amount -
      new BN(amount)
        .mul(DECIMAL_FRACTION)
        .div(DECIMAL_FRACTION.div(new BN(1000)).add(DECIMAL_FRACTION))
        .toNumber(),
    1000000,
  );
  return amount - tax;
};

/**
 * @notice Given a intended deliverable amount, find the total amount, including tax,
 * necessary for deliver this amount. Opposite operation of `deductTax`.
 * @param amount The intended deliverable amount
 * @dev Assumes a tax rate of 0.001 and cap of 1000000 uusd.
 * @dev Assumes transferring UST. Transferring LUNA does not incur tax.
 */
export const addTax = (amount: number) => {
  const tax = Math.min(new BN(amount).div(new BN(1000)).toNumber(), 1000000);
  return amount + tax;
};

export const extractContractAddress = (logs) => {
  const parsed = JSON.parse(logs);
  return parsed[0]['events'][0]['attributes'][3]['value'];
};

export const queryContract = async (
  terra: LocalTerra | LCDClient,
  contract: string,
  query: any,
) => {
  return terra.wasm.contractQuery(contract, query);
};

export const toAscii = (input: string): Uint8Array => {
  const toNums = (str: string): readonly number[] =>
    str.split('').map((x: string) => {
      const charCode = x.charCodeAt(0);
      if (charCode < 0x20 || charCode > 0x7e) {
        throw new Error(
          'Cannot encode character that is out of printable ASCII range: ' + charCode,
        );
      }
      return charCode;
    });
  return Uint8Array.from(toNums(input));
};
