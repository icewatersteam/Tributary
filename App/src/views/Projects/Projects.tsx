import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import CreateProject from "./components/CreateProject"
import { NavLink } from "react-router-dom"
import Card from '../../components/Card'
import Button from '../../components/Button';

import { AuthContext } from "../../contexts/Auth/AuthContext";

//import Hero from "./components/Hero"

// Firebase dependencies 
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';

const Projects: React.FC = () => {
  const user = useContext(AuthContext);

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

  const [projectName, setProjectName] = useState('')
  const [projectCategory, setProjectCategory] = useState('');
  
  const clearInputs = () => {
    setProjectName('')
    setProjectCategory('')
  }

  const onCreateProject = () => {

    if ( !user ) {
      return
    }

    clearInputs()

    // Add a new entry in the projects tree
    const newProjectRef = firebase.database().ref('projects').push({
      name: projectName,
      category: projectCategory,
      user: user.uid
    })    

    // Add a new entry in the user-projects tree
    firebase.database().ref('user-projects').child(user.uid).push({
      pid: newProjectRef.key
    })
  }

    return(
<Page>     
      
      <ResponsiveWrap>        

      { user ? (
        <CreateProject 
          name={projectName}
          category={projectCategory}
          setName={setProjectName}  
          setCategory={setProjectCategory}
          onSubmit={onCreateProject} 
        />          
      ) : (
        <LoginToCreate>          
          <StyledLink to='/signin'>Sign In to create a project</StyledLink>
        </LoginToCreate>
      )}        
      
      <ProjectsList>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>ID</th>
            </tr>
          </thead>

          <tbody>
          {!loading && projects &&
            projects.map((project, index) => (
              <tr key={project.key}>
                <td>{project.val().name}</td>
                <td>{project.val().category}</td>
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
  max-width: 50vw;    
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

  table tr {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2); 
  }  
`;

export default Projects;