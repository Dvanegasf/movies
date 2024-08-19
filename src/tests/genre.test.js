require('../models')
const request = require('supertest')
const app = require('../app')

let genreId;

const URL_BASE = "/api/v1/genres"
const genre = {
    name:"Johnny",
};


test('POST -> URL_BASE, should return statusCode 201 and res.body.name === genre.name', async() => { 
    const res = await request(app)
        .post(URL_BASE)
        .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name) 
 });

 test('GET-> URL_BASE/genreId, should return statusCode 200 and res.body.name === genre.name', async() => { 

    const res = await request(app)
        .get(`${URL_BASE}/${genreId}`) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
  });
  
test('PUT-> URL_BASE/genreId, should return statusCode 200 and res.body.name === genre.name', async() => { 
    
    const genreUp = {
        name: "salsa"
    } 

    const res = await request(app)
        .put(`${URL_BASE}/${genreId}`)
        .send(genreUp) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUp.name)
});
test('DELETE-> URL_BASE/genreId, should return statusCode 204', async() => { 
    
    const res = await request(app)
        .delete(`${URL_BASE}/${genreId}`)

    
    expect(res.status).toBe(204)
});

