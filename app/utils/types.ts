type mode = {
  isDarkMode:boolean,
  setIsDarkMode:()=>void
}

type Comment = {
  id:string,
  created_at:string,
  post_id:string,
  user_id:string,
  reply:string,
  Name:string,
  Username:string,
  User_image:string,
}

type Post = {
  dc?:string,
  dl?:string,
  id:string,
  created_at:string,
  username:string,
  Name:string,
  user_image:string,
  user_id:string,
  post:string,
  media:string
}

type user = {
  id:string,
  created_at:string,
  UserName:string,
  Name:string,
  image:string,
  Bio:string,
  Coverphoto:string
}


export type{ mode,Post,Comment,user}
