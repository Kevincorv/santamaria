import crypto from 'node:crypto'

/**
 * Hash de contraseñas con scrypt (módulo criptográfico de Node.js).
 * Formato almacenado: scrypt$<saltHex>$<hashHex>
 * No se usa bcrypt/argon2 para evitar dependencias nativas compiladas.
 */

const SCRYPT_OPTS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

export function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const hash = crypto.scryptSync(password, salt, 64, SCRYPT_OPTS)
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

export function verifyPassword(password, stored) {
  if (typeof stored !== 'string') return false
  const parts = stored.split('$')
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false
  const salt = Buffer.from(parts[1], 'hex')
  const expected = Buffer.from(parts[2], 'hex')
  const actual = crypto.scryptSync(password, salt, expected.length, SCRYPT_OPTS)
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected)
}

export function newSessionToken() {
  return crypto.randomBytes(32).toString('hex')
}

/** Cumple la política de contraseñas: mínimo 8 caracteres. */
export function passwordPolicy(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.'
  }
  return null
}
