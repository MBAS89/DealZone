import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

import dbConnect from '../../../lib/dbConnect';
import Users from '../../../models/Users';
import { compare, hash } from 'bcryptjs';
import crypto from 'crypto';

//import sendVerificationEmail from '../../../middleware/emailService';


export const authOptions = {
  providers: [
    // OAuth authentication providers...
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        await dbConnect()
        
        //check user existance
        const result = await Users.findOne({email: credentials.email}).select('+password')
        if(!result){
          throw new Error('No user Found With Email Please Sign Up!')
        }

        //compare password
        const checkPassword = await compare(credentials.password, result.password)
        if(!checkPassword || result.email !== credentials.email){
            throw new Error("Email or Password dosen't match")
        }else{
            
          return result
        }
      }
    })
  ],
  callbacks:{
    signIn: async ({ user, account }) => {
      await dbConnect()

      if (account.provider === "google") {
        const existingUser = await Users.findOne({ email: user.email });

        if (existingUser) {
          user.userData = existingUser 
          return existingUser;
        }
        
        const randomPassword = crypto.randomBytes(8).toString('hex');

        const hashedPassword = await hash(randomPassword, 12);

        const newUser = await Users.create({
          name: user.name,
          email:user.email,
          password:hashedPassword,
          provider:true,
          providerName:"google",
          verified:true
        });

        user.userData = newUser 

        return newUser;
      }else{
        return true
      }
    },
    jwt: async ({ token, user }) =>{



      if (user) {
        token.uid = user;
      }

      return token
    },
    session: async ({ session, token }) => {
        if(token.uid.userData){

            session.userData = {
              isAdmin: token.uid.userData.isAdmin,
              id: token.uid.userData._id,
              image:token.uid.userData.image,
              provider:token.uid.userData.provider
            }
        }else{
            session.userData = {
              isAdmin: token.uid.isAdmin,//user admin
              id: token.uid._id,
              provider:token.uid.provider
            }
        }
      return session;
    },
  },
  strategy: "jwt",
  secret: process.env.NEXT_AUTH_SECRET,
  database: process.env.DB_URL  
}

export default NextAuth(authOptions)



/*





*/