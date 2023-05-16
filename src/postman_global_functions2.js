globals = {

    isActive: function(){
        
        return true
    },

    isParameterUndefined: function(parameter, parameter_name){
        if(typeof(parameter) === "undefined"){
            throw new Error(parameter_name + " is undefined")
        }

        return true
    },

    /**
     * Global variables operations 
     */
    checkGlobalsVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list')

        variable_list.forEach(variable => {
            const value = pm.globals.get(variable);
            if(typeof(value) === "undefined"){
                throw new Error("Please, go to 'Environments -> Globals' and set: ${variable_list.join(', ')}")
            }
        })

        return true
    },


    /**
     * Environment variables operations 
     */
    checkEnvironmentVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list')

        variable_list.forEach(variable => {
            const value = pm.environment.get(variable);
            if(typeof(value) === "undefined"){
                throw new Error("Please, go to 'Enviroments (left panel) -> select enviroment' and set the variable '" + variable + "'");
            }
        })

        return true
    },

    /**
     * Collection variables operations 
     */
    checkCollectionVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list')

        variable_list.forEach(variable => {
            const value = pm.collectionVariables.get(variable);
            if(typeof(value) === "undefined"){
                throw new Error("Please, go to 'Collections (left panel) -> select collection -> Select Variables tab' and set the variable '" + variable + "'");
            }
        })

        return true
    },

    /**
     * Checking the list of headers for a request
     * 
     * VERY IMPORTANT:
     *   Default Postman headers are not seen in pre-request script
     *   Headers must be defined implicitly 
     */
    checkRequestHeaders: function(header_list) {
        this.isParameterUndefined(header_list, 'header_list')
        const headers = pm.request.headers;
        if (headers.count() == 0) return false;
console.log("header_list: " + header_list);
console.log("headers:" + headers);
console.log("-------------------------");

 //Print HeaderList
console.log(headers)
 // To get count of headers 
console.log("Count of headers in request: "+headers.count())
 // Iterate and print one by one
headers.each((header) => 
{
    console.log("key: " + header.key);
    console.log("value: " + header.value);
    console.log("name: " + header.name);
    header.name = header.key;
});
        header_list.forEach(header => {
            console.log("> header: " + header);
            const value = pm.request.headers.get(header);
            //const value = pm.request.headers[header];
            console.log("      " + value);
            if(typeof(value) === "undefined"){
                throw new Error("Please, set the header '" + header + "'");
            }
        })

        return true
    },


}
