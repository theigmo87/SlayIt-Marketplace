import { Listing } from './listing';

export class User{
    private _profile: any;
    public user_id: string;
    public name: string;
    public picture: string;
    constructor(profile: any) {
        this._profile = profile;
        this.user_id = profile.user_id;
        if (typeof profile.name === "string")
            this.name = profile.name;
        else if (typeof profile.nickname === "string")
            this.name = profile.nickname;
        if (profile.picture)
            this.picture = profile.picture;
    }

    get registrationData(): any{
        return {
            "user_id": this._profile.user_id,
            "email": this._profile.email
        }
    }
}