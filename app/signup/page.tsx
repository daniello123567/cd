"use client"
import React, { useState } from 'react'
import font from 'next/font/local';
import { exampleUser, supabase } from '../utils/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const extHeavy = font({ src: "../../public//chirp-extended-heavy-web.woff2" })
const UserName = font({ src: '../../public/Chirp-Regular.80fda27a.woff2' });
const ChirpBold = font({ src: '../../public/Chirp-Bold.ebb56aba.woff2' })

function Page() {
const [userinfo,setUserinfo] = useState<{password?:string,Bio:string,image:string,Name:string,UserName:string,cover_photo:string}>({Name:'',cover_photo:'',UserName:'',Bio:'',image:'',password:''})
const [error,setError] = useState<string|null>();
const [userPushed,setUserpushed] = useState<boolean>(false)
const [uploading,setuploading] = useState<boolean>(false);
const [uploadingCP,setuploadingCP] = useState<boolean>(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;



const handleUploadimage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB. Please select a smaller file.');
        event.target.value = '';
        return;
      }
      setError(null);
      Uploadandgetimage(selectedFile)
    }

  }
const handleUploadCP = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB. Please select a smaller file.');
        event.target.value = '';
        return;
      }
      setError(null);
      UploadandgetCP(selectedFile)
    }

  }

const Uploadandgetimage = async (file: File | null) => {
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

      setUserinfo({...userinfo,image:data.publicUrl});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setuploading(false);
    }


  }
const UploadandgetCP = async (file: File | null) => {
    if (!file) {
      setError('please, select a file to upload');
      return;
    }
    try {
      setuploadingCP(true);
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

      setUserinfo({...userinfo,cover_photo:data.publicUrl});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setuploadingCP(false);
    }


  }
const router = useRouter()
  const {setInfo} = exampleUser()
const handleSub = async()=>{
  if(!userinfo.Bio||!userinfo.Name||!userinfo.UserName||!userinfo.password){
    setError('please commplete all fields!');
    alert('please commplete all fields!');
    return;
  }
    setUserpushed(true)

const {Bio,UserName,cover_photo,image,Name,password} = userinfo;
const profilephoto = image || 'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';
const {data,error} = await supabase.from('users').insert({password,Bio,UserName,cover_photo,image:profilephoto,Name}).select();
if(data){
setInfo({name:Name,image:profilephoto,username:UserName,id:data?.[0].id});
setUserpushed(false);
 router.push(`/profile/${data?.[0].id}`);
}else if(error){
  alert('please refresh,your network is bad')
}
}
  return (
    <div className={`w-full dark:text-white bg-white dark:bg-[#000]  dark:border-[#3F3E47] border-[#EDEDF5] px-[.5rem] border-t border-b  min-h-screen`}>
      <div className={`h-full pt-[4rem] pb-[4em] dark:dark:[--pattern-foreground:var(--color-white)]/5 bg-size-[10px_10px] dark:bg-white/0.75 flex py-[.75rem]  bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]  min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>
        <div className="w-[528px] pb-[5em] p-[1em] rounded-[1em] bg-white dark:bg-black mx-auto h-fit">
          <p className={`${extHeavy.className} text-[23px]`}>Join Today.</p>
          <p className={`${extHeavy.className} text-[23px]`}>create your account.</p>
                    <Link className={`${UserName.className}`} href={`/signin`}><p>OR <span className='text-sky-500 text-sm underline'>sign in</span></p></Link>
{error&&<p className={`${ChirpBold.className} text-red-600`}>{error}</p>}
          <div className='flex pt-[1em] flex-col gap-[24px] h-fit'>
            <input onChange={(e)=>setUserinfo({...userinfo,Name:e.currentTarget.value})} className={`${UserName.className} h-[60px] dark:border-[#3F3E47] border-[#EDEDF5] p-[8px] rounded-[4px] border w-full`} placeholder='Name' type="text" />
            <input onChange={(e)=>setUserinfo({...userinfo,UserName:e.currentTarget.value})} className={`${UserName.className} h-[60px] dark:border-[#3F3E47] border-[#EDEDF5] p-[8px] rounded-[4px] border w-full`} placeholder='UserName' type="text" />

            <input onChange={(e)=>setUserinfo({...userinfo,password:e.currentTarget.value})} className={`${UserName.className} h-[60px] dark:border-[#3F3E47] border-[#EDEDF5] p-[8px] rounded-[4px] border w-full`} placeholder='Set Password' type="text" />
            <div className='h-fit flex flex-col gap-[.5em]'>
              <p className={`text-[15px] ${ChirpBold.className}`}>Bio</p>
              <p className={`text-[#536471] ${UserName.className} text-[14px]`}>This will appear at the top of your Profile. It should be about you.</p>
              <input onChange={(e)=>setUserinfo({...userinfo,Bio:e.currentTarget.value})} className={`${UserName.className} h-[60px] dark:border-[#3F3E47] border-[#EDEDF5] p-[8px] rounded-[4px] border w-full`} placeholder='Bio' type="text" />
            </div>

            <div className='w-full h-fit flex gap-[1em]'>
              <div className='rounded-[1em] w-[50%]  h-fit'>
                <p className={`text-[15px] ${ChirpBold.className}`}>Select A profile photo(optional)</p>
                <p className={`text-[#536471] ${UserName.className} text-[14px]`}>Your profile photo helps people recognize you.</p>

                <div className='w-[5em] mx-auto relative h-[5em] rounded-full dark:bg-[#000000b2] bg-gray-100 mt-[.5em]    flex justify-center items-center '>
                  {!userinfo.image?<>{uploading?<svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
:<svg className='w-[30px] text-black dark:text-white' fill="currentColor" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 479 479"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M238.72,178.35c-49.993,0-90.664,40.675-90.664,90.672c0,49.993,40.672,90.665,90.664,90.665 c49.984,0,90.65-40.672,90.65-90.665C329.37,219.024,288.705,178.35,238.72,178.35z M238.719,339.686 c-38.964,0-70.664-31.7-70.664-70.665c0-38.969,31.7-70.672,70.664-70.672c38.957,0,70.65,31.704,70.65,70.672 C309.369,307.985,277.676,339.686,238.719,339.686z"></path> <path d="M419,118.501H206.635c-6.81-13.069-16.121-19.686-27.773-19.686H141.05V72.495c0-5.523-4.477-10-10-10H82.631 c-5.523,0-10,4.477-10,10v26.319H41.917c-2.192,0-4.532-0.095-6.794-0.187c-9.757-0.397-20.816-0.847-28.367,6.403 C2.273,109.336,0,115.469,0,123.258v224.849c0,17.757,17.99,61.233,41.565,61.233h150.017c0.265,0,0.525-0.02,0.784-0.04 c14.353,4.669,29.662,7.205,45.553,7.205c16.777,0,32.907-2.822,47.946-8.004H419c33.084,0,60-26.916,60-60v-170 C479,145.417,452.084,118.501,419,118.501z M92.631,82.495h28.418v16.319H92.631V82.495z M41.576,389.34 c-1.548-0.098-6.959-4.033-12.955-15.091C23.021,363.923,20,353.073,20,348.106V123.258c0-2.944,0.605-3.795,0.607-3.799 c1.436-1.346,9.416-1.021,13.703-0.847c2.462,0.1,5.008,0.204,7.607,0.204h136.944c3.987,0,7.657,3.611,10.944,10.734 c-57.794,19.995-99.415,74.961-99.415,139.472c0,49.607,24.628,93.571,62.3,120.318L41.576,389.34z M282.293,388.536 c-1.832,0.128-3.527,0.742-4.955,1.725c-12.419,4.047-25.666,6.244-39.419,6.244c-70.32,0-127.529-57.189-127.529-127.484 c0-70.323,57.209-127.536,127.528-127.536c70.307,0,127.506,57.212,127.506,127.536 C365.424,323.72,330.787,370.479,282.293,388.536z M459,348.5c0,22.056-17.944,40-40,40h-94.71 c37.011-26.822,61.134-70.384,61.134-119.479c0-56.553-31.983-105.766-78.802-130.521H419c22.056,0,40,17.944,40,40V348.5z"></path> </g> </g> </g> </g></svg>
}</>:<img alt='pp' src={userinfo.image}/>}
                <input onChange={handleUploadimage} title='file' className='absolute opacity-0 w-full h-full' type="file" />
                </div>

              </div>
              <div className='rounded-[1em] w-[50%]  h-fit'>
                <p className={`text-[15px] ${ChirpBold.className}`}>Select A CoverPhoto(optional)</p>
                <p className={`text-[#536471] ${UserName.className} text-[14px]`}>Your cover photo shows at the top of your profile.</p>

                <div className='w-full relative h-[5em] dark:bg-[#000000b2] flex rounded-[1em] mt-[.5em] bg-gray-100 justify-center items-center '>
                  {!userinfo.cover_photo?<>{uploadingCP?            <svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
:<svg className='w-[30px] text-black dark:text-white' fill="currentColor" height="200px" width="200px" version="1.1" id="Layer_1" viewBox="0 0 479.999 479.999" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M469.341,0H117.184c-5.523,0-10,4.477-10,10v38.366L8.695,68.086c-5.377,1.077-8.884,6.282-7.861,11.67l74.421,392.108 c0.504,2.655,2.061,4.993,4.317,6.482c1.647,1.087,3.565,1.653,5.508,1.653c0.717,0,1.438-0.077,2.149-0.234l275.581-60.65 h106.532c5.523,0,10-4.477,10-10V10C479.341,4.477,474.864,0,469.341,0z M92.984,458.021L22.329,85.753l84.854-16.991v340.353 c0,5.523,4.477,10,10,10H269.76L92.984,458.021z M459.341,399.115h-97.706v0.001c-0.025,0-0.05,0-0.075,0H127.184v-68.768 L236.08,221.452l70.249,79.109c1.83,2.06,4.428,3.274,7.182,3.355c2.753,0.086,5.42-0.977,7.368-2.926l96.523-96.551 l41.939,42.769V399.115z M459.341,218.643l-34.73-35.418c-1.869-1.906-4.422-2.985-7.092-2.999 c-2.645-0.039-5.233,1.042-7.121,2.93l-96.162,96.189l-70.248-79.108c-1.83-2.06-4.428-3.274-7.181-3.355 c-2.75-0.078-5.419,0.977-7.368,2.924L127.184,302.063V20h332.157V218.643z"></path> <path d="M316.232,204.149c39.499,0,71.633-32.134,71.633-71.633s-32.134-71.633-71.633-71.633 c-39.499,0-71.633,32.134-71.633,71.633S276.734,204.149,316.232,204.149z M316.232,80.884c28.47,0,51.633,23.163,51.633,51.633 c0,28.47-23.163,51.633-51.633,51.633c-28.47,0-51.633-23.163-51.633-51.633C264.599,104.047,287.762,80.884,316.232,80.884z"></path> </g> </g> </g> </g></svg>
                  }</>:<img alt='cp' src={userinfo.cover_photo}/>}
                                <input onChange={handleUploadCP} title='file' className='absolute opacity-0 w-full h-full' type="file" />

                </div>

              </div>


            </div>

          </div>

        </div>


      </div>

      <div className='w-full bg-white flex justify-center'>
        <button onClick={handleSub} className={`h-[52px] flex items-center justify-center cursor-pointer ${ChirpBold.className} text-[17px] w-[90%] md:w-[50%]    fixed bottom-[1em] rounded-full bg-black text-white dark:bg-white dark:text-black`}>

          {userPushed?
          <svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
:'Next'}</button>

      </div>
    </div>
  )
}

export default Page
