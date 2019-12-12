import React from 'react';
import PropTypes from 'prop-types';

function TopNav(props) {
  const logged_out_nav = (
    <ul className="auth-button">
      {/* <li className="login" onClick={() => props.display_form('login')}>Log In</li> */}
    {/*   <li className="signup" onClick={() => props.display_form('signup')}>Sign Up</li> */}
    </ul>
  );

  const logged_in_nav = (
    <ul className="auth-button">
      <li className="logout" onClick={props.handle_logout}>Logout</li>
    </ul>
  );
  return (
    <div>
      <div className="Top-nav" >
        <div>
          <img className = "Logo"
          src = "https://cdn.vox-cdn.com/uploads/chorus_asset/file/8866023/fridge.gif" / >
        </div>
        <div className = "heading">
          <h1><a href="/"> Fridgenerate</a></h1> 
        </div>
        <div className="user-auth">
          {props.logged_in ? logged_in_nav : logged_out_nav}
        </div>
      </div> 
    </div>
  )
}

export default TopNav;

TopNav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};