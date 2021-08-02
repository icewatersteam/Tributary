timport React, { /*useContext,*/ useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import { useWallet } from 'use-wallet';
//import CreateProject from "./components/CreateProject"
import UserProjects from "./components/UserProjects";
import { NavLink, useLocation } from "react-router-dom"
import Card from '../../components/Card'
import Button from '../../components/Button';

//import { AuthContext } from "../../contexts/Auth/AuthContext";

//import Hero from "./components/Hero"

// Firebase dependencies
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';

const Projects: React.FC = () => {
  //const user = useContext(AuthContext);

  const { account } = useWallet();
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
      {account && (<UserProjects />)}
      <ProjectsList>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <table>
          <thead>
            <tr>
                <th colSpan={5}>All Projects</th>
            </tr>
            <tr>
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
`;

const LoginToCreate = styled.div`
    max-width: 300px;
    margin: 50px auto;

    button {
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

const ProjectsList = styled.div`
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

export default Projects;
