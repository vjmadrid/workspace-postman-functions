const globals = require('../src/postman_global_functions');



describe("Is Active", () => {

    test("Verify is active", () => {
        // arrange and act
        var result = globals.isActive();

        // assert
        expect(result).toBe(true);
    });

})