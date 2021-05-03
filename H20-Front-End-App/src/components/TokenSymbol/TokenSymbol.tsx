import React from 'react';

import h20Logo from '../../assets/logos/Water_Alone.png';
import steamLogo from '../../assets/logos/Steam_Alone.png';
import iceLogo from '../../assets/logos/Ice_Alone.png';

/*
import h20Logo from '../../assets/img/Water_Full_Color.png';
import steamLogo from '../../assets/img/Steam_Full_Color.png';
import iceLogo from '../../assets/img/Ice_Full_Color.png';
*/

const logosBySymbol: {[title: string]: string} = {
  'H20': h20Logo,
  'STEAM': steamLogo,
  'ICE': iceLogo  
};

type IceWaterLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<IceWaterLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid IceWater symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  )
};

export default TokenSymbol;
