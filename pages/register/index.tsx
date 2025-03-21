const Register = () => {
  return (
    //use the Hero UI to style these
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone" />
        <input type="password" placeholder="Password" />
        <input type="text" placeholder="Address" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
