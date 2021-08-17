import React, { createContext, useContext } from 'react';

export type RoleContextType = {
    useBeneficiary: boolean;
    setUseBeneficiary: (useBeneficiary: boolean) => void;
}

export const RoleContext = React.createContext<RoleContextType>({ useBeneficiary: false, setUseBeneficiary: useBeneficiary => console.warn('unknown user role')});
export const useProject = () => useContext(RoleContext);
