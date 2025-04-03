import { Database } from "firebase-admin/lib/database/database"
import { FirebaseRefs } from "../../utils/firebaseRefs";

type User = {
    id?: string;
    name: string;
    zipCode: number;
    latitude: string;
    longitude: string;
}

type UsersModel = {
    create: (db: Database, data: User) => Promise<User>;
    index: (db: Database) => Promise<User[]>;
    show: (db: Database, userId: string) => Promise<User>
    update: (db: Database, userId: string, data: User) => Promise<User>
}
const UsersModel: UsersModel = {
    create: async (db, data) => {
        const usersRef = db.ref(FirebaseRefs.users)
        const newUserkey = await usersRef.push(data);
        const newUserRef = db.ref(`${FirebaseRefs.users}/${newUserkey.key}`)
        const snapshot = await newUserRef.once('value');
        const newUser = snapshot.val();

        return newUser
    },
    index: async (db) => {
        const usersRef = db.ref(FirebaseRefs.users)
        const snapshot = await usersRef.once('value');
        const users = snapshot.val();

        return Object.keys(users).map((key) => {
            return { id: key, ...users[key] }
        }) || []
    },
    show: async (db, userId) => {
        const userRef = db.ref(`users/${userId}`)
        const snapshot = await userRef.once('value');
        const userData = snapshot.val()

        return userData || null
    },
    update: async (db, userId, data) => {
        const userRef = db.ref(`users/${userId}`)

        await userRef.update(data);

        const snapshot = await userRef.once('value');
        const userData = snapshot.val()

        return userData || null
    },
}

export default UsersModel