import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/app/components/auth/loginform'

// Mock auth module
const mockLoginUser = vi.fn()
vi.mock('@/lib/auth', () => ({
  loginUser: (...args: unknown[]) => mockLoginUser(...args),
}))

// Mock Loading component
vi.mock('@/app/loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}))

// Mock SocialLoginButtons
vi.mock('@/app/components/auth/socialLoginButtons', () => ({
  default: () => <div data-testid="social-buttons">Social</div>,
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all key elements', () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tvoje heslo')).toBeInTheDocument()
    expect(screen.getByText('Přihlásit se')).toBeInTheDocument()
    expect(screen.getByText(/Nemáš účet/)).toBeInTheDocument()
    expect(screen.getByText('Zapomněl si heslo?')).toBeInTheDocument()
  })

  it('shows error when submitting empty email', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    await user.click(screen.getByText('Přihlásit se'))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Zadej svůj email')
  })

  it('shows error for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    // 'user@domain' passes HTML5 email validation but fails our custom isValidEmail regex (no TLD)
    await user.type(screen.getByPlaceholderText('Email'), 'user@domain')
    await user.click(screen.getByText('Přihlásit se'))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Tohle nevypadá jako platný email')
  })

  it('shows error for short password', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Tvoje heslo'), 'short')
    await user.click(screen.getByText('Přihlásit se'))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Heslo musí mít aspoň 8 znaků')
  })

  it('calls loginUser on valid submission', async () => {
    mockLoginUser.mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(<LoginForm />)
    
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Tvoje heslo'), 'password123')
    await user.click(screen.getByText('Přihlásit se'))
    
    expect(mockLoginUser).toHaveBeenCalledWith('test@example.com', 'password123')
  })

  it('shows auth error from failed login', async () => {
    mockLoginUser.mockRejectedValue({ code: 'auth/user-not-found' })
    const user = userEvent.setup()
    render(<LoginForm />)
    
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Tvoje heslo'), 'wrongpassword')
    await user.click(screen.getByText('Přihlásit se'))
    
    // Wait for error to appear
    const alert = await screen.findByRole('alert')
    expect(alert).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    const passwordInput = screen.getByPlaceholderText('Tvoje heslo')
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    await user.click(screen.getByLabelText('Zobrazit heslo'))
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    await user.click(screen.getByLabelText('Skrýt heslo'))
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('applies warning class on invalid email after blur', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    await user.type(emailInput, 'invalid')
    await user.tab() // triggers onBlur
    
    expect(emailInput).toHaveClass('input-warning')
  })

  it('clears error when typing after error shown', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    // Trigger error
    await user.click(screen.getByText('Přihlásit se'))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    
    // Type in email field after blur (touched.email must be true)
    const emailInput = screen.getByPlaceholderText('Email')
    await user.click(emailInput)
    await user.tab() // set touched
    await user.click(emailInput)
    await user.type(emailInput, 'a')
    
    // Error should clear
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
