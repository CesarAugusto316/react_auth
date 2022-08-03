import axios from 'axios';


export interface FormState {
  email: string,
  discordId: string
}

export interface UserProfile {
  id: number,
  username: string
}

export interface Token {
  token: string
}

/**
 *
 * @description Keeps track of current logged-in User, manage
 * authentication and saves user state in localStorage.
 */
export class LoginService {
  private baseUrl = 'https://ms-discord-upy5mhs63a-rj.a.run.app';
  private token!: string | null;
  public loggedInUser!: UserProfile;
  public hasValidToken!: boolean;

  constructor() {
    this.readFromLocalStorage();
    this.hasValidToken = this.token ? true : false;
  }

  /**
   *
   * @description requests a JWT to the baseUrl for a given UserProfile.
   * EveryTime we fetch a new token we programatically save it to
   * localStorage.
   */
  public fetchToken(formData: FormState): Promise<Token> {
    return new Promise((resolve, reject) => {
      axios.post(`${this.baseUrl}/auth/login`, formData)
        .then(({ data }) => {
          this.token = data.token;
          this.hasValidToken = true;
          this.writeToLocalStorage();
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   *
   * @description responds with a UserProfile for a given JWT.
   */
  public fetchUserProfile(): Promise<UserProfile> {
    if (this.token) {
      return new Promise((resolve, reject) => {
        axios.get(`${this.baseUrl}/auth/check`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }).then(({ data }) => {
          this.loggedInUser = data;
          resolve(data);
        })
          .catch((error) => {
            reject(error);
          });
      });
    }
    throw new Error('There is no token available');
  }

  private readFromLocalStorage(): void {
    this.token = localStorage.getItem('user-token');
  }

  private writeToLocalStorage(): void {
    if (this.token) {
      localStorage.setItem('user-token', this.token);
      return;
    }
    throw new Error('There is no token available');
  }
}
