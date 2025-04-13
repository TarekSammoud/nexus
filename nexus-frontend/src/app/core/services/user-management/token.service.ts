import { jwtDecode } from 'jwt-decode';
import { RoleType } from '../../entities/user/enums';
export interface JwtPayload {
    id: number;
    email: string;
    roleType: RoleType;
    exp: number;
    iat: number;
}

export class TokenService {
    static getDecodedToken(): JwtPayload | null {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                return jwtDecode<JwtPayload>(token);
            } catch (e) {
                console.error('Erreur lors du décodage du token', e);
                return null;
            }
        }
        return null;
    }

    static getUserId(): number | null {
        const decoded = this.getDecodedToken();
        return decoded ? decoded.id : null;
    }

    static getUserEmail(): string | null {
        const decoded = this.getDecodedToken();
        return decoded ? decoded.email : null;
    }

    static getUserRole(): RoleType | null {
        const decoded = this.getDecodedToken();
        return decoded ? decoded.roleType : null;
    }
}
