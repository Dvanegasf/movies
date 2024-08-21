require('../models')
const request = require('supertest')
const app = require('../app')

let directorId;

const URL_BASE = "/api/v1/directors"
const director = {
    firstName:"Martin ",
    lastName:"Scorsese",
    nationality:"Americano",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Martin_Scorsese-68754.jpg/220px-Martin_Scorsese-68754.jpg",
    birthday:"1942-11-17"
};


test('POST -> URL_BASE, should return statusCode 201 and res.body.firstName === director.firstName', async() => { 
    const res = await request(app)
        .post(URL_BASE)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName) 
 });

 test('GET-> URL_BASE, should return statusCode 200 and res.body.length === 1', async() => { 

    const res = await request(app)
        .get(`${URL_BASE}`) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
  });


 test('GET-> URL_BASE/directorId, should return statusCode 200 and res.body.firstName === director.firstName', async() => { 

    const res = await request(app)
        .get(`${URL_BASE}/${directorId}`) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
  });
  
test('PUT-> URL_BASE/directorId, should return statusCode 200 and res.body.firstName === directorUp.firstName', async() => { 
    
    const directorUp = {
        firstName: "Jhon"
    } 

    const res = await request(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(directorUp) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUp.firstName)
});
test('DELETE-> URL_BASE/directorId, should return statusCode 204', async() => { 
    
    const res = await request(app)
        .delete(`${URL_BASE}/${directorId}`)

    
    expect(res.status).toBe(204)
});

