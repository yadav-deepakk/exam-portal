export interface UserDetail {
    userId: BigInteger | number;
    firstName: String | string;
    lastName: String | string;
    username: String | string;
    email: String | string;
    password: String | string;
    profile: String | string;
    phone: String | string;
    isActive: boolean;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: Array<Authority>;
}

export interface Authority {
    authority: String;
}

/*--------- SAMPLE USER JSON -------------
    "userId": 1,
    "firstName": "deepak",
    "lastName": "yadav",
    "username": "yadav_deepakk",
    "email": "deepak@yadav.com",
    "password": "${encrypted-password}",
    "profile": "default.png",
    "phone": "+91 9911223344",
    "isActive": true,
    "enabled": true,
    "credentialsNonExpired": true,
    "authorities": [
        {
            "authority": "ADMIN"
        }
    ],
    "accountNonExpired": true,
    "accountNonLocked": true
-------------------------------------------*/
