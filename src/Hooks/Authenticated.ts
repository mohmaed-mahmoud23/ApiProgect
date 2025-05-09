import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface  IProp{

  queryKey:string[],
  url : string,
  config?: AxiosRequestConfig
  }
const  Asuntacketded =({queryKey , url ,config}:IProp)=>{


return useQuery({
  queryKey,
  queryFn: async () => {
    const { data } = await axiosinstance.get(url,config );

    return data;
  },
});




}


export default Asuntacketded