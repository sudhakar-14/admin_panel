import axios from "axios";
import { API } from "./endPoint";


export function user_list(){
    return axios.get(
        API.baseUrls[API.currentEnv] + API.authUrls.user_list
    )
}

export function boat_list(data){
    return axios.post(
        API.baseUrls[API.currentEnv] + API.authUrls.boat_list,
        data
    )
}

export function boat_user_list(){
    return axios.get(
        API.baseUrls[API.currentEnv] + API.authUrls.boat_user_list
    )
}

export function boat_detail(data){
    return axios.post(
        API.baseUrls[API.currentEnv] + API.authUrls.boat_details,
        data
    )
}

export function user_blocked(data){
    return axios.post(
        API.baseUrls[API.currentEnv] + API.authUrls.user_blocked,
        data
    )
}

export function verified_documents(data){
    return axios.post(
        API.baseUrls[API.currentEnv] + API.authUrls.UpdateDocumentVerification,
        data
    )
}