const postman_global_functions = require('../src/postman_global_functions2');

describe("Check isActive method", () => {

    test("Verify return true", () => {
        // arrange and act
        var result = globals.isActive();

        // assert
        expect(result).toBe(true);
    });

})

describe("Check isParameterUndefined method", () => {

    test("Verify isParameterUndefined with parameter undefined", async () => {
        // arrange and act

        // assert
        expect(() => globals.isParameterUndefined(undefined, 'user_name')).toThrowError(
            Error('user_name is undefined')
        )
    })

    test("Verify isParameterUndefined", () => {
        // arrange and act
        var result = globals.isParameterUndefined('test', 'user_name');

        // assert
        expect(result).toBe(true);
    })

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
