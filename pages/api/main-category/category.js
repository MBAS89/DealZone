import { SubCat } from "../../../models/Categories";
import MainCat from '../../../models/Categories';
import {Cat} from "../../../models/Categories";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req
    await dbConnect()
    //const session = await getServerSession(req, res, authOptions)
  
    if(method === "POST"){
        const { name,subCatId } = req.body
  
        try {
          const cat = await Cat.create({
            name
          })
  
          if(subCatId){
              const subCat = await SubCat.findById(subCatId)
  
              subCat.category.push(cat._id)
      
              subCat.save()
        
              return res.send(cat)
          }else{
              return res.send(cat)
          }
  
  
        } catch (error) {
          res.send(error.message)
        }
    }
    

  }