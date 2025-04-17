const prisma = require("../prisma");
const bcrypt = require("bcrypt");

const seed = async () => {
  // Users
  async function createUser() {
    const hashedPassword = await bcrypt.hash("password123", 10);


    const imgPath = '../src/images/'
    // Admin user
    await prisma.user.create({
      data: {
        email: "admin@admin.com",
        username: "admin",
        password: hashedPassword,
        avatar: `${imgPath}defaultavatar1` ,
        isAdmin: true,
      },
    });

    // Full Name Test w/ Avatar
    await prisma.user.create({
      data: {
        email: "full@name.com",
        username: "fullNameTest",
        password: hashedPassword,
        avatar: `${imgPath}defaultavatar2`,
        fName: "FirstName",
        lName: "LastName",
      },
    });

    // no name and no avatar
    
    await prisma.user.create({
      data: {
        email: "no@name.com",
        username: "noNameTest",
        password: hashedPassword,
      },
    });

    console.log("Users seeded");
  }

  // Game 
  async function createGames() {
    await prisma.gameCommunity.createMany({
      data: [
        {
          gameName: "Elden Ring",
          isActive: true,
          description: "I played in Xbox and PC. This says how much I love this game.",
          coverImage: "https://i.ebayimg.com/images/g/9owAAOSww4RiKBzU/s-l400.jpg"
        },
        {
          gameName: "Baldur's Gate 3",
          isActive: true,
          description: "Among the best games of all time? Absolutely.",
          coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/7f3af383a3afa12f0835db4496c7630f62ab6369/capsule_616x353.jpg?t=1744744220"
        },
        {
          gameName: "Astro Bot",
          isActive: false,
          description: "Astro Bot can proudly stand beside the PlayStation icons it celebrates.",
          coverImage: "https://cdn.mobygames.com/f1e25e84-6c90-11ef-8a5e-02420a000112.webp"
        }
      ]
    });

    console.log("Game Communities seeded");
  }

  // Reviews
  async function createReviews() {
    const users = await prisma.user.findMany();
    const communities = await prisma.gameCommunity.findMany();

    const alex = users.find((u) => u.username === "alex");
    const ghost = users.find((u) => u.username === "ghost");

    await prisma.post.createMany({
      data: [
        {
          title: "Loved it!",
          description: "Amazing open-world and challenging bosses.",
          postType: "text",
          userId: alex.id,
          communityId: communities[0].id,
          likes: 10
        },
        {
          title: "Very cinematic",
          description: "Incredible acting and writing.",
          postType: "text",
          userId: ghost.id,
          communityId: communities[1].id,
          likes: 9
        },
        {
          title: "Addictive gameplay",
          description: "Super charming and fun.",
          postType: "text",
          userId: alex.id,
          communityId: communities[2].id,
          likes: 9
        }
      ]
    });

    console.log("Posts (Reviews) seeded");
  }

  // Comments
  async function createComments() {
    const users = await prisma.user.findMany();
    const posts = await prisma.post.findMany();

    const alex = users.find((u) => u.username === "alex");
    const ghost = users.find((u) => u.username === "ghost");

    await prisma.comment.createMany({
      data: [
        {
          body: "Agree! This game was awesome.",
          postId: posts[0].id,
          userId: ghost.id,
          likes: 3
        },
        {
          body: "I was impressed by the graphics.",
          postId: posts[1].id,
          userId: alex.id,
          likes: 2
        },
        {
          body: "One of the best I have played.",
          postId: posts[2].id,
          userId: ghost.id,
          likes: 5
        }
      ]
    });

    console.log("Comments seeded");
  }

  // Favorites
  async function createFavorites() {
    const users = await prisma.user.findMany();
    const posts = await prisma.post.findMany();

    const alex = users.find((u) => u.username === "alex");
    const ghost = users.find((u) => u.username === "ghost");

    await prisma.favorites.createMany({
      data: [
        {
          userId: alex.id,
          postId: posts[0].id
        },
        {
          userId: ghost.id,
          postId: posts[1].id
        },
        {
          userId: alex.id,
          postId: posts[2].id
        }
      ]
    });

    console.log("Favorites seeded");
  }

  // Post 
  async function createPosts() {
    const users = await prisma.user.findMany();
    const communities = await prisma.gameCommunity.findMany();

    const alex = users.find((u) => u.username === "alex");
    const ghost = users.find((u) => u.username === "ghost");

    await prisma.post.createMany({
      data: [
        {
          title: "Insane boss fight",
          content: "https://www.youtube.com/watch?v=D_iqjI2p7F4",
          description: "Malenia: 'I have never known defeat'.",
          postType: Video,
          userId: alex.id,
          communityId: communities[0].id,
          likes: 12
        }
      ]
    });
  
    console.log("Posts seeded");
  }

  // Run all
  await createUser();
  await createGames();
  await createReviews();
  await createComments();
  await createFavorites();
  await createPosts ();

};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
