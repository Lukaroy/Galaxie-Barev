import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Alert from '@/app/components/alert'

describe('Alert', () => {
  it('renders error message by default', () => {
    render(<Alert message="Něco se pokazilo" />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Něco se pokazilo')
    expect(alert).toHaveClass('alert', 'error')
  })

  it('renders success message', () => {
    render(<Alert message="Hotovo!" type="success" />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Hotovo!')
    expect(alert).toHaveClass('alert', 'success')
  })

  it('renders nothing when message is empty', () => {
    const { container } = render(<Alert message="" />)
    expect(container.innerHTML).toBe('')
  })
})
