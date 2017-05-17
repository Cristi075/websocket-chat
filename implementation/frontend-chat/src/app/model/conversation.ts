import { User } from './user';

export class Conversation {
    id: number;
    name: string;
    members: User[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
