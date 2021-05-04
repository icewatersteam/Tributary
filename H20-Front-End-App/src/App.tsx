import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import BanksProvider from './contexts/Banks';
import IceWaterProvider from './contexts/IceWaterProvider';
import ModalsProvider from './contexts/Modals';
import Docs from './views/Docs';
import Home from './views/Home';
import Pool from './views/Pool';
import Ice from './views/Ice';
import Steam from './views/Steam';
import Tributary from './views/Tributary'

import store from './state';
import theme from './theme';
import config from './config';
import Updaters from './state/Updaters';
import Popups from './components/Popups';
import { createBundle } from 'typescript';

const App: React.FC = () => {

  
  return (
    <Providers>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/docs">
            <Docs />
          </Route>
          <Route path="/ice">
            <Ice />
          </Route>
          <Route path="/steam">
            <Steam />
          </Route>
          <Route path="/pool">
            <Pool />
          </Route>
          <Route path="/tributary">
            <Tributary />
          </Route>
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <IceWaterProvider>
            <ModalsProvider>
              <BanksProvider>
                <>
                  <Popups />
                  {children}
                </>
              </BanksProvider>
            </ModalsProvider>
          </IceWaterProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;

/*

let greet: Function;
greet = () => {
  console.log("hello")
}

// third argument is optional
const add = (a: number, b: number, c?: number | string) => {
  console.log(a + b);
}
add(5, 10);

// inferred return type
const minus = (a: number, b: number) => {
  return a - b;
}
let result = minus(10, 7)

// explicitly setting the return type.
const multiply = (a: number, b: number): number => {
  return a * b;
}
result = multiply(10, 7)
console.log("multiply: " + result)

// function with callback
function addWithCallback(a:number, b:number, cb: (label:string, val:any) => void ){  
  cb('addWithCallback: ', a + b)
}

function prettyPrint(label: string, val: any) {
  console.log(`${label} :: ${val}`)
}
addWithCallback(10, 7, prettyPrint)

addWithCallback(3, 5, (label: string, val: any): void => {
  console.log(`${label} :: ${val}`)
})

// class with static functions
class MyStaticClass {
  static addOneTo(val: number) {
    return 1 + val;
  }
}
result = MyStaticClass.addOneTo(3)

*/