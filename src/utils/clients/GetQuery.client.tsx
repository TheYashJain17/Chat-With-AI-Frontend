import {isServer, QueryClient} from "@tanstack/react-query";


const generateQueryClient = (): QueryClient => {

    return new QueryClient({

        defaultOptions: {

            queries: {

                staleTime: 30 * 1000,

            }

        }

    })

}

let browserQueryClient: QueryClient | undefined = undefined;


const getQueryClient = (): QueryClient => {

    if(isServer){

        return generateQueryClient();

    }else{

        if(!browserQueryClient) browserQueryClient = generateQueryClient();
        return browserQueryClient;

    }



}


export default getQueryClient;