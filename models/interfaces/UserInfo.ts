export interface UserInfo{
    userId:number,
    name:string,
    family:string,
    username:string,
    mobile:string,
    userRole:number,
    UserRoleList:Array<RoleInfo>
}

export interface RoleInfo{
    id:number,
    name:string
}