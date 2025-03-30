import { Database } from "firebase-admin/lib/database/database"
import { FirebaseRefs } from "../../utils/firebaseRefs";

const UsersModel = {
    create: async (db:Database, data:any) => {
        const userRef = db.ref(FirebaseRefs.users)

        return  await userRef.set(data);
    }
}

export default UsersModel