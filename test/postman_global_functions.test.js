//process.env['NODE_DEV'] = 'TEST';
const postman_global_functions = require('../src/postman_global_functions');



describe("Is Active", () => {

    test("Verify is active", () => {
        // arrange and act
        //globals = postman_global_functions.__get__('globals')
        var result = globals.isActive();

        // assert
        expect(result).toBe(true);
    });

})

describe("Check checkGlobalsVarsSet", () => {


    test("Verify checkGlobalsVarsSet with null", () => {
        // arrange and act
        var result = globals.checkGlobalsVarsSet();

        // assert
        expect(result).toBe(true);
    });

    test("Verify checkGlobalsVarsSet with empty list", () => {
        // arrange and act
        var result = globals.checkGlobalsVarsSet([]);

        // assert
        expect(result).toBe(true);
    });

})