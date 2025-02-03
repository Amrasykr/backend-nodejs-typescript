import {AddressResponse, CreateAddressRequest, getAddressRequest, toAddressResponse} from "../model/address-model";
import {User} from "@prisma/client";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {ContactService} from "./contact-service";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";

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

        const address = await prismaClient.address.findFirst({
            where: {
                id : getRequest.id,
                contact_id : getRequest.contact_id
            }
        })

        if (!address){
            throw new ResponseError(404, "Address not found")
        }

        return toAddressResponse(address)
    }
}