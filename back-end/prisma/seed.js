const prisma = require("../prisma"); 
const bcrypt = require("bcrypt");


const seed = async () => {
  async function createUser() {
    const hashedPassword = await bcrypt.hash("password123", 10);

    // 1. Admin user
    await prisma.user.create({
      data: {
        email: "admin@example.com",
        username: "admin",
        password: hashedPassword,
        isAdmin: true,
        fName: null,
        lName: null,
      },
    });

    // 2. Regular user with full name
    await prisma.user.create({
      data: {
        email: "alice@example.com",
        username: "alicew",
        password: hashedPassword,
        fName: "Alice",
        lName: "Wong",
      },
    });

    // 3. User with no name
    await prisma.user.create({
      data: {
        email: "ghost@example.com",
        username: "ghost",
        password: hashedPassword,
      },
    });

    console.log("Users seeded");
  }

  async function createGames() {
    await prisma.game.createMany({
      data: [
        {
          extertalId: 101,
          name: "Elden Ring",
          summary: "I played in Xbox and pc, this say something about How much I love this game",
          AvgRating: 95,
          popularity: 9.8,
          cover: "https://i.ebayimg.com/images/g/9owAAOSww4RiKBzU/s-l400.jpg"
        },
        {
          extertalId: 102,
          name: "Baldur's Gate 3",
          summary: "Is it the best game of all time? No. Is it among the best games of all time? Absolutely.",
          AvgRating: 92,
          popularity: 9.5,
          cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/7f3af383a3afa12f0835db4496c7630f62ab6369/capsule_616x353.jpg?t=1744744220"
        },
        {
          extertalId: 103,
          name: "Astro Bot",
          summary: "Astro Bot can proudly stand beside the PlayStation icons it so fondly celebrates.",
          AvgRating: 90,
          popularity: 8.7,
          cover: "https://cdn.mobygames.com/f1e25e84-6c90-11ef-8a5e-02420a000112.webp"
        },
      ],
    });

    console.log("Games seeded");
  }

  async function createReviews() {
    const users = await prisma.user.findMany();
    const games = await prisma.game.findMany();

    const alice = users.find((u) => u.username === "alicew");
    const ghost = users.find((u) => u.username === "ghost");

    await prisma.review.createMany({
      data: [
        {
          title: "Loved it!",
          body: "Amazing open-world and challenging bosses.",
          AvgRating: 10,
          userId: alice.id,
          gameId: games[0].id, 
        },
        {
          title: "Very cinematic",
          body: "Amazing open-world and challenging bosses.",
          AvgRating: 9,
          userId: ghost.id,
          gameId: games[1].id,
        },
        {
          title: "Addictive gameplay",
          body: "Amazing and challenging bosses.",
          AvgRating: 9,
          userId: alice.id,
          gameId: games[2].id,
        },
      ],
    });

    console.log("Reviews seeded");
  }

  await createUser();
  await createGames();
  await createReviews();
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
