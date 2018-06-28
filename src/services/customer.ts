import { Customer } from "../models/customer";
import { DatabaseProvider } from "../database";
import { DeleteResult } from "typeorm";

class CustomerService {
    public async getById(id: number): Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).findOne(id);
    }
    // Create two models that are mapped in the model
    public async create(customer: Customer): Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).save(customer);

    }
    public async list(): Promise<Customer[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).find();
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).delete({ id: id })
    }

    public async update(customer: Customer): Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Customer);
        const entity = await repo.findOne(customer.id);
        entity.firstName = customer.firstName;
        entity.lastName = customer.lastName;
        return await repo.save(entity);
    }
}

export const customerService = new CustomerService();