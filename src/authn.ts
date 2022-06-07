import * as admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://miwi-e12ee-default-rtdb.firebaseio.com`
});

export const expressAuthnMiddleware = async (req: any, res: any, next: any) => {
    const authzHeader = await req.headers.authorization;

    if (!authzHeader) {
        req.userId = "";
        return next();
    }

    if (!authzHeader.startsWith("Bearer ")) {
        req.userId = "";
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