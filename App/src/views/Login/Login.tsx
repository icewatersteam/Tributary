import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import Form from "./components/Form"
import Hero from "./components/Hero"
import { useWallet } from 'use-wallet';

// Firebase dependencies
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase";
import fire from '../../fire';
import { useList } from 'react-firebase-hooks/database';

// https://youtu.be/cFgoSrOui2M
// https://medium.com/geekculture/firebase-auth-with-react-and-typescript-abeebcd7940a

const Login: React.FC = () => {

  const { reset } = useWallet()
  const [users, loading, error] = useList(firebase.database().ref('/users'));
  const [user, setUser] = useState<firebase.User | null>(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const handleLogin = () => {
    clearErrors()
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.log("Here")
        switch(err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message)
            break;
          case "auth/wrong-password":
            setPasswordError(err.message)
            break;
        }
    })
  }


  const handleSignup = () => {
    clearErrors()
    const newUser = fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(results:any){
        if ( results ) {
          //Add a new entry in the users tree in the database
          firebase.database().ref('users').child(results.user.uid).set({
            email: results.user.email,
            uid: results.user.uid,
            amountDeposited: '0',
            lifetimeDeposited: '0'
          })
          /*Update Global numUsers value in the database*/
          !loading && users ? (
              firebase.database().ref('Global/numUsers').set(String(users.length))
          ):(
              firebase.database().ref('Global/numUsers').set(String(0))
          )
          /**********************************************/
        }
      })
      .catch(err => {
        console.log(err)
        switch(err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message)
            break;
          case "auth/weak-password":
            setPasswordError(err.message)
            break;
        }
    })

  }

  const handleSignout = () => {
    fire.auth().signOut()
    reset()
    console.log("SUCCESS!")
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user)
        clearInputs()
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }

  const onSetEmail = (email:string) => {
    setEmail(email)
  }

  const onSetPassword = (password:string) => {
    setPassword(password)
  }

  const onSetHasAccount = (hasAccount:boolean) => {
    setHasAccount(hasAccount)
  }


  useEffect(() => {
    authListener()
  }, [])

  return(
    <Page>

      <ResponsiveWrap>

        { user ?  (
          <Hero
            username={user.email}
            handleLogout={handleSignout}
          />
        ) : (
          <Form
            email={email}
            password={password}
            hasAccount={hasAccount}
            emailError={emailError}
            passwordError={passwordError}
            setEmail={onSetEmail}
            setPassword={onSetPassword}
            setHasAccount={onSetHasAccount}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
          />
        )}

      </ResponsiveWrap>
    </Page>
  );
};

const ResponsiveWrap = styled.div`
  width: 100%;
  max-width: 50vw;
  text-align: center;

`;

export default Login;
