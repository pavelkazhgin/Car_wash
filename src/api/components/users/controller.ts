require('dotenv').config()
const db = new (require("./repository").UserDatabase)();
const bcrypt = require('bcrypt')
const jwtService = new (require('../../../services/jwt_service').JWTService)();

class UserController {
  constructor() { }

 async signIn(phone: string, email: string, pass: string) {
  let result 
      if (phone == null) {
        result  = await db.signInEmail(email);
      } 
      if (email == null){
        result = await db.signInPhone(phone);
      }
      try {
        if (result){
           if (await bcrypt.compare(pass, result.pass)) {
          console.log('User from sign in', result.id, result.firstName);
          const payload = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            phone: result.phone,
            email: result.email
          }
          let authToken = jwtService.generateAccessToken({uid: payload.id});
          let refresh_token = jwtService.generateRefreshToken({uid: payload.id});
          redis.set(payload.id, JSON.stringify({
            refresh_token: refresh_token,
            expires: '3600s'
        }),
        redis.print
    );
          console.log(authToken)
          return {
            success: true,
            content: {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
                phone: result.phone,
                email: result.email,
                authToken,
                refresh_token
              },
            message: `User signIn!`,
            code: 500
          }
        }
        return {
          success: false,
          content: { },
          message: `Пароль не совпадает!`,
          code: 401
        }
      }
      return {
        success: false,
        content: { },
        message: `Пользователь с таким логином/паролем не существует`,
        code: 401
      }
      } catch (error) {
        console.log(error)
        return {
          success: false,
          content: { },
          message: `Ошибка авторизации!`,
          code: 401
        }
      }
  }

  async signUp(firstName: string, lastName: string, email: string | null, pass: string, phone: string | null){
    if (firstName && lastName && (phone || email) && pass) {
      const secretPass = await bcrypt.hash(pass, Number(process.env.ROUNDS));
      console.log("here")
      let result = await db.signUp(firstName, lastName, email, secretPass, phone);
      if(result.id){
        return {
          success: true,
        content: {},
        message: 'Пльзователь успешно зарегисрирован!',
        code: 200,
        };
      } 
      return {
        success: false,
        content: {},
        message: `Internal server error`,
        code: 403,
      };    
    }
  }
}


module.exports = {
  UserController,
};
