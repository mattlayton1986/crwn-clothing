import React from 'react'
import { withRouter } from 'react-router'

import './menu-item.styles.scss'

const MenuItem = ({ title, size, imageUrl, linkUrl, history, match }) => (
  <div 
    className={`menu-item ${size}`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div 
      className="background-image"
      style={{backgroundImage: `url(${imageUrl})`}}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
)

export default withRouter(MenuItem)