const generateCode = (codeLength) => {
  const numbers = String(Math.random()).split('.')[1].split('')
  const length = numbers.length
  let code = ''

  if (!codeLength)
    codeLength = 4

  // code = numbers.slice(-codeLength).reverse().join('')
  for (let i = 0; i < codeLength; i++) {
    code = code + numbers[length - (i + 1)]
  }

  return code
}

module.exports = generateCode