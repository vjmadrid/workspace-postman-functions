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
     * Global operations 
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
     * Collection operations 
     */
    checkCollectionVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list')

        variable_list.forEach(variable => {
            const value = pm.collectionVariables.get(variable);
            if(typeof(value) === "undefined"){
                throw new Error("Please, go to 'Collections (left panel) -> select collection -> Select Variables tab' and set: ${variable_list.join(', ')}")
            }
        })

        return true
    },

    setCollectionVar: function(name, value) {
        this.isParameterUndefined(name);
        this.isParameterUndefined(value);
        pm.collectionVariables.set(name, value);
    },

    getCollectionVar: function(name) {
        this.isParameterUndefined(name);
        return pm.collectionVariables.get(name);
    },

}
