import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Button from '../../../components/Button';
import styled from 'styled-components';
import { ProjectContext } from '../../../contexts/Project/ProjectContext';

interface ProjectTabProps {
    projectName: string,
    projectCategory: string,
    projectWallet: string,
    projectDescription: string,
    projectGoal: number,
    //projectSource: string,
}

const ProjectTab: React.FC<ProjectTabProps> = ({
    projectName,
    projectCategory,
    projectWallet,
    projectDescription,
    projectGoal,
}) => {
    // Tracks whether the dropdown should appear or not
    const [ dropped, setDropped ] = useState(false);

    // Tracks the selected project when the user travels between sections of the website
    const { project, setProject } = useContext(ProjectContext);

    const { pathname } = useLocation();
    return(
        <Card>
            <tr key={projectWallet} className="tab">
              <td className='button'>
                {!dropped ? (
                    <StyledLink
                      exact
                      activeClassName="active"
                      to="/tributary"
                      isActive={() => [`/tributary`, `/tributary/contribute`, `/tributary/withdraw`].includes(pathname)}
                      onClick={() => (setProject(projectWallet))}
                    >
                        Contribute
                    </StyledLink>
                ):(null)}
              </td>
              <td className='name'>{projectName}</td>
              <td className='id'>{projectWallet}</td>
              <td className='dropdown'>
                  <button id={projectWallet} data-dropped='false' onClick={(e) => setDropped(!dropped)} className="collapse">
                      {
                          dropped ? (
                             '-'
                          ):(
                              '+'
                          )
                      }
                  </button>
              </td>
            </tr>
            {dropped ? (
                <>
                    <DropDownCard>
                        <td colSpan={4} style={{borderTop: '3px solid #212121', borderBottom: '3px solid #7d7d7d'}}>
                            <div>
                                <table className="attributes">
                                    <tr>
                                        <td>Name:</td>
                                        <td>{projectName}</td>
                                    </tr>
                                    <tr>
                                        <td>Category:</td>
                                        <td>{projectCategory}</td>
                                    </tr>
                                    <tr>
                                        <td>Goal:</td>
                                        <td>{projectGoal}</td>
                                    </tr>
                                    <tr>
                                        <td>Address:</td>
                                        <td>{projectWallet}</td>
                                    </tr>
                                </table>
                            </div>
                            <br></br>
                            <div className='descTitle'>Project Description:</div>
                            <div className="description">
                                {projectDescription}
                            </div>
                        </td>
                    </DropDownCard>
                    <DropDownPanel>
                        <td colSpan={4}>
                            <div>
                                <StyledLink
                                    exact
                                    activeClassName="active"
                                    to="/tributary"
                                    isActive={() => [`/tributary`, `/tributary/contribute`, `/tributary/withdraw`].includes(pathname)}
                                    onClick={() => (setProject(projectWallet))}
                                >
                                    <Button
                                        size="sm"
                                        text="Contribute"
                                        variant="secondary"
                                    />
                                </StyledLink>
                                <div></div>
                                <StyledLink
                                    exact
                                    activeClassName="active"
                                    to="/tributary/withdraw"
                                    isActive={() => [`/tributary`, `/tributary/contribute`, `/tributary/withdraw`].includes(pathname)}
                                    onClick={() => (setProject(projectWallet))}
                                >
                                    <Button
                                        size="sm"
                                        text="Withdraw"
                                        variant="secondary"
                                    />
                                </StyledLink>
                            </div>
                        </td>
                    </DropDownPanel>
                </>
            ):(null)}
        </Card>
    );
}

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.purple[400]};
  font-weight: 700;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.purple[300]};
  }
`;

const DropDownCard = styled.tr`
    background-color: ${props => props.theme.color.grey[800]};

    td {
        border-left: 3px solid #2e2e2e;
        border-right: 3px solid #5e5e5e;
    }

    div.description {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: ${props => props.theme.borderRadius}px;
        display: flex;
        padding: 0 ${props => props.theme.spacing[3]}px;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
    div.descTitle {
        padding: 5px;
    }
    .attributes {
        font-size: 13px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 0;
        padding: 5px;
    }
    .attributes tr td {
        border: none;
        padding: 5px;
    }

    .attributes tr {
        padding: 5px;
    }

`;

/*border-left: 10px solid rgba(255, 255, 255, 0.2);
border-top: 10px solid rgba(255, 255, 255, 0.2);
border-bottom: 10px solid black;
border-right: 10px solid black;*/
const DropDownPanel = styled.tr`

    td {
        background-color: #171717;
    }
    td div {
        display: flex;
    }
    td div > * {
        flex: 1;
        text-align: center;
    }
`;

const Card = styled.div`
    tr td {
        border-top: 1px solid rgba(0, 0, 0, 0.5);
    }
`;

export default ProjectTab;
