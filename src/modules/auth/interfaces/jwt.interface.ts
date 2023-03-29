export interface JwtAttributes {
	access_token: string;
}

export function isJwt(object: any): object is JwtAttributes {
	return "access_token" in object;
}
