import {React,useCallback,useState,useEffect} from 'react'
import { useDropzone } from 'react-dropzone';
//import { Image } from "cloudinary-react";
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlinePlus } from "react-icons/ai";

const CreateProduct = ({maincategory}) => {

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


    //product scheama
    const [productName, setProductName] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [productCat, setProductCat] = useState({
      maincategory:"",
      subcategory: "",
      category: ""
    })
    const [variant, setVariant] = useState([])
    const [ variantItem, setVariantItem ]= useState([])
    const [variantOption,setVariantOption] = useState([])
    const [isSuccess,setIsSuccess] = useState(false)
  {/*const handleCreateProduct = async (e) => {
    e.preventDefault()

    const data = {
      name : productName,
      categories:productCat,
      images:uploadedFiles,
      description:productDesc,
      variant:variant
    }

    try {
        const res = await axios.post('http://localhost:3000/api/products', data)
        toast.success(res.data.message)
    } catch (error) {
        toast.error("Something went wrong!")
    }
  }*/}
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
      price:"",
      oldPrice:"",
      onSale:false,
      options:[]
    })
    setVariantItemsForm({})
  }
  

console.log(variantOptionObj + "lala")
console.log(variant)
 

useEffect(()=>{
  const fecthing =  async () => {
      try {
          const res = await axios.get(`http://localhost:3000/api/main-category/sub-category`)
          setProductCat(res.data)
          setIsSuccess(false)
      } catch (error) {
          toast.error("Something went wrong!")
          setIsSuccess(false)
      }
  }
  fecthing()
},[isSuccess])


  return (
  <div className='w-[80%] mx-auto'>
    <form >{/*onSubmit={handleCreateProduct}*/}
      <div className='flex'>
        <div className='drop-shadow-xl p-10 bg-white w-2/3 rounded-lg mb-10 border border-gray-200'>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Product Name</label>
          <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="block w-full p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Description</label>
          <textarea value={productDesc} onChange={(e)=>{setProductDesc(e.target.value)}} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your product description here..."></textarea>
        </div>
        <div className='bg-white w-1/3 p-10 ml-10 rounded-lg mb-10 drop-shadow-xl border border-gray-200'>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Categories</label>
          {maincategory.map((p)=>(
                <div>{p.name}</div>
              ))}
          <select value={productCat} onChange={(e)=>{setProductCat(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {/*{productCat.map((maincat)=>(
              <option name="maincategory">{maincat.name}</option>
            ))} */} {/*onChange={(e)=>{setProductCat({maincategory:e.target.value})}}*/} {/*value={productCat.maincategory}*/}
            <option name="subcategory" value={productCat.subcategory} onChange={(e)=>{setProductCat({subcategory:e.target.value})}}>Sub Category</option>
            <option name="category" value={productCat.category} onChange={(e)=>{setProductCat({category:e.target.value})}}>Category</option>
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

    <div className='bg-pink-300 w-2/3'>
      <div className='flex justify-between'>
        <label className="block mb-2 font-medium text-gray-900 dark:text-white">Varient</label>
        <button type="button" onClick={showVaraintForm} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><AiOutlinePlus/></button>
      </div>
{varaintForm&&(<div>
      <input type="text" placeholder='varient name' value={variantObj.name} onChange={handleVaraintNameChange} className="block w-full p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
      <button type="button" onClick={addVaraint} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Variant</button>
      </div>
      )}
    </div>
    </form>
    <input  />
   
    <div className='w-full h-24 bg-slate-300'>
      {variant.map((v,index)=>(
        <div className='flex justify-between'>
          <div>{v.name}</div>
          {varaintItemsForm[index] ? <button onClick={showItemForm(index)}>X</button> : <button onClick={showItemForm(index)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add items</button>}
          
          {varaintItemsForm[index] &&(
            <div className='flex flex-wrap '>
              <input type="text" placeholder='item name' value={variantItemObj.name} onChange={(e)=>{setVariantItemObj({...variantItemObj, name:e.target.value})}} className="block w-1/2 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              <input type="text" placeholder='item price' value={variantItemObj.price} onChange={(e)=>{setVariantItemObj({...variantItemObj, price:e.target.value})}} className="block w-1/2 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
              <input type="text" placeholder='item old price' value={variantItemObj.oldPrice} onChange={(e)=>{setVariantItemObj({...variantItemObj, oldPrice:e.target.value})}} className="block w-1/2 p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-teal-500 focus:border-teal-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
              <label className="relative inline-flex items-center mr-5 cursor-pointer" >
                  <input type="checkbox" value={variantItemObj.onSale} className="sr-only peer" onChange={()=>{setVariantItemObj({...variantItemObj, onSale:!variantItemObj.onSale})}}/>
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 bg-orange-300">On Sale</span>
              </label>
              <button onClick={handleAddItemVariant(index)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit Item</button>
            </div>
            )}
          {v.items.map((item,index) => (
            <div>
              {item.name}
              {item.price}
              {item.oldPrice}
              {item.onSale}
              <button onClick={showVariantOptionForm(index)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Options</button>
            
          
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

{/*
export const getServerSideProps = async () =>{
  const res = await axios.get('http://localhost:3000/api/main-category')
 
  //const data = await response.json()
  return {
    props: {
      maincategory:res.data,
      subcategory:res.data
    }, // will be passed to the page component as props
  }
}
*/}

{/* <h1>Product Name</h1>
        <input type='name'></input>

        <h1>Description</h1>
        <textarea></textarea>
        <div>
            <h1>Images</h1>
            <AiOutlinePlus/>
        </div>
 */}





 /*




    variant[index].items[index].options.push(variantOptionObj)
    setVariantOptionObj({
      name:"",
      qty:"",
      price:"",
      oldPrice:"",
      onSale:false,
    })
    setVariantOptionForm({})
*/