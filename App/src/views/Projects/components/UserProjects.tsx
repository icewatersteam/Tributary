import React, { useContext } from 'react';
import styled from 'styled-components';
import Page from '../../../components/Page';
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';
import { NavLink, useLocation } from "react-router-dom";



const UserProjects: React.FC = () => {
    
    const { pathname } = useLocation();
    //const user = useContext(AuthContext);
    const [projects, loading, error] = useList(firebase.database().ref('/projects'));

    return(
        <UserProjectsList>
          {error && <strong>Error: {error}</strong>}
          {loading && <span>Loading...</span>}
          <table>
            <thead>
              <tr>
                <th colSpan={6}>My Projects</th>
              </tr>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Goal</th>
                <th>Wallet</th>
                <th>ID</th>
              </tr>
            </thead>

            <tbody>
            {!loading && projects &&
              projects.map((project, index) => (
                String(project.val().user) === String(user.uid) ? (
                    <tr key={project.key}>
                      <td>
                          <StyledLink
                            exact
                            activeClassName="active"
                            to="/tributary"
                            isActive={() => [`/tributary`, `/tributary/contribute`, `/tributary/exchange`].includes(pathname)}
                          >
                              Contribute
                          </StyledLink>
                      </td>
                      <td>{project.val().name}</td>
                      <td>{project.val().category}</td>
                      <td>{project.val().goal}</td>
                      <td>{project.val().wallet}</td>
                      <td>{project.key}</td>
                    </tr>
                ):(
                    null
                )
              ))}
            </tbody>
          </table>
          <br></br>
        </UserProjectsList>
    );
}

const UserProjectsList = styled.div`
    table {
      width: 100%;
      text-align: left;
    }

    table tr th {
      padding: 10px 20px;
    }

    table td {
      padding: 20px;
    }

    th {
      text-align: center;
    }

    table tr {
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
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
