// const ShellExec = require('./lib/ShellExec')
const GetFiles = require('./lib/GetFiles')
const isColab = require('./lib/isColab')

// const isDirectory = require('./lib/isDirectory')

const path = require('path')
const fs = require('fs')

const ShellSpawn = require('./lib/ShellExec')
const ShowErrorMessage = require('./lib/ShowErrorMessage')


let main = async function () {
  let files = GetFiles()
  let filenameNoExt = filename
  if (filenameNoExt.endsWith('.pdf')) {
    filenameNoExt = filenameNoExt.slice(0, -4)
  }

  if (isColab) {
    await ShellSpawn(`rm -rf /output/*`)
  }

  for (let i = 0; i < files.length; i++) {
    let file = files[i]

    if (file.endsWith('.pdf') === false) {
      continue
    }
    
    try {
      let inputPath = `/input/${file}`
      let outputTemp = `/output/${filenameNoExt}.unlock.pdf`
      await ShellSpawn(`qpdf --decrypt "${inputPath}" "${outputTemp}"`)

      if (fs.existsSync(outputTemp)) {
        let outputTarget = `/output/${file}`
        if (fs.existsSync(outputTarget)) {
          fs.unlinkSync(outputTarget)
        }
        fs.renameSync(outputTemp, outputTarget)
      }
      else {
        throw new Error(`Unlock failed.`)
      }
    }
    catch (e) {
      // console.error(e)
      ShowErrorMessage(filenameNoExt, e)
    }
  }
}

main()