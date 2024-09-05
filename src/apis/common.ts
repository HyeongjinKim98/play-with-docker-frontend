type HttpMethod = 'GET'|'POST';

const defaultHeaders = {
    'Content-Type': 'application/json',
    // Authorization: '',
};

export interface IFetchParams{
    method : HttpMethod;
    url : string;
    token?: string;
    headers?: Record<string,string>;
    body? : object
}

interface IPost{
  path : string;
  headers?: Record<string,string>;
  body? : object
}
const Fetch = async({method,url,token,headers,body} : IFetchParams)=>{
  // if (token) {
  //   defaultHeaders.Authorization = token;
  // }
  const Headers = headers ? { ...defaultHeaders, ...headers } : defaultHeaders;

  const config: RequestInit = {
    method,
    headers: Headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  console.log(config.body)
  let URL = url || '';
  
  const response = await fetch(URL, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export const POST = ({path,headers,body} : IPost)=>{
  // temporal code
  let token='Bearer';
  const url = process.env.REACT_APP_URL+path;

  const response = Fetch({method: 'POST', url, token, headers, body});

  return response
}
export const GET = (path : string)=>{

  const url = process.env.REACT_APP_URL + path;

  const response = Fetch({method: 'GET', url});

  return response
}