import axios from 'axios';
import { API_NOTIFICATION_MSG,SERVICE_URL } from '../constant/config';
import { getAccessToken ,getType} from '../utils/common-utils';

const API_URL='http://localhost:8000';
const axiosinstance=axios.create({
   baseURL:API_URL,
   timeout:10000,
   headers:{
    "Content-Type":"application/json"
   }


})

axiosinstance.interceptors.request.use(
    function(config){
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosinstance.interceptors.response.use(
    function(response){
        return processresponse(response);
    },
    function(error){
        return Promise.reject(processerror(error));
    }
)

const processresponse=(response)=>{
    if(response.status===200){
        return {
            isSuccess:true, data:response.data
        }
    }
    else{
       return {
        isFailure:true,
        status:response?.status,
        msg: response?.msg,
        code: response?.code
       }
    }       

}

const processerror=(error)=>{
    if(error.response){
        //request made and server responded with other code than 200
        return{
            isError:true,
            msg:API_NOTIFICATION_MSG.responeFailure,
            code:error.response.status
        }
    }
    else if(error.request){
        //request made but no response
        return{
            isError:true,
            msg:API_NOTIFICATION_MSG.requestFailure,
            code:""
        }
    }
    else{
        //something happened in request
        return{
            isError:true,
            msg:API_NOTIFICATION_MSG.networkError,
            code:error.response.status
        }
    }
}

const API={};

for(const [key,value] of Object.entries(SERVICE_URL)){
    API[key]=(body,showUploadProgress,showDownloadProgress) =>
        axiosinstance({
            method: value.method,
            url:value.url,
            data:value.method === 'DELETE' ? {} : body,
            responseType:value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE: getType(value, body),

            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }

        
        })
    }

    export {API};