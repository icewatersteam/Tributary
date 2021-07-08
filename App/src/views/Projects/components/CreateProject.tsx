import React, { useMemo } from 'react'
import styled from 'styled-components';
import Card from '../../../components/Card'
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form'

interface FormProps {
    name: string,
    category: string,
    setName: (name:string) => void,
    setCategory: (category:string) => void,
    onSubmit: () => void,
}

const Form: React.FC<FormProps> = ({
    name,
    category,
    setName,
    setCategory,
    onSubmit
}) => {    

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

                    <ButtonGrp>
                        <br/>
                        <Button 
                            onClick={onSubmit} 
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
