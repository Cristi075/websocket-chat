import { User } from './user';

export class Message {
    id: number;
    content: string;
    sentAt: Date;
    author: User;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
