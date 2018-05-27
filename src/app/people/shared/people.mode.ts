export class People {

    id: number
    first_name: string
    last_name: string
    age?: number
    avatar?: string
    background_url?: string
    constructor(id: number, first_name:string, last_name:string, age: number, avatar: string, bacground_url: string) { 
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.avatar = avatar;
        this.background_url = bacground_url;
    }

    clone() { return new People(this.id, this.first_name, this.last_name, this.age, this.avatar, this.background_url); }
}
