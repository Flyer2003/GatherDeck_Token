"use server";

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, EVENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined, 
            user.name
        )

        return parseStringify(newUser);
    } catch (error: any) {
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal("email", [user.email])               
            ])

            return documents.users[0] 
        }
    }
};

export const getUser = async (userId: string) => {
    try {
       const user = await users.get(userId);
       
       return parseStringify(user);
    } catch (error) {
        console.log(error);
    }
}

export const getEvent = async (userId: string) => {
    try {
       const events = await databases.listDocuments(
        DATABASE_ID!,
        EVENT_COLLECTION_ID!,
        [
            Query.equal("userId", [userId])
        ]
       );
       
       return parseStringify(events.documents[0]);
    } catch (error) {
        console.log(error);
    }
}

export const registerEvent = async ({ eventImages, ...event }: RegisterUserParams) => {
    try {
        let file;

        if (eventImages) {
            const inputFile = InputFile.fromBuffer(
                eventImages?.get('blobFile') as Blob,
                eventImages?.get('fileName') as string
            )

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        }

        const newEvent = await databases.createDocument(
            DATABASE_ID!,
            EVENT_COLLECTION_ID!,
            ID.unique(),
            {
                eventImagesId: file?.$id || null,
                eventImagesUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...event
            }
        )

        return parseStringify(newEvent);

    } catch (error) {
        console.log(error);
    }
}