
import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
		isFavourite: {
			type: Boolean,
			default: false,
		},
		contactType: {
			type: String,
			enum: ['work', 'home', 'personal'],
			default: 'personal',
			required: true,
		},
		parentId: { // нова властивість 
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
	},
	{
		timestamps: true,   // додає createdAt і updatedAt
		versionKey: false,  // не додає __v
	}
);


export const ContactsCollection = model('Contact', contactSchema);
