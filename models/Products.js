import mongoose from "mongoose";
import MainCat from '../models/Categories';
import { SubCat, Cat } from "../models/Categories";
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    categories:{
        maincategory:{
            type: Schema.Types.ObjectId,
            ref: 'MainCat',
        },
        subcategory:{
            type: Schema.Types.ObjectId,
            ref: 'SubCat',
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Cat',
        }
    },
    images:[{
        url:String,
        alt:String
    }],
    description:{type:String,required:true},
    variant:[{
        name:String,
        items:[{
            name:String,
            image:String,
            price:Number,
            oldPrice:Number,
            onSale:Boolean,
            qty:Number,
            options:[{
                name:String,
                qty:Number,
                price:Number,
                oldPrice:Number,
                onSale:Boolean
            }]
        }]
    }],
    bestSeller:{
        type:Boolean,
        default:false
    },
    totalQty:Number,
    sold:Number,
},{timestamps : true})

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
