const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={props.handleSubmit}>
        <div>
          username
          <input
          value={props.username}
          onChange={props.handleUsernameChange}
          name="Username"
          />
        </div>
        <div>
          password
          <input
          type="password"
          value={props.password}
          onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submut">login</button>
      </form>
    </div>
  )
}

export default LoginForm