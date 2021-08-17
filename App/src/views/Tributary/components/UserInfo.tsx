import Web3 from 'web3';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { RoleContext } from '../../../contexts/Role/RoleContext';
import Spacer from '../../../components/Spacer';
import Button from '../../../components/Button';

interface UserInfoProps {
    account: string,
}

const UserInfo: React.FC<UserInfoProps> = ({
    account,
}) => {

    const { useBeneficiary, setUseBeneficiary } = useContext(RoleContext);
    const [lifetimeDeposited, setLifetimeDeposited] = useState(0);
    const [retrievableCol, setRetrievableCol] = useState(0);
    const [interestAccrued, setInterestAccrued] = useState(0);
    const [fundsAvailable, setFundsAvailable] = useState(0);
    const [fundsRaised, setFundsRaised] = useState(0);
    const [fundsStaked, setFundsStaked] = useState(0);
    const [numDonors, setNumDonors] = useState(0);

    return(
        <MarketCard>
          <div>Connected: {account}</div>
            {!useBeneficiary ? (
                <>
                    <Spacer></Spacer>
                    <InfoRow>
                        <div className="infoCard">
                            <div>Current Funds Available:</div>
                            <div className="value">{lifetimeDeposited} yveCRV-DAO</div>
                        </div>
                        <span />
                        <div className="infoCard">
                            <div>Funds Staked/Promised:</div>
                            <div className="value">{interestAccrued} yveCRV-DAO</div>
                        </div>
                    </InfoRow>
                    <InfoRow>
                        <div className="infoCard">
                            <div>Lifetime Funds Raised:</div>
                            <div className="value">{retrievableCol} yveCRV-DAO</div>
                        </div>
                    </InfoRow>
                </>
            ):(
                <>
                  <Spacer></Spacer>
                  <InfoRow>
                      <div className="infoCard">
                          <div>Lifetime deposited:</div>
                          <div className="value">{lifetimeDeposited} yveCRV-DAO</div>
                      </div>
                      <span />
                      <DataCard>
                          <div>Lifetime Potential Interest Accrued:</div>
                          <div className="value">{interestAccrued} yveCRV-DAO</div>
                      </DataCard>
                  </InfoRow>
                  <Spacer></Spacer>
                  <InfoRow>
                      <div className="infoCard">
                          <div>Outstanding Retrievable Collateral:</div>
                          <div className="value">{retrievableCol} yveCRV-DAO</div>
                      </div>
                      <span />
                      <DataCard>
                        <table>
                          <tr><td><div>Number of Donors: {numDonors}</div></td></tr>
                          <tr><td>
                          <Button
                            size='sm'
                            text={'Get donor address list'}
                            variant='tertiary'
                          />
                          {/*<Button
                              size="sm"
                              text="Get donor address list"
                              variant="secondary"
                          />*/}
                          </td></tr>
                          <tr><td>
                          <Button
                            size='sm'
                            text={'Request profile change'}
                            variant='tertiary'
                          />
                          {/*<Button
                              size="sm"
                              text="Request profile change"
                              variant="secondary"
                          />*/}
                          </td></tr>
                        </table>
                      </DataCard>
                  </InfoRow>
                </>
            )}
        </MarketCard>
    );
}



const MarketCard = styled.div`
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  .infoCard {
      align-items: center;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: ${props => props.theme.borderRadius}px;
      padding: 0 ${props => props.theme.spacing[3]}px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
  }

  .infoCard div {
      padding-top: 10px;
  }

  .value {
      padding-top: 20px;
      padding-bottom: 20px;
      text-align: center;
      align-items: center;
  }
`;

const DataCard = styled.div`
    align-items: center;
    padding: 0 ${props => props.theme.spacing[3]}px;

    table tr td {
        padding: 5px;
    }
`;

const StyledButton = styled.button`

`;

const InfoRow = styled.div`
    padding: 10px;
    display: flex;
    div {
        flex: 7;
    }
    span {
        flex: 1;
    }
`;

export default UserInfo;
