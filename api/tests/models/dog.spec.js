const { Dog, conn } = require('../../src/db.js');

describe('Dog model', () => {
  beforeAll(async () => {
    await conn.authenticate()
  })
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    afterAll(() => {
      return Dog.drop();
    });
    it('Should create a dog with: "name", "age", "weight", "height", "image", "created"', async () => {
      const dog = await Dog.create({ name: 'Fido', age: "3", weight: "23", height: "44", image: "http://image.jpg", created: true });
      expect(dog.name).toBe('Fido');
      expect(dog.age).toBe("3");
      expect(dog.weight).toBe("23");
      expect(dog.height).toBe("44");
      expect(dog.image).toBe("http://image.jpg");
      expect(dog.created).toBe(true);
    });
    it('Should find a dog by id', async () => {
      const dog = await Dog.create({ name: 'Fido', age: "3", weight: "23", height: "44", image: "http://image.jpg", created: true });
      const retrievedDog = await Dog.findByPk(dog.id);
      expect(retrievedDog.name).toBe('Fido');
      expect(retrievedDog.age).toBe("3");
    });
    it('Should find a dog by name', async () => {
      await Dog.create({ name: 'Fido', age: "3", weight: "23", height: "44", image: "http://image.jpg", created: true });
      const retrievedDog = await Dog.findOne({ where: { name: 'Fido' } });
      expect(retrievedDog.age).toBe("3");
    });
  });
});
