// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const isDebug = process.env.NODE_ENV !== 'production'
const prismaClientSingleton = () => {
  try {
    return isDebug
      ? new PrismaClient({
          log: [
            {
              level: 'query',
              emit: 'event',
            },
          ],
        })
      : new PrismaClient()
  } catch (error) {
    console.error('PRISMA ERROR: Prisma client initialization failed, using mock mode:', error.message)
    console.error('FULL ERROR:', error)
    // Return a mock client for development
    return {
      user: {
        findMany: () => Promise.resolve([]),
        findFirst: (args?: any) => {
          console.log('Mock findFirst called with args:', JSON.stringify(args, null, 2));
          // where条件をチェック - loginUser.idがdev-user-01の場合のみユーザーを返す
          if (args?.where?.id && args.where.id !== 'dev-user-01') {
            console.log('User ID mismatch, returning null');
            return Promise.resolve(null);
          }
          
          // selectがある場合は選択されたフィールドのみ返す
          const fullUser = {
            id: 'dev-user-01',
            name: '開発用ユーザー',
            email: 'dev@example.com',
            image: 'https://via.placeholder.com/150',
            message: '開発用のユーザーです',
            Comment: [],
            Bookmark: [],
            ExperienceDiary: []
          };
          
          if (args?.select) {
            const selected: any = {};
            Object.keys(args.select).forEach(key => {
              if (key === 'Comment') selected[key] = [];
              else if (key === 'Bookmark') selected[key] = [];
              else if (key === 'ExperienceDiary') selected[key] = [];
              else selected[key] = fullUser[key as keyof typeof fullUser];
            });
            return Promise.resolve(selected);
          }
          
          return Promise.resolve(fullUser);
        },
        findFirstOrThrow: () => Promise.resolve({
          id: 'dev-user-01',
          name: '開発用ユーザー',
          email: 'dev@example.com',
          image: 'https://via.placeholder.com/150',
          message: '開発用のユーザーです'
        }),
        findUnique: () => Promise.resolve(null),
        findUniqueOrThrow: () => Promise.resolve({}),
        create: () => Promise.resolve({
          id: 'dev-user-01',
          name: '開発用ユーザー',
          email: 'dev@example.com',
          image: 'https://via.placeholder.com/150',
          message: '開発用のユーザーです'
        }),
        createMany: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
        updateMany: () => Promise.resolve({}),
        upsert: () => Promise.resolve({}),
        delete: () => Promise.resolve({}),
        deleteMany: () => Promise.resolve({}),
        count: () => Promise.resolve(0),
        aggregate: () => Promise.resolve({}),
        groupBy: () => Promise.resolve([]),
      },
      experienceDiary: {
        findMany: () => Promise.resolve([]),
        findFirst: () => Promise.resolve(null),
        findFirstOrThrow: () => Promise.resolve({}),
        findUnique: () => Promise.resolve(null),
        create: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
        delete: () => Promise.resolve({}),
      },
      comment: {
        findMany: () => Promise.resolve([]),
        create: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
        delete: () => Promise.resolve({}),
      },
      bookmark: {
        findMany: () => Promise.resolve([]),
        create: () => Promise.resolve({}),
        delete: () => Promise.resolve({}),
      },
      serapistar: {
        findMany: () => Promise.resolve([]),
        findFirst: () => Promise.resolve({
          id: 'mock-serapist-1',
          slug: 'mock-serapist',
          nickname: 'モックセラピスト',
          avatar: 'https://via.placeholder.com/150'
        }),
        findUnique: () => Promise.resolve(null),
        create: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
        delete: () => Promise.resolve({}),
      },
      $on: () => {},
      $connect: () => Promise.resolve(),
      $disconnect: () => Promise.resolve(),
    } as any
  }
}

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = prismaClientSingleton()

// eslint-disable-next-line import/no-default-export
export default prisma

if (isDebug && !globalThis.prisma) {
  globalThis.prisma = prisma
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
  })
}
