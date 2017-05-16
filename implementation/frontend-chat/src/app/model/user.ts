import { Role } from './role';

export class User {
    id: number;
    username: string;
    nickname: string;
    roles: Role[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
