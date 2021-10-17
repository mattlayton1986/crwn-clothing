import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import { useSelector } from 'react-redux'
import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import styled from 'styled-components'

const DirectoryMenu = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Directory = () => {
  const sections = useSelector( selectDirectorySections )
  return (
    <DirectoryMenu>
      {
        sections.map(({id, ...otherSectionProps }) => (
          <MenuItem 
            key={id}
            {...otherSectionProps}
          />
        ))
      }
    </DirectoryMenu>
  )
}

export default Directory