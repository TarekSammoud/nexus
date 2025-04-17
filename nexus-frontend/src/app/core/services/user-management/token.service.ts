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
    hasToken(): boolean {
        return !!localStorage.getItem('token'); // Ou sessionStorage selon ton choix
    }


    isTokenExpired(): boolean {
        const token = localStorage.getItem('auth_token');
        if (!token) return true;

        const decodedToken = this.decodeToken(token);
        const expiry = decodedToken?.exp * 1000; // Convertir en millisecondes
        return Date.now() > expiry;
    }
    decodeToken(token: string): any {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

}
