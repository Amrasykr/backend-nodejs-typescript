import supertest from "supertest";
import {web} from "../src/application/web";
import {AddressTest, ContactTest, UserTest} from "./test-utils";
import {logger} from "../src/application/logging";

describe('Address API', () => {

    describe('POST /api/contacts/:contactId/addresses', () => {
        beforeEach( async () => {
            await UserTest.create()
            await ContactTest.create()
        })

        afterEach( async () => {
            await AddressTest.deleteAll()
            await ContactTest.deleteAll()
            await UserTest.delete()
        })

        it('should be able to create address', async () => {
            const contact = await ContactTest.get()
            const response = await supertest(web)
                .post(`/api/contacts/${contact.id}/addresses`)
                .set("X-API-TOKEN", "test")
                .send({
                    street: "test",
                    city: "test",
                    province: "test",
                    country: "test",
                    postal_code: "123123",
                })

            logger.debug(response.body)
            expect(response.status).toBe(200)
            expect(response.body.data.id).toBeDefined()
            expect(response.body.data.street).toBe("test")
            expect(response.body.data.city).toBe("test")
            expect(response.body.data.province).toBe("test")
            expect(response.body.data.country).toBe("test")
            expect(response.body.data.postal_code).toBe("123123")
        });

        it('should reject create address if req is invalid', async () => {
            const contact = await ContactTest.get()
            const response = await supertest(web)
                .post(`/api/contacts/${contact.id}/addresses`)
                .set("X-API-TOKEN", "test")
                .send({
                    country: "",
                    postal_code: "1231233131313131",
                })

            logger.debug(response.body)
            expect(response.status).toBe(400)
            expect(response.body.errors).toBeDefined()
        });

        it('should reject create address if contact is not found', async () => {
            const contact = await ContactTest.get()
            const response = await supertest(web)
                .post(`/api/contacts/${contact.id + 1}/addresses`)
                .set("X-API-TOKEN", "test")
                .send({
                    street: "test",
                    city: "test",
                    province: "test",
                    country: "test",
                    postal_code: "123123",
                })

            logger.debug(response.body)
            expect(response.status).toBe(404)
            expect(response.body.errors).toBeDefined()
        });
    });

    describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
        beforeEach( async () => {
            await UserTest.create()
            await ContactTest.create()
            await AddressTest.create()
        })

        afterEach( async () => {
            await AddressTest.deleteAll()
            await ContactTest.deleteAll()
            await UserTest.delete()
        })

        it('should  be able to get address', async () => {
            const contact = await ContactTest.get()
            const address = await AddressTest.get()
            const response = await supertest(web)
                .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
                .set("X-API-TOKEN", "test")

            logger.debug(response.body)
            expect(response.status).toBe(200)
            expect(response.body.data.id).toBeDefined()
            expect(response.body.data.street).toBe(address.street)
            expect(response.body.data.city).toBe(address.city)
            expect(response.body.data.province).toBe(address.province)
            expect(response.body.data.country).toBe(address.country)
            expect(response.body.data.postal_code).toBe(address.postal_code)
        });

        it('should reject get address if address is not found', async () => {
            const contact = await ContactTest.get()
            const address = await AddressTest.get()
            const response = await supertest(web)
                .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
                .set("X-API-TOKEN", "test")

            logger.debug(response.body)
            expect(response.status).toBe(404)
            expect(response.body.errors).toBeDefined()
        });

        it('should reject get address if contact is not found', async () => {
            const contact = await ContactTest.get()
            const address = await AddressTest.get()
            const response = await supertest(web)
                .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
                .set("X-API-TOKEN", "test")

            logger.debug(response.body)
            expect(response.status).toBe(404)
            expect(response.body.errors).toBeDefined()
        });
    });
});