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


    test("Verify checkGlobalsVarsSet with null", async () => {
        // arrange and act

        // assert
        expect(() => globals.checkGlobalsVarsSet()).toThrowError(
            Error('variable_list is undefined')
        )
    })

    test("Verify checkGlobalsVarsSet with empty list", () => {
        // arrange and act
        var result = globals.checkGlobalsVarsSet([]);

        // assert
        expect(result).toBe(true);
    });

    test("Verify checkGlobalsVarsSet with one element", () => {
        // arrange and act
        var result = globals.checkGlobalsVarsSet(["example"]);

        // assert
        expect(result).toBe(true);
    });

})