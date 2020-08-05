const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('^help', { type: 'LISTENING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});
client.on('message', msg => {
  
    if (msg.content.startsWith('^')) {
        if (msg.content === '^ping') {
            msg.reply('Pong!');
        } else if (msg.content === '^dice') {
            msg.channel.send("You rolled a " + Math.ceil(Math.random() * 6) + "!");
        } else if (msg.content === "^someone") {
            
            msg.guild.members.fetch().then(members => {
                // To store the user id(s) you can map the Collection by ID:
                const IDs = members.map(user => user.id);
                    // --> ["UserID", "UserID", "UserID", "UserID"]
                msg.channel.send("<@" + IDs[(Math.floor(Math.random() * IDs.length  ))] + ">");
            }).catch(e => msg.channel.send("Couldn't fetch members."));
        
        } else if (msg.content.startsWith("^coinstreak") || msg.content.startsWith("^cs")) {
            const args = msg.content.split(" ")
            var coinflip = 0;
            var score = 1
            if (args.length !== 11) {
                msg.channel.send("Invalid args. Provide 10 \'h\' or \'t\' after ^coinstreak. Example:\`^coinstreak h t h h t h h t t h\`.")
            } else {
                for (let index = 1; index < args.length; index++) {
                    coinflip = Math.floor(Math.random() * 2);
                    if ((coinflip == 0 && args[index] == 'h') || (coinflip == 1 && args[index] == 't')) {
                        score *= 2;
                        msg.reply("You guessed " + (args[index] == 'h'?"heads":"tails") + " and the coin flipped " + (coinflip == 0?"heads!":"tails!"))
                        if (score == 1024) {
                            msg.reply("NO WAY! YOU WON! That was a 1 in 1024 chance!")
                        }
                    } else {
                        msg.reply("**The streak broke!** You guessed " + (args[index] == 'h'?"heads":"tails") + " and the coin flipped " + (coinflip == 0?"heads!":"tails!") + " Your score was " + score)
                        break;
                    }
                }
            }
        } else if (msg.content === "^help") {
            msg.channel.send(`**Commands Help**
            ^ping: Responds to the person who sends the message.
            ^dice: Rolls a dice and gives a random output from 1 to 6.
            ^someone: Pings a random person on the server.
            ^coinstreak or ^cs: Provide 10 \'h\' or \'t\' after ^coinstreak to guess the outcome.
             Example: \`^cs h t h h t h h t t h\`.
            ^fact: Gives a random fact from a collection of 80.`);
        } else if (msg.content === "^fact") {
            const facts = ["1. Three presidents, all Founding Fathers—John Adams, Thomas Jefferson, and James Monroe—died on July 4. Presidents Adams and Jefferson also died the same year, 1826; President Monroe died in 1831. Coincidence? You decide. (constitutioncenter.org)",
            "2. The Barbie doll’s full name is Barbara Millicent Roberts, from Willows, Wisconsin. Her birthday is March 9, 1959, when she was first displayed at the New York Toy Fair. (barbiemedia.com)",
            "3. There actually aren’t “57 varieties” of Heinz ketchup, and never were. Company founder H.J. Heinz thought his product should have a number, and he liked 57. Hint: Hit the glass bottle on the “57,” not the bottom, to get the ketchup to flow. (heinz.com)",
            "4. Two of President John Tyler’s grandsons are still alive today—and he was born in 1790. How is this possible? President Tyler, the 10th US president, was 63 when his son Lyon Tyler was born in 1853; Lyon’s sons were born when he was 71 and 75. President Tyler’s living grandsons, Lyon Jr. and Harrison Tyler, are 91 and 95 years old. The Tyler family still maintains the President’s home, Sherwood Forest Plantation in Virginia. (sherwoodforest.org)",
            "5. The tallest man ever recorded was American giant Robert Wadlow (1918–1940), who stood 8 feet 11 inches. Wadlow’s size was the result of abnormally enlarged pituitary gland. (guinnessworldrecords.com)",
            "6. The tallest living man is 37-year-old Sultan Kosen, from Turkey, who is 8 feet, 2.8 inches, who set the record in 2009. His growth is also due to a pituitary issue. (guinnessworldrecords.com)",
            "7. The oldest person ever to have lived (whose age could be authenticated), a French woman named Jeanne Louise Calment, was 122 years old when she died in 1997. (guinnessworldrecord.com)",
            "8. Sliced bread was first manufactured by machine and sold in the 1920s by the Chillicothe Baking Company in Missouri. It was the greatest thing since…unsliced bread? (chllicothenews.com)",
            "9. The Earl of Sandwich, John Montagu, who lived in the 1700s, reportedly invented the sandwich so he wouldn’t have to leave his gambling table to eat. (pbs.org)",
            "10. The first college football game was played on November 6, 1869, between Rutgers and Princeton (then known as the College of New Jersey) in New Brunswick, New Jersey. Rutgers won. (ncaa.com)",
            "11. Experiments in universities have actually been carried out to figure out how many licks it takes to get to the center of a Tootsie Pop, both with machine and human lickers (because this is important scientific knowledge!). The results ranged from 252 to 411. (tootsie.com)",
            "12. The Four Corners is the only spot in the US where you can stand in four states at once: Utah, Colorado, Arizona and New Mexico. ",
            "13. Canada is south of Detroit (just look at a map).",
            "14. The original name for the search engine Google was Backrub. It was renamed Google after the googolplex, which is the number one followed by 100 zeros. (about.google)",
            "15. The oldest-known living land animal is a tortoise named Jonathan, who is 187 years old. He was born in 1832 and has lived on the island of St. Helena in the Atlantic Ocean since 1882. (guinnessworldrecords.com)",
            "16. Bats are the only mammal that can actually fly.",
            "17. Wombats are the only animal whose poop is cube-shaped. This is due to how its intestines form the feces. The animals then stack the cubes to mark their territory. (bbc.com)",
            "18. The most common wild bird in the world isn’t the sparrow or blue jay—it’s the red-billed quelea, which live in Africa and have an estimated population of 1.5 billion. (audubon.org)",
            "19. The heart of the blue whale, the largest animal on earth, is five feet long and weighs 400 pounds. The whale in total weighs 40,000 pounds. (nationalgeographic.com)",
            "20. For comparison, an elephant’s heart weighs around 30 pounds. And a human heart? A mere 10 ounces. ",
            "21. Elephants can’t jump. (smithsonianmag.com)",
            "22. Octopuses have three hearts.",
            "23. Cows don’t actually have four stomachs; they have one stomach with four compartments. (fda.gov)",
            "24. The platypus doesn’t have a stomach at all: Their esophagus goes straight to their intestines. (nationalgeographic.com)",
            "25. This is one animal myth that’s true: Eating parts of a pufferfish can kill you because, in a defense mechanism to ward off predators, it contains a deadly chemical called tetrodotoxin. There’s enough in one pufferfish to kill 30 people—and there’s no antidote. Still, pufferfish, called fugu, is a highly-prized delicacy in Japan, but can only be prepared by well-trained chefs. (nationalgeographic.com)",
            "26. Polar bears have black skin. And actually, their fur isn’t white—it’s see-through, so it appears white as it reflects light.",
            "27. Tigers’ skin is actually striped, just like their fur. Also, no two fur patterns are alike.",
            "28. Flamingoes are only pink because of chemicals called carotenoids in the algae and fish (which also eat the algae) they eat; their feathers are grayish white when they’re born.",
            "29. Mosquitoes are the deadliest animal in the world: They kill more people than any other creature, due to the diseases they carry. (cdc.gov)",
            "30. What do Miss Piggy and Yoda have in common? They were both voiced by the same person, puppeteer Frank Oz.",
            "31. Psycho was the first movie to show a toilet flushing. (npr.com)",
            "32. One of the most famous movie lines in history was never said. We often quote, “Play it again, Sam,” from Casablanca; but the real line is, “Play it, Sam. Play ‘As Time Goes By.’” ",
            "33. The green code in The Matrix was actually created from symbols in the code designer’s wife’s sushi cookbook. (cnet.com)",
            "34. The wedding of Princess Diana and Prince Charles was watched by 750 million people worldwide in 1981; sadly, 2.5 billion watched her funeral in 1997. (bbc.com)",
            "35. With 3.572 billion viewers, half the world’s population watched the 2018 FIFA World Cup of soccer (or football, as many international fans call it), which is held every four years. That number is on par with the 2016 Summer Olympics; but only a quarter of the world watched the less-popular Winter Olympics in 2018. (fifa.com)",
            "36. There are no muscles in your fingers: Their function is controlled by muscles in your palms and arms. (assh.org)",
            "37. The hardest working muscle in your body is your heart: It pumps more than 2,000 gallons of blood a day and beats more than 2.5 billion times in a 70-year life span. (heart.org)",
            "38. It’s impossible to hum while holding your nose (just try it!).",
            "39. Skin is the body’s largest organ.",
            "40. The earth’s circumference is 24,900 miles. (nasa.gov)",
            "41. All of an adult human’s blood vessels, if laid out end to end, would be about 100,000 miles, so they could encircle the earth four times. (fi.edu)",
            "42. According to recent research, the human nose can distinguish at least a trillion different odors. (nature.com)",
            "43. The longest fingernails ever were over 28 feet in total. American Lee Redmond started growing them in 1979 and set the record in 2008. Sadly, she lost her nails in a car crash in 2009. (guinnessworldrecords.com)",
            "44. The origin of the word “sinister” reflects a historical bias against left-handed people. It comes from the Latin word for “left,” which was also seen to be unlucky or evil. (merriam-webster.com) ",
            "45. There is not one letter “q” in any US state name, the only letter in the alphabet to be missing. “J” and “z” are only represented once each, in New Jersey and Arizona.",
            "46. The word “strengths” is the longest word in the English language with only one vowel. (guinnessworldrecords.com)",
            "47. Cartoonist Mort Walker, creator of Beetle Bailey, came up with names for the things we often see in comics and cartoons: “briffit” is the dust cloud a character makes when he runs away quickly; “plewds” are the beads of sweat when a character is under duress; and “grawlix” are symbols such as “#@*%” that stand in for curse words. (merriam-webster.com)",
            "48. A mash-up of two words to make a new word (such as breakfast and lunch into brunch, or motel from motor and hotel) is called a portmanteau. In case you’re wondering, the word “portmanteau” itself is not a portmanteau; it’s a compound word that refers to a duel-sided suitcase. (merriam-webster.com) ",
            "49. The dog ate John Steinbeck’s homework—literally. The author’s pup chewed up an early version of Of Mice and Men. “I was pretty mad, but the poor fellow may have been acting critically,” he wrote.",
            "50. Among lost works, this story might be even worse: Ernest Hemingway’s first wife, Hadley, left a suitcase full of the author’s writing on a train. When she went back to get it, it was gone. “I had never seen anyone hurt by a thing other than death or unbearable suffering except Hadley when she told me about the things being gone,” Hemingway wrote in A Moveable Feast.",
            "51. The original title of Jane Austen’s Pride and Prejudice was First Impressions. (jasna.org)",
            "52. Mary Shelley wrote Frankenstein when she 18, during a ghost story competition while staying in Switzerland with writers Percy Shelley (her lover) and Lord Byron. (penguinrandomhouse.com)",
            "53. German chocolate cake doesn’t come from Germany. It was named for a person, Sam German, who created a type of baking chocolate for Baker’s in 1852. (npr.org)",
            "54. Hawaiian pizza was created in Ontario, Canada, by Greek immigrant Sam Panopoulos in 1962. (cbc.ca)",
            "55. Almost all commercially grown artichokes, 99.9 percent, come from California. One town in particular, Castroville, is nicknamed “the Artichoke Capital of the World.” (visitcalifornia.com)",
            "56. The different colors of Froot Loops cereal all taste the same—they’re not individual flavors. (time.com)",
            "57. What’s inside a Kit Kat? Broken Kit Kats that are damaged during production—they get ground up and go between the wafers inside, along with cocoa and sugar. That’s a way to not let anything go to waste! (today.com)",
            "58. Pound cake got its name because the original recipe required a pound each of butter, flour, sugar and eggs. That’s a lot of cake—but it was meant to last for a long time.",
            "59. The difference between jam and jelly is that jam is made with mashed up fruit while jelly is made with fruit juice. (bonapetit.com)",
            "60. Preserves are like jam but made with more whole fruit. Marmalade is preserves made from citrus fruit.",
            "61. Flamin’ Hot Cheetos were developed by a janitor at Frito-Lay, Richard Montanez, who got the idea after putting chili powder on some reject Cheetos and then pitched it to the CEO. He’s now a successful executive and motivational speaker, and a movie is in the works about his life. (cnbc.com)",
            "62. Coca-Cola actually sells soup in a can. Bistrone is a nourishing meal on the go, available in two flavors in Japan. (worldofcoca-cola.com)",
            "63. The biggest pizza ever created was 13,580 square feet, made in Rome, Italy, in 2012. The pizza was gluten-free and named “Ottavia” after a roman emperor. (guinnessworldrecords.com)",
            "64. The tallest building in the world is the Burg Khalifa in Dubai, standing at over 2,700 feet. (skyscrapercenter.com)",
            "65. The tallest building in the US is One World Trade Center in New York, which comes in at number six on the worldwide list. It stands at exactly 1,776 feet as a nod to the date of the Declaration of Independence.",
            "66. The Empire State Building in New York was the tallest building in the world from 1931 until 1971, and was the first building of over 100 floors.",
            "67. Contrary to popular belief, it’s really, really hard to see the Great Wall of China from space, particularly with the naked eye. (nasa.gov)",
            "68. The first footprints on the moon will remain there for a million years. (nasa.gov)",
            "69. Days on Venus are longer than years. Due to its slow axis rotation, it takes 243 Earth days to spin once; but it only takes 225 Earth days to go around the sun. (nasa.gov) ",
            "70. Humans could never “land” on Jupiter, Saturn, Uranus or Neptune because they are made of gas and have no solid surface. (natgeokids.com)",
            "71. But you could ice skate on one of Jupiter’s moons, Europa, which is covered in ice. An Axel jump would take you 22 feet in the air! (nasa.gov)",
            "72. Our modern interpretation of Santa Claus with a red outfit and white beard is due in large part to holiday Coca-Cola ads that began in 1931. (coca-cola.com)",
            "73. Queen Victoria’s husband, Prince Albert, wasn’t the first to introduce Christmas trees to Britain from his native Germany—Queen Charlotte did that in the late 1700s. But, Victoria and Albert are credited with popularizing the custom in the mid-1800s. (royal.uk)",
            "74. Buckingham Palace in London, England, has 775 rooms, including 78 bathrooms. (royal.uk)",
            "75. The White House in Washington, DC, has 132 rooms, including 35 bathrooms. (whitehouse.gov)",
            "76. It takes 570 gallons to paint the exterior of the White House. (whitehouse.gov)",
            "77. The teddy bear is named after President Theodore Roosevelt. After he refused to shoot a captured black bear on a hunt, a stuffed-animal maker decided to create a bear and name it after the president. (nps.gov)",
            "78. Lincoln Logs were created by John Lloyd Wright, son of famous architect Frank Lloyd Wright, in the 1920s. They were named after Abraham Lincoln, who grew up in a log cabin. (nps.gov)",
            "79. Play-Doh started out as a wallpaper cleaner before the head of the struggling company realized the non-toxic material made a good modeling clay for children and rebranded it. (museumofplay.org)",
            "80. In the 1940s, a retired schoolteacher came up with Candyland to entertain children who were hospitalized from polio. Because its color system required no reading, young kids could easily play. (toyhalloffame.org)"]
            msg.channel.send(facts[Math.floor(Math.random() * 80)])

        } else {
            msg.channel.send("Invalid command.")
        }
    }
});







































































client.login(process.env.BOT_TOKEN);
