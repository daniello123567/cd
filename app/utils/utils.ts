import { createClient } from "@supabase/supabase-js";
import { formatDistanceToNow } from 'date-fns'
import { create } from "zustand";
import { SetStateAction } from "react";
import { persist } from "zustand/middleware";
import { Comment, user } from "./types";
const supabase = createClient("https://senhkgbpskpdrbaljzng.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmhrZ2Jwc2twZHJiYWxqem5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0Mzk5NDksImV4cCI6MjA2NDAxNTk0OX0.Jf5jCvNv_x6oqB7MUzfAbD9Vm_WEhHdfTH4EhhRal7I")
const throwError = () => {
  alert('error has ocurred')
}


const fetchAllPosts = async () => {
  const { data, error } = await supabase.from('posts').select('*');
  return error ? throwError() : data;
}
const likePost = async (bro: { post_id: string, owner_of_post_id: string, user_id: string, name: string, username: string, image: string }) => {
  const { post_id, user_id, owner_of_post_id, name, username, image } = bro;
  const { error} = await supabase.from('likes').insert({ post_id: post_id, user_id: user_id });
  const { } = await supabase.from('notifications').insert({
    sender_user_id: user_id, rx_user_id: owner_of_post_id, post_id: post_id, action: 'like', is_seen: false,
    name: name, username: username,image: image
  });

  if (error) { alert('error liking this post') };
}
const GetPostLikes = async (post_id: string, setNumbers: React.Dispatch<SetStateAction<number>>, userid: string, setLiked: React.Dispatch<SetStateAction<boolean>>) => {
  const { data} = await supabase.from('likes').select().eq('post_id', post_id);
  const { data: isLiked } = await supabase.from('likes').select().eq('post_id', post_id).eq('user_id', userid);
  if (isLiked && isLiked.length !== 0) {
    setLiked(true)
  } else {
    setLiked(false)
  }
  if (data)
    setNumbers(data.length);
  return data;
}

const deleteLike = async (info: { post_id: string, user_id: string }) => {
  const { post_id, user_id } = info;

  const { } = await supabase.from('likes').delete().eq('user_id', user_id).eq('post_id', post_id);
  const {  error: delerr } = await supabase.from('notifications').delete().eq('post_id', post_id).eq('rx_user_id', user_id)
  console.log(delerr)
}

const Datify = (timestamp: string | Date) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });
  return relativeTime.replace(/^about\s/, '');
}

const getSinglePost = async (post_id: string) => {
  const { data, error } = await supabase.from('posts').select().eq('id', post_id);
  if (error) alert('AN OERROR OCURRED PLEASE RELOAD YOUR BROWSER');
  if (data) return data;
}

const ReplyFunc = async (info: { Name: string, Username: string, User_image: string, setReply: React.Dispatch<SetStateAction<string>>, post_id: string, reply: string, user_id: string, setLoading: React.Dispatch<SetStateAction<boolean>> }) => {
  const { post_id, reply, user_id, setLoading, setReply, Name, Username, User_image } = info;
  setLoading(true)
  const { data, error } = await supabase.from('comments').insert({ post_id, reply, user_id, Name, Username, User_image }).select();
  if (error) alert('error replying to this post');
  setLoading(false)
  setReply('')
  return data?.[0]
}

const getComments = async (post_id: string, setcomments: React.Dispatch<SetStateAction<Comment[]>>) => {
  const { data, error } = await supabase.from('comments').select().eq('post_id', post_id);
  if (error) alert('error fetching comments');
  if (data) {
    setcomments([...data])
    return data;
  }
}

const deleteComment = async (idofcomment: string) => {
  const {  error } = await supabase.from('comments').delete().eq('id', idofcomment);
  if (error) alert('error deleting comment');
}

const getCommentCount = async (post_id: string) => {
  const { data, error } = await supabase.from('comments').select().eq('post_id', post_id);
  if (error) alert('error fetching comments');
  if (data) return data.length;
}

const SearchUsers = async (searchTerm: string): Promise<Array<user> | undefined> => {
  const { data, error } = await supabase.from('users').select().ilike('UserName', `%${searchTerm}%`).or(`Name.ilike.%${searchTerm}%,UserName.ilike.%${searchTerm}%`);
  if (error) alert('error searching users');
  if (data) return data;
}
const getUserProfile = async(id:string)=>{
  const {data,error} = await supabase.from('users').select().eq('id',id)
  if(error)alert('error fetching user profile');
  return data;
}
const TrendingNews = [{
  Title: 'Suicide bomber kills at least 10 in a restaurant in northeast Nigeria',
  Time: '7 hours ago',
  Image: 'https://i.ndtvimg.com/i/2016-10/children-of-isis_650x400_61475893400.jpg'
},
{
  Title: 'Nigeria to introduce real‑time tracking for oil export shipments, boosting transparency',
  Time: '1 hour ago',
  Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT4eDex4LvDPL_rZ6WYHKDaf5ABexu6VXggSaOcODlnlx_8XrKK8_7KpMmC_30fCksf6g&usqp=CAU'
},
{
  Title: 'NExxon to invest $1.5 billion in Nigerian offshore oilfield revitalisation',
  Time: '6 hours ago',
  Image: 'https://media.licdn.com/dms/image/v2/D5612AQFXTXFV_psN0w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1721196333326?e=2147483647&v=beta&t=X7Zj7L9X9zRmE6AdRlvn4y29dolKl4GslvwH5zZm40o'
},
{
  Title: 'Teen wins Earth Prize for creating recycled‑tire playground in Lagos, plans 3 more',
  Time: '50 mins ago',
  Image: 'https://m.media-amazon.com/images/I/811DVTgch4L.jpg'
},

];
type exampleUserType = {

  info: { name: string, username: string, image: string, id: string },
  setInfo: (cresi:{ name: string, username: string, image: string, id: string }) => void
};

const exampleUser = create<exampleUserType>()(
  persist(
    (set) => ({
      info: { name: '', username: '', image: '', id: '' },
      setInfo: (cresi) => set({ info: { ...cresi } }),
    }),
    {
      name: 'example-user-store',
    }
  )
);
type man = {
  allNotifications: {sender_user_id?:string, id: string, image: string, username: string, action: string, postid: string, is_seen?: boolean }[],
  setAllNotifications: (newNotify: { id: string, image: string, username: string, action: string, postid: string }[]) => void
};

const notificationStore = create<man>((set) => ({
  allNotifications: [],
  setAllNotifications: (newNotify) => set(() => ({ allNotifications: newNotify }))
}));

type nigas = { counter: number, setCounter: (counts: number) => void };
const newNotys = create<nigas>((set) => ({
  counter: 0,
  setCounter: (counts) => set(() => ({ counter: counts }))
}));
const fetchAllusersNotifications = async (id: string): Promise<{ id: string, image: string, username: string, action: string, postid: string, is_seen?: boolean }[] | undefined> => {
  const { data, error } = await supabase.from('notifications').select().eq('rx_user_id', id).order('created_at', { ascending: false });
  if (error) alert('error fetching notifications');
  if (data) return [...data];
}
const getUserPosts = async (id:string)=>{
  const {data,error} = await supabase.from('posts').select().eq('user_id',id);
  if(error)alert('error getting user,pls reload');
  return data;
}

const UploadPost = async(info:{username:string,Name:string,user_image:string,post:string,media:string,user_id:string})=>{
     const {data,error} = await supabase.from('posts').insert({...info}).select();
     if(error)alert('error posting!');
     return data;
}
export {getUserProfile, UploadPost,fetchAllusersNotifications, getUserPosts,newNotys, exampleUser, notificationStore, TrendingNews, SearchUsers, getCommentCount, getComments, ReplyFunc, deleteComment, supabase, fetchAllPosts, Datify, likePost, deleteLike, GetPostLikes, getSinglePost }

