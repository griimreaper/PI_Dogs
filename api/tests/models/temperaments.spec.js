
const { Temperaments, conn } = require('../../src/db.js');

describe('Temperaments model', () => {
    beforeAll(async () => {
        await conn.authenticate()
    })
    describe('Validators', () => {
        beforeEach(() => Temperaments.sync({ force: true }));
        afterAll(() => {
            return Temperaments.drop();
        });
        it("Should create a temperament", async () => {
            const temperament = await Temperaments.create({ name: "Funny" })
            expect(temperament.name).toBe("Funny")
        })
    })
})