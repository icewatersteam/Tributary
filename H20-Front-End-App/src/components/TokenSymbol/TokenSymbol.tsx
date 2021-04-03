import React from 'react';


import h20Logo from '../../assets/img/icewater-h20-logo.svg';
import steamLogo from '../../assets/img/icewater-steam-logo.svg';
import iceLogo from '../../assets/img/icewater-ice-logo.svg';

const logosBySymbol: {[title: string]: string} = {
  'H20': h20Logo,
  'STEAM': steamLogo,
  'ICE': iceLogo  
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
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
