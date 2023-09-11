import { Bike } from "./bike";
import { User } from "./user";
import { Rent } from "./rent";
import crypto from 'crypto'

export class App {
    private users: User[] = []
    private bikes: Bike[] = []
    private rents: Rent[] = []

    constructor() {
        this.listUsers();
        this.listRentals();
        this.listBikes();
    }

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.');
            }
        }
        user.id = crypto.randomUUID();
        this.users.push(user);

        console.log(`User Registered:\nID: ${user.id}\nEmail: ${user.email}\n`);
    }

    registerBike(bike: Bike): void {
        this.bikes.push(bike);

        console.log(`Bike Registered:\nModel: ${bike.name}\n`);
    }

    removeUser(email: string): void {
        const index = this.users.findIndex(user => user.email === email);
        if (index !== -1) {
            const removedUser = this.users.splice(index, 1)[0];

            console.log(`User Removed:\nID: ${removedUser.id}\nEmail: ${removedUser.email}\n`);
        }
    }

    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
        const rent = new Rent(bike, user, startDate, endDate);
        this.rents.push(rent);

        console.log(`Bike Rented:\nModel: ${bike.name}\nUser ID: ${user.id}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n`);

        return rent;
    }

    returnBike(rental: Rent, returnDate: Date): number {
        const rent = this.rents.find(r => r === rental);
        if (!rent) {
            throw new Error('Rental not found.');
        }

        if (returnDate > rent.dateTo) {
            throw new Error('Invalid return date.');
        }

        const rentalDays = (returnDate.getTime() - rent.dateFrom.getTime()) / (1000 * 60 * 60 * 24);
        const rentalCost = rentalDays * rent.bike.rate;

        console.log(`Bike Returned:\nModel: ${rent.bike.name}\nUser ID: ${rent.user.id}\nReturn Date: ${returnDate}\n`);

        return rentalCost;
    }

    listUsers(): User[] {
        console.log("Lista de Usuários:");
        console.log(this.users);
        return this.users;
    }

    listRentals(): Rent[] {
        console.log("Lista de Aluguéis/Reservas:");
        console.log(this.rents);
        return this.rents;
    }

    listBikes(): Bike[] {
        console.log("Lista de Bicicletas:");
        console.log(this.bikes);
        return this.bikes;
    }
}
