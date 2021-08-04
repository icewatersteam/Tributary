import React, { createContext, useContext } from 'react';

export type AccountContextType = {
    account: string;
    setAccount: (account: string) => void;
}

export const AccountContext = React.createContext<AccountContextType>({ account: '', setAccount: account => console.warn('no account')});
export const useWallet = () => useContext(AccountContext);
