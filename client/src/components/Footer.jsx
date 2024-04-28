import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to="/posts/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/posts/categories/Business">Business</Link></li>
        <li><Link to="/posts/categories/Education">Education</Link></li>
        <li><Link to="/posts/categories/Entertentment">Entertentment</Link></li>
        <li><Link to="/posts/categories/Art">Art</Link></li>
        <li><Link to="/posts/categories/Investment">Investment</Link></li>
        <li><Link to="/posts/categories/Wetaher">Wetaher</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, @_devSamir</small>
      </div>
    </footer>
  )
}

export default Footer