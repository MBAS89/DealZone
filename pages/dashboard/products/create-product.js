import {React,useCallback,useState} from 'react'
import { useDropzone } from 'react-dropzone';
//import { Image } from "cloudinary-react";
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


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


    //product scheama
    const [productName, setProductName] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [productCat, setProductCat] = useState({
      maincategory:"",
      subcategory: "",
      category: ""
    })
    const [variant, setVariant] = useState([])


  const handleCreateProduct = async (e) => {
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
  }


  const [varaintForm, setVariantForm] = useState(false)
  //Handle Add variant 
  const showVaraintForm = () => {
    setVariantForm(!varaintForm)
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


  const handleAddVariantItem = (i) => () => {

  }


  console.log(variant)



  return (
  <div className='bg-pink-300 w-[80%] mx-auto'>
    <form onSubmit={handleCreateProduct}>
    <h1>Product Name</h1>
      <input type='name'value={productName} onChange={(e)=>{setProductName(e.target.value)}}></input>
    <h1>Description</h1>
      <textarea value={productDesc} onChange={(e)=>{setProductDesc(e.target.value)}}></textarea>
    <div>
      <h1>Images</h1>
        <div {...getRootProps()} className={`h-[8rem] m-[1rem] p-[1rem] border-dashed border-2 border-orange-400 flex justify-center items-center text-[2rem] font-bold cursor-pointer ${isDragActive ? 'border-double border-2 border-purple-600' : null}`}>
          <input {...getInputProps()}/>
            Drop Zone
        </div>
        <ul>{uploadedFiles?.map((file) =>( <li key={file.url}>
          <Image src={file.url} width={200} height={200} alt="uploaded-image" className="h-20 w-20"/>
          </li>))}
        </ul>
    </div>

    <label for="underline_select" class="sr-only">Underline select</label>
      <select id="underline_select" class="block py-2.5 px-0 w-60 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
        <option selected>Categories</option>
        <option value="maincat">Main Category</option>
        <option value="subcat">Sub Category</option>
        <option value="cat">Category</option>
    </select>

    <div>
      <h2>Varient</h2>
      <h3>size</h3>
      <div>
        <h4>25</h4>
        <Image></Image>
        <p>price</p>
        <p>old price</p>
        <label class="relative inline-flex items-center mr-5 cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" checked/>
          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">On Sale</span>
        </label>
        <div>
          <h1>options</h1>
          <div>
            <h3>name</h3>
            <p>qty</p>
            <p>price</p>
            <p>old price</p>
            <label class="relative inline-flex items-center mr-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" checked/>
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">On Sale</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    </form>
    <input onChange={handleVaraintNameChange} />
    <button onClick={addVaraint}>button</button>
    <div className='w-full h-24 bg-slate-300'>
      {variant.map((v,index)=>(
        <div className='flex justify-between'>
          <div >{v.name}</div>
          <div onClick={handleAddVariantItem(index)}>Add items</div>
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
{/* <h1>Product Name</h1>
        <input type='name'></input>

        <h1>Description</h1>
        <textarea></textarea>
        <div>
            <h1>Images</h1>
            <AiOutlinePlus/>
        </div>
 */}