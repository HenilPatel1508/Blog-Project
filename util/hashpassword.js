const bcrypt = require('bcrypt')

exports.hashpassword = async(password) => {
    console.log(password)
    const hashpass = await bcrypt.hash(password,10)
    return hashpass
}

exports.matchpassword = async(password,hashpass) => {
    const plainpassword = await bcrypt.compare(password,hashpass)
    return plainpassword
}