import React, { useMemo } from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Label from '../../../components/Label';
import Modal, { ModalProps } from '../../../components/Modal';
import ModalTitle from '../../../components/ModalTitle';
import TokenSymbol from '../../../components/TokenSymbol';

/*
interface SimpleModalProps {
  title?: string | "My Modal"
}
*/

const SimpleModal: React.FC<ModalProps> = ({ onDismiss }) => {

  const dismissSimpleModal = () : void => {
    console.log("dismissed!")
  }

  return (
    <Modal >
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="H20" />
          <StyledBalance>
            <StyledValue>123</StyledValue>
            <Label text="H20 Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="ICE" />
          <StyledBalance>
            <StyledValue>456</StyledValue>
            <Label text="Ice Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="STEAM" />
          <StyledBalance>
            <StyledValue>789</StyledValue>
            <Label text="Steam Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  )
}

const StyledValue = styled.div`  
  font-size: 30px;
  font-weight: 700;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${props => props.theme.spacing[3]}px;
`

const StyledBalanceIcon = styled.div`
  font-size: 36px;
  margin-right: ${props => props.theme.spacing[3]}px;
`

const StyledBalanceActions = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${props => props.theme.spacing[4]}px;
`

export default SimpleModal