import { dirname } from 'path'
import { fileURLToPath } from 'url'
import baseConfig from '../../eslint.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const eslintConfig = [...baseConfig]

export default eslintConfig
