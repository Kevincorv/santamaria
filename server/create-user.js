import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { getStore } from './db.js'
import { hashPassword, passwordPolicy } from './auth.js'
import { loadEnv } from './config.js'

loadEnv()

/**
 * Crea o actualiza un usuario administrador.
 * Uso:
 *   node create-user.js              → interactivo
 *   node create-user.js admin nuevo  → usuario y contraseña por argumento
 */
async function main() {
  const store = await getStore()
  const [, , argUser, argPass] = process.argv

  let username = argUser
  let password = argPass

  if (!username || !password) {
    const rl = readline.createInterface({ input, output })
    try {
      username = username || (await rl.question('Usuario: ')).trim()
      password = password || (await rl.question('Contraseña (mínimo 8 caracteres): '))
    } finally {
      rl.close()
    }
  }

  const policyError = passwordPolicy(password)
  if (policyError) {
    console.error(`[santamaria] ${policyError}`)
    process.exit(1)
  }
  if (!username) {
    console.error('[santamaria] El usuario no puede estar vacío.')
    process.exit(1)
  }

  const existing = await store.getUser(username)
  const hash = hashPassword(password)

  if (existing) {
    await store.updateUserPassword(username, hash)
    console.log(`[santamaria] Contraseña actualizada para "${username}".`)
  } else {
    await store.createUser(username, hash)
    console.log(`[santamaria] Usuario "${username}" creado.`)
  }

  await store.close()
}

main().catch((error) => {
  console.error('[santamaria] Error:', error.message)
  process.exit(1)
})
