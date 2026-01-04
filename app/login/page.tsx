export default function LoginForm() {
  return (
    <div className="login-container">
      <h2>Ahoj! <span>Vítej zpátky!</span></h2>
      <p className="signup-link">
        Nemáš účet? <a href="#">Vytvořit si nový!</a>
      </p>

      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Tvoje heslo" required />
        <a href="#" className="forgot-password">Zapomněl si heslo?</a>
        <button type="submit" className="login-button">Přihlásit se</button>
      </form>

      <div className="social-login">
        <button className="google">Google</button>
        <button className="apple">Apple</button>
      </div>
    </div>
  )
}
