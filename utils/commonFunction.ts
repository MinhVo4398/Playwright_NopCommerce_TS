export class CommonFunction {

  
  
  static generateRandomNumber() {
    return Math.floor(Math.random() * (55533 - 3333)) + 22222;
  }

   static  generateRandomWord(length:number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomWord = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomWord += characters.charAt(randomIndex);
    }
    return randomWord;
  }
}


