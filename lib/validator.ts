// Heslo: min 8 znaků, velké písmeno, číslo, speciální znak
export const isValidPassword = (password: string) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)

// Email: musí mít tvar x@y.z
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Jméno/Příjmení: pouze písmena, min 1 znak
export const isValidName = (name: string) =>
  /^[A-Za-zÀ-ž\s'-]+$/.test(name)
