/* eslint-disable import/no-extraneous-dependencies */

const session = require("supertest");
const app = require('../../src/app.js');
const { Dog, Temperaments, conn } = require('../../src/db.js');
const agent = session(app);

describe('Test de RUTAS', () => {
  beforeAll(async () => {
    await conn.authenticate();
  })
  beforeEach(async () => {
    await conn.sync({ force: true })
    await Temperaments.sync({ force: true })
    await Dog.sync({ force: true })
  })
  afterAll(async () => {
    await conn.close();
  })

  describe("GET /dogs", () => {
    it("Respond with status: 200", async () => {
      await agent.get("/dogs").expect(200)
    })
    it("Responds with an array of object", async () => {
      const response = await agent.get("/dogs")
      expect(Array.isArray(response.body)).toBe(true);
      expect(typeof response.body[0]).toBe('object');
    })
    it('Every object they have the properties: "id", "name", "age", "weight, "height", "image", "temperaments"', async () => {
      const response = await agent.get("/dogs")
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('age');
      expect(response.body[0]).toHaveProperty('weight');
      expect(response.body[0]).toHaveProperty('height');
      expect(response.body[0]).toHaveProperty('image');
      expect(response.body[0]).toHaveProperty('temperaments');
    })
  })
  describe('GET /dogs/:id', () => {
    it('Respond with status: 200', async () => {
      await agent.get('/dogs/1').expect(200);
    });
    it('IF id does not exist respond with status: 400', async () => {
      await agent.get('/dogs/900').expect(400);
    });
    it('Responds with an object with the properties: "id", "name", "age", "weight", "height", "image" ,"temperaments"', async () => {
      const response = await agent.get('/dogs/1');
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('age');
      expect(response.body).toHaveProperty('weight');
      expect(response.body).toHaveProperty('height');
      expect(response.body).toHaveProperty('image');
      expect(response.body).toHaveProperty('temperaments');
    })
  })
  describe("GET /dogsname", () => {
    it("Respond with status: 200", async () => {
      await agent.get("/dogsname?name=BARBET").expect(200);
    })
    it("If name does not exist respond with status: 400", async () => {
      await agent.get("/dogsname?name=404").expect(400);
    })
    it('Respond with an object with the properties:"name"', async () => {
      const response = await agent.get("/dogsname?name=BARBET");
      expect(response.body).toHaveProperty("name")
      expect(response.body.name).toEqual('Barbet');
    })
  })
  describe("GET /temperaments", () => {
    it("Respond with status: 200", async () => {
      await agent.get("/temperaments").expect(200)
    })
    it("Responds with an array of object", async () => {
      await Temperaments.create({ name: "Funny" })
      const response = await agent.get("/temperaments")
      expect(Array.isArray(response.body)).toBe(true);
      expect(typeof response.body[0]).toBe('object');
    })
    it('Every object they have the properties: "id", "name"', async () => {
      await Temperaments.create({ name: "Funny" })
      await Temperaments.create({ name: "Angry" })
      const response = await agent.get("/temperaments")
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
    })
  })
  describe("POST /dogs", () => {
    it("Respond with status: 200", async () => {
      const dog = {
        name: "Mike",
        age: "4",
        weight: "23 - 25",
        height: "10 - 14",
        image: "http://image.jpg",
        temperaments:[]
      }
      await agent.post("/dogs").send(dog).expect(200)
    })
    it("If exist respond with status: 401", async () => {
      const dog = {
        name: "Mike",
        age: "4",
        weight: "23 - 25",
        height: "10 - 14",
        image: "http://image.jpg",
        temperaments:[]
      }
      await agent.post("/dogs").send(dog)
      await agent.post("/dogs").send(dog).expect(401)
    }) 
    it("If data is missing respond with status: 400", async () => {
      const dog = {
        name: "Mike",
        age: "4",
        image: "http://image.jpg",
        temperaments:[]
      }
      await agent.post("/dogs").send(dog).expect(400)
    }) 
  })
})