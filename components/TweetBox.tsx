import React, {Dispatch, MouseEvent, SetStateAction, useRef, useState}from 'react'
import {
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {
    const [input,setInput]=useState<string>('')
    const [image, setImage] = useState('')

    const imageInput= useRef<HTMLInputElement>(null)

    const {data: session}=useSession()
    const [imageBox, setImageBox]=useState<boolean>(false)

    const addImageTweet = (e:React.MouseEvent<HTMLButtonElement,globalThis.MouseEvent>) => {
        e.preventDefault();

        if(!imageInput.current?.value) return

        setImage(imageInput.current.value)
        imageInput.current.value=''
        setImageBox(false)
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })

        const json = await result.json()

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Tweet Posted', {
            icon:'🔥'
        })
    
     return json
    }
    
    const handleSubmit = (e:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>{
        e.preventDefault();

        postTweet()

        setInput('')
        setImage('')
        setImageBox(false)
    }


  return (
    <div className='flex space-x-2 p-5'>
        <img 
            className='h-14 w-14 rounded-full object-cover mt-4' 
            src={session?.user?.image || "https://links.papareact.com/gll" }
            alt="" 
        />

        <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    type='text' 
                    placeholder='Whats Happening?' 
                    className='h-24 w-full text-xl outline-none placeholder:text-xl'/>
                <div className='flex items-center'>
                    <div className='flex flex-1 space-x-2 text-twitter'>
                       <PhotographIcon onClick={()=> setImageBox(!imageBox)} className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                       <SearchCircleIcon className='h-5 w-5' />
                       <EmojiHappyIcon className='h-5 w-5'/>
                       <CalendarIcon className='h-5 w-5' />
                       <LocationMarkerIcon className='h-5 w-5' />
                    </div>

                    <button
                        onClick={handleSubmit} 
                        disabled={!input || !session}
                        className='rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40' 
                    >
                        Tweet Button
                    </button>
                </div>
                {imageBox && (
                    <form className='rounded-lg mt-5 flex bg-twitter/80 px-4 py-2'>
                     <input
                        ref={imageInput} 
                        className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                        type="text" 
                        placeholder='Enter Image URL...'
                     />
                     <button type='submit' onClick={addImageTweet} className='font-bold text-white'>Add Image</button>
                    </form>
                )}

                    {image && (
                        <img 
                            className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' 
                            src={image}
                            alt=''
                        />
                    )}
            </form>
        </div>
    </div>
  )
}

export default TweetBox