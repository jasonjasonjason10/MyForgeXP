const prisma = require("../prisma");
const seed = async () => {
    async function createUser() {
        
    }
    async function createGames() {
        
    }
    async function createReviews() {
        
    }

    createUser();
    createGames();
    createReviews();

};
seed()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});