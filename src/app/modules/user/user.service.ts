import AppError from "../../errors/AppError";
import { createAccessToken } from "../../utils/createAccessToken";
import { TUser } from "./user.interface";
import { User } from "./user.model";

export const registerUser = async (payload: Partial<TUser>) => {

    const isUserExist = await User.exists({ email: payload.email })

    if (isUserExist) {
        throw new AppError(409, 'User alreday exist.');
    };

    const createUser = await User.create(payload);

    const jwtPayload = {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        photo: payload.image,
        userId: createUser?._id,
    };

    const accessToken = createAccessToken(jwtPayload);
    return accessToken;
}