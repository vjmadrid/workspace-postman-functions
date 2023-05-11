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

}
