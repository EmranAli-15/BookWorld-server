import AppError from "../../errors/AppError";
import { createAccessToken } from "../../utils/createAccessToken";
import { decryptHash, makeHash } from "../../utils/hassing";
import { TLogin, TRegister, TUser } from "./user.interface";
import { User } from "./user.model";










const loginUser = async (payload: TLogin) => {
    const isUserExist = await User.findOne({ email: payload.email });

    if (!isUserExist) {
        throw new AppError(404, 'User not exist.');
    };

    const passwordDecoded = await decryptHash(payload.password, isUserExist.password);
    if (!passwordDecoded) {
        throw new AppError(404, 'Password incorrect.');
    };

    const jwtPayload = {
        name: isUserExist.name,
        email: payload.email,
        role: isUserExist.role,
        photo: "",
        userId: isUserExist?._id,
    };

    const accessToken = createAccessToken(jwtPayload);
    return accessToken;
}

const registerUser = async (payload: TRegister) => {
    const { name, email, password, confirmPassword } = payload;

    const isUserExist = await User.exists({ email });

    if (isUserExist) {
        throw new AppError(409, 'User alreday exist.');
    };

    if (password !== confirmPassword) throw new AppError(403, 'Password not matched.');

    const data = { name, email, password, role: "user" }
    data.password = await makeHash(data.password)
    const createUser = await User.create(data);

    const jwtPayload = {
        name: payload.name,
        email: payload.email,
        role: createUser.role,
        photo: "",
        userId: createUser?._id,
    };

    const accessToken = createAccessToken(jwtPayload);
    return accessToken;
};


export const userService = {
    registerUser,
    loginUser
}