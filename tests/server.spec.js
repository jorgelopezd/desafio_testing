const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un Array y status 200 ", async () => {
        const {statusCode: status, body: cafes} = await request(server).get("/cafes").send();
        expect(status).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
    })

    it("Obteniendo status code 404 ", async () => {
        const idDelCafeAEliminar = 5;
        const jwt = "token";
        const res = await request(server)
                .delete(`/cafes/${idDelCafeAEliminar}`)
                .set("Authorization", jwt)
                .send();
        const status = res.statusCode;
        expect(status).toBe(404);
    })

    it("Obteniendo un código 404 ", async () => {
        const id = 7;
        const idDelCafeAModificar = 5;
        const cafe = {id, nombre: "café modificado"}
        const {statusCode: status} = await request(server)
            .put(`/cafes/${idDelCafeAModificar}`)
            .send(cafe)
        expect(status).toBe(400);
    })
});