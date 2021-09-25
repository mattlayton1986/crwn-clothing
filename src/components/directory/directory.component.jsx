import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import styled from 'styled-components'
// import './directory.styles.scss'

const DirectoryMenu = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Directory = ({ sections }) => (
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

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})


export default connect(mapStateToProps)(Directory)