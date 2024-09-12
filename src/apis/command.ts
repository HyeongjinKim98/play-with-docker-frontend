import { PromptStore } from "../store/PromptStore";
type TAnalyzeResponse=  {
    url : string;
    argCommands : Array<string>
}
type TError={
    resultCode : string;
    description : string;
}

const UnknownError = new Error("Unknown Error")
export const AnalyzeCommand= async(command : string, token : string)=> {
    try{
        const response = await fetch(`${process.env.REACT_APP_URL}/command/filter`,{
            method : 'post',
            headers :{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({command}),

        })
        const data = await response.json()
        return Execute(data.url,data.argCommands,token)
    }catch(error){
        console.log(error)
        return {
            resultCode : 0,
            description : 'Analysis Error'
        }
    }
}

export const Execute= async(url : string,command:Array<string>, token : string)=>{
    try{
        const response= await fetch(`${process.env.REACT_APP_DOMAIN}${url}`,{
            method : 'post',
            headers :{
                'Content-Type' : 'application/json',
                'Authorization' : token
            } as HeadersInit,
            body:JSON.stringify({
                argCommands : command
            })
        }) 
        const data = await response.json()
        return data
    }catch(error){
        return error
    }
}

