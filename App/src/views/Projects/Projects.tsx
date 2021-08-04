import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
//import CreateProject from "./components/CreateProject"
import UserProjects from "./components/UserProjects";
import { NavLink, useLocation } from "react-router-dom"
import Button from '../../components/Button';

import { AccountContext } from '../../contexts/Account/AccountContext';

//import Hero from "./components/Hero"

// Firebase dependencies
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';

const Projects: React.FC = () => {
  const { account, setAccount } = useContext(AccountContext);
  //const { account } = useWallet();
  const { pathname } = useLocation();

  /*
  // Here are just a few examples using firebase

  const testFirebase = () => {
    // https://bezkoder.com/react-firebase-hooks-crud/
    console.log("Testing Firebase functionality")

    let userID = '123'

    // How to set (change) a value
    firebase.database().ref('users/123/name').set("Tim")
    // Same as above but this uses the .child method to consctruct the path
    firebase.database().ref('users').child(userID).child('name').set("Tim")

    // How to create a new entry on an object
    firebase.database().ref('users/123/favoriteColor').set("blue")
    firebase.database().ref('users/123/favoriteFood').set("fruit")

    // How to delete an entry ("favoriteFood")
    firebase.database().ref('users/123/favoriteFood').remove()
  }

  useEffect(()=>{
    testFirebase()
  }, [])
  */

  // Get a list of ALL of the projects
  const [projects, loading, error] = useList(firebase.database().ref('/projects'));

  const [projectName, setProjectName] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectGoal, setProjectGoal] = useState(0);
  const [projectWallet, setProjectWallet] = useState('');

  /*const clearInputs = () => {
    setProjectName('')
    setProjectCategory('')
    setProjectGoal(0)
    setProjectWallet('')
  }*/

  /*const onCreateProject = () => {

    if ( !user ) {
      return
    }

    clearInputs()
    document.getElementById("errMessage").innerHTML = '';
    // Add a new entry in the projects tree
    const newProjectRef = firebase.database().ref('projects').push({
      name: projectName,
      category: projectCategory,
      goal: projectGoal,
      wallet: projectWallet,
      user: user.uid
    })

    // Add a new entry in the user-projects tree
    firebase.database().ref('user-projects').child(user.uid).push({
      pid: newProjectRef.key
    })

    //Update Global numBeneficiaries
    !loading && projects ? (
        firebase.database().ref('Global/numBeneficiaries').set(String(projects.length))
    ):(
        firebase.database().ref('Global/numBeneficiaries').set(String(0))
    )
  }*/

    return(
<Page>

      <ResponsiveWrap>

      {/* user ? (
        <CreateProject
          name={projectName}
          category={projectCategory}
          goal={projectGoal}
          wallet={projectWallet}
          setName={setProjectName}
          setCategory={setProjectCategory}
          setGoal={setProjectGoal}
          setWallet={setProjectWallet}
          onSubmit={onCreateProject}
        />
      ) : (
        <LoginToCreate>
          <StyledLink to='/signin'>Sign in to manage your projects</StyledLink>
        </LoginToCreate>
    )*/}
        <br></br>
      {account && (<UserProjects />)}
              <ProjectsList>
                {error && <strong>Error: {error}</strong>}
                {loading && <span>Loading...</span>}
                <table>
                  <thead>
                    <tr>
                        <th colSpan={3}>All Projects</th>
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
                      <tr key={project.key}>
                        <td className='button'>
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
                    ))}
                  </tbody>
                </table>
              </ProjectsList>
      </ResponsiveWrap>
    </Page>
  );
};

const ResponsiveWrap = styled.div`
  color: ${props => props.theme.color.white};
  width: 100%;
  text-align: center;
  max-width: 500px
`;

const LoginToCreate = styled.div`
    max-width: 300px;
    margin: 50px auto;

    button {
      text-align: center;
    }
`;
  /*background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);*/
const ProjectsCard = styled.div`
`;

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.purple[400]};
  font-weight: 700;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.purple[300]};
  }
`;

const Card = styled.div`
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
`;

const ProjectsList = styled.div`
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
      width: 25%;
  }
  .id {
      width: 75%;
  }

`;

export default Projects;
