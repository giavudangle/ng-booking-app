export interface IUser {
    id: number,
    email:string,
    name:string,
    phoneNumber?: string,
    address?: string,
    avatarImageUrl?: string,
    access_token : string
}