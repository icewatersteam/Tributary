import React, { useContext } from 'react';
import styled from 'styled-components';
import Page from '../../../components/Page';
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';



const UserProjects: React.FC = () => {

    const user = useContext(AuthContext);
    const [projects, loading, error] = useList(firebase.database().ref('/projects'));

    return(
        <UserProjectsList>
          {error && <strong>Error: {error}</strong>}
          {loading && <span>Loading...</span>}
          <table>
            <thead>
              <tr>
                <th colSpan={4}>My Projects</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Goal</th>
                <th>ID</th>
              </tr>
            </thead>

            <tbody>
            {!loading && projects &&
              projects.map((project, index) => (
                String(project.val().user) === String(user.uid) ? (
                    <tr key={project.key}>
                      <td>{project.val().name}</td>
                      <td>{project.val().category}</td>
                      <td>{project.val().interestGoal}</td>
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

    table tr {
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

export default UserProjects;
