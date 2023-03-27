import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if(!session){
    res.status(400).json({message : "not authanticated to access this route"})
  }else{

    res.status(200).json({ name: 'John Doe' })
  }

}
