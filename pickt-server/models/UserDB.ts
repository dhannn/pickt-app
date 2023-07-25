import mongoose, { Schema } from "mongoose";
import { User, UserInsert, UserUpdate } from "../schema/User";
import * as fs from 'fs';

const UserSchema = new Schema<User>({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        firstName: {
            type: String, 
            required: true
        },
        lastName: {
            type: String
        }
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    profilePictureURI: { 
        type: String
    }
});

const UserModel = mongoose.model<User>('User', UserSchema);

export async function initializeUsers() {
    const file = fs.readFileSync('./data/pickt-db.users.json');
    UserModel.insertMany(JSON.parse(file.toString()));
}


export async function findUsers(obj: any = {}) {
    const users = await UserModel.find(obj);
    return users;
}

export async function insertUser(data: UserInsert) {    
    const user = new UserModel({
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        bio: data.bio,
        profilePictureURI: data.profilePictureURL
    });

    await user.save()
    return user;
}

export async function findUserByUsername(username: string) {
    const user = await UserModel.findOne({ username: username });
    return user;
}

export async function updateUser(data: UserUpdate) {
    const user = await UserModel.findOne({ username: data.username });

    if (!user) {
        return null;
    }
    
    const { newUsername, fullName, email, password, bio, profilePictureURI } = data;

    if (newUsername) {
        user.username = newUsername;
    }
    
    if (fullName?.firstName) {
        user.fullName!.firstName = fullName.firstName!;
    } 
    
    if (fullName?.lastName) {
        user.fullName!.lastName = fullName.lastName!;
    }

    if (email) {
        user.email = email;
    }

    if (password) {
        user.password = password;
    }

    if (bio) {
        user.bio = bio;
    }

    if (profilePictureURI) {
        user.profilePictureURI = profilePictureURI;
    }

    await user.save();
    return user;
}

export async function deleteUser(username: string) {
    const user = await UserModel.findOne({ username: username });
    await UserModel.deleteOne({ username: username });
    
    return user;
}
