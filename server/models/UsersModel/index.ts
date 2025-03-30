import { Database } from "firebase-admin/lib/database/database"
import { FirebaseRefs } from "../../utils/firebaseRefs";

type User = {
    id: string;
    name: string;
    zipCode: number;
    latitude: string;
    longitude: string;
}
const UsersModel = {
    create: async (db:Database, data:any) => {
        const usersRef = db.ref(FirebaseRefs.users)

        return  await usersRef.push(data);
    },
    all: async(db:Database):Promise<User[]> => {
        const usersRef = db.ref(FirebaseRefs.users)
        const snapshot = await usersRef.once('value');
        const users = snapshot.val(); 
        
         return Object.keys(users).map((key) => {
            return {id: key, ...users[key]}}) || []
}
}

export default UsersModel