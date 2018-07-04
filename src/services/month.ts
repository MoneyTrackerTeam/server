import { DatabaseProvider } from "../database";
import { Month } from "../models/month";
import { FindManyOptions } from "typeorm";

class MonthService {
    public async list(query?: FindManyOptions<Month>): Promise<Month[]> {
        let opts: FindManyOptions<Month> = {};
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        if (query) {
            opts = {
                ...query,
                relations: ["transactions"],
            };
        } else {
            opts.relations = ["transactions"];
        }
        return await repo.find(opts);
    }
    // tslint:disable-next-line:max-line-length
    public async createMonth(budget: number, monthN: number, year: number): Promise<Month> {
        const months = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"];
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        const month = new Month();
        month.title = `${months[monthN]}-${year}`;
        month.budget = budget;
        month.monthNumber = monthN;
        month.year = year;
        return await repo.save(month);
    }

    public async getById(id: number | string): Promise<Month> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        return await repo.findOne({ relations: ["transactionss"] });
    }

    public async incrementMonth(id, value): Promise<Month> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        const month = await repo.findOne(id);
        month.spent += value;
        return await repo.save(month);
    }
}
export const monthService = new MonthService();
