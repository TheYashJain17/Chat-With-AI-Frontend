"use client"

import {QueryClientProvider} from "@tanstack/react-query";
import getQueryClient from "../clients/GetQuery.client";

const QueryClientProviderWrapper = ({children}: {children: React.ReactNode}): React.JSX.Element => {

    return (

        <QueryClientProvider client={getQueryClient()}>

            {children}

        </QueryClientProvider>

    )

}

export default QueryClientProviderWrapper;