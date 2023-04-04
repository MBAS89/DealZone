import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'

//schema models
import { SubCat } from "../../../models/Categories"
import MainCat from '../../../models/Categories'

export default async function handler(req, res) {
  const { method } = req

  //const session = await getServerSession(req, res, authOptions)

    if(method === "POST"){
      const { name, mainCatId } = req.body

      try {
        const subCat = await SubCat.create({
          name
        })

        if(mainCatId){
            const mainCat = await MainCat.findById(mainCatId)

            mainCat.subCartegory.push(subCat._id)
    
            mainCat.save()
      
            return res.send(subCat)
        }else{
            return res.send(subCat)
        }


      } catch (error) {
        res.send(error.message)
      }
    }
  


    if(method === "GET"){
      try {
        const subCat = await SubCat.find().populate({
          path: "category",
        });
        res.send(subCat)
      } catch (error) {
        res.send(error.message)
      }
    }
    
}