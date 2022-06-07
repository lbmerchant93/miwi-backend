import * as admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://miwi-e12ee-default-rtdb.firebaseio.com`
});

export const expressAuthnMiddleware = async (req: any, res: any, next: any) => {
    const authzHeader = await req.headers.authorization;
    // console.log(authzHeader, 'authzHeader')

    if (!authzHeader) {
        req.userId = "";
        // console.log('authzHeader')
        return next();
    }

    if (!authzHeader.startsWith("Bearer ")) {
        // throw new Error("Invalid Authorization Header.");
        return next();
    }

    req.authToken = authzHeader.split(" ")[1];

    try {
        const user = await admin.auth().verifyIdToken(req.authToken);
        req.userId = user.uid;
        return next();
    } catch (e) {
        console.log(e, 'error')
        throw new Error("Unable to validate Authorization.");
    }
};

export { admin };