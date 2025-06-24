import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import font from 'next/font/local';
import { exampleUser } from '../utils/utils';
const UserName = font({ src: '../../public/Chirp-Regular.80fda27a.woff2' });
const ChirpBold = font({ src: '../../public/Chirp-Bold.ebb56aba.woff2' })
import { supabase } from '../utils/utils';
import EmojiPicker from 'emoji-picker-react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
const MediaUpload = ({ setError, publicurl, setPublicUrl, uploading, setuploading }: { publicurl: string, setPublicUrl: React.Dispatch<SetStateAction<string>>, setError: React.Dispatch<SetStateAction<string | null | undefined>>, uploading: boolean, setuploading: React.Dispatch<SetStateAction<boolean>> }) => {
  const [file, setFile] = useState<File | null>();
  console.log(file)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  console.log(publicurl, uploading, "<====isdone?")


  const Uploadandget = async (file: File | null) => {
    if (!file) {
      setError('please, select a file to upload');
      return;
    }
    try {
      setuploading(true);
      setError(null);
      const filePath = `${Date.now()}-${file.name}`
      const { error: uploadError, data: returned } = await supabase.storage
        .from('mymedias')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        })
      if (uploadError) {
        throw new Error(`Upload error: ${uploadError.message}`);
      };

      if (!returned) return;
      const { data } = supabase.storage.from('mymedias').getPublicUrl(returned.path);

      if (!data.publicUrl) {
        throw new Error('Failed to retrieve public URL.');
      }

      setPublicUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setuploading(false);
    }


  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB. Please select a smaller file.');
        setFile(null);
        event.target.value = '';
        return;
      }
      setFile(selectedFile);
      setError(null);
      Uploadandget(selectedFile)
    }

  }


  return <div className='w-[20px] relative h-[20px]'>
    <svg className='text-black dark:text-white' fill='currentColor' viewBox="0 0 24 24" aria-hidden="true"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
    <input onChange={handleUpload} accept="image/*" className='absolute  top-0 left-0 right-0 cursor-pointer opacity-0' title='file' type="file" name="" id="" />
  </div>
}
const MediaUpload2 = ({ setError,  setPublicUrl,  setuploading }: { publicurl: string, setPublicUrl: React.Dispatch<SetStateAction<string>>, setError: React.Dispatch<SetStateAction<string | null | undefined>>, uploading: boolean, setuploading: React.Dispatch<SetStateAction<boolean>> }) => {
  const [file, setFile] = useState<File | null>();
  console.log(file);
  // i was here
  const MAX_FILE_SIZE = 5 * 1024 * 1024;



  const Uploadandget = async (file: File | null) => {
    if (!file) {
      setError('please, select a file to upload');
      return;
    }
    try {
      setuploading(true);
      setError(null);
      const filePath = `${Date.now()}-${file.name}`
      const { error: uploadError, data: returned } = await supabase.storage
        .from('mymedias')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        })
      if (uploadError) {
        throw new Error(`Upload error: ${uploadError.message}`);
      };

      if (!returned) return;
      const { data } = supabase.storage.from('mymedias').getPublicUrl(returned.path);

      if (!data.publicUrl) {
        throw new Error('Failed to retrieve public URL.');
      }

      setPublicUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setuploading(false);
    }


  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB. Please select a smaller file.');
        setFile(null);
        event.target.value = '';
        return;
      }
      setFile(selectedFile);
      setError(null);
      Uploadandget(selectedFile)
    }

  }


  return <div className='w-[20px] relative h-[20px]'>
    <svg className='text-black dark:text-white' fill='currentColor' viewBox="0 0 24 24" aria-hidden="true"><g><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path></g></svg>
    <input onChange={handleUpload} accept="image/*" className='absolute  top-0 left-0 right-0 cursor-pointer opacity-0' title='file' type="file" name="" id="" />
  </div>
}

const PostBtn = () => {
  return <div className={`${ChirpBold.className} rounded-full flex items-center justify-center bg-[#0f1419] w-[4.1875rem] h-[2.25rem] dark:bg-white dark:text-black text-white cursor-pointer `}>POST</div>

}



const ClosePost = ()=>{
  gsap.timeline().to('#post',{
    y:200,
    ease:'none',
    opacity:0,
    // duration:0.3,
  }).set('#blur',{
    opacity:0,
    display:"none"
  })
}


function Newpost() {
  const [error, setError] = useState<string | null>()
  const [info, setInfo] = useState<{ username: string, Name: string, user_image: string, post: string, media: string, user_id: string }>({ username: '', Name: '', user_image: '', post: '', media: '', user_id: '' });
  const [uploading, setuploading] = useState<boolean>(false);
  const [publicUrl, setPublicUrl] = useState<string>('')
  const [showEm,setShowEm] = useState<boolean>(false);
  const [text,setText] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [loading,setLoading] = useState<boolean>(false)
  const { name, username, image, id } = exampleUser().info

  const router = useRouter();

const onEmojiClick = (emojiData:{emoji:string}) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;

    const currentText = textarea?.value;
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;

    const before = currentText?.slice(0, start);
    const after = currentText?.slice(end);

    const newText = before + emoji + after;

    setText(newText);
    setInfo({...info,post:newText})
    setTimeout(() => {
      if(!start)return;
      textarea?.focus();
      const newCursorPos = start + emoji.length;
      textarea?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };



  useEffect(() => {
    setInfo({ ...info, Name: name, username: username, user_image: image, user_id: id, media: publicUrl });
  }, [publicUrl])
  const handleDelete = ()=>{
    setInfo({...info,media:''});
    setPublicUrl('')
  }
 const uploadPost = async()=>{
  setLoading(true)
  const {data,error} = await supabase.from('posts').insert({username:username,Name:name,user_image:image,post:info.post,media:info.media,user_id:id}).select();
  if(data)router.push(`/Comment/${data[0].id}`)

 if(error)setError('error uploading post,please refresh')
  setLoading(false);
 ClosePost()
}
  return (
    <div id='blur' className='w-full opacity-0 z-50 dark:text-white  md:pt-[6em] h-screen bg-white/50 backdrop-blur-sm fixed top-0 left-0 right-0'>
      <div id='post' className='  w-full md:pt-[1em] px-[1em] pt-[5em]  relative md:w-[600px] md:mx-auto md:shadow-2xl md:h-fit md:min-h-[314px] sm:rounded-[1em] h-full bg-white dark:bg-black'>

        <div className='flex items-center justify-between w-full'>
          <svg onClick={ClosePost} className='text-black cursor-pointer dark:text-white' fill='currentColor' width={20} height={20} viewBox="0 0 24 24" ><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
          <div onClick={uploadPost} className={`h-fit w-fit ${info.post.length==0&&' opacity-[.6] disabled pointer-events-none '} md:hidden`}>
            {loading?<svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
:<PostBtn />}

            </div>
        </div>
        <div className='w-full relative mt-[.7em] flex gap-[8px] h-fit'>
          <div className='w-[40px] overflow-hidden bg-yellow-600 rounded-full h-[40px]'>
            <img alt="x" src={image} className='w-full h-full object-cover' />
          </div>

          <textarea value={text} ref={textareaRef} onChange={(e) => {
            setInfo({ ...info, post: e.currentTarget.value });
                setText(e.currentTarget.value)
        } }className={`${UserName.className} mt-[.4em]  outline-none  flex-1  placeholder:text-[20px]`} placeholder='wagwan?'  />
 {showEm&&<div className={`w-[320px] h-[52px] absolute md:bottom-[-15em] bottom-[-11em] ${UserName.className} `}>
  <EmojiPicker onEmojiClick={onEmojiClick} className='w-full h-full'/>
 </div>}
        </div>
             {error&&<p className={`${ChirpBold.className} text-red-600`}>{error}</p>}

         {publicUrl&&<div className='relative bg-yellow-500 mx-auto mb-[1em] mt-[.5em] max-w-[328px] overflow-hidden max-h-[328px] rounded-[1em] w-full h-fit'>
<img src={publicUrl} className='w-full h-auto object-cover' alt='' />
   <svg onClick={handleDelete} width={18.75} height={18.75}  className='absolute cursor-pointer top-[1em] right-[1em]' fill='#f4212e' viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path></g></svg>

          </div>}
          {uploading&&<div className='w-[328px] flex justify-center items-center h-[328px]'>
         <svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>

            </div>}
        <div className={`w-full items-center flex justify-between  h-[48px]${publicUrl&&'md:static pb-[1em] md:mt-0'}  ${!publicUrl&&'md:absolute md:pr-[2em] md:bottom-[1em]'}  ${!publicUrl&&'mt-[5em]'}`}>
          <div className=' flex w-[106px] items-center justify-between'>
            <button title='media' className={`${publicUrl.length > 0 && 'disabled pointer-events-none opacity-[0.5]'}`}>
              <MediaUpload setuploading={setuploading} publicurl={publicUrl} setPublicUrl={setPublicUrl} uploading={uploading} setError={setError} />
            </button>
            <button title='media' className={`${publicUrl.length > 0 && 'disabled pointer-events-none opacity-[0.5]'}`}>
              <MediaUpload2 setuploading={setuploading} publicurl={publicUrl} setPublicUrl={setPublicUrl} uploading={uploading} setError={setError} />
            </button>


            <div onClick={()=>setShowEm(!showEm)} className='w-[20px] h-[20px]'>
              <svg className='text-black cursor-pointer dark:text-white' fill='currentColor' viewBox="0 0 24 24" aria-hidden="true"><g><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path></g></svg>
            </div>
          </div>
          <div onClick={uploadPost} className={`${info.post.length==0&&' opacity-[.6] disabled pointer-events-none '} w-fit hidden md:block h-fit`}>
            {loading?
            <svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
:<PostBtn />}
          </div>
        </div>

      </div>


    </div>


  )
}

export default Newpost

