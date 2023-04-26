globals = {

    checkGlobalsVarsSet: function(variables){
        variables.forEach(variable => {
            const varValue = pm.globals.get(variable);
            if(typeof(varValue) === "undefined"){
                throw new Error(`Please, go to "Environments -> Globals" and set: ${variables.join(', ')}`);
            }
        });
    }

}