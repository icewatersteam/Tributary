import React, { useCallback } from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button';
import { useWallet } from 'use-wallet';
import AccountButton from '../../components/TopBar/components/AccountButton'

interface onSubmitProps {
    price: number,
    amount: number,
}

interface PriceAmountFormProps {
    title?: string,
    onSubmit: (data:onSubmitProps) => void,
}


const PriceAmountForm: React.FC<PriceAmountFormProps> = ({
    title="Submit",
    onSubmit
}) => {

    const { account, status } = useWallet();

    const submitForm = useCallback((data: onSubmitProps) => {        
        onSubmit(data);        
    }, [onSubmit]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        //clearError
      } = useForm();         

    // https://react-hook-form.com/ts
    return (
        <Styles>
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="inputGrp">
                <label htmlFor='price'>Price</label>
                <div className='inputWrap'>
                    <input placeholder="0.00"                        
                        type='number'
                        {...register("price", { 
                            required: true,
                            pattern: /^-?[0-9]\d*\.?\d*$/                           
                        })}
                    />
                </div>
                {
                    errors.price && <div className="error">Enter your price</div>
                }
            </div>
            <div className="inputGrp">
                <label htmlFor='amount'>Amount</label>
                <div className='inputWrap'>
                    <input placeholder="0.00"                        
                        type='number'
                        {...register("amount", { 
                            required: true,
                            pattern: /^-?[0-9]\d*\.?\d*$/                           
                        })}
                    />
                </div>
                {
                    errors.ammount && <div className="error">Enter your amount</div>
                }
            </div>    
            
            {account ? (        
                <Button
                type="submit"
                size="sm"
                text={"Submit " + title}
                variant="tertiary"
                />  
            ) : (
                <AccountButton />
            )}

        </form>
        </Styles>
    )
}


const Styles = styled.div`
 div.inputGrp {
    margin-bottom: 25px;
 }

 div.inputWrap {
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: ${props => props.theme.borderRadius}px;
    display: flex;
    padding: 0 ${props => props.theme.spacing[3]}px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
 }

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

 input::placeholder {
     color: rgba(255, 255, 255, 0.5);
 }

 
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}

 label {
   display: block;
   font-weight: bold;
   margin: 0px 0px 10px 3px;
 }

 .error {
   color: ${props => props.theme.color.red[100]};      
   margin: 10px 0px 0px 3px;
 }
`;

// const Styles = styled.div`
//  div.inputGrp {
//     margin-bottom: 25px;
//  }

//  div.inputWrap {
//     align-items: center;
//     background-color: ${props => props.theme.color.grey[200]};
//     border-radius: ${props => props.theme.borderRadius}px;
//     display: flex;
//     padding: 0 ${props => props.theme.spacing[3]}px;
//  }

//  input {    
//     background: none;
//     border: 0;
//     color: ${props => props.theme.color.grey[600]};
//     font-size: 18px;
//     flex: 1;
//     height: 56px;
//     margin: 0;
//     padding: 0;
//     outline: none;
//  }

//  label {
//    display: block;
//    font-weight: bold;
//    margin: 0px 0px 10px 3px;
//  }

//  .error {
//    color: ${props => props.theme.color.red[100]};      
//    margin: 10px 0px 0px 3px;
//  }
// `;


export default PriceAmountForm