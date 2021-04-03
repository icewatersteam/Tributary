import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useIceWater from '../../hooks/useIceWater';
import { Bank } from '../../ice-water';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const iceWater = useIceWater();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!iceWater.isUnlocked) continue;

        // only show pools staked by user
        const balance = await iceWater.stakedBalanceOnBank(bankInfo.contract, iceWater.myAccount);
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: iceWater.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName == 'BAC' ? iceWater.BAC : iceWater.BAS,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [iceWater, iceWater?.isUnlocked, setBanks]);

  useEffect(() => {
    if (iceWater) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [iceWater, iceWater?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
