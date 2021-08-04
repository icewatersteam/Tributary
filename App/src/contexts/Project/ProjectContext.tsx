import React, { createContext, useContext } from 'react';

export type ProjectContextType = {
    project: string;
    setProject: (project: string) => void;
}

export const ProjectContext = React.createContext<ProjectContextType>({ project: '', setProject: account => console.warn('no project')});
export const useProject = () => useContext(ProjectContext);
