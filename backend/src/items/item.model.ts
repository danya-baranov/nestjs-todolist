import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
    title: {type: String, require: true },
    description: {type: String, require: true },
    done: {type: Boolean, default: false},
});

export interface Item extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    done: boolean;
}
