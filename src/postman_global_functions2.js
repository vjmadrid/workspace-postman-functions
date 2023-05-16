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

    /*
    setGlobalVar: function(name, value) {
        this.isParameterUndefined(name);
        this.isParameterUndefined(value);
        pm.globals.set(name, value);
    },

    getGlobalVar: function(name) {
        this.isParameterUndefined(name);
        return pm.globals.get(name);
    },

    unsetGlobalVar: function(name) {
        this.isParameterUndefined(name);
        return pm.globals.unset(name);
    },
    */

    /**
     * Environment variables operations 
     */
    checkEnvironmentVarsSet: function(variable_list){
        this.isParameterUndefined(variable_list, 'variable_list')

        variable_list.forEach(variable => {
            const value = pm.environment.get(variable);
            if(typeof(value) === "undefined"){
                throw new Error("Please, go to 'Collections (left panel) -> select collection -> Select Variables tab' and set: ${variable_list.join(', ')}")
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
                throw new Error("Please, go to 'Collections (left panel) -> select collection -> Select Variables tab' and set: ${variable_list.join(', ')}")
            }
        })

        return true
    },

    /*
    // Set the value for a collection variable 
    setCollectionVar: function(name, value) {
        this.isParameterUndefined(name);
        this.isParameterUndefined(value);
        pm.collectionVariables.set(name, value);
    },

    // Get the value from a collection variable
    getCollectionVar: function(name) {
        this.isParameterUndefined(name);
        return pm.collectionVariables.get(name);
    },

    // Unset one collection variable
    unsetCollectionVar: function(name) {
        this.isParameterUndefined(name);
        return pm.collectionVariables.unset(name);
    },

    // Unset multiple collection variables
    unsetCollectionVars: function(variable_list) {
        this.isParameterUndefined(variable_list, 'variable_list')

        variable_list.forEach(variable => {
            const value = pm.collectionVariables.get(variable);
            if(typeof(value) === "undefined"){
                console.error("Error unsetting variables. Variable " + variable + " undefined");
            } else {
                console.info("Unsetting variable " + variable + ": Done");
            }
        })
    },
    */


}
