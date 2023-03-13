import React from 'react';

function Login(props) {
  return (
    <nav className='login'>
      <button className='facebook' onClick={() => props.login('Facebook')}>Login with Facebook</button>
      {/*<button className='github' onClick={() => props.login('Github')}>Login with Github</button>*/}
    </nav>
  );
}

export default Login;