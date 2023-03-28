import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'

//schema models
import MainCat from '../../../models/Categories'

export default async function handler(req, res) {
  const { method } = req

  //const session = await getServerSession(req, res, authOptions)

  //Create Main Category
  if(method === "POST"){
    const { name } = req.body

    try {
      const mainCat = await MainCat.create({
        name
      })

      res.send(mainCat)
    } catch (error) {
      res.send(error.message)
    }
  }


  //Get All Category 
  if(method === "GET"){
    try {
      const mainCat = await MainCat.find().populate({
        path: "subCartegory",
        populate: {
          path: "category",
          model: "Cat"
        }
      });
      res.send(mainCat)
    } catch (error) {
      res.send(error.message)
    }
  }
  

}


/*

if(!session){
  res.status(400).json({message : "not authanticated to access this route"})
}else{

  if(method === "POST"){
    const { name } = req.body

    const mainCat = await MainCat.create({
      name
    })

    res.send(mainCat)
  }
}*/