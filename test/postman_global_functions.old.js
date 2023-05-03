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


    test("Verify checkGlobalsVarsSet with undefined pm", async () => {
        // arrange and act

        // assert
        expect(() => globals.checkGlobalsVarsSet(undefined,[])).toThrowError(
            Error('pm is undefined')
        )
    })

    test("Verify checkGlobalsVarsSet with undefined variable_list", async () => {
        // arrange and act
        const pm_mock =  jest.fn()

        // assert
        expect(() => globals.checkGlobalsVarsSet(pm_mock, undefined)).toThrowError(
            Error('variable_list is undefined')
        )
    })

    test("Verify checkGlobalsVarsSet with empty list", () => {
        // arrange and act
        const pm_mock =  jest.fn()

        var result = globals.checkGlobalsVarsSet(pm_mock, []);

        // assert
        expect(result).toBe(true);
    });

    test("Verify checkGlobalsVarsSet with element not found", () => {
        // arrange and act
        const globals_mock = jest.fn().mockImplementation((name) => {
            // You can include your mock implementation here
            // Then mock the return value using a return statement
            return name
        })

        const pm_mock =  jest.fn().mockImplementation(() => {
            return {globals: globals_mock};
        });


        var result = globals.checkGlobalsVarsSet(pm_mock, ["example"]);

        // assert
        expect(result).toBe(true);
    });

})