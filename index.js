import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

const groupOne = {
    data: [
        {
            status: "inactive",
            age: 16
        },
        {
            status: "active",
            age: 18
        },
        {
            status: "inactive",
            age: 32
        },
        {
            status: "active",
            age: 17
        },
        {
            status: "active",
            age: 11
        },
        {
            status: "inactive",
            age: 26
        },
        {
            status: "active",
            age: 17
        }
    ]
}

const groupTwo = {
    data: [
        {
            status: "inactive",
            age: 22
        },
        {
            status: "active",
            age: 18
        },
        {
            status: "active",
            age: 16
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 26
        },
        {
            status: "active",
            age: 25
        }
    ]
}

const observable = new Observable((subscriber) => {
    subscriber.next(groupTwo);
    subscriber.complete();
}).pipe(
    map(value => value.data),
    filter(value => value.length >= 5),
    map(value => value.filter(user => user.status === 'active')),
    map(value => value.reduce((sum, user) => sum + user.age, 0) / value.length),
    map(value => {
        if (value < 18) throw new Error(`average age (${value}) is below 18`)
        else return value;
    }),
    
)

const observer = {
    next: (value) => { 
        console.log("Observer got a value of " + value);
    },
    error: (err) => {
        console.log("Observable got an error of " + err);
    },
    complete: () => {
        console.log("Observer got a complete notification");
    }
}

observable.subscribe(observer);