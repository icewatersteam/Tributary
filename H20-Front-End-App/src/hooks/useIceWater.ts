import { useContext } from 'react';
import { Context } from '../contexts/IceWaterProvider';

const useIceWater = () => {
  const { iceWater } = useContext(Context);
  return iceWater;
};

export default useIceWater;
