import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '@/app/components/auth/registerform'

const mockRegisterUser = vi.fn()
const mockSignOut = vi.fn()

vi.mock('@/lib/auth', () => ({
  registerUser: (...args: unknown[]) => mockRegisterUser(...args),
}))

vi.mock('firebase/auth', () => ({
  signOut: (...args: unknown[]) => mockSignOut(...args),
}))

vi.mock('@/app/loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}))

vi.mock('@/app/components/auth/socialLoginButtons', () => ({
  default: () => <div data-testid="social-buttons">Social</div>,
}))

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<RegisterForm />)
    expect(screen.getByPlaceholderText('Jméno')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Příjmení')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Zadej tvoje heslo')).toBeInTheDocument()
    expect(screen.getByText('Vytvořit účet')).toBeInTheDocument()
    expect(screen.getByLabelText(/Souhlasím s/)).toBeInTheDocument()
  })

  it('shows error when names are whitespace-only', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)
    
    // Space-only names pass HTML5 'required' but fail trim() check
    await user.type(screen.getByPlaceholderText('Jméno'), ' ')
    await user.type(screen.getByPlaceholderText('Příjmení'), ' ')
    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com')
    await user.type(screen.getByPlaceholderText('Zadej tvoje heslo'), 'Password1!')
    await user.click(screen.getByLabelText(/Souhlasím s/))
    await user.click(screen.getByText('Vytvořit účet'))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Vypln celé jméno')
  })

  it('shows error for name with numbers', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)
    
    await user.type(screen.getByPlaceholderText('Jméno'), 'Jan123')
    await user.type(screen.getByPlaceholderText('Příjmení'), 'Novák')
    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com')
    await user.type(screen.getByPlaceholderText('Zadej tvoje heslo'), 'Password1!')
    await user.click(screen.getByLabelText(/Souhlasím s/))
    await user.click(screen.getByText('Vytvořit účet'))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Jméno může obsahovat jen písmena')
  })

  it('shows error for invalid email', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)
    
    await user.type(screen.getByPlaceholderText('Jméno'), 'Jan')
    await user.type(screen.getByPlaceholderText('Příjmení'), 'Novák')
    // 'user@domain' passes HTML5 email validation but fails our custom regex
    await user.type(screen.getByPlaceholderText('Email'), 'user@domain')
    await user.type(screen.getByPlaceholderText('Zadej tvoje heslo'), 'Password1!')
    await user.click(screen.getByLabelText(/Souhlasím s/))
    await user.click(screen.getByText('Vytvořit účet'))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Email není platný')
  })

  it('shows error for short password', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)
    
    await user.type(screen.getByPlaceholderText('Jméno'), 'Jan')
    await user.type(screen.getByPlaceholderText('Příjmení'), 'Novák')
    await user.type(screen.getByPlaceholderText('Email'), 'jan@test.com')
    await user.type(screen.getByPlaceholderText('Zadej tvoje heslo'), 'short')
    await user.click(screen.getByLabelText(/Souhlasím s/))
    await user.click(screen.getByText('Vytvořit účet'))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Heslo musí mít aspoň 8 znaků')
  })

  it('calls registerUser on valid submission', async () => {
    mockRegisterUser.mockResolvedValue(undefined)
    mockSignOut.mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(<RegisterForm />)
    
    await user.type(screen.getByPlaceholderText('Jméno'), 'Jan')
    await user.type(screen.getByPlaceholderText('Příjmení'), 'Novák')
    await user.type(screen.getByPlaceholderText('Email'), 'jan@test.com')
    await user.type(screen.getByPlaceholderText('Zadej tvoje heslo'), 'HesilkoSilne1!')
    await user.click(screen.getByLabelText(/Souhlasím s/))
    await user.click(screen.getByText('Vytvořit účet'))
    
    expect(mockRegisterUser).toHaveBeenCalledWith('Jan', 'Novák', 'jan@test.com', 'HesilkoSilne1!')
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)
    
    const passwordInput = screen.getByPlaceholderText('Zadej tvoje heslo')
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    await user.click(screen.getByLabelText('Zobrazit heslo'))
    expect(passwordInput).toHaveAttribute('type', 'text')
  })

  it('shows auth error when registration fails', async () => {
    mockRegisterUser.mockRejectedValue({ code: 'auth/email-already-in-use' })
    const user = userEvent.setup()
    render(<RegisterForm />)
    
    await user.type(screen.getByPlaceholderText('Jméno'), 'Jan')
    await user.type(screen.getByPlaceholderText('Příjmení'), 'Novák')
    await user.type(screen.getByPlaceholderText('Email'), 'jan@test.com')
    await user.type(screen.getByPlaceholderText('Zadej tvoje heslo'), 'HesilkoSilne1!')
    await user.click(screen.getByLabelText(/Souhlasím s/))
    await user.click(screen.getByText('Vytvořit účet'))
    
    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/email/)
  })
})
