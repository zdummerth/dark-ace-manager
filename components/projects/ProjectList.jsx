import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { useProjects } from 'lib/hooks'
import NewProjectForm from 'components/forms/NewProjectForm'
import ProjectCard from 'components/projects/ProjectCard'

const Container = styled(Flex)`
  width: 100%;

  #space {
      margin: 10px;
  }
`



export default function ProjectList({ userId }) {
    const { projects, createProject, deleteProject } = useProjects({ userId })
    // const { user } = useUser()

    return (
        <Container dir='column' ai='center'>
            {projects && projects.map(p => {
                return (
                    <ProjectCard
                        project={p}
                        id={p._id}
                        key={p._id}
                        remove={() => deleteProject(p._id)}
                    />
                )
            })}
            <div id='space' />
            <NewProjectForm createProject={createProject} />
        </Container>
    )
}
