// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import type { USER_ROLE} from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: USER_ROLE;
      userName: string;
      image_url: string;
    };
  }

  interface User extends DefaultUser {  
    role: USER_ROLE;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: USER_ROLE;
  }
}
