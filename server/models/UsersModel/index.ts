import { Database } from "firebase-admin/lib/database/database"
import { FirebaseRefs } from "../../utils/firebaseRefs";

type User = {
    id?: string;
    name: string;
    zipCode: number;
    latitude: string;
    longitude: string;
}
const UsersModel = {
    create: async (db:Database, data:User):Promise<User>  => {
        const usersRef = db.ref(FirebaseRefs.users)
        const newUserkey =  await usersRef.push(data);       
        const newUserRef = db.ref(`${FirebaseRefs.users}/${newUserkey.key}`)
        const snapshot = await newUserRef.once('value');
        const newUser = snapshot.val(); 

        return newUser
    },
    all: async(db:Database):Promise<User[]> => {
        const usersRef = db.ref(FirebaseRefs.users)
        const snapshot = await usersRef.once('value');
        const users = snapshot.val(); 
        
         return Object.keys(users).map((key) => {
            return {id: key, ...users[key]}}) || []
},
findOne: async (db:Database, userId: string):Promise<User> => {
    const userRef = db.ref(`users/${userId}`)
    const snapshot = await userRef.once('value');
    const userData = snapshot.val()
    
    return userData || null
},
update: async (db:Database, userId: string, data: User):Promise<User>=> {
    const userRef = db.ref(`users/${userId}`)

    await userRef.update(data);

    const snapshot = await userRef.once('value');
    const userData = snapshot.val()

    return userData || null
}, 
}

export default UsersModel