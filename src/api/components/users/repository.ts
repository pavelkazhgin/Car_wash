// const { User } = require('../../../db/models/user.ts');
import User from '../../../db/models/user';

// console.log('this is User', User)

class UserDatabase {
  constructor() { }
  
 async signInEmail(email: string){
      const currentUser = await User.findOne({
        where: {
          email
        },
      });
      return currentUser;
  }
  async signInPhone(phone: string){
    const currentUser = await User.findOne({
      where: {
        phone
      },
    });
    
    return currentUser;
}

  async signUp(firstName: string, lastName: string, email: string | null, pass: string, phone: string | null){

      console.log(firstName, lastName, email, pass, phone, 'repo')
      try {
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          pass,
          phone
        });
        return newUser;
      } catch (error) {
        console.log(error)
      }
        
  
        
      
  }
}

module.exports = {UserDatabase};
