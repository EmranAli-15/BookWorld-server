import AppError from "../../errors/AppError";
import { createAccessToken } from "../../utils/createAccessToken";
import { decryptHash, makeHash } from "../../utils/hassing";
import { TLogin, TRegister, TUser } from "./user.interface";
import { User } from "./user.model";

class UserService {
    //Token Generation
    private generateAuthResponse(user: any) {
        const jwtPayload = {
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address,
            phone: user.phone,
            photo: user.image || "",
            userId: user._id,
        };
        return createAccessToken(jwtPayload);
    }

    async loginUser(payload: TLogin) {
        const isUserExist = await User.findOne({ email: payload.email });
        if (!isUserExist) throw new AppError(404, 'User not exist.');

        const passwordDecoded = await decryptHash(payload.password, isUserExist.password);
        if (!passwordDecoded) throw new AppError(403, 'Password incorrect.');

        return this.generateAuthResponse(isUserExist);
    }

    async googleLogin(payload: TUser) {
        const { email, name } = payload;
        let user = await User.findOne({ email });

        if (!user) {
            const hashedPassword = await makeHash("123456");
            user = await User.create({ email, name, password: hashedPassword, role: "user" });
        }

        return this.generateAuthResponse(user);
    }

    async registerUser(payload: TRegister) {
        const { name, email, password, confirmPassword } = payload;

        if (await User.exists({ email })) throw new AppError(409, 'User already exists.');
        if (password !== confirmPassword) throw new AppError(403, 'Password not matched.');

        const hashedPassword = await makeHash(password);
        const newUser = await User.create({ name, email, password: hashedPassword, role: "user" });

        return this.generateAuthResponse(newUser);
    }

    async updateUser({ id, data }: { id: any, data: TUser }) {
        const isUserExist = await User.exists({ _id: id });
        if (!isUserExist) throw new AppError(404, 'User not exist.');

        return await User.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    async getUser(id: string) {
        const user = await User.findById(id, { password: 0 });
        if (!user) throw new AppError(404, 'User not exist.');
        return user;
    }
}

export const userService = new UserService();