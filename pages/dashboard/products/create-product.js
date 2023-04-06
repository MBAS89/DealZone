import {React,useCallback,useState,useEffect} from 'react'
import { useDropzone } from 'react-dropzone';
//import { Image } from "cloudinary-react";
import Image from 'next/image';
import axios from 'axios';
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
const CreateProduct = () => {

  const [uploadedFiles,setUploadedFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    acceptedFiles.forEach( async (acceptedFile) => {

    const {signature,timestamp} = await getSignature();

    const formData = new FormData();

      formData.append('file', acceptedFile); // the file you want to upload
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
      formData.append('signature', signature);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const res  = await axios.post(url, formData, config)

    setUploadedFiles((old)=>[...old, {
      url:res.data.secure_url,
      alt:res.data.original_filename
      }])
    })
  },[]);

  const {getRootProps,getInputProps,isDragActive} = useDropzone({
    onDrop,
    accepts:"image/*",
    multiple:true
  });



const [itemImage, setItemImage] = useState([])
const onItemImgDrop = useCallback((acceptedFiles) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  acceptedFiles.forEach( async (acceptedFile) => {

  const {signature,timestamp} = await getSignature();

  const formData = new FormData();

    formData.append('file', acceptedFile); // the file you want to upload
    formData.append('timestamp', timestamp);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
    formData.append('signature', signature);

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const res  = await axios.post(url, formData, config)

  setItemImage((old)=>[...old, {
    url:res.data.secure_url,
    alt:res.data.original_filename
    }])
  })
},[]);

//const {getRootProps,getInputProps,isDragActive} = 
useDropzone({
  onItemImgDrop,
  accepts:"image/*"
 
});



    //product scheama
    const [productName, setProductName] = useState('')
    const [productDesc, setProductDesc] = useState('')
    
    const [variant, setVariant] = useState([])
    const [mainCategory, setMainCategory] = useState([]);
  
  const [varaintForm, setVariantForm] = useState(false)
  //Handle Add variant 
  const showVaraintForm = () => {
    setVariantForm(!varaintForm)
  }

  const [varaintItemsForm, setVariantItemsForm] = useState({})
  //Handle Add variant 
  const [variantOptionForm,setVariantOptionForm] = useState({})

  const showVariantOptionForm = (index) => ()=>{
    setVariantOptionForm(variantOptionForm => ({
      ...variantOptionForm,
      [index]: !variantOptionForm[index],
    }));
  }
  const [variantOptionObj, setVariantOptionObj] = useState({
    name:"",
    qty:"",
    price:"",
    oldPrice:"",
    onSale:false,
  })

  const handleVariantOptions = (v,i) =>() => {
    variant[v].items[i].options.push(variantOptionObj)
    setVariantOptionObj({
      name:"",
      qty:"",
      price:"",
      oldPrice:"",
      onSale:false,
    })
    setVariantOptionForm({})
  }

  const [variantObj, setVariantObj] = useState({
    name:"",
    items:[]
  })


  const handleVaraintNameChange = (e) => {
    setVariantObj({
      name:e.target.value,
      items:[]
    })
  }

  const addVaraint = () => {
    setVariant([...variant, variantObj])
  }

  const [variantItemObj, setVariantItemObj] = useState({
    name:"",
    image:"",
    price:"",
    oldPrice:"",
    onSale:false,
    options:[]
  })

  const showItemForm = (index) => () => {
    setVariantItemsForm(varaintItemsForm => ({
      ...varaintItemsForm,
      [index]: !varaintItemsForm[index],
    }));
  }

  const handleAddItemVariant = (index) => () => {
    variant[index].items.push(variantItemObj)
    setVariantItemObj({
      name:"",
      image:"",
      price:"",
      oldPrice:"",
      onSale:false,
      options:[]
    })
    setVariantItemsForm({})
  }
  

console.log(variantOptionObj + "lala")
console.log(variant)
 
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api/main-category')
    setMainCategory(response.data);
  };
  fetchData();
}, []);

const [mainCatIndex, setMainCatIndex] = useState(0)
const [subCatIndex,setSubCatIndex] = useState(0)
console.log(mainCatIndex,'sadsad')
console.log(subCatIndex,'subcat')

  return (
  <div className='w-[80%] mx-auto h-full'>
    <form>
      <div className='flex'>
        <div className='drop-shadow-xl p-10 bg-white w-2/3 rounded-lg mb-10 border border-gray-200'>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Product Name</label>
          <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="block w-full p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Description</label>
          <textarea value={productDesc} onChange={(e)=>{setProductDesc(e.target.value)}} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your product description here..."></textarea>
        </div>
        <div className='bg-white w-1/3 p-10 ml-10 rounded-lg mb-10 drop-shadow-xl border border-gray-200'>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Main Category</label>
            <select onChange={(e) => {setMainCatIndex(e.target.value)}} id="maincategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {mainCategory.map((item, index) => (
                <option value={index} >{item.name} </option>
              ))}
            </select>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Sub Category</label>
            <select onChange={(e) => {setSubCatIndex(e.target.value)}} id="subcategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {mainCategory && mainCategory[mainCatIndex]?.subCartegory.map((subItem) => (
                <option key={subItem._id}>{subItem.name}</option>
              ))}
            </select>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Category</label>
            <select  id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {mainCategory && mainCategory[mainCatIndex]?.subCartegory[subCatIndex]?.category.map((cItem) => (
                <option key={cItem._id}>{cItem.name}</option>
              ))}
            </select>  
        </div>
      </div>
      <div className='bg-white drop-shadow-xl rounded-lg p-10 w-2/3 border border-gray-200'>
        <label className="block mb-2 font-medium text-gray-900 dark:text-white">Images</label>
        <div {...getRootProps()} className={`h-[8rem] m-[1rem] p-[1rem] border-dashed border-2 border-teal-500 flex justify-center items-center text-[2rem] font-bold cursor-pointer ${isDragActive ? 'border-double border-2 border-purple-600' : null}`}>
          <input {...getInputProps()}/>
            Drop Zone
        </div>
        <div className='bg-green-300'>
          <ul>{uploadedFiles?.map((file) =>( <li key={file.url}>
            <Image src={file.url} width={200} height={200} alt="uploaded-image" className="h-20 w-20"/>
            </li>))}
          </ul>
        </div>
    </div>
    <div className='bg-white drop-shadow-xl rounded-lg border border-gray-200 w-2/3 mt-10'>
      <div className='flex justify-between pt-10 pr-10 pl-10 pb-5'>
        <label className="block font-medium text-gray-900 dark:text-white">Varient</label>
        <button type="button" onClick={showVaraintForm} className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 "><AiOutlinePlus/></button>
      </div>
      {varaintForm&&(
      <div className='flex items-center justify-between mx-auto px-10 pb-10'>
        <input type="text" placeholder='varient name' value={variantObj.name} onChange={handleVaraintNameChange} className="w-[80%] p-2 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
        <button type="button" onClick={addVaraint} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5  text-center mr-2 ">Add Variant</button>
      </div>
      )}
    </div>
    </form>
    <input/>
    <div className='w-2/3 h-[27rem] bg-slate-300'>
      {variant.map((v,index)=>(
        <div>
          <div className='flex justify-between p-5'>
            <div className='font-bold p-4 text-lg'>{v.name}</div>
            {varaintItemsForm[index] ? <button className="p-4" onClick={showItemForm(index)}><IoMdCloseCircle className='w-7 h-7'/></button> : <button onClick={showItemForm(index)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add items</button>}
          </div>
          {varaintItemsForm[index] &&(
            <div className='flex flex-col gap-3 items-center'>
              <input type="text" placeholder='item name' value={variantItemObj.name} onChange={(e)=>{setVariantItemObj({...variantItemObj, name:e.target.value})}} className="block w-2/3 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              <div className='bg-white drop-shadow-xl rounded-lg border border-gray-200 w-2/3 p-2.5'>{/*w-[5rem] w-[3rem] p-[1rem] m-[1rem]*/}
                <div {...getRootProps()} className={`h-[3rem] w-full  border-dashed border-2 border-teal-500 flex justify-center items-center text-[1rem] font-bold cursor-pointer ${isDragActive ? 'border-double border-2 border-purple-600' : null}`}>
                  <input {...getInputProps()}/>
                    Drop Image
                </div>
                <div className='bg-green-300'>
                  <ul>{itemImage?.map((file) =>( <li key={file.url}>
                    <Image src={file.url} width={200} height={200} alt="uploaded-image" className="h-20 w-20"/>
                    </li>))}
                  </ul>
                </div>
              </div>
              <input type="text" placeholder='item price' value={variantItemObj.price} onChange={(e)=>{setVariantItemObj({...variantItemObj, price:e.target.value})}} className="block w-2/3 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
              <input type="text" placeholder='item old price' value={variantItemObj.oldPrice} onChange={(e)=>{setVariantItemObj({...variantItemObj, oldPrice:e.target.value})}} className="block w-2/3 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
              <label className="relative inline-flex items-center mr-5 cursor-pointer " >
                  <input type="checkbox" value={variantItemObj.onSale} className="sr-only peer" onChange={()=>{setVariantItemObj({...variantItemObj, onSale:!variantItemObj.onSale})}}/>
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 ">On Sale</span>
              </label>
              <button onClick={handleAddItemVariant(index)} type="button" className="block text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2/3">Submit Item</button>
            </div>
            )}
          {v.items.map((item,index) => (
            <div className='bg-green-300'>


<div className="inline-flex rounded-md shadow-sm " role="group">
  <button type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  {item.name}
  </button>
  <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  {item.img}
  </button>
  <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  {item.price}
  </button>
  <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  {item.oldPrice}
  </button>
  <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  {item.onSale}
  </button>
  <button onClick={showVariantOptionForm(index)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Options</button>
</div>



{/*
              <div className="inline-flex rounded-md shadow-sm border border-gray-900 " role="group">
                <div className=''>{item.name}</div>
                <div className='border border-l border-gray-900'>Item Image :{item.img}</div>
                <div className='border border-l border-gray-900'>Item Price :{item.price}</div>
                <div className='border border-l border-gray-900'>Item Old Price :{item.oldPrice}</div>
                <div className='border-l-lg'>{item.onSale}</div>
                <button onClick={showVariantOptionForm(index)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Options</button>
          </div>*/}
              {variantOptionForm[index]&&(
                <div className='flex flex-wrap'> 
                  <input type="text" placeholder='option name' value={variantOptionObj.name} onChange={(e)=>{setVariantOptionObj({...variantOptionObj, name:e.target.value})}} className="block w-1/2 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  <input type="text" placeholder='option quantity' value={variantOptionObj.qty} onChange={(e)=>{setVariantOptionObj({...variantOptionObj, qty:e.target.value})}} className="block w-1/2 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  <input type="text" placeholder='option price' value={variantOptionObj.price} onChange={(e)=>{setVariantOptionObj({...variantOptionObj, price:e.target.value})}} className="block w-1/2 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
                  <input type="text" placeholder='option old price' value={variantOptionObj.oldPrice} onChange={(e)=>{setVariantOptionObj({...variantOptionObj, oldPrice:e.target.value})}} className="block w-1/2 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
                  <label className="relative inline-flex items-center mr-5 cursor-pointer" >
                      <input type="checkbox" value={variantOptionObj.onSale} className="sr-only peer" onChange={()=>{setVariantOptionObj({...variantOptionObj, onSale:!variantOptionObj.onSale})}}/>
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 bg-orange-300">On Sale</span>
                  </label>
                  <button onClick={handleVariantOptions(index, index)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit Option</button>
                </div>
              )}
              {item.options.map((option)=> (
                <div>
                  {option.name}
                  {option.qty}
                  {option.price}
                  {option.oldPrice}
                  {option.onSale}
                </div>
              ))}
          </div>
        ))}
        </div>
      ))}
    </div>
  </div>
  )
}
export default CreateProduct
async function getSignature() {
  const response = await axios.get("/api/sign");
  const data = response.data
  const { signature, timestamp } = data;
  return { signature, timestamp };
}  