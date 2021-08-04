import React, { useContext } from 'react';
import styled from 'styled-components';
import Page from '../../../components/Page';
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';
import { NavLink, useLocation } from "react-router-dom";
import { AccountContext } from '../../../contexts/Account/AccountContext';

const UserProjects: React.FC = () => {

    const { account, setAccount } = useContext(AccountContext);
    const { pathname } = useLocation();
    const [projects, loading, error] = useList(firebase.database().ref('/projects'));

    return(
        <>
        <UserProjectsList>
          {error && <strong>Error: {error}</strong>}
          {loading && <span>Loading...</span>}
          <table>
            <thead>
              <tr>
                <th colSpan={3}>My Projects</th>
              </tr>
              <tr>
                <th className='button'></th>
                <th className='name'>Name</th>
                <th className='id'>ID</th>
              </tr>
            </thead>

            <tbody>
            {!loading && projects &&
              projects.map((project, index) => (
                String(project.val().wallet) === String(account) ? (
                    <tr key={project.key}>
                      <td className="button">
                          <StyledLink
                            exact
                            activeClassName="active"
                            to="/tributary"
                            isActive={() => [`/tributary`, `/tributary/contribute`, `/tributary/exchange`].includes(pathname)}
                          >
                              Contribute
                          </StyledLink>
                      </td>
                      <td className='name'>{project.val().name}</td>
                      <td className='id'>{project.key}</td>
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

  background-color: rgba(255, 255, 255, 0.1);

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

  td, th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    padding: 20px;
  }

  .button, .name {
      width: 25%;
  }
  .id {
      width: 75%;
  }

  table tr:last-child > td {
      border-bottom: none;
  }

  th {
      text-align: center;
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
