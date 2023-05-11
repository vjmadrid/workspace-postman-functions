globals = {

    isActive: function(){
        return true
    },

    isParameterUndefined: function(parameter, parameter_name){
        if(typeof(parameter) === "undefined"){
            throw new Error(parameter_name + ' is undefined');
        }

        return true
    },

    checkGlobalsVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list')

        variable_list.forEach(variable => {
            const value = pm.globals.get(variable);
            if(typeof(value) === "undefined"){
                throw new Error("Please, go to 'Environments -> Globals' and set: ${variable_list.join(', ')}`)
            }
        })

        return true
    },

    checkCollectionsVarsSet: function(variable_list){
        variable_list.forEach(variable => {
            const value = pm.collectionVariables.get(variable);
            if(typeof(value) === "undefined" || /^<.*>$/.test(value)){
                throw new Error("Set collection variables using requests in Structure and definitions")
            }
        })
    },

    getParam: function(parameter_name){
        this.isParameterUndefined(parameter_name, 'parameter_name')

        const req = pm.request;
        try{
            if(req.method === "GET"){
                return req.url.query.find(el => el.key === parameter_name);
            }else if(req.method === "POST"){
                if(!req.body.urlencoded){
                    throw new Error("This is POST request but not sending paramenters in the 'body'")
                }
                return req.body.urlencoded.find(el => el.key === parameter_name)
            }
        }catch(exception) {
            throw new Error("Error in 'getParam(): ${exception}")
        }
    },


}
