require('../models')
const request = require('supertest')
const app = require('../app')

let actorId;

const URL_BASE = "/api/v1/actors"
const actor = {
    firstName:"Johnny",
    lastName:"Depp",
    nationality:"Americano",
    image:"https://es.wikipedia.org/wiki/Johnny_Depp#/media/Archivo:Johnny_Depp_2020.jpg",
    birthday:"1963-06-09"
};


test('POST -> URL_BASE, should return statusCode 201 and res.body.firstName === actor.firstName', async() => { 
    const res = await request(app)
        .post(URL_BASE)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName) 
 });

 test('GET-> URL_BASE, should return statusCode 200 and res.body.length === 1', async() => { 

    const res = await request(app)
        .get(`${URL_BASE}`) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
  });


 test('GET-> URL_BASE/actorId, should return statusCode 200 and res.body.firstName === actor.firstName', async() => { 

    const res = await request(app)
        .get(`${URL_BASE}/${actorId}`) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
  });
  
test('PUT-> URL_BASE/actorId, should return statusCode 200 and res.body.firstName === actorUp.firstName', async() => { 
    
    const actorUp = {
        firstName: "Jhon"
    } 

    const res = await request(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(actorUp) 
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUp.firstName)
});
test('DELETE-> URL_BASE/actorId, should return statusCode 204', async() => { 
    
    const res = await request(app)
        .delete(`${URL_BASE}/${actorId}`)

    
    expect(res.status).toBe(204)
});

