import mongoose from "mongoose";
const Schema = mongoose.Schema;
 
const CategorySchema = new mongoose.Schema({
    name:String,
},{timestamps : true})

const SubCartegorySchema = new mongoose.Schema({
    name:String,
    category:[{
        type: Schema.Types.ObjectId,
        ref: 'Cat',
        required: true
    }],
},{timestamps : true})

const MainCategorySchema = new mongoose.Schema({
    name:String,
    subCartegory:[{
        type: Schema.Types.ObjectId,
        ref: 'SubCat',
        required: true
    }],
},{timestamps : true})

const SubCat =  mongoose.models.SubCat || mongoose.model("SubCat", SubCartegorySchema);
const Cat = mongoose.models.Cat || mongoose.model("Cat", CategorySchema);
export{ SubCat, Cat };
export default mongoose.models.MainCat || mongoose.model("MainCat", MainCategorySchema);
