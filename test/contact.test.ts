import {ContactTest, UserTest} from "./test-utils";
import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";

describe('POST /api/contacts', () => {

    beforeEach( async () => {
        await UserTest.create()
    })

    afterEach( async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should create new contacts', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "ammar",
                last_name: "asysyakur",
                email: "ammar@example.com",
                phone:"123"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe("ammar")
        expect(response.body.data.last_name).toBe("asysyakur")
        expect(response.body.data.email).toBe("ammar@example.com")
        expect(response.body.data.phone).toBe("123")

    });

    it('should reject create new contacts if data is invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "ammar@example",
                phone:"12331313131313131313131313131321312312321312321938127312731"
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()

    });
});


describe('GET /api/contact/:contactId', () => {
    beforeEach( async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach( async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able get contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    });

    it('should reject get contact if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()

    });
});

describe('PUT /api/contact/:contactId', () => {
    beforeEach( async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach( async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@example.com",
                phone:"08123123"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)

    });

    it('should reject update contact if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "test",
                phone:""
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()

    });
});


describe('DELETE /api/contacts/contactId', () => {
    beforeEach( async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach( async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })


    it('should be able to remove contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Success")
    });

    it('should reject to remove contact if contact id is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id+1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });
});