import {
    AddressResponse,
    CreateAddressRequest,
    getAddressRequest, RemoveAddressRequest,
    toAddressResponse,
    UpdateAddressRequest
} from "../model/address-model";
import {Address, User} from "@prisma/client";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {ContactService} from "./contact-service";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import {add} from "winston";
import {map} from "zod";

export class AddressService {

    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse>{
        const createRequest = Validation.Validate(AddressValidation.CREATE, request)

        await ContactService.checkContactMustExists(user.username, request.contact_id)

        const address = await prismaClient.address.create({
            data: createRequest
        })

        return toAddressResponse(address)
    }

    static async get(user: User, request: getAddressRequest): Promise<AddressResponse> {
        const getRequest = Validation.Validate(AddressValidation.GET, request)
        await ContactService.checkContactMustExists(user.username, request.contact_id)

        const address = await this.checkAddressMustExists(getRequest.contact_id, getRequest.id)
        return toAddressResponse(address)
    }

    static async checkAddressMustExists(contactId: number, addressId: number): Promise<Address>{
        const address = await prismaClient.address.findFirst({
            where: {
                id : addressId,
                contact_id : contactId
            }
        })

        if (!address){
            throw new ResponseError(404, "Address not found")
        }

        return address
    }

    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.Validate(AddressValidation.UPDATE, request)
        await ContactService.checkContactMustExists(user.username, request.contact_id)
        await this.checkAddressMustExists(updateRequest.contact_id, updateRequest.id)

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        })

        return toAddressResponse(address)

    }

    static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
        const removeRequest = Validation.Validate(AddressValidation.GET, request)
        await ContactService.checkContactMustExists(user.username, request.contact_id)
        await this.checkAddressMustExists(removeRequest.contact_id, removeRequest.id)

        const address = await prismaClient.address.delete({
            where: {
                id: removeRequest.id
            }
        })

        return toAddressResponse(address)
    }

    static async list(user: User, contactId: number): Promise<Array<AddressResponse>> {
        await ContactService.checkContactMustExists(user.username, contactId)

        const addresses = await prismaClient.address.findMany({
            where : {
                contact_id: contactId
            }
        })

        return addresses.map((address) => toAddressResponse(address))
    }
}