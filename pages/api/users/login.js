import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/Users';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req

    await dbConnect() // wait and connect db

    if(method === "GET"){
        try {
            const { email, password, confirmPassword } = req.query.body

            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Email is not valid" });
            }
    
            if(password !== confirmPassword){
                return res.status(400).json({ message: "Password doesn't match" });
            }
    
            if(password.length < 8) {
                return res.status(400).json({ message: "Password is too short" });
            }
    
            const validPassword = password.trim() // white spaces removed
    
            const validEmail = (email.toLowerCase()).trim()
    
            const checkexisting = await User.findOne({ email: validEmail }) // we wan to check if user is already in our db  
    
            if(checkexisting) return res.status(422).json({ message: "User Already Exists...!"});
    
            const hashedPassword = await hash(validPassword, 12);
    
            try {
                const user = await User.create({
                    name,
                    email:validEmail,
                    password:hashedPassword,
                });
      
                res.status(201).json({message: "Registered Sucssuflly!", sucess:true});
            } catch (err) {
                res.status(500).json({ message: err.message})
            }
        } catch (error) {
            res.status(500).json({ message: error.message})
        }

    }
}
  