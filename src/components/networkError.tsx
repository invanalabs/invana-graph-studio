/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from "react";
import {STUDIO_ROUTES} from "../settings";
import {Navigate} from "react-router-dom";

const NetworkErrorUI = (error: any) => {

    const statusCode = error.error.networkError ? error.error.networkError.statusCode : null;
    if (statusCode === 404) {
        return <Navigate to={STUDIO_ROUTES.CONNECT}/>
    }

    return (
        <div style={{paddingTop: "20%", width: "800px", margin: "0 auto"}}>
            <h1>{statusCode} Error</h1>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
    )
}
export default NetworkErrorUI;
