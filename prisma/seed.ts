import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";


async function up() {
    
    await prisma.user.createMany({
        data: [
            {
                userName: 'pink1ep1e_user',
                email: 'user@test.ru',
                password: hashSync('1111', 10),
                imageUrl: 'https://sun2-19.userapi.com/s/v1/ig2/WoI7haOvu5K-Ryz9SeEaueYr8v92khrqYl7xAsqYuqyF-51jBp9DQYFeeLj5p7idpDJjQy09U1UgAayqyaMwu68g.jpg?quality=95&crop=240,123,284,284&as=32x32,48x48,72x72,108x108,160x160,240x240&ava=1&u=56A3lcUjeYQNI01pU3lnpicJ9mSh6glLyvKwRkUnyI4&cs=200x200',
                role: 'USER'
            },
            {
                userName: 'pink1ep1e',
                email: 'admin@test.ru',
                password: hashSync('1111', 10),
                imageUrl: 'https://sun2-19.userapi.com/s/v1/ig2/WoI7haOvu5K-Ryz9SeEaueYr8v92khrqYl7xAsqYuqyF-51jBp9DQYFeeLj5p7idpDJjQy09U1UgAayqyaMwu68g.jpg?quality=95&crop=240,123,284,284&as=32x32,48x48,72x72,108x108,160x160,240x240&ava=1&u=56A3lcUjeYQNI01pU3lnpicJ9mSh6glLyvKwRkUnyI4&cs=200x200',
                role: 'ADMIN'
            },
            {
                userName: 'cLown',
                email: 'clown@test.ru',
                password: hashSync('1111', 10),
                imageUrl: 'https://sun2-19.userapi.com/s/v1/ig2/WoI7haOvu5K-Ryz9SeEaueYr8v92khrqYl7xAsqYuqyF-51jBp9DQYFeeLj5p7idpDJjQy09U1UgAayqyaMwu68g.jpg?quality=95&crop=240,123,284,284&as=32x32,48x48,72x72,108x108,160x160,240x240&ava=1&u=56A3lcUjeYQNI01pU3lnpicJ9mSh6glLyvKwRkUnyI4&cs=200x200',
                role: 'USER'
            },
        ]
    })

}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {

        await down()
        await up()

    } catch (error) {
        console.log(error)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    });
