export default interface User {
    userId?: BigInteger;
    userName: String;
    password: String;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    profile?: String | undefined | null;
    isActive?: boolean;
}
