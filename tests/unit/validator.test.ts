import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPassword, isValidName } from '@/lib/validator'

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
    expect(isValidEmail('test.name@domain.cz')).toBe(true)
    expect(isValidEmail('a@b.co')).toBe(true)
    expect(isValidEmail('user+tag@gmail.com')).toBe(true)
  })

  it('rejects emails without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false)
  })

  it('rejects emails without domain', () => {
    expect(isValidEmail('user@')).toBe(false)
    expect(isValidEmail('user@.')).toBe(false)
  })

  it('rejects emails without TLD', () => {
    expect(isValidEmail('user@domain')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('rejects emails with spaces', () => {
    expect(isValidEmail('us er@example.com')).toBe(false)
    expect(isValidEmail(' user@example.com')).toBe(false)
  })
})

describe('isValidPassword', () => {
  it('accepts strong passwords (8+ chars, uppercase, digit, special)', () => {
    expect(isValidPassword('Heslo123!')).toBe(true)
    expect(isValidPassword('MyP@ssw0rd')).toBe(true)
    expect(isValidPassword('Abc!5678')).toBe(true)
  })

  it('rejects passwords shorter than 8 characters', () => {
    expect(isValidPassword('Ab1!')).toBe(false)
    expect(isValidPassword('Ab1!567')).toBe(false)
  })

  it('rejects passwords without uppercase', () => {
    expect(isValidPassword('heslo123!')).toBe(false)
  })

  it('rejects passwords without digit', () => {
    expect(isValidPassword('HesloSilne!')).toBe(false)
  })

  it('rejects passwords without special character', () => {
    expect(isValidPassword('Heslo1234')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidPassword('')).toBe(false)
  })
})

describe('isValidName', () => {
  it('accepts alphabetical names', () => {
    expect(isValidName('Jan')).toBe(true)
    expect(isValidName('Anna Marie')).toBe(true)
  })

  it('accepts Czech diacritics', () => {
    expect(isValidName('Jiří')).toBe(true)
    expect(isValidName('Kateřina')).toBe(true)
    expect(isValidName('Růžena')).toBe(true)
  })

  it('accepts hyphenated names', () => {
    expect(isValidName('Anne-Marie')).toBe(true)
  })

  it('accepts apostrophe in names', () => {
    expect(isValidName("O'Brien")).toBe(true)
  })

  it('rejects names with numbers', () => {
    expect(isValidName('Jan123')).toBe(false)
  })

  it('rejects names with special characters', () => {
    expect(isValidName('Jan@Doe')).toBe(false)
    expect(isValidName('Jan!!')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidName('')).toBe(false)
  })
})
