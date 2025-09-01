import React,{createContext,useState,useEffect} from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
//useEffect is a React Hook used to handle side effects(which is anything that happens outside the component during render) in functional components.

export const UserContext = createContext();


//UserProvider is your custom component that wraps UserContext.Provider.
const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    if(user) 
      return;
    const accessToken=localStorage.getItem("token");
    if(!accessToken){
      setLoading(false);
      return;
    }
    const fetchUser=async()=>{
      try{
        const response =await axiosInstance.get(API_PATHS.AUTH.GETPROFILE);
        setUser(response.data);
      }catch(err){
        console.error("User not authorized",err);
        clearUser();
      }
      finally{
        setLoading(false);
      }
    }
    fetchUser();
  },[]);

  const updateUser=(userData)=>{
    setUser(userData);                             //You're only storing the JWT token string, not the whole object.
    localStorage.setItem("token",userData.token); //here i am selecting only the token generated at backend by jwt from among the all user data.(the entire string which contains the jwt token along with other user data.)
    setLoading(false);
  };

  const clearUser=()=>{
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
          //UserContext.Provider: Gives any child component access to user, loading
         <UserContext.Provider value={{ user, loading, updateUser, clearUser }}> 
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;


