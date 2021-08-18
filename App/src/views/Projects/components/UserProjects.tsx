import React, { useContext } from 'react';
import styled from 'styled-components';
import Page from '../../../components/Page';
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';
import { NavLink, useLocation } from "react-router-dom";
import { AccountContext } from '../../../contexts/Account/AccountContext';
import { ProjectContext } from '../../../contexts/Project/ProjectContext';
import ProjectTab from './ProjectTab';

const UserProjects: React.FC = () => {

    const { account, setAccount } = useContext(AccountContext);
    const { project, setProject } = useContext(ProjectContext);
    const { pathname } = useLocation();
    const [projects, loading, error] = useList(firebase.database().ref('/beneficiaries'));

    return(
        <>
        <UserProjectsList>
          {error && <strong>Error: {error}</strong>}
          {loading && <span>Loading...</span>}
          <table>
            <thead>
              <tr>
                <th colSpan={4} className='mainHeader'>My Projects</th>
              </tr>
              <tr>
                <th className='button'></th>
                <th className='name'>Name</th>
                <th className='wallet'>Wallet</th>
                <th className='dropdown'></th>
              </tr>
            </thead>
          </table>
          <table>
            <tbody>
            {!loading && projects &&
              projects.map((aProject, index) => (
                String(aProject.key) === String(account) ? (
                    <tr>
                        <ProjectTab
                            projectName={aProject.val().name}
                            projectWallet={aProject.key}
                            projectCategory={aProject.val().category}
                            projectDescription={aProject.val().description}
                            projectGoal={Number(aProject.val().goal)}
                        />
                    </tr>
                ):(
                    null
                )
              ))}
            </tbody>
          </table>
        </UserProjectsList>
        <br></br>
        </>
    );
}

const UserProjectsList = styled.div`
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    table {
      width: 100%;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-bottom: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      border-spacing: 0;
      text-align: left;
    }

    table td, table th {
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      padding: 20px;
    }

    table tr:last-child > td {
        border-bottom: none;
    }

    th {
        text-align: center;
    }

    .button, .name {
        width: 15%;
    }

    .wallet {
        width: 60%;
    }
    .dropdown {
        width: 5%;
    }

    .dropdown button {
        background-color: transparent;
        color: ${(props) => props.theme.color.white};
        border: none;
        text-align: left;
        outline: none;
        font-size: 15px;
    }

    .dropdown button:hover {
        background-color: rgba(255,255,255,0.1);
    }
`;

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.purple[400]};
  font-weight: 700;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.purple[300]};
  }
`;

export default UserProjects;
