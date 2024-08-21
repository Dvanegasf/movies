require('../models')
const request = require('supertest')
const app = require('../app');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');

let movieId;

const URL_BASE = "/api/v1/movies"
const movie = {
    name:"Johnny",
    image:"https://es.wikipedia.org/wiki/Johnny_Depp#/media/Archivo:Johnny_Depp_2020.jpg",
    synopsis:"mucho txt",
    releaseYear:2010
};


test('POST -> URL_BASE, should return statusCode 201 and res.body.name === movie.name', async() => { 
    const res = await request(app)
        .post(URL_BASE)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name) 
 });
 
 test('GET-> URL_BASE, should return statusCode 200 and res.body.length === 1', async() => { 

    const res = await request(app)
        .get(`${URL_BASE}`) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
  });

 test('GET-> URL_BASE/movieId, should return statusCode 200 and res.body.name === movie.name', async() => { 

    const res = await request(app)
        .get(`${URL_BASE}/${movieId}`) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
  });
  
test('PUT-> URL_BASE/movieId, should return statusCode 200 and res.body.name === movieUp.name', async() => { 
    
    const movieUp = {
        name: "Jhon"
    } 

    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(movieUp) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUp.name)
});

test("POST -> /BASE_URL/id/actors, should return code 200, and res.body.length === 1", async() => {
    const actor = {
        firstName:"Johnny",
        lastName:"Depp",
        nationality:"Americano",
        image:"https://es.wikipedia.org/wiki/Johnny_Depp#/media/Archivo:Johnny_Depp_2020.jpg",
        birthday:"1963-06-09"
    };

    const createActors = await Actor.create(actor)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([createActors.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].nationality).toBe(createActors.nationality)
    await createActors.destroy()
});

test("POST -> /BASE_URL/id/directors, should return code 200, and res.body.length === 1", async() => {
    const director = {
        firstName:"Martin ",
        lastName:"Scorsese",
        nationality:"Americano",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Martin_Scorsese-68754.jpg/220px-Martin_Scorsese-68754.jpg",
        birthday:"1942-11-17"
    };

    const createdirectors = await Director.create(director)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([createdirectors.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].lastName).toBe(createdirectors.lastName)
    await createdirectors.destroy()
});

test("POST -> /BASE_URL/id/genres, should return code 200, and res.body.length === 1", async() => {
    const genre = {
        name:"salsa"
    };

    const creategenres = await Genre.create(genre)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([creategenres.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].name).toBe(creategenres.name)
    await creategenres.destroy()
});


test('DELETE-> URL_BASE/movieId, should return statusCode 204', async() => { 
    
    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)

    
    expect(res.status).toBe(204)
});
