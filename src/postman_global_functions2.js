globals = {

    /**
     * Manage operations
     */

    isDebug: function(){
        return true
    },

    isActive: function(){
        return true
    },


    /**
     * General operations
     */

    isParameterUndefined: function(parameter, parameter_name){
        if(typeof(parameter) === "undefined") {
            throw new Error(parameter_name + " parameter is undefined")
        }

        return true;
    },


    /**
     * Global variables operations
     */

    // Given a list of variables (variable names in a string array), check if all of them are defined as global variables
    checkGlobalsVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list');

        variable_list.forEach(variable => {
            const value = pm.globals.get(variable);

            if(typeof(value) === "undefined"){
                throw new Error("Please, go to 'Environments -> Globals' and set: ${variable_list.join(', ')}")
            }
        });

        return true;
    },


    /**
     * Environment variables operations
     */

    // Given a list of variables (variable names in a string array), check if all of them are defined as environment variables
    checkEnvironmentVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list');

        variable_list.forEach(variable => {
            const value = pm.environment.get(variable);

            if(typeof(value) === "undefined") {
                throw new Error("Please, go to 'Enviroments (left panel) -> select enviroment' and set the variable '" + variable + "'");
            }
        });

        return true;
    },


    /**
     * Collection variables operations
     */

    // Given a list of variables (variable names in a string array), check if all of them are defined as collection variables
    checkCollectionVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list');

        variable_list.forEach(variable => {
            const value = pm.collectionVariables.get(variable);

            if(typeof(value) === "undefined") {
                throw new Error("Please, go to 'Collections (left panel) -> select collection -> Select Variables tab' and set the variable '" + variable + "'");
            }
        });

        return true;
    },

    /**
     * Parameter
     */

    getParam: function(parameter_name){
        this.isParameterUndefined(parameter_name, 'parameter_name')

        const req = pm.request;

        if (this.isDebug()){
            console.log("getParam for '" + parameter_name + "' parameter");
        };

        try{
            if(req.method === "GET"){
                console.log("GET mode")
                return req.url.query.find(el => el.key === parameter_name);
            }else if(req.method === "POST"){
                console.log("POST mode")
                if(!req.body.urlencoded){
                    throw new Error("This is POST request but not sending paramenters in the 'body'")
                }
                console.log("OTHER mode")
                return req.body.urlencoded.find(el => el.key === parameter_name)
            }
        }catch(exception) {
            throw new Error("Error in 'getParam(): ${exception}")
        }
    },

    isParameterEnabled: function(parameter_name){
        this.isParameterUndefined(parameter_name, 'parameter_name')

        if (this.isDebug()){
            console.log("isParameterEnabled ...")
        };

        const elem = this.getParam(parameter_name);
        return elem? !elem.disabled: false;
    },

    requiredParameters: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list');

        if (this.isDebug()){
            console.log("requiredParameters ...")
        };

        const req = pm.request.toJSON();
        variable_list.forEach(param =>{
            if(!this.isParameterEnabled(param)){
                throw new Error(`Please enable all required parameter ${variable_list.join(', ')}`);
            }
        });
    },


    /**
     * Data variables operations
     * - Note: Data variables are defined in data files in JSON or CSV format (collection runner)
     */

    // Given a list of variables (variable names in a string array), check if all of them are defined as data variables
    checkDataVarsSet: function(datavar_list){
        this.isParameterUndefined(datavar_list, 'datavar_list');

        datavar_list.forEach(datavar => {
            const value = pm.iterationData.get(datavar);

            if(typeof(value) === "undefined") {
                throw new Error("Please, go to 'Runner (Postman foot (right))' and load the data file containing the data variable '" + datavar + "'");
            }
        });

        return true;
    },


    /**
     * Local variables operations
     * - Note: Local variables are defined and used with newman or Collection runner
     */

    // Given a list of variables (variable names in a string array), check if all of them are defined as local variables
    checkLocalVarsSet: function(localvar_list){
        this.isParameterUndefined(localvar_list, 'localvar_list');

        localvar_list.forEach(localvar => {
            const value = pm.variables.get(localvar);

            if(typeof(value) === "undefined") {
                throw new Error("The local variable '" + localvar + "' is not defined");
            }
        });

        return true;
    },


    /**
     * Checking the list of headers for a request
     *
     * VERY IMPORTANT:
     *   Default Postman headers are not seen in pre-request script. Headers must be defined explicitly
     *   By default, the header name is empty. We must to assign the name with the key if we want to access it
     */
    checkRequestHeaders: function(header_list) {
        this.isParameterUndefined(header_list, 'header_list');
        const headers = pm.request.headers;

        //Print HeaderList
        //console.log(headers)
        //console.log("Count of headers in request: "+headers.count())

        // Iterate one by one. Assign the name of each header with its key (name=key)
        headers.each((header) =>
        {
            //console.log("key: " + header.key + ", value: " + header.value + ", name: " + header.name);
            header.name = header.key; // By default, name is empty
        });

        header_list.forEach(header => {
            const value = pm.request.headers.get(header);  // Get value by its header name

            if(typeof(value) === "undefined") {
                throw new Error("Please, set the header '" + header + "' explicitly");
            }
        });

        return true;
    },


    /**
     * Checking the list of headers for a response
     * 
     * VERY IMPORTANT:
     *   By default, the header name is empty. We must to assign the name with the key if we want to access it
     */
    checkResponseHeaders: function(header_list) {
        this.isParameterUndefined(header_list, 'header_list');
        const headers = pm.response.headers;

        //Print HeaderList
        //console.log(headers)
        //console.log("Count of headers in response: "+headers.count())
        
        // Iterate one by one. Assign the name of each header with its key (name=key)
        headers.each((header) => 
        {
            //console.log("key: " + header.key + ", value: " + header.value + ", name: " + header.name);
            header.name = header.key; // By default, name is empty
        });

        header_list.forEach(header => {
            const value = pm.response.headers.get(header);  // Get value by its header name

            if(typeof(value) === "undefined") {
                throw new Error("Header '" + header + "' was not returned");
            }
        });

        return true;
    },


    /**
     * Checking a list of parameters defined in the path of a request
     * Example: http://www.mysite.com?param=value&param=value
     */
    checkRequestPathParams: function(param_list) {
        this.isParameterUndefined(param_list, 'param_list');

        param_list.forEach(param => {
            const value = pm.request.url.query.get(param);

            if(typeof(value) === "undefined") {
                throw new Error("Please, set the param '" + param + "' explicitly in the url path");
            }
        });

        return true;
    },


    /**
     * Checking a list of variables defined in the path of a request
     * Example: http://www.mysite.com/:var
     * 
     * IMPORTANT: In the testing, don't use ":" before the name of variable
     *    postman_global_functions.checkRequestPathVars(["id"]);
     */
    checkRequestPathVars: function(variable_list) {
        this.isParameterUndefined(variable_list, 'variable_list');

        variable_list.forEach(variable => {
            const value = pm.request.url.variables.get(variable);

            if(typeof(value) === "undefined") {
                throw new Error("Please, set the variable ':" + variable + "' explicitly in the url path and assign it a value");
            }
        });

        return true;
    },


    /**
     * Checking a list of keys in the Request Body (Json format)
     * IMPORTANT:
     *    - Internally, postman adds the keys 'mode' and 'raw'. Our JSON is children of 'raw' key
     *    - 'raw' key stores our JSON body as string. You must parse it to JSON Object
     */
    checkRequestBodyJson: function(key_list) {
        this.isParameterUndefined(key_list, 'key_list');

        if (pm.request.body.isEmpty()) {
            throw new Error("Body is empty. Please, define a body in JSON format");
        }

        const jsonData = pm.request.body.toJSON();

        if (typeof(jsonData.raw) === undefined) {
            throw new Error("Please, define your JSON data in the body request. Remember specify a 'raw' body and JSON format");
        }

        ourBody = JSON.parse(jsonData.raw);

        key_list.forEach(key => {
            value = ourBody[key];
            if(typeof(value) === "undefined") {
                throw new Error("Please, set the key '" + key + "' explicitly in the JSON data in the body request");
            }
        });

        return true;
    },


    /**
     * Checking a list of keys in the Response Body (Json format)
     */
    checkResponseJson: function(key_list) {
        this.isParameterUndefined(key_list, 'key_list');
        const jsonData = pm.response.json();

        key_list.forEach(key => {
            value = jsonData[key];
            if(typeof(value) === "undefined") {
                throw new Error("The key '" + key + "' is not present in the JSON data in the response");
            }
        });

        return true;
    },


    /**
     * Checking a list of cookies
     */
    checkCookies: function(cookie_list) {
        this.isParameterUndefined(cookie_list, 'cookie_list');

        cookie_list.forEach(cookie => {
            const value = pm.cookies.get(cookie);

            if(typeof(value) === "undefined") {
                throw new Error("Please, set the cookie '" + cookie + "'.");
            }
        });

        return true;
    },


    /**
     * Check a list of string inside the response
     */
    checkResponseStrings: function(stringList) {
        this.isParameterUndefined(stringList, 'stringList');

        responseString = pm.response.text();

        stringList.forEach(stringPart => {
            if(!responseString.includes(stringPart)) {
                throw new Error("The string part '" + stringPart + "' is not included in the response.");
            }
        });

        return true;
    }

}
