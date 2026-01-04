export default function RegisterForm() {
  return (
    <div className="register-container">
      <h2>Začni dnes! <span>Vytvořit si nový účet!</span></h2>
      <p className="signup-link">
        Máš již založený účet? <a href="/prihlaseni">Přihlásit se!</a>
      </p>

      <form className="register-form">
        <div className="name-row">
          <input type="text" name="first_name" placeholder="Jméno" required />
          <input type="text" name="last_name" placeholder="Příjmení" required />
        </div>

        <input type="email" name="email" placeholder="Email" required className="full-input"/>
        <input type="password" name="password" placeholder="Tvoje heslo" required className="full-input"/>

        <label className="terms">
          <input type="checkbox" required /> Souhlasím s podmínkami <a href="/terms">Terms and Conditions</a>
        </label>

        <button type="submit" className="register-button">Vytvořit účet</button>

        <div className="divider">
          <span>nebo se registruj pomocí</span>
        </div>
      </form>

      <div className="social-login">
        <button className="google">Google</button>
        <button className="apple">Apple</button>
      </div>
    </div>
  );
}
