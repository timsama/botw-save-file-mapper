# Breath of the Wild Save File Mapper
###### Intro
Have you started playing Breath of the Wild, and due to an act of God, Nature or Younger Sibling, your save has been deleted, and now you've lost all motivation to get back to where you were? Well, as long as you remember the items you have and the status of your quests, you can _recreate_ your save file (or a reasonable approximation thereof) and pick up right from where you left off using Breath of the Wild Save File Mapper (BoTWSFM)! I'm planning to build a UI in the future to make that much easier, but it certainly is possible to do now, either through direct JSON import, or by building it piece by piece from the command line.

...OR...

Have you hundred-percented Breath of the Wild, and are looking for a new challenge? Are you itching to create new, possibly-ridiculous ways of playing? Or are you just an _enormous_ nerd who desperately needs to know exactly how Link's current position and orientation are stored in your Breath of the Wild save? If you answered yes to any of these, Breath of the Wild Save File Mapper might be for you. And note that while some people are doing crazy things with the game involving emulators, every crazy thing BoTWSFM does works _on your Wii U console_.

What BotWSFM does:
- Compares different save files and outputs a raw changefile containing the differences between them. Every. Single. Bit.
- Uses raw changefiles to perform binary searches by chunk or by line to identify what data changes have what in-game effects.
- Exports search results to JSON effect map files that you can compile and use to your heart's content.
- Apply and unapply\* effects from your effect map files to alter any v1.4+ Breath of the Wild save file!
- Exports your save file to a JSON format containing data fields for everything I've been able to nail down.
- Imports JSON save data and applies its effects to your save file.
- Lets you use the packaged-in effects maps to set your quest progress to ANY point in the main questline (including Trial of the Sword and The Champion's Ballad--if you purchased them).
- Lets you control the completion status of all shrines and divine beasts!
- Lets you insert/modify/delete items from your inventory!
- Lets you put ludicrously-powerful bonuses on your weapons and shields!
- Lets you handicap yourself by lowering your max hearts as low as 1/4 heart max and/or making you tired as soon as you start to run or climb!

\*_With some exceptions_

What BotWSFM does NOT do:
- Change anything in the game while it's running.
- Transfer anything to or from your Wii U. You've gotta get the save file onto your PC yourself.
- Give you access to any DLC you don't already own.
- Work on pre-v1.4 save files. (Well, it might work. I haven't checked, but I would be surprised if it did work.)
- Work on Switch BoTW save files. (Again, it might work, but I don't have any Switch save files on my PC, so no way to check.)

###### Getting Started
The very first thing you'll need to do is go into config.js and update `savepath` to point to the location of your save files, including the specific save slot you want to use. I happen to like slot 6, but it doesn't really matter.

Then, you have several paths you can do down. You can create a JSON savefile and tweak it to recreate a lost save file. Or you can start trying to add things to the effects map. Or you can load up one of my premade JSON files for a fun challenge.

###### Creating a JSON savefile
To start, you'll want to run the following commands: `npm run create-blank-snapshot` followed by `npm run load-snapshot blank`, then finally `npm run export-json myfile`, which will create a file called 'myfile.json' in your /exports subfolder. Open it up, and you'll see a list of every change you can make, grouped into sections like "Main Quests", "Shrines", "Inventory", and so on. You can delete out anything you don't want to change, or simply replace the `true`/`false` in that field with `undefined`. Feel free to specify as much or as little as you like; I've spent a long time building up dependencies in the effects map so that the program can do a good job at making sure that things stay cohesive. For example, if you specify that Quest X is complete, but that depends on Quest Y being complete as well, then Quest Y will be complete when you load up the save file, even if you didn't specify anything about Quest Y.

_WARNING: because it describes quest steps, spoilers abound in the save file JSON. So, if you're worried about spoiling yourself, then wait until I create the UI for this, which I'm intending to make as spoiler-free as possible._

###### Loading a JSON savefile
Once you're done building your JSON savefile, go ahead and import it back into the actual save file by using the command `npm run import-json myfile`, or whatever you named your JSON file. Just FYI, if you apply the changes to a totally blank savefile (like the one created with `create-blank-snapshot`), you'll have to load the savefile, then save immediately. After doing that, you can import your JSON file. In fact, once you've done that (before you import your JSON file), run the command `npm run take-snapshot blank`, and your new version of the `blank` snapshot will be of Link in the Shrine of Resurrection just as if you'd started a brand new game. The reason I didn't just include that savefile by default is to avoid running afoul of any copyright shenanigans.

At any rate, once you've run `npm run import-json yourfilenamehere`, your save file is ready to go. Pop that SD card into your Wii U and take your shiny new save file out for a spin.

###### When JSON savefiles are stubborn...
If you're putting in a change (especially if you're specifying that something should be turned off) and you just can't get it to go through when you load up the game, it's probably a dependency that's turning it back on. Not to worry, I've split the dependencies into what I call hard and soft dependencies. Hard dependencies are changes that will either do nothing or crash the game when performed alone, but work when performed together. Soft dependencies, on the other hand, are based on what makes sense from a player's perspective, like that if you have completed _The Isolated Plateau_, then that means you must have finished _Follow the Sheikah Slate_. In other words, soft dependencies are there to make casual users' lives easier, but you don't have to use them. Instead of importing with the command `npm run import-json myfile`, run this instead: `npm run import-json myfile skip-soft-dependencies` or `npm run import-json myfile skip-soft-deps`. This will make the program ignore any and all soft dependencies, and instead only do exactly as your JSON tells it to. Just be forewarned, you can make some _weird_ stuff happen by doing this. (But I do it all the time.)

###### Adding to the Effects Map
So, you want to expand the effects map; that's good to hear. Even though you can control most of the things normal players care about, the save file is actually only about 8% mapped so far. To make a dent in the remaining 92%, you'll want to start building raw changefiles. That might sound scary, but it's really pretty easy. For instance, if I want to figure out the savefile location that controls whether or not the Magnesis rune is unlocked, I would run `npm run build-raw-changes runes.magnesis` (which starts the script and names the raw changefile Magnesis), save the game right before getting Magnesis, hit [Enter] in my command prompt, get Magnesis, save immediately afterward, then hit [Enter] again. Viola! A raw changefile will be created. Follow this process to create changefiles for whatever save data you want to know about. Keep in mind, the fewer things you do between your saves, the easier and faster it will be to nail down where that data is stored.

Next, you'll want to start building finalized effects to add to your effects map. This is the fun, crazy and/or tedious part. If I want to continue nailing down the Magnesis rune, I'd run `npm run test-chunks runes.magnesis`, which will start the binary search, using the Magnesis raw changefile created in the previous step. It will temporarily back up my save file, and swap in a new one that it has created. I would then need to load up the save on my console (it won't be hard to guess which one, since the preview image will change), and answer a (y/n) prompt saying whether or not the change worked. So, after my game loaded up that save, I would check my list of runes to see if Magnesis was in it. If so, I'd answer "yes". If not, I'd answer "no". It will repeat this process several times until it has narrowed things down to some addresses that it thinks will work. Word of warning: strange things and even game crashes can happen during this process. But rest assured, the original save file is safely backed up, and will be restored at the end of the process. If my game crashes, I'd just answer "no" to the prompt for that time around. If the final save it generates works, then hooray! I found the chunk of the save file that controls whether or not the Magnesis rune is enabled.

###### Chunks vs. Singles
Personally, I tend to search my raw changefiles using `test-chunks` because it's less likely to crash the game. The only difference between `test-chunks` and `test-singles` is that `test-chunks` aggregates changes to offsets that are close to each other into an atomic cluster that I call a "chunk", and will either use the whole chunk or none of it in any given test. In layman's terms, it means that I prevent any statement that says "buy sandwiches" from accidentally getting cut up and turned into "buy sand". `test-singles` is still useful if you know what you're looking for is stored in a `uint32` or less, but I typically don't touch it until `test-chunks` has failed, if I'm suspicious that I'm looking for a boolean flag (that's when I use `test-ones`), or if I've reduced things down to a chunk that I want to split apart to see if contains an offset change that can give me the effects I want by itself.

Some interesting things I've found using chunks and singles: there are in fact two different ways to give yourself the Paraglider, and the quest The Great Plateau does both at the end. The first is a chunk of 3 lines that give access to the Paraglider by adding it to your Key Items menu (note: I recommend using the existing inventory management tools I've created rather than adding a chunk to the savefile for this). The second is a single location where you change a 0 to a 1, which gives you the ability to use the Paraglider, but doesn't add it to your Key Items. Both of these methods remove the fog from around the Great Plateau, which allows you to reach the ground without getting pulled back onto the plateau.

###### Applying your Effects Map Changes
Finally, unless you wanted to know about save file structure purely to satisfy your curiosity, you'll want to apply the effects you discovered and start modifying your saves. To continue with the Magnesis example, I would then create a "brand new, just got the Sheikah Slate" save file (any save file would work, but you already have Magnesis for most of it), make sure I've saved it, and then I would run `npm run apply-changes runes.magnesis`, reload the save file, and I would magically now have the Magnesis Rune, despite never having left the Shrine of Resurrection.

You can follow the above process to do lots of things, from giving yourself the Champion's Ballad final reward at the beginning of the game, to skipping getting the Sheikah Slate, giving yourself the Paraglider, and leaving the Great Plateau before activating any of the towers or shrines (good luck getting back up without teleports, though!). You can even fall endlessly through a cloud-filled abyss, or permanently disable all your runes if you are so inclined. The possibilities are endless!\*

\*_The number of possibilities is actually roughly equivalent to 2^1,027,200 - # of save file configurations that either do nothing or crash the game. Plus 2._


###### Premade Challenge Files
To use the challenge files, simply copy the one you want from the /challenges subfolder into the /export subfolder, then run `npm run import-json filename.json` on a Brand New (i.e. first thing after waking up in the Shrine of Resurrection) save file.

threeheartsplus.json is a save file that totally eliminates your ability to get spirit orbs, and therefore, heart containers. All shrines have had their Sheikah Slate pedestals deactivated, and all Divine Beasts have had their heart containers taken away. On the plus side, you have tons of stamina, so you can run from danger 'til your heart's content. Can you rescue Zelda without the Master Sword?

outofshape.json is a save file that drastically lowers your starting stamina, making you get tired immediately after starting to run. As consolation, you start out with beefy high-durability equipment, a special surfing shield, and enough Enduring food to make it up the cliff to Owa Daim Shrine (otherwise this mode is impossible). Oh, and if you fall in water at all, you're dead. Can you stop Calamity Ganon while adventuring at a brisk walking pace?

###### What's New
I've gotten rid of all dependency on shell scripts, so you no longer need to be running Linux for this to work (yay!). In fact, I've switched to developing this entirely on Windows 10, using the Windows Linux Subsystem, which is actually pretty great.

I've removed some dependencies that are no longer needed, which slims things down nicely.

I've verified that the upgrade to 1.5 did not change the structure of the save file (thank Hylia), so everything should still work.

###### Planned Upgrades
- Add support for horse addition/editing/removal

##### Upgrades that will hopefully be done sometime in 2019
- Add an easy-to-use GUI

###### Known Issues
- Old man still hangs around the plateau after you've completed The Isolated Plateau
- One-hit Obliterator remains in shrine after completing its mission
- When importing from JSON, the first shield slot will sometimes have a durability of 1, despite the JSON having a different value
