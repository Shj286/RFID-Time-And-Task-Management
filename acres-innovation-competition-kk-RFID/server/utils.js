exports.generateUniqueString = function generateUniqueString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let result = '';
    const charactersLength = characters.length;
    while (result.length < length) {
      const char = characters.charAt(Math.floor(Math.random() * charactersLength));
      if (result.indexOf(char) === -1) {
        result += char;
      }
    }
    return result;
  }
  
  