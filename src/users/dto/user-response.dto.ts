import { Exclude, Expose } from "class-transformer"

@Exclude()
export class UserResponseDto{
    @Expose()
    id: string
    @Expose()
    firstName: string
    @Expose()
    lastName: string
}