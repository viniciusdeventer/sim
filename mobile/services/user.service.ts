import api from './api';
import type { User } from '../types/user';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  PasswordResetRequest,
} from '../types/auth';

class UserService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const { data: users } = await api.get<User[]>('/users');

      const user = users.find(
        (u) =>
          u.email === credentials.email &&
          u.password === credentials.password
      );

      if (!user) {
        return {
          success: false,
          message: 'Email ou senha incorretos',
        };
      }

      return {
        success: true,
        message: 'Login realizado com sucesso',
        user,
        token: `mock_token_${user.id}`,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao realizar login',
      };
    }
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    try {
      const { data: users } = await api.get<User[]>('/users');

      const existingUser = users.find((u) => u.email === data.email);

      if (existingUser) {
        return {
          success: false,
          message: 'Este email já está registrado',
        };
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      const response = await api.post<User>('/users', newUser);

      return {
        success: true,
        message: 'Cadastro realizado com sucesso',
        user: response.data,
        token: `mock_token_${response.data.id}`,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao realizar cadastro',
      };
    }
  }

  async update(id: string, data: Partial<User>): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response = await api.patch<User>(`/users/${id}`, data);
      return {
        success: true,
        message: 'Perfil atualizado com sucesso',
        user: response.data,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao atualizar perfil',
      };
    }
  }

  async requestPasswordReset(
    data: PasswordResetRequest
  ): Promise<LoginResponse> {
    try {
      const { data: users } = await api.get<User[]>('/users');

      const user = users.find((u) => u.email === data.email);

      if (!user) {
        return {
          success: false,
          message: 'Email não encontrado',
        };
      }

      await api.post('/passwordResets', {
        id: crypto.randomUUID(),
        email: data.email,
        token: `reset_${Math.random().toString(36).slice(2)}`,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      });

      return {
        success: true,
        message: 'Email de recuperação enviado',
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao solicitar recuperação de senha',
      };
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch {
      return [];
    }
  }
}

export default new UserService();