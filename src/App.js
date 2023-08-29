import React, {useState, useRef} from 'react'

export default function App() {
  const [abjad, setAbjad] = useState('abcdefghijklmnopqrstuvwxyz')
  // Ref Hooks
  const plaintext = useRef()
  const keyPlainText = useRef()
  const ciphertext = useRef()
  const keyCiphertext = useRef()

  // state
  const [cipherState, setCipherState] = useState(null);
  const [plainState, setPlainState] = useState(null);

  // Button Action
  const encrypt = () => {
    const plain = plaintext.current.value
    const key = keyPlainText.current.value
    if (plain !== '' && key !== '') {
      runEncrypt(plain, key)
    } else {
      alert('nda boleh kosong')
    }
  }

  const decrypt = () => {
    const cipher = ciphertext.current.value
    const key = keyCiphertext.current.value
    if (cipher !== '' && key !== '') {
      runDecrypt(cipher, key)
    } else {
      alert('nda boleh kosong')
    }
  }

  // function
  const runEncrypt = (plaintext, key) => {
    const subPlainText = plaintext.split(" ")
    const keyText = key.split(" ")
    let textArray = []
    let keyArray = []
    let cipherArray = []

    keyText.forEach(keyText => {
      for (let index = 0; index < keyText.length; index++) {
        const element = keyText[index];
        keyArray.push(element)
      }
    })

    subPlainText.forEach(karakter => {
      for (let index = 0; index < karakter.length; index++) {
        const element = karakter[index];
        textArray.push(element)
      }
    })

    let text = ""
    for (let indexPlainText = 0; indexPlainText < textArray.length; indexPlainText++) {
      const element = textArray[indexPlainText];
      const key = indexPlainText % keyArray.length

      const plaintextIndex = abjad.indexOf(element)
      const cipherIndex = abjad.indexOf(keyArray[key])
      const cipherText = (plaintextIndex + cipherIndex) % 26
      const cipherOutput = abjad[cipherText]
      text += cipherOutput
    }
    cipherArray.push(text)
    let outputStream = cipherArray.toString().replaceAll(",", " ")
    setCipherState(outputStream)
  }

  const runDecrypt = (ciphertext, key) => {
    const subCipherText = ciphertext.split(" ")
    const keyText = key.split(" ")
    let textArray = []
    let keyArray = []
    let cipherArray = []

    keyText.forEach(keyText => {
      for (let index = 0; index < keyText.length; index++) {
        const element = keyText[index];
        keyArray.push(element)
      }
    })

    subCipherText.forEach(karakter => {
      for (let index = 0; index < karakter.length; index++) {
        const element = karakter[index];
        textArray.push(element)
      }
    })

    let text = ""
    for (let indexPlainText = 0; indexPlainText < textArray.length; indexPlainText++) {
      const element = textArray[indexPlainText];
      const key = indexPlainText % keyArray.length

      const plaintextIndex = abjad.indexOf(element)
      const cipherIndex = abjad.indexOf(keyArray[key])
      let cipherText = ""
      if ((plaintextIndex - cipherIndex) >= 0) {
        cipherText = (plaintextIndex - cipherIndex) % 26
      } else {
        cipherText = (plaintextIndex - cipherIndex) + 26
      }
      
      const cipherOutput = abjad[cipherText]
      text += cipherOutput
    }
    cipherArray.push(text)
    let outputStream = cipherArray.toString().replaceAll(",", " ")
    setPlainState(outputStream)
  }

  return (
    <div className='bg-slate-800 w-full h-screen text-white'>
      <h1 className='text-center font-bold text-3xl py-4'>Vigenere Cipher with JavaScript</h1>
      <div className='flex flex-row justify-items-center mt-12'>
        <div className='flex-1 mx-8'>
          <div>
            <label className='block text-sm font-medium'>Plain Text</label>
            <textarea ref={plaintext} placeholder='Input you plaintext ....' className='w-full h-64 mt-2 p-2 border text-slate-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
          </div>
          <div className='mt-4'>
            <label className='block text-sm font-medium'>Key (ex : koding)</label>
            <input ref={keyPlainText} type='text' max={26} min={2} placeholder='Input you Key ....' className='w-full mt-2 p-2 border text-slate-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
          </div>
          <div className='mt-4'>
            <button onClick={() => encrypt()} className='w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>Encrypt</button>
          </div>
          <div className='mt-4'>
            <p>Cipher text : {cipherState == null ? '' : <span className='bg-slate-500 px-1'>{cipherState}</span>}</p>
          </div>
        </div>
        <div className='flex-1 mx-8'>
          <div>
            <label className='block text-sm font-medium'>Cipher Text</label>
            <textarea ref={ciphertext} placeholder='Input you plaintext ....' className='w-full h-64 mt-2 p-2 border text-slate-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
          </div>
          <div className='mt-4'>
            <label className='block text-sm font-medium'>Key (ex : koding)</label>
            <input ref={keyCiphertext} type='text' max={26} min={2} placeholder='Input you Key ....' className='w-full mt-2 p-2 border text-slate-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
          </div>
          <div className='mt-4'>
            <button onClick={() => decrypt()} className='w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>Decrypt</button>
          </div>
          <div className='mt-4'>
            <p>Plain text : {plainState == null ? '' : <span className='bg-slate-500 px-1'>{plainState}</span>}</p>
          </div>
        </div>
      </div>
    </div>
  )
}