globals = {

    isActive: function(){
        return true
    },

    checkGlobalsVarsSet: function(variables){
        result = true
        variables.forEach(variable => {
            const varValue = pm.globals.get(variable);
            if(typeof(varValue) === "undefined"){
                throw new Error(`Please, go to "Environments -> Globals" and set: ${variables.join(', ')}`);
            }
        })

        return result
    }

}

if (process.env['NODE_DEV'] == 'TEST') {
    module.exports = globals
}