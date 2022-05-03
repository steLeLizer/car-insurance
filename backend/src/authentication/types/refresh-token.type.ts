import { AccessTokenType } from './access-token.type';

export type RefreshTokenType = AccessTokenType & { refreshToken: string };
