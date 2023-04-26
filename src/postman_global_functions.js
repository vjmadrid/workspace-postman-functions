globals = {

    isActive: function(){
        return true
    },

    checkGlobalsVarsSet: function(variable_list){
        result = true
        if(typeof(variable_list) === "undefined"){
            throw new Error("variable_list is undefined");
        }
        variable_list.forEach(variable => {
            const varValue = pm.globals.get(variable);
            if(typeof(varValue) === "undefined"){
                throw new Error(`Please, go to "Environments -> Globals" and set: ${variable_list.join(', ')}`);
            }
        })

        return result
    }

}
