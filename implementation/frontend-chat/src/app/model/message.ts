import { User } from './user';

export class Message {
    id: number;
    content: string;
    sentAt: Date;
    author: User;

    image: any;

    file: any;
    fileName: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
