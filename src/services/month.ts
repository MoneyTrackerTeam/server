import { DatabaseProvider } from "../database";
import { Month } from "../models/month";

class MonthService {
    public async list(): Promise<Month[]> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        return await repo.find({ relations: ["transactions"] });
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
        const test = await repo.save(month);
        return test;
    }

    public async getById(id: number | string): Promise<Month> {
        const repo = (await DatabaseProvider.getConnection()).getRepository(Month);
        return await repo.findOne({ relations: ["transactionss"] });
    }
}
export const monthService = new MonthService();
