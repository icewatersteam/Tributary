import React, { useMemo, useContext } from 'react'
import styled from 'styled-components';
import Card from '../../../components/Card'
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';

interface FormProps {
    name: string,
    category: string,
    goal: string,
    wallet: string,
    setName: (name:string) => void,
    setCategory: (category:string) => void,
    setGoal: (goal:string) => void,
    setWallet: (wallet:string) => void,
    onSubmit: () => void,
}
const Form: React.FC<FormProps> = ({
    name,
    category,
    goal,
    wallet,
    setName,
    setCategory,
    setGoal,
    setWallet,
    onSubmit
}) => {
    const onClickButton = () => {
        if (isNaN(Number(goal))) {
            document.getElementById("errMessage").innerHTML = 'Contribution goal must be a numeric value';
        }
        else {
            document.getElementById("errMessage").innerHTML = '';
            onSubmit();
        }
    }

    const user = useContext(AuthContext)

    const [wallets, loading, error] = useList(firebase.database().ref('/users/').child(user.uid).child('/wallets'))

    return (
        <FormWrap>
            <Card style="glass">
                <form>
                    <InputGrp>
                        <label>Project Name</label>
                        <InputWrap>
                            <input
                                type="text"
                                autoFocus
                                required
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                            />
                        </InputWrap>
                    </InputGrp>

                    <InputGrp>
                        <label>Category Name</label>
                        <InputWrap>
                            <input
                                type="text"
                                required
                                value={category}
                                onChange={(e) => {setCategory(e.target.value)}}
                            />
                        </InputWrap>
                    </InputGrp>

                    <InputGrp>
                        <label>Contribution Goal</label>
                        <InputWrap>
                            <input
                                type="text"
                                required
                                value={goal}
                                onChange={(e) => {setGoal(e.target.value)}}
                            />
                            <label className="unit">Tokens</label>
                        </InputWrap>
                        <label id="errMessage" style={{color: 'red'}}/>
                    </InputGrp>

                    <InputGrp>
                        <label>Wallet Address</label>
                        <InputWrap>
                            <select
                                required
                                value={wallet}
                                onChange={(e) => {setWallet((e.target as HTMLSelectElement).value)}}
                            >
                                {
                                    !loading && wallets && wallets.map((aWallet, index) => (
                                        (index === 0) ? (
                                            setWallet(aWallet.val().address)
                                        ):(null),
                                        <option value={String(aWallet.val().address)}>{String(aWallet.val().address)}</option>
                                    ))
                                }
                            </select>
                        </InputWrap>
                    </InputGrp>

                    <ButtonGrp>
                        <br/>
                        <Button
                            onClick={onClickButton}
                            variant="secondary">Create Project</Button>
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
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: ${props => props.theme.borderRadius}px;
    display: flex;
    padding: 0 ${props => props.theme.spacing[3]}px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);

    input, select {
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
    select {
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
    }
    label.unit {
        margin-left: 10px;
    }
`;

const ButtonGrp = styled.div`

`;

export default Form
