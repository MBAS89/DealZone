import Product from "@/models/Products"
import dbConnect from "@/lib/dbConnect"

export default async function handler(req, res) {
    const { method } = req
    await dbConnect()

    if(method === "POST"){
        const { name, categories, images,  description, variant } = req.body

        try {
            const product = await Product.create({
                name,
                categories,
                images,
                description,
                variant
            })
    
            if(product){
                return res.status(201).json({product, message: "Product Created Successfully"});
            }else{
                return res.status(201).json({message: "Somehing Went Wrong"});
            }   

        } catch (error) {
            return res.status(201).json({message: error.message});
        }

    }

}