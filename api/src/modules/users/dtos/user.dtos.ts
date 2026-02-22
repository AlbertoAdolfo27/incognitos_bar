export type UserCreateDTO = {
    firstname : string;
    lastname  : string;
    username  : string;
    email     : string;
    password  : string
    userRoleId: string;
}

export type UserUpdateDTO = {
    firstname: string,
    lastname : string,
    email    : string,
}