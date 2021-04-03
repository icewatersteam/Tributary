import { useCallback, useEffect, useState } from 'react';
import useIceWater from './useIceWater';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const iceWater = useIceWater();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await iceWater.fetchBoardroomVersionOfUser());
  }, [iceWater?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (iceWater?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [iceWater?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;
