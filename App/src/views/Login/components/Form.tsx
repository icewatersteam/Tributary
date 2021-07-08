import React, { useMemo } from 'react'
import styled from 'styled-components';
import Card from '../../../components/Card'
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form'

interface FormProps {
    email: string,
    password: string,
    hasAccount: boolean,    
    emailError: string,
    passwordError: string,
    setEmail: (email:string) => void,
    setPassword: (password:string) => void,
    setHasAccount: (hasAccount:boolean) => void,
    handleLogin: () => void,
    handleSignup: () => void    
}

const Form: React.FC<FormProps> = ({
    email,
    password,
    hasAccount,    
    emailError,
    passwordError,
    setEmail,
    setPassword,
    setHasAccount,
    handleLogin,
    handleSignup   
}) => {   

    return (

    <FormWrap>
        <Card style="glass">
            <form>
                <InputGrp>
                    <label>Email</label>
                    <InputWrap>
                        <input
                            type="text"
                            autoFocus
                            required
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            // onChange={onSetEmail}
                        />
                    </InputWrap>
                    <p className="errorMsg">{emailError}</p>
                </InputGrp>

                <InputGrp>
                    <label>Password</label>
                    <InputWrap>
                        <input
                            type="password"                    
                            required
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </InputWrap>
                    <p className="errorMsg">{passwordError}</p>
                </InputGrp>  

                <ButtonGrp>
                    <br/>
                    { !hasAccount ? (
                        <>
                            <Button 
                                onClick={handleLogin}
                                variant="secondary">Sign In</Button>
                            <Toggle>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></Toggle>
                        </>
                    ) : (
                        <>
                            <Button 
                                onClick={handleSignup} 
                                variant="secondary">Sign Up</Button>
                            <Toggle>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></Toggle>
                        </>
                    )}
                </ButtonGrp>
            </form>            
        </Card>
    </FormWrap>
    )
}

const FormWrap = styled.div`       
    max-width: 450px;
    margin: 100px auto;    
    color: ${props => props.theme.color.white};
`;

const Toggle = styled.div`
    margin-top: 35px;
    cursor: default;

    span {
        cursor: pointer;        
        font-weight: bold;
        color: ${props => props.theme.color.purple[400]};

        &:hover {
            color: ${props => props.theme.color.purple[300]};
        }
    }
`;

const InputGrp = styled.div`
    margin-bottom: 20px;
    text-align: left;

    label {
        color: ${props => props.theme.color.white};        
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    } 
    
    p.errorMsg {
        color: ${props => props.theme.color.red[200]};
    }
`;

const InputWrap = styled.div`
    align-items: center;    
    border-radius: ${props => props.theme.borderRadius}px;
    display: flex;
    padding: 0 ${props => props.theme.spacing[3]}px;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);      

    input {
        background: none;
        border: 0;
        color: ${props => props.theme.color.white};
        font-size: 18px;
        flex: 1;
        height: 56px;
        margin: 0;
        padding: 0;
        outline: none;
    }
`;

const ButtonGrp = styled.div`
  
`;

export default Form
